const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Author = require('./models/author')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => console.log('Connected!'));

const db = mongoose.connection

app.use(express.json())
app.use(cors())
const saltrounds = 10;

app.post('/insert', async (req, res) => {
    try {

        const existingUser = await Author.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ emailExists: true, message: 'Email already registered' });
        }

        const hashPassword = await bcrypt.hash(req.body.password, saltrounds)
        console.log(hashPassword);
        let newauthor = new Author({
            ...req.body,
            password: hashPassword
        })
        console.log(newauthor);
        let response = await newauthor.save();
        console.log(response);
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
})

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    console.log(token);
    token = token.split(' ')
    console.log(token[1]);

    if (!token[1]) {
        return res.status(403).json({ message: 'Token is not provided' });
    }

    jwt.verify(token[1], 'abc', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.decoded = decoded;
        console.log(req.decoded, 'asd');
        next();
    });
};

app.get('/find', verifyToken, async (req, res) => {
    let response = await Author.find()
    console.log(response);
    res.json(response)
})

app.get('/findOne/:id', async (req, res) => {
    let id = req.params.id;
    console.log("iuyyiu", id);
    let response = await Author.findById(id)
    console.log(response);
    res.json(response);
})

// app.put('/update/:id', async (req, res) => {
//     let id = req.params.id;
//     let response = await Author.findByIdAndUpdate(id, req.body)
//     console.log(response);
// })
app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let newData = { ...req.body };

        // Check if the password field exists and hash it
        if (newData.password) {
            const hashedPassword = await bcrypt.hash(newData.password, saltrounds);
            newData = { ...newData, password: hashedPassword };
        }

        const response = await Author.findByIdAndUpdate(id, newData, { new: true });

        if (!response) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(response);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let response = await Author.findByIdAndDelete(id)
    console.log(response);
})

app.post('/loginOne', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await Author.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Inavlid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Inavlid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email }, 'abc')
        res.json({ user, token })
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ message: 'Internal server error' })
    }

})


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

