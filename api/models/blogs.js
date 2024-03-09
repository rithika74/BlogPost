const mongoose = require('mongoose')
const authors=require('./author')

const blogScehme = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
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

