const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.style.backgroundColor = "green";
startBtn.style.borderRadius = "20px";
startBtn.style.fontSize = "15px";
startBtn.style.color = "black";
stopBtn.style.borderRadius = "20px";
stopBtn.style.fontSize = "15px";

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.style.backgroundColor = "red";
  startBtn.style.color = "gray";
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  setColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.style.backgroundColor = "green";
  startBtn.style.color = "black";
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled');
  clearInterval(setColor);
});