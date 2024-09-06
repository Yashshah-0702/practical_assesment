const express = require("express");
const router = express.Router();
module.exports = () => {
  router.use("/user", require("./user.routes")(router));
  return router;
};
