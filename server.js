const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const openGraphCheck = require("open-graph-scraper");
const cors = require("cors");
const compression = require("compression");
const port = process.env.PORT || 6060;

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

// route requirements

const getOgImages = require("./routes/getOgImages");
const getTopStories = require("./routes/getTopStories");

// routes

app.get("/", (req, res) => {
  res.send(
    "<p>hit this endpoint at /get-og-images for processing.</p><p>The endpoint at /topstories will give the entire query</p"
  );
});

app.use("/get-og-images", getOgImages);
app.use("/topstories", getTopStories);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
