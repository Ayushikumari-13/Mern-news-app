const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
} = require("../controllers/storyController");

router.get("/", getStories);

router.get("/bookmarks/all", authMiddleware, getBookmarks);

router.get("/:id", getSingleStory);

router.post(
  "/:id/bookmark",
  authMiddleware,
  toggleBookmark
);

module.exports = router;