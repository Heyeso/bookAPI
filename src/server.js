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

//serve static page on launch
app.use("/", express.static("public"));

//GET request
app.get(
  "/:api_key/book",
  /*
    Check if api key exact match
    sends back 401 error code if not match
  */
  function (req, res, next) {
    if (req.params.api_key === process.env.API_KEY) next();
    else res.status(401).send({ message: "Unauthorized, Invalid API key." });
  },
  /*
      returns all books in the database
  */
  function (req, res) {
    Book.find({}, function (err, data) {
      if (err) res.status(404).send({ error: err });
      else {
        if (data.length === 0) res.status(200).send("Book does not exist");
        else res.status(200).send(data);
      }
    });
  }
);
app.get(
  "/:api_key/book/find",
  bodyParser.json(),
  /*
    Check if api key exact match
    sends back 401 error code if not match
  */
  function (req, res, next) {
    if (req.params.api_key === process.env.API_KEY) next();
    else res.status(401).send({ message: "Unauthorized, Invalid API key." });
  },
  /*  
    finds book with isbn number and title
  */
  function (req, res, next) {
    if (req.body.isbn && req.body.title) {
      Book.find({ isbn: req.body.isbn, title: req.body.title }, (err, data) => {
        if (err) return res.status(404).send({ error: err });
        else {
          if (data.length === 0)
            return res.status(200).send({ message: "Book does not exist" });
          else return res.status(200).send(data);
        }
      });
    } else next();
  },
  /*  
    finds book with isbn number
  */
  function (req, res, next) {
    if (req.body.isbn) {
      Book.find({ isbn: req.body.isbn }, (err, data) => {
        if (err) return res.status(404).send({ error: err });
        else {
          if (data.length === 0)
            return res.status(200).send({ message: "Book does not exist" });
          else return res.status(200).send(data);
        }
      });
    } else next();
  },
  /*  
    finds book with title
  */
  function (req, res, next) {
    if (req.body.title) {
      Book.find({ title: req.body.title }, (err, data) => {
        if (err) return res.status(404).send({ error: err });
        else {
          if (data.length === 0)
            return res.status(200).send({ message: "Book does not exist" });
          else return res.status(200).send(data);
        }
      });
    } else next();
  },
  function (req, res) {
    res.status(400).send({ message: "Bad Request." });
  }
);

//POST request
app.post(
  "/:api_key/book/add",
  bodyParser.json(),
  /*
    Check if api key exact match
    sends back 401 error code if not match
  */
  function (req, res, next) {
    if (req.params.api_key === process.env.API_KEY) next();
    else res.status(401).send({ message: "Unauthorized, Invalid API key." });
  },
  function (req, res, next) {
    if (req.body.isbn) {
      Book.find({ isbn: req.body.isbn }, (err, data) => {
        if (err) return res.status(404).send({ error: err });
        else {
          if (data.length > 0)
            return res.status(200).send({ message: "Book exist", data: data });
          return next();
        }
      });
    } else next();
  },
  /*
      add book into the api with custom publish date
  */
  function (req, res, next) {
    if (
      req.body.isbn &&
      req.body.title &&
      req.body.author &&
      req.body.publisher &&
      req.body.pages &&
      req.body.publish
    ) {
      let newBook = new Book({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        pages: req.body.pages,
        publish: req.body.publish,
      });

      newBook
        .save()
        .then((data) => {
          res
            .status(201)
            .send({ message: "book was created successfully", data: data });
        })
        .catch((err) =>
          res.status(400).send({ message: "Bad Request.", error: err })
        );
    } else next();
  },
  /*
      add book into the api without custom publish date
  */
  function (req, res, next) {
    if (
      req.body.isbn &&
      req.body.title &&
      req.body.author &&
      req.body.publisher &&
      req.body.pages
    ) {
      let newBook = new Book({
        isbn: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        pages: req.body.pages,
      });
      newBook
        .save()
        .then((data) => {
          res
            .status(201)
            .send({ message: "book was created successfully", data: data });
        })
        .catch((err) => {
          res.status(400).send({ message: "Bad Request.", error: err });
        });
    } else next();
  },
  function (req, res) {
    res.status(400).send({ message: "Bad Request." });
  }
);
// PUT request
app.put(
  "/:api_key/book/update",
  bodyParser.json(),
  /*
    Check if api key exact match
    sends back 401 error code if not match
  */
  function (req, res, next) {
    if (req.params.api_key === process.env.API_KEY) next();
    else res.status(401).send({ message: "Unauthorized, Invalid API key." });
  },
  /*
    If book exists in database, updates Book with matching isbn number from database
  */
  function (req, res, next) {
    if (req.body.isbn) {
      Book.findOneAndUpdate(
        { isbn: req.body.isbn },
        req.body,
        function (err, data) {
          if (err) return res.status(404).send({ error: err });
          else {
            if (data === null)
              return res.status(200).send({ message: "Book does not exist" });
            else
              return res
                .status(200)
                .send({ message: "Book was updated successfully" });
          }
        }
      ).catch((err) =>
        res.status(400).send({ message: "Bad Request.", error: err })
      );
    } else next();
  },
  function (req, res) {
    res.status(400).send({ message: "Bad Request." });
  }
);
// DELETE request
app.delete(
  "/:api_key/book/delete",
  bodyParser.json(),
  /*
    Check if api key exact match
    sends back 401 error code if not match
  */
  function (req, res, next) {
    if (req.params.api_key === process.env.API_KEY) next();
    else res.status(401).send({ message: "Unauthorized, Invalid API key." });
  },
  /*
    If book exists in database Deletes Book with matching isbn number from database
  */
  function (req, res, next) {
    if (req.body.isbn) {
      Book.deleteOne({ isbn: req.body.isbn }, (err, data) => {
        if (err) return res.status(404).send({ error: err });
        else {
          if (data.deletedCount === 0)
            return res.status(200).send({ message: "Book does not exist" });
          else
            return res
              .status(200)
              .send({ message: "Book was deleted successfully" });
        }
      }).catch((err) =>
        res.status(400).send({ message: "Bad Request.", error: err })
      );
    } else next();
  },
  function (req, res) {
    res.status(400).send({ message: "Bad Request." });
  }
);

app.listen(port, () => {
  console.log("Listening on port " + port + "...................");
});
