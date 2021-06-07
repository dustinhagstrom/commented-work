function checkIsUndefined(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    //if there is nothing the user supplied then message
    return res.status(500).json({ message: "Please fill out the form" });
  } else {
    let errorObj = {}; // establish errorObj as an object
    res.locals.errorObj = errorObj; //setting the res.locals object value of errorObj with the empty obj
    next(); // then next function
  }
}

module.exports = checkIsUndefined; //export our function
