const express = require("express");

const router = express.Router();

const {
  scrapeNews,
} = require("../controllers/scraperController");

router.get("/", scrapeNews);

module.exports = router;