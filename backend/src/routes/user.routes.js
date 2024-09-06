const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
} = require("../controller/user.controller");
const { uploadImgStorage } = require("../utils/file-upload.utils");
const middelware = require("../middleware/validation.middleware")
const {signUpSchema} = require("../validations/user.validation")

module.exports = () => {
  router.post("/signUp",uploadImgStorage , 
  middelware(signUpSchema),
   signUp);
  router.post("/login", login);
  return router;
};
