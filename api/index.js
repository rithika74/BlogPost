const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const Author = require('./models/author')
const Blog = require('./models/blogs')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { profile, log } = require('console');

mongoose.connect('mongodb://127.0.0.1:27017/blog')
    .then(() => console.log('Connected!'));

const db = mongoose.connection

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));
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
    if (token) {
        token = token.split(' ')[1];
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

app.get('/findOne/:id', verifyToken, async (req, res) => {
    let id = req.params.id;
    console.log("iuyyiu", id);
    let response = await Author.findById(id)
    console.log(response);
    res.json(response);
})

app.put('/update/:id', async (req, res) => {
    let id = req.params.id;
    let response = await Author.findByIdAndUpdate(id, req.body)
    console.log(response);
})




// const profileImage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'profile/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + file.originalname)
//     }
// })

// const uploadProfile = multer({ storage: profileImage });

// app.put('/update/:id', verifyToken, uploadProfile.single('image'), async (req, res) => {
//     try {
//         const id = req.params.id;
//         let newData = { ...req.body };
//         const imagePath = req.file ? req.file.filename : undefined;

//         if (newData.password) {
//             const hashedPassword = await bcrypt.hash(newData.password, saltrounds);
//             newData = { ...newData, password: hashedPassword };
//         }
//         const response = await Author.findByIdAndUpdate(id, newData, { new: true });

//         if (!response) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (imagePath) {
//             if (response.image) {
//                 const oldImagePath = path.join(__dirname, 'profile', response.image);
//                 if (fs.existsSync(oldImagePath)) {
//                     fs.unlinkSync(oldImagePath);
//                 }
//             }
//             response.image = imagePath;
//         }

//         const updatedAuthor = await response.save();

//         res.json({ message: 'Profile updated successfully', response: updatedAuthor });


//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });



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

////////////////////////////////////////////////////////////////////////////////////////////////

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
        const { title, content, author } = req.body;
        const imagePath = req.file ? req.file.filename : '';
        const newBlog = new Blog({
            title: title,
            content: content,
            image: imagePath,
            author: author
        });
        const savedBlog = await newBlog.save();

        res.json({ message: 'Blog post added successfully', blog: savedBlog });
    } catch (error) {
        console.error('Error adding blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/blogs', async (req, res) => {
    try {
        let blogs = await Blog.find();
        if (blogs.length > 0) {
            const formattedBlogs = blogs.map(blog => {
                return {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    image: blog.image ? blog.image : null,
                    author: blog.author
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

app.get('/userblogs/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(id);
        let response = await Blog.find({ author: id })
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error finding blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/blogOne/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        console.log(id);
        let response = await Blog.findById(id)
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error finding blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/deletepost/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.find({ author: id });
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        if (blog.image) {
            const imagePath = path.join(__dirname, 'uploads', blog.image);
            fs.unlinkSync(imagePath);
        }
        await Blog.findByIdAndDelete(id);
        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// app.put('/updateblog/:id', upload.single('image'), async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { title, content } = req.body;
//         const imagePath = req.file ? req.file.filename : undefined;

//         let blog = await Blog.findById(id);
//         if (!blog) {
//             return res.status(404).json({ message: 'Blog post not found' });
//         }

//         if (blog.image) {
//             const oldImagePath = path.join(__dirname, 'uploads', blog.image);
//             fs.unlinkSync(oldImagePath);
//         }

//         if (title) {
//             blog.title = title;
//         }
//         if (content) {
//             blog.content = content;
//         }
//         if (imagePath) {
//             blog.image = imagePath;
//         }
//         const updatedBlog = await blog.save();

//         res.json({ message: 'Blog post updated successfully', blog: updatedBlog });
//     } catch (error) {
//         console.error('Error updating blog post:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.put('/updateblog/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content } = req.body;
        const imagePath = req.file ? req.file.filename : undefined;

        let blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        if (title !== undefined) {
            blog.title = title;
        }
        if (content !== undefined) {
            blog.content = content;
        }
        if (imagePath !== undefined) {
            if (blog.image) {
                const oldImagePath = path.join(__dirname, 'uploads', blog.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            blog.image = imagePath;
        }
        const updatedBlog = await blog.save();

        res.json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

