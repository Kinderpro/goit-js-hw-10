import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const delay = form.elements.delay.value;

  const radioState = this.elements.state.value;
  creatPromise(radioState, delay)
    .then(({ delay }) =>
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
      })
    )
    .catch(({ delay }) =>
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topCenter',
      })
    );
}

function creatPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (position === 'fulfilled') {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
