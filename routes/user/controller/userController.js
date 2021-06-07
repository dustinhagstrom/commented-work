const bcrypt = require("bcryptjs"); //bring in bcrypt
const User = require("../model/User"); //bring in user model

const jwt = require("jsonwebtoken"); //bring in jwtwebtoken library

async function signup(req, res) {
  //signup function
  const { username, email, password, firstName, lastName } = req.body;
  // set req obj to variables
  const { errorObj } = res.locals;
  //establish an error object variable that will live for the duration of the req and travel to all functions call in req thereby catching all errors for us to display to the user in the response.
  if (Object.keys(errorObj).length > 0) {
    //if there is anything in the errorobj then respond with this message
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12); //generate a salt
    let hashedPassword = await bcrypt.hash(password, salt); // take user's password, add salt and hash it

    const createdUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    }); //using the user model, make a new user using the info given by user

    let savedUser = await createdUser.save(); //save that user in the database

    res.json({ message: "success", data: savedUser }); // success or error message
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });
  }
}

async function login(req, res) {
  //login function
  const { email, password } = req.body;
  // set req obj to variables
  const { errorObj } = res.locals;
  //establish an error object variable that will live for the duration of the req and travel to all functions call in req thereby catching all errors for us to display to the user in the response.
  if (Object.keys(errorObj).length > 0) {
    //if there is anything in the errorobj then respond with this message
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email });
    //search for a user by email, if found then true
    if (!foundUser) {
      //if false then error message w/ 400
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //use bcrypt compare method to compare the input password to password in database. if equal then true.
      let comparedPassword = await bcrypt.compare(password, foundUser.password);
      //if false then error message w/ 400
      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        //if true then sign with payload, then private key, then how long it is valid.
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
        //success message and user access with jwt token
        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    //catch errors
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login }; //export signup and login for use in other files.
