//Repeat boolean for checking if a new color should be generated
let repeat = true;

//Create array for history tracking
let historyArray = [];

//Create array for favorites
let favoritesArray = [];

//prevTarget for highlighting rows in historyBox when clicked
let prevTarget = null;

//for the current highlighted intem in historyBox
let currentItem = null;

//DOM Elements
const colorTitle = document.getElementById('colorTitle');
const historyBox = document.getElementById('historyBox');
const favoritesBox = document.getElementById('favoritesBox');
const startStopButton = document.getElementById('startStop');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const addToFavoritesButton = document.getElementById('addToFavoritesButton');
const clearFavoritesButton = document.getElementById('clearFavoritesButton');
const addCurrentColorButton = document.getElementById('addCurrentColorButton');

//Function to obtain random number from 0-255 for RGB values
const getRandomNum = () => {
  return Math.round(Math.random() * 255);
};

//Function that obtains the color value of a clicked item in color list
colorItemOnClick = (e) => {
  if (prevTarget !== null) {
    prevTarget.classList.remove('highlightedItem');
  }
  currentItem = e;
  const targetContent = document.getElementById(`${e.id}`).textContent;
  const targetArr = targetContent.split(',')
  const red = parseInt(targetArr[0].split(' ')[1]);
  const green = parseInt(targetArr[1].split(' ')[2]);
  const blue = parseInt(targetArr[2].split(' ')[2]);
  changeBgColor(red, green, blue)
  e.classList.add('highlightedItem');
  prevTarget = e;
}

//Function that changes the background color (Only used for colorItemOnClick because repeat is set to false)
changeBgColor = (red, green, blue) => {
  if (repeat === true) {
    repeat = false
  }
  document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  colorTitle.textContent = `Red: ${red}, Green: ${green}, Blue: ${blue}`
}

//Function that changes the color title to either black or white based on the current background color (Passed in color)
changeColorTitleColor = (red, green, blue) => {
  if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
    colorTitle.style.color = '#000000';
  } else {
    colorTitle.style.color = '#ffffff';
  }
}

//Event Listeners

//For starting / stopping the color generation loop
startStopButton.addEventListener('click', () => {
  if (!repeat) {
    repeat = !repeat
    timeout();
    return;
  }
  repeat = !repeat

})

//For clearing the history box and historyArray
clearHistoryButton.addEventListener('click', () => {
  historyBox.innerHTML = '';
  historyArray = [];
})

//For adding the highlighted color from history to favorites
addToFavoritesButton.addEventListener('click', () => {
  // favoritesArray.push(currentItem);
  const targetArr = currentItem.textContent.split(',')
  const red = parseInt(targetArr[0].split(' ')[1]);
  const green = parseInt(targetArr[1].split(' ')[2]);
  const blue = parseInt(targetArr[2].split(' ')[2]);
  favoritesArray.push({
    red,
    green,
    blue
  });
  //Map over all colors in the favorites array and display them in the favoritesBox
  favoritesBox.innerHTML = `<ul> ${favoritesArray.map((color, index) => `<li id='${index}' onclick=colorItemOnClick(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`
});

clearFavoritesButton.addEventListener('click', () => {
  favoritesBox.innerHTML = ''; 
  favoritesArray = [];
})

//Main loop that will loop over newly generated colors
const timeout = () => {
  const changeColor = setTimeout(() => {
    if (repeat === true) {
      //Generate new color values
      const red = getRandomNum();
      const green = getRandomNum();
      const blue = getRandomNum();

      //Set background color based on generated values
      document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

      //Change the colorTitle with changeColorTitleColor function
      changeColorTitleColor(red, green, blue);

      //Update the colorTitle with the current background color
      colorTitle.textContent = `Red: ${red}, Green: ${green}, Blue: ${blue}`;

      //Push current color to the history array
      historyArray.push({
        red,
        green,
        blue
      })

      //Map over all colors in the history array and display them in the historyBox
      historyBox.innerHTML = `<ul> ${historyArray.map((color, index) => `<li id='${index}' onclick=colorItemOnClick(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`

      //Map over all colors in the favorites array and display them in the favoritesBox
      favoritesBox.innerHTML = `<ul> ${favoritesArray.map((color, index) => `<li id='${index}' onclick=colorItemOnClick(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`

      //Make sure buttons are displayed
      startStopButton.classList.remove('invisible');
      clearHistoryButton.classList.remove('invisible');
      addToFavoritesButton.classList.remove('invisible');
      clearFavoritesButton.classList.remove('invisible');
      addCurrentColorButton.classList.remove('invisible');
      historyBox.classList.remove('invisible');
      favoritesBox.classList.remove('invisible');

      //Call timeout for for looping
      timeout()
    }
  }, 1500)
}

//Run timeout for the first time
timeout();
