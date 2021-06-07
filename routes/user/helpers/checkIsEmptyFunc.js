const { checkIsEmpty } = require("../../utils/authMethods");

//this function checks any incoming data is empty if is empty send error message back
//else go to the next middleware function next()
function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;
  //puts req obj into a variable for use in our loop
  const { errorObj } = res.locals;
  //establish errorObj obj and fill it with the res.local data
  for (let key in inComingData) {
    //loop through obj and look for empty and if so the message.
    if (checkIsEmpty(inComingData[key])) {
      errorObj[key] = `${key} cannot be empty`;
    }
  }
  //if there is anything in the errorobj then respond with this message
  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  } else {
    next();
  }
}

module.exports = checkIsEmptyFunc; //export our function
