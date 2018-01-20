//
//
function validityChecker(input = "dummy") {
  if (input.slice(0, 4) !== "http") {
    return false;
  } else {
    return true;
  }
}

function randomImage() {
  let imageNum = Math.floor(Math.random() * 1084);
  let imageURL = "https://picsum.photos/300/200?image=";
  return imageURL.concat(imageNum);
}

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

module.exports = {
  randomImage: randomImage,
  imageSourcer: imageSourcer
};
