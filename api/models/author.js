const mongoose = require('mongoose')

const authorScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
},
    // { timestamps: true }
)

let Author = mongoose.model('Author', authorScheme, 'author')

module.exports = Author