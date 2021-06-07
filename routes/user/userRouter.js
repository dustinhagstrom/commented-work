const express = require("express"); //bring in express
const router = express.Router(); //call express router

const { signup, login } = require("./controller/userController"); //bring in signup and login

//bring in other functions
const checkIsUndefined = require("./helpers/checkIsUndefined");
const checkIsEmptyFunc = require("./helpers/checkIsEmptyFunc");
const checkIsStrongPasswordFunc = require("./helpers/checkIsStrongPasswordFunc");

//bring in some more functions
const {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
} = require("./helpers/authMiddleware");

//call these functions when this req is made
router.post(
  "/sign-up",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsStrongPasswordFunc,
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
  signup
);
//call these functions when this req is made
router.post(
  "/login",
  checkIsUndefined,
  checkIsEmptyFunc,
  checkIsEmailFunc,
  login
);

module.exports = router; //export router
