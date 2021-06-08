const express = require("express");
const mongoose = require("mongoose");
const Book = require("./model/book");
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb+srv://adminUser:RmKcr2tky657EqFz@sandbox.shegi.mongodb.net/books_directory', {useNewUrlParser: true, useUnifiedTopology: true})

// test connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // we're connected!
  console.log("MongoDB connected................")
});


app.get('/', function (req, res) {
  var responseText = '<h1>Add a Book<h1>'
  res.send(responseText)
})

//get
app.get('/find', function (req, res) {
    res.send("get")
})

//post
app.post('/add/:isbn/:title/:author/:publisher/:pages', function (req, res) {
    let newBook = new Book({
        isbn: req.params.isbn,
        title: req.params.title,
        author: req.params.author,
        publisher: req.params.publisher,
        pages: req.params.pages
    })
    newBook.save().then(mRes => {
        res.send(mRes);
    }).catch(err => console.log("Error: \n" + err))
})
app.post('/add/:isbn/:title/:author/:publisher/:pages/:publish', function (req, res) {

    let newBook = new Book({
        isbn: req.params.isbn,
        title: req.params.title,
        author: req.params.author,
        publisher: req.params.publisher,
        pages: req.params.pages,
        publish: req.params.publish
    })

    newBook.save().then(mRes => {
        res.send(mRes);
    }).catch(err => console.log("Error: \n" + err))
})
//   put
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})
// delete
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})






app.listen(port, () => {
    console.log("Listening on port " + port + "...................");
})

// 9781575846932/The characters of Theophrastus/Theophrastus/J. Taylor/352