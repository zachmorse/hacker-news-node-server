const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const port = process.env.PORT || 6060;

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

// routes

const getOgImages = require("./routes/getOgImages");
const getTopStories = require("./routes/getTopStories");
const getNewestStories = require("./routes/getNewStories");
const getBestStories = require("./routes/getBestStories");

// routes

app.get("/", (req, res) => {
  res.send(
    "<p>hit this endpoint at /get-og-images for processing.</p><p>The endpoint at /topstories will give the entire query</p"
  );
});

// app.get("/topstories", (req, res) => {
//   res.send("top stories");
// });

// app.use("/get-og-images", getOgImages);
app.use("/topstories", getTopStories);
app.use("/newest", getNewestStories);
app.use("/best", getBestStories);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
