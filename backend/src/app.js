const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const scraperRoutes = require("./routes/scraperRoutes");

const app = express();

app.use(
  cors({
    origin: "https://mern-news-app-one.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("MERN News Backend Running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scraperRoutes);

module.exports = app;