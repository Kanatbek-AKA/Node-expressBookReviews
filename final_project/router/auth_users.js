const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userNameCheck = users.filter(user => {
        return user.username === username;
    });
    if (userNameCheck.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let validUser = users.filter(user => {
        return (user.username === username && user.password === password); 
    })
    if (validUser.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in!"});    
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
        {data: password,}, "access", {expiresIn: 60 * 60}
      );
    req.session.authorization = {accessToken, username};
    return res.status(200).send("User successfully logged in!");
  } else {
        return res.status(208).json({message: "Invalid login. Please check your username and password!"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code hereconst isbn = req.params.isbn;
    let book = books[isbn];
    
// From here I need to modify the code.

    if (book) { //Check if book isbn exists.

        let reviews = req.query.reviews;
        let username = req.body.username;
         
        if(reviews) {  //  
            book["review"] = reviews; 
        }
        // if(username) {
        //     book["visitor"] = username;
        // }

        // same user remove preview review in the same isbn number     
        books[isbn]= book;
        res.send(`Review of ${isbn} was updated.`);
        // new User reviews post()
    }
    else{
        res.send("Unable to add review!");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
