const { checkIsStrongPassword } = require("../../utils/authMethods"); //bring in strong password check

function checkIsStrongPasswordFunc(req, res, next) {
  const { errorObj } = res.locals;
  //establish errorObj obj and fill it with the res.local data
  if (!checkIsStrongPassword(req.body.password)) {
    //if it doesn't meet standards then message
    errorObj.weakPassword =
      "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8";
  }
  // then next function in line
  next();
}

module.exports = checkIsStrongPasswordFunc; //export our function
