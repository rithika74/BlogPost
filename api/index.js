const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Author = require('./models/author')
const Blog = require('./models/blogs')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')

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
        // let newauthor = new Author(req.body)
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
    if (token) {
        token = token.split(' ')[1]; // Corrected line
        console.log(token);

        jwt.verify(token, 'abc', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            req.decoded = decoded;
            console.log(req.decoded, 'asd');
            next();
        });
    } else {
        return res.status(403).json({ message: 'Token is not provided' });
    }
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post('/addblog', upload.single('image'), async (req, res) => {
    try {
        // Extract data from the request body
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.filename : ''; // Get the file path if an image was uploaded

        // Create a new blog post object
        const newBlog = new Blog({
            title: title,
            content: content,
            image: imagePath
        });

        // Save the new blog post to the database
        const savedBlog = await newBlog.save();

        // Send a response indicating success
        res.json({ message: 'Blog post added successfully', blog: savedBlog });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error adding blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// app.post('/addblog', async (req, res) => {
//     let blog = new Blog(req.body);
//     let response = await blog.save();
//     res.send(response)
// })

app.get('/blogs', async (req, res) => {
    try {
        let blogs = await Blog.find();
        if (blogs.length > 0) {
            const formattedBlogs = blogs.map(blog => {
                return {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    image: blog.image ? `${blog.image}` : null 
                };
            });
            res.json(formattedBlogs);
        } else {
            res.json({ result: 'No Blogs Found' });
        }
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// app.get('/blogs', async (req, res) => {
//     console.log(req.body);
//     let blogs = await Blog.find();
//     if (blogs.length > 0) {
//         res.send(blogs)
//     }
//     else {
//         res.send({ result: 'No Blogs Found' })
//     }
// })


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

