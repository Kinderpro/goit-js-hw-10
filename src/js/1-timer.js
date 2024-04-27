import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  daysVal: document.querySelector('[data-days]'),
  hoursVal: document.querySelector('[data-hours]'),
  minVal: document.querySelector('[data-minutes]'),
  secVal: document.querySelector('[data-seconds]'),
};
let ms;

let userSelecDate;
const data = Date.now();

refs.btnStart.addEventListener('click', onClickBtn);
refs.btnStart.disabled = true;

const flp = flatpickr(refs.inputDate, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - data < 0) {
      iziToast.warning({
        title: 'Caution',
        message: '"Please choose a date in the future"',
        position: 'topCenter',
      });
    } else {
      iziToast.success({
        title: 'OK',
        position: 'topCenter',
        message: 'Вітаю, дата вибрана добре',
      });

      refs.btnStart.disabled = false;
      userSelecDate = selectedDates[0].getTime();
    }
  },
});

function onClickBtn() {
  const id = setInterval(() => {
    ms = userSelecDate - Date.now();
refs.inputDate.disabled = true;
    refs.daysVal.textContent = addLeadingZero(convertMs(ms).days);
    refs.hoursVal.textContent = addLeadingZero(convertMs(ms).hours);
    refs.minVal.textContent = addLeadingZero(convertMs(ms).minutes);
    refs.secVal.textContent = addLeadingZero(convertMs(ms).seconds);
    setTimeout(() => {
      clearInterval(id);
      refs.inputDate.disabled = false;
    }, ms);
    
  }, 1000);
  refs.btnStart.disabled = true;
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
