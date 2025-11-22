const express = require("express");
const router = express.Router();
const {
  Home,
} = require("../controllers/allcontroller.js");
const chat = require("../controllers/geminiController.js");

router.get("/", Home);

router.post("/chat", chat);

module.exports = router;
