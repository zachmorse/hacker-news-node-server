const express = require("express");
const axios = require("axios");
const getNewStoriesRouter = express.Router();

// set global variable for the cache and populate it

let newStoriesMasterArray = [];

// functions to populate cache

async function newStories() {
  let results = await getStoryIndex();
  let stories = await getIndividualStories(results);
  newStoriesMasterArray = stories;
}

async function getStoryIndex() {
  const response = await axios.get(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
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

setInterval(newStories, 10000);

// ---------------------------------------------
// ---------------------------------------------

getNewStoriesRouter.get("/", (req, res) => {
  res.send(newStoriesMasterArray);
});

module.exports = getNewStoriesRouter;
