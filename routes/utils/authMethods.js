const {
  isEmpty,
  isStrongPassword,
  isEmail,
  isAlpha,
  isAlphanumeric,
} = require("validator"); // bring in validator functionality

const checkIsEmpty = (target) => (isEmpty(target) ? true : false); //write our own empty checks using validator

const checkIsStrongPassword = (password) =>
  isStrongPassword(password) ? true : false; //write our own strong password checks using validator

const checkIsEmail = (email) => (isEmail(email) ? true : false); //write our own valid email checks using validator

const checkIsAlpha = (target) => (isAlpha(target) ? true : false); //write our own alpha checks using validator

const checkIsAlphanumeric = (target) => (isAlphanumeric(target) ? true : false); //write our own alphanumeric checks using validator

module.exports = {
  checkIsEmpty,
  checkIsStrongPassword,
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
}; //export our functions
