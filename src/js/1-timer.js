// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const dateTimePicker = document.getElementById('datetime-picker');//отримав доступ до інпуту
const dataStart = document.querySelector('.dataStart');//отримав доступ до кнопки
let userSelectedDate; // оголошення глобальної змінної для збереження вибору юзера
dataStart.disabled = true;// робимо кнопку не доступною (доступ буде тільки якщо обрати дату)
let intervalId;
//налаштування ізі тосту щоб виводилося в правому верхньому куті 
iziToast.settings({
    position: 'topRight',
})

//налаштування опцій для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates.length > 0) {
      userSelectedDate = selectedDates[0];
      const currentDate = new Date();
      if (userSelectedDate > currentDate) {
        dataStart.disabled = false;
        }else{
        // window.alert("Please choose a date in the future");
        iziToast.error({
            message: "Please choose a date in the future",
        });
        dataStart.disabled = true;
        }
      
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


//додаємо ведучий нуль
function addLeadingZero(value) {
    if (value < 10) {
    return value.toString().padStart(2, '0');
    }
    return value.toString()
}

// функція для оновлення таймеру 
  function updateTimer () {
    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    const startTime = Date.now();
    const endTime = userSelectedDate.getTime();
    const elapsedTime = endTime - startTime;

    const timeObject  = convertMs(elapsedTime);

    const days = timeObject.days;
    const hours = timeObject.hours;
    const minutes = timeObject.minutes;
    const seconds = timeObject.seconds;

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        dateTimePicker.disabled = false;
        clearInterval(intervalId);
    }
}

// вішаю слухача на кнопку
function handlerEvent(event) {
    dataStart.disabled = true;
    dateTimePicker.disabled = true;
    updateTimer(); // запускаю таймер
    intervalId = setInterval(updateTimer, 1000);
}



dataStart.addEventListener('click', handlerEvent)

