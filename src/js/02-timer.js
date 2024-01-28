import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
startBtn.style.borderRadius = "20px";
startBtn.style.fontSize = "15px";

const dayS = document.querySelector('.value[data-days]');
const hourS = document.querySelector('.value[data-hours]');
const minuteS = document.querySelector('.value[data-minutes]');
const secondS = document.querySelector('.value[data-seconds]');

startBtn.setAttribute('disabled', '');

let selectedDate;
let timer;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
  
});

function startCountdown() {
  timer = setInterval(() => {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();
    const obj = convertMs(timeRemaining);
    dayS.textContent = String(obj.days).padStart(2, '0');
    hourS.textContent = String(obj.hours).padStart(2, '0');
    minuteS.textContent = String(obj.minutes).padStart(2, '0');
    secondS.textContent = String(obj.seconds).padStart(2, '0');
    if (timeRemaining < 0) {
      clearInterval(timer);
      dayS.textContent = '00';
      hourS.textContent = '00';
      minuteS.textContent = '00';
      secondS.textContent = '00';
      Notify.info("Time's up!");
    }
  }, 1000);
}

startBtn.addEventListener('click', () => {
  startCountdown();
  startBtn.setAttribute('disabled', '');
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

document.body.style.marginLeft ="20px"
const timerAppearance = document.querySelector(".timer");
timerAppearance.style.marginTop = "10px";
timerAppearance.style.display = ("flex");

const fieldAppearance = document.querySelectorAll(".field");
for (let i = 0; i < fieldAppearance.length; i++) {
fieldAppearance[i].style.display = ("flex")
fieldAppearance[i].style.flexDirection = ("column");
fieldAppearance[i].style.marginRight = "10px"
};

const span = document.querySelectorAll(".value");
for (let i = 0; i < span.length; i++) {
  span[i].style.fontSize = ("44px");
}

const text = document.querySelectorAll(".label");
for (let i = 0; i < span.length; i++) {
  text[i].style.fontSize = ("12px");
  text[i].style.textTransform = ("uppercase");
}

text[0].style.marginLeft = ("10px");
text[1].style.marginLeft = ("5px");