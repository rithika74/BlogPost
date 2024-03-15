const mongoose = require('mongoose')

const authorScheme = new mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    }
},
    // { timestamps: true }
)

let Author = mongoose.model('Author', authorScheme, 'author')

module.exports = Author