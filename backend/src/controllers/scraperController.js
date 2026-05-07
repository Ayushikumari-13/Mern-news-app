const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/Story");

const scrapeNews = async (req, res) => {
  try {
    // Hacker News fetch
    const response = await axios.get(
      "https://news.ycombinator.com"
    );

    const $ = cheerio.load(response.data);

    // old data delete
    await Story.deleteMany();

    const stories = [];

    $(".athing").each((index, element) => {
      if (index < 10) {
        const title = $(element)
          .find(".titleline a")
          .text();

        const url = $(element)
          .find(".titleline a")
          .attr("href");

        const subtext = $(element).next();

        const points =
          parseInt(
            subtext.find(".score").text()
          ) || 0;

        const author = subtext
          .find(".hnuser")
          .text();

        const postedAt = subtext
          .find(".age")
          .text();

        stories.push({
          title,
          url,
          points,
          author,
          postedAt,
        });
      }
    });

    // MongoDB save
    await Story.insertMany(stories);

    res.status(200).json({
      success: true,
      message: "Top 10 stories scraped successfully",
      total: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  scrapeNews,
};