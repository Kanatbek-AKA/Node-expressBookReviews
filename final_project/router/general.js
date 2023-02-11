const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password ) {
    if (!isValid(username)) {
      users.push({"username": username, 'password': password});
      return res.status(200).json({message: "User successfully registered. Now you can login!"});
    } else {
        return res.status(200).json({message: "User allready exists!"});
    }
  }
  res.status(401).json({message : 'Unable to register user. Try again!'});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here 
  const book = Object.entries(books);
  return res.status(200).send(book);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
  if (isbn < 1 || isbn > 10 ) {
    res.status(404).json({message: ` The ISBN ${isbn} number not found. Please re-check the isbn book number!`})
  } else {
      return res.send(books[isbn]);
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const bookAuthor = req.params.author;
  const authors = Object.values(books).filter(book => book["author"] === bookAuthor);
  res.send(authors)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code hereconst 
  bookTitle = req.params.title;
  const titles = Object.values(books).filter(book => book["title"] === bookTitle);
  res.send(titles)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviewISBN = parseInt(req.params.isbn);
  const isbn = parseInt(req.params.isbn);
  if (reviewISBN < 1 || reviewISBN > 10 ) {
    res.status(404).json({message: ` The ISBN ${reviewISBN} number not found. Please re-check the isbn book number!`})
  } else {
      return res.send(books[isbn]['reviews']);
  }  
});

module.exports.general = public_users;
