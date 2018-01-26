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

getTopStoriesRouter.get("/", (req, res) => {
  (async () => {
    const itemBaseURL = "https://hacker-news.firebaseio.com/v0/item/";
    const itemURLsuffix = ".json?print=pretty";

    // grab array of story ids
    const response = await axios.get(
      "https://hacker-news.firebaseio.com/v0/item/16238765.json?print=pretty"
    );
    const storyIndex = response.data;

    // for each id, retrieve the story

    // let results = Promise.all(
    //   storyIndex.forEach((element, index) => {
    //     getStories(itemBaseURL + element + itemURLsuffix);
    //   })
    // )
    //   .then(results => {
    //     console.log("stuff");
    //   })
    //   .catch(error => {
    //     console.log("ERROR:", error);
    //   });
    res.send(storyIndex);
  })();
});

module.exports = getTopStoriesRouter;
