const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./model/book");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// test connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  // we're connected!
  console.log("MongoDB connected................");
});

app.get("/", function (req, res) {
  var responseText = "<h1>Add a Book</h1><p> hello </p>";
  res.send(responseText);
});

//GET request
app.get("/book", function (req, res) {
  Book.find({}, function (err, data) {
    if (err) res.send(err);
    else {
      if (data.length === 0) res.send("Book does not exist");
      else res.send(data);
    }
  });
});
app.get(
  "/book/isbn:isbn?/title:title?",
  function (req, res, next) {
    if (req.params.isbn && req.params.title) {
      Book.find(
        { isbn: req.params.isbn, title: req.params.title },
        function (err, data) {
          if (err) res.send(err);
          else {
            if (data.length === 0) res.send("Book does not exist");
            else res.send(data);
          }
        }
      );
    } else next();
  },
  function (req, res, next) {
    if (req.params.isbn) {
      Book.find({ isbn: req.params.isbn }, function (err, data) {
        if (err) res.send(err);
        else {
          if (data.length === 0) res.send("Book does not exist");
          else res.send(data);
        }
      });
    } else next();
  },
  function (req, res, next) {
    if (req.params.title) {
      Book.find({ title: req.params.title }, function (err, data) {
        if (err) res.send(err);
        else {
          if (data.length === 0) res.send("Book does not exist");
          else res.send(data);
        }
      });
    } else next();
  },
  function (req, res) {
    res.send("Book does not exist");
  }
);

//POST request
app.post(
  "/book/add/:isbn/:title/:author/:publisher/:pages",
  function (req, res) {
    let newBook = new Book({
      isbn: req.params.isbn,
      title: req.params.title,
      author: req.params.author,
      publisher: req.params.publisher,
      pages: req.params.pages,
    });
    newBook
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => console.log("Error: \n" + err));
  }
);
app.post(
  "/book/add/:isbn/:title/:author/:publisher/:pages/:publish",
  function (req, res) {
    let newBook = new Book({
      isbn: req.params.isbn,
      title: req.params.title,
      author: req.params.author,
      publisher: req.params.publisher,
      pages: req.params.pages,
      publish: req.params.publish,
    });

    newBook
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => console.log("Error: \n" + err));
  }
);
// PUT request
app.put("/book/update/isbn:isbn", bodyParser.json(), function (req, res) {
  Book.findOneAndUpdate(
    { isbn: req.params.isbn },
    req.body,
    function (err, data) {
      if (err) console.log(err);
      else res.send(data);
    }
  );
});
// DELETE request
app.delete("/book/delete/isbn:isbn", function (req, res) {
  Book.deleteOne({ isbn: req.params.isbn });
});

app.listen(port, () => {
  console.log("Listening on port " + port + "...................");
});
