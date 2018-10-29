const express = require("express");
const axios = require("axios");
const getTopStoriesRouter = express.Router();

function getStories(url) {
  let stories = [];
  let query = axios.get(url).then((error, response) => {
    stories.push(response);
  });
  return query;
}

function timeBang() {
  let time = new Date();
  console.log(time);
}
setInterval(timeBang, 1000);

getTopStoriesRouter.get("/", (req, res) => {
  (async () => {
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );
    const masterStoryIndex = response.data;
    // for each id, retrieve the story

    res.send(masterStoryIndex);
  })();
});

module.exports = getTopStoriesRouter;
