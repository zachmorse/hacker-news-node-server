const express = require("express");
const axios = require("axios");
const getTopStoriesRouter = express.Router();

// set global variable for the cache and populate it

let topStoriesMasterArray = [];

// functions to populate cache

async function topStories() {
  let results = await getStoryIndex();
  let stories = await getIndividualStories(results);
  topStoriesMasterArray = stories;
}

async function getStoryIndex() {
  const response = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
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

setInterval(topStories, 10000);

// ---------------------------------------------
// ---------------------------------------------

getTopStoriesRouter.get("/", (req, res) => {
  res.send(topStoriesMasterArray);
});

module.exports = getTopStoriesRouter;
