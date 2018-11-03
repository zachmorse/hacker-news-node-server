const express = require("express");
const axios = require("axios");
const getBestStoriesRouter = express.Router();

// set global variable for the cache and populate it

let bestStoriesMasterArray = [];

// functions to populate cache

async function bestStories() {
  let results = await getStoryIndex();
  let stories = await getIndividualStories(results);
  bestStoriesMasterArray = stories;
}

async function getStoryIndex() {
  const response = await axios.get(
    "https://hacker-news.firebaseio.com/v0/beststories.json"
  );
  return response.data;
}

async function getIndividualStories(list) {
  let masterList = [];
  let stories = await list.forEach(element => {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
      )
      .then(response => {
        masterList.push(response.data);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  });
  return masterList;
}

// ---------------------------------------------
// ---------------------------------------------

setInterval(bestStories, 10000);

// ---------------------------------------------
// ---------------------------------------------

getBestStoriesRouter.get("/", (req, res) => {
  res.send(bestStoriesMasterArray);
});

module.exports = getBestStoriesRouter;
