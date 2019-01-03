// ---------------------------------------------------------
// ---------------------------------------------------------
function validityChecker(input = "dummy") {
  if (input === null || input.slice(0, 4) !== "http") {
    return false;
  } else {
    return true;
  }
}

// ---------------------------------------------------------
// ---------------------------------------------------------

function randomImage() {
  let imageNum = Math.floor(Math.random() * 1084);
  let imageURL = "https://picsum.photos/300/200?image=";
  return imageURL.concat(imageNum);
}

// ---------------------------------------------------------
// ---------------------------------------------------------

function imageSourcer(input, index) {
  if (input.hasOwnProperty("ogImage") === true) {
    if (validityChecker(input.ogImage.url) === true) {
      return input.ogImage.url;
    } else {
      return randomImage();
    }
  } else {
    return randomImage();
  }
}

// ---------------------------------------------------------
// ---------------------------------------------------------

async function getStories(url) {
  let masterArray = [];
  let results = await getStoryIndex(url);
  let stories = await getIndividualStories(results);
  masterArray = stories;
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

// ---------------------------------------------------------
// ---------------------------------------------------------

module.exports = {
  randomImage: randomImage,
  imageSourcer: imageSourcer,
  retrieveStories: getStories
};
