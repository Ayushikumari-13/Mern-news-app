const Story = require("../models/temp");

const User = require("../models/User");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ points: -1 });

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(
      req.params.id
    );

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    );

    const storyId = req.params.id;

    const alreadyBookmarked =
      user.bookmarks.includes(storyId);

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== storyId
      );
    } else {
      user.bookmarks.push(storyId);
    }

    await user.save();

    res.status(200).json({
      message: "Bookmark Updated",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.id
    ).populate("bookmarks");

    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
};