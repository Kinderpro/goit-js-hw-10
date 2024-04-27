import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  const delay = form.elements.delay.value;

  const radioState = this.elements.state.value;
  setTimeout(() => {
    if (radioState === 'fulfilled') {
      return Promise.resolve(delay)
        .then(delay =>
          iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topCenter',
          })
        )
        .catch(delay =>
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topCenter',
          })
        );
    } else {
      return Promise.reject(delay)
        .then(delay =>
          iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topCenter',
          })
        )
        .catch(delay =>
          iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topCenter',
          })
        );
    }
  }, delay);

  //   creatPromise(radioState, delay)
  //     .then(({ delay }) => console.log(`✅ Fulfilled promise in ${delay}ms`))
  //     .catch(({ delay }) => console.error(`❌ Rejected promise in ${delay}ms`));
}

// function creatPromiseFul(position, delay) {
//   return setTimeout(() => {
//     Promise.resolve(position, delay);
//   }, delay);
// }

// function creatPromiseRej(position, delay) {
//   return setTimeout(() => {
//     Promise.reject(position, delay);
//   }, delay);
// }
// function creatPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {

//       if (position) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function creatPromise(position, delay) {
//   setTimeout(() => {
//     if (position) {
//       return Promise.resolve({ delay });
//     } else {
//       return Promise.reject({ delay });
//     }
//   }, delay);
// }
