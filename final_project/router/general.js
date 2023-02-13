const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// const axios = require("axios");

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
    // const book = Object.entries(books);
    // return res.status(200).send(book);  

// Promise 
    const dbBook = new Promise((resolve, reject) => {
        resolve(res.send({books}))
        })
    dbBook.then((message) => message).catch((error) => error.toString());

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = parseInt(req.params.isbn);
//   if (isbn < 1 || isbn > 10 ) {
//     res.status(404).json({message: ` The ISBN ${isbn} number not found. Please re-check the isbn book number!`})
//   } else {
//       return res.send(books[isbn]);
//   }

// Promise 
  const dbISBN = new Promise((resolve, reject) => {
    if (isbn < 1 || isbn > 10 ) reject(res.status(404).json({message: ` The ISBN "${isbn}" not found. Please re-check the isbn book number!`}));
     else resolve(res.send(books[isbn]));
    
  })
  dbISBN.then((message) => message).catch((error) => error.toString());
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const bookAuthor = req.params.author;
//   const authors = Object.values(books).filter(book => book["author"] === bookAuthor);
//   res.send(authors)
// TODO display books that startWith a alphabet letter  
//     const alphabet = function() {
//       const letters = ['A','B', "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
//       letters.forEach((iter) => {
//           return iter;
//       })
//   };

  // Promise 
  const dbAuthor = new Promise((resolve, reject) => {
    const authors = Object.values(books).filter(book => book["author"] === bookAuthor);
    if (!authors.toString()) reject(res.status(404).json({message: `The "${bookAuthor}" name not found. Please, re-check the author name.`}));
    
    else resolve(res.send(authors));
   });
  dbAuthor.then((message) => message).catch(error => error.toString())
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code hereconst 
  bookTitle = req.params.title;
//   const titles = Object.values(books).filter(book => book["title"] === bookTitle);
//   res.send(titles)

// Promise 
  const dbTitle = new Promise((resolve, reject) => {
    const titles = Object.values(books).filter(book => book["title"] === bookTitle);
    if (!titles.toString()) reject(res.status(404).json({message: `The "${bookTitle}" title not found. Please, re-check the book title.`}));
    else resolve(res.send(titles));
   });
  dbTitle.then((message) => message).catch(error => error.toString());

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviewISBN = parseInt(req.params.isbn);
//   if (reviewISBN < 1 || reviewISBN > 10 ) {
//     res.status(404).json({message: ` The ISBN ${reviewISBN} number not found. Please re-check the isbn book number!`})
//   } else {
//       return res.send(books[reviewISBN]['reviews']);
//   }  

// Promise 
  const dbIsbnReview = new Promise((resolve, reject) => {
    if (reviewISBN < 1 || reviewISBN > 10 ) {
      reject(res.status(404).json({message: ` The ISBN "${reviewISBN}" not found. Please re-check the isbn number!`}));
    } else {
      return res.send(books[reviewISBN]['reviews']);
     } 
   });
  dbIsbnReview.then((message) => message).catch(error => error.toString())
});

module.exports.general = public_users;
