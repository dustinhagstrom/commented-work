const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods"); //bring in our functions from authmethods

function checkIsEmailFunc(req, res, next) {
  //write check email function
  const { errorObj } = res.locals;
  //establish errorObj obj and fill it with the res.local data
  if (!checkIsEmail(req.body.email)) {
    //if it fails check then:
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  //else next function in the line
  next();
}

function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  //establish errorObj obj and fill it with the res.local data
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      //if it fails check then:
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }
  //else next function in the line
  next();
}

function checkIsAlphanumericFunc(req, res, next) {
  const { errorObj } = res.locals;
  //establish errorObj obj and fill it with the res.local data
  if (!checkIsAlphanumeric(req.body.username)) {
    //if it fails check then:
    errorObj.usernameError = "username can only have characters and numbers";
  }
  //else next function in the line
  next();
}

module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
}; //export our functions for use in user router
