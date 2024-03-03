const mongoose = require('mongoose')
const authors=require('./author')

const blogScehme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:authors
    }
},
    // { timestamps: true }
)

let Blog = mongoose.model('Blog', blogScehme, 'blog')

module.exports = Blog

