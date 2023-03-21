const darkModeSwitch = document.querySelector('#dark-mode-switch');
const body = document.querySelector('body');

darkModeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark-mode');


});