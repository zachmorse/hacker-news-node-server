const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const openGraphCheck = require("open-graph-scraper");
const port = process.env.PORT || 6060;

// middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://hnzcm.surge.sh/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// routes

app.get("/", (req, res) => {
  res.send("hit this endpoint at /get-og-images for processing.");
});

app.post("/get-og-images", (req, res) => {
  let dataArray = req.body;
  let urlArray = dataArray.map(element => element.url);

  // functions --------

  function validityChecker(input = "dummy") {
    if (input.slice(0, 4) !== "http") {
      return false;
    } else {
      return true;
    }
  }

  function imageSourcer(input, index) {
    let imageNotFound = "http://www.fillmurray.com/300/200";

    if (input.hasOwnProperty("ogImage") === true) {
      if (validityChecker(input.ogImage.url)) {
        return input.ogImage.url;
      } else {
        return imageNotFound;
      }
    } else {
      return imageNotFound;
    }
  }

  // ------------------

  // action:

  let results = Promise.all(
    urlArray.map((element, index) => {
      return new Promise((resolve, reject) => {
        return openGraphCheck({ url: element }, (error, results) => {
          if (error) {
            // console.log(`Element ${index} returning random Bill Murray image`);
            return resolve({
              ...dataArray[index],
              ogImage: "http://www.fillmurray.com/300/200"
            });
          }
          return resolve({
            ...dataArray[index],
            ogImage: imageSourcer(results.data, index)
          });
        });
      });
    })
  ).then(results => {
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
