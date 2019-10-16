//Repeat boolean for checking if a new color should be generated
let repeat = true;

//Create array for history tracking
let historyArray = [];

//Create array for favorites
let favoritesArray = [];

//prevItem for highlighting rows in historyBox when clicked
let prevItem = null;

//For the current highlighted intem in historyBox
let currentItem = null;

//For storage of the current color
let currentColor = {};

//For checking if DOM elements should be displayed or not. Displays DOM elements when first color is generated
let appRan = false;
const displayDOMOnStart = (appStarted) => {
  loading.classList.add("invisible");
  historyTitle.classList.remove("invisible");
  favoritesTitle.classList.remove("invisible");
  historyBox.classList.remove("invisible");
  favoritesBox.classList.remove("invisible");
  startStopButton.classList.remove("invisible");
  clearHistoryButton.classList.remove("invisible");
  addToFavoritesButton.classList.remove("invisible");
  clearFavoritesButton.classList.remove("invisible");
  addCurrentColorButton.classList.remove("invisible");
  appRan = true;
};

//DOM Elements
const loading = document.getElementById("loading");
const colorTitle = document.getElementById("colorTitle");
const historyTitle = document.getElementById("historyTitle");
const favoritesTitle = document.getElementById("favoritesTitle");
const historyBox = document.getElementById("historyBox");
const favoritesBox = document.getElementById("favoritesBox");
const startStopButton = document.getElementById("startStop");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const addToFavoritesButton = document.getElementById("addToFavoritesButton");
const clearFavoritesButton = document.getElementById("clearFavoritesButton");
const addCurrentColorButton = document.getElementById("addCurrentColorButton");

//Function to obtain random number from 0-255 for RGB values
const getRandomNum = () => {
  return Math.round(Math.random() * 255);
};

//Function that converts RGB to hex
const rgbToHex = (red, green, blue) => {
  const convert = (color) => {
    let hex = Number(color).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };
  console.log(convert(red), convert(green), convert(blue)); 

};

//Function that obtains the color value of a clicked item in color list
const colorItemOnClick = (e) => {
  if (prevItem !== null) {
    prevItem.classList.remove("highlightedItem");
  }
  currentItem = e;
  const red = currentItem.dataset.red;
  const green = currentItem.dataset.green;
  const blue = currentItem.dataset.blue;
  endMainLoop();
  changeBgColor(red, green, blue);
  changeTitleColor(red, green, blue);
  e.classList.add("highlightedItem");
  prevItem = e;
};

//Function that changes the background color (Only used for colorItemOnClick because repeat is set to false)
const changeBgColor = (red, green, blue) => {
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  rgbToHex(red, green, blue); 
  colorTitle.textContent = `Red: ${red}, Green: ${green}, Blue: ${blue}`;
};

//Function that ends main loop
const endMainLoop = () => {
  if (repeat === true) {
    repeat = false;
  }
};

//Function that changes the color title to either black or white based on the current background color (Passed in color)
const changeTitleColor = (red, green, blue) => {
  if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
    colorTitle.style.color = "#000000";
    historyTitle.style.color = "#000000";
    favoritesTitle.style.color = "#000000";
  } else {
    colorTitle.style.color = "#ffffff";
    historyTitle.style.color = "#ffffff";
    favoritesTitle.style.color = "#ffffff";
  }
};

//Re-render functions for historyBox and favoritesBox
const renderHistory = () => {
  historyBox.innerHTML = `<ul> ${historyArray.map((color, index) => `<li data-red=${color.red} data-green=${color.green} data-blue=${color.blue} id='${index}' onclick=colorItemOnClick(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`;
};

const renderFavorites = () => {
  favoritesBox.innerHTML = `<ul> ${favoritesArray.map((color, index) => `<li data-red=${color.red} data-green=${color.green} data-blue=${color.blue} id='${index}' onclick=colorItemOnClick(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`;
};

//Event Listeners

//For starting / stopping the color generation loop
startStopButton.addEventListener("click", () => {
  if (!repeat) {
    repeat = !repeat;
    mainLoop();
    return;
  }
  repeat = !repeat;
});

//For clearing the history box and historyArray
clearHistoryButton.addEventListener("click", () => {
  historyBox.innerHTML = "";
  historyArray = [];
  prevItem = null;
  currentItem = null;
});

//For adding the highlighted color from history to favorites
addToFavoritesButton.addEventListener("click", () => {
  if (currentItem !== null) {
    const targetArr = currentItem.textContent.split(",");
    const red = parseInt(targetArr[0].split(" ")[1]);
    const green = parseInt(targetArr[1].split(" ")[2]);
    const blue = parseInt(targetArr[2].split(" ")[2]);
    favoritesArray.push({
      red,
      green,
      blue
    });
    //Map over all colors in the favorites array and display them in the favoritesBox
    renderFavorites();
  }
});

//For clearing the favorites box and favoritesArray
clearFavoritesButton.addEventListener("click", () => {
  favoritesBox.innerHTML = "";
  favoritesArray = [];
});

//For adding current background color to the favoritesArray
addCurrentColorButton.addEventListener("click", () => {
  favoritesArray.push(currentColor);
  renderFavorites();
});

//Main loop that will loop over newly generated colors
const mainLoop = () => {
  setTimeout(() => {
    //call displayDOMOnStart to display DOM elements
    if (!appRan) {
      displayDOMOnStart(true);
    }


    if (repeat === true) {
      //Generate new color values
      const red = getRandomNum();
      const green = getRandomNum();
      const blue = getRandomNum();

      //Set background color based on generated values
      changeBgColor(red, green, blue); 

      //Change the colorTitle with changeTitleColor function
      changeTitleColor(red, green, blue);

      //Update the colorTitle with the current background color
      colorTitle.textContent = `Red: ${red}, Green: ${green}, Blue: ${blue}`;

      //Push current color to the history array
      historyArray.push({
        red,
        green,
        blue
      });

      //Update currentColor with the current color
      currentColor = {
        red,
        green,
        blue
      };

      //Map over all colors in the history array and display them in the historyBox
      renderHistory();

      //Map over all colors in the favorites array and display them in the favoritesBox
      renderFavorites();

      //Call mainLoop for for looping
      mainLoop();
    }
  }, 1500);
};

//Run mainLoop for the first time
mainLoop();
