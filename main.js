const getRandomNum = () => {
  return Math.round(Math.random() * 255)
}
// `rgb(${red}, ${green}, ${blue})`
// const timeout = () => {
//   setTimeout(() => {
//     console.log('test');
//     timeout()
//   }, 1000)

// }
// timeout()
// if (red*0.299 + green*0.587 + blue*0.114) > 186 use #000000 else use #ffffff
let repeat = true;
const currentColor = document.getElementById('currentColor');
const historyArray = [];
test = (e) => {
  // console.log(e.id);
  const targetContent = document.getElementById(`${e.id}`).textContent;
  const targetArr = targetContent.split(',')
  const red = parseInt(targetArr[0].split(' ')[1]);
  const green = parseInt(targetArr[1].split(' ')[2]);
  const blue = parseInt(targetArr[2].split(' ')[2]);
  console.log({
    red,
    green,
    blue
  })
}
const timeout = () => {
  if (repeat === true) {
    const changeColor = setTimeout(() => {
      if (repeat === true) {
        prevHistoryArrayLength = historyArray.length;
        const red = getRandomNum();
        const green = getRandomNum();
        const blue = getRandomNum();
        document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
        currentColor.style.color = `rgb(${red}, ${green}, ${blue})`
        currentColor.textContent = `rgb(${red}, ${green}, ${blue})`

        if (red * 0.299 + green * 0.587 + blue * 0.114 > 186) {
          document.getElementById('currentColor').style.color = '#000000';
        } else {
          document.getElementById('currentColor').style.color = '#ffffff';
        }
        historyArray.push({
          red,
          green,
          blue
        })
        document.getElementById('historyBox').innerHTML = `<ul> ${historyArray.map((color, index) => `<li id='${index}' onclick=test(this)>Red: ${color.red}, Green: ${color.green}, Blue: ${color.blue}`)} </ul>`
        timeout()
      }

    }, 1500)
  }

}

const startStopButton = document.getElementById('startStop');
startStopButton.addEventListener('click', () => {
  if (!repeat) {
    console.log('test')
    repeat = !repeat
    timeout();
    return;
  }
  repeat = !repeat

})
timeout();