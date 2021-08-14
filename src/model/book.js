const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    isbn: String,
    title: String,
    author: String,
    publisher: String,
    pages: Number,
    publish: {
        type: Date,
        default: Date.now
    }
})

let Book = mongoose.model("book", bookSchema)
module.exports = Book