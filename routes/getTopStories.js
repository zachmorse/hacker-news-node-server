const express = require("express");
const axios = require("axios");
const getTopStoriesRouter = express.Router();

getTopStoriesRouter.get("/", (req, res) => {
  (async () => {
    const date = new Date();
    const topStoriesUrl = "https://node-hnapi.herokuapp.com/news";
    const response = await axios.get(topStoriesUrl);
    console.log(response.data);
    res.send(`Retrieved at ${date}`);
  })();
});

module.exports = getTopStoriesRouter;
