const express = require("express");
const router = express.Router();

const { submitForm, sayHello } = require("../controllers/controller");

router.route("/submit").post(submitForm);
router.route("/hello").get(sayHello);

module.exports = router;
