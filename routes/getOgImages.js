const express = require("express");
const openGraphCheck = require("open-graph-scraper");
const getOgImagesRouter = express.Router();

const shared = require("../shared/functions");

getOgImagesRouter.post("/", (req, res) => {
  let dataArray = req.body;
  let urlArray = dataArray.map(element => element.url);
  let results = Promise.all(
    urlArray.map((element, index) => {
      return new Promise((resolve, reject) => {
        return openGraphCheck({ url: element }, (error, results) => {
          if (error) {
            return resolve({
              ...dataArray[index],
              ogImage: shared.randomImage()
            });
          }
          return resolve({
            ...dataArray[index],
            ogImage: shared.imageSourcer(results.data, index)
          });
        });
      });
    })
  ).then(results => {
    res.send(results);
  });
});

module.exports = getOgImagesRouter;
