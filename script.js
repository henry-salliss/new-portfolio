'use strict';

// Getting elements from HTML
const exploreBtn = document.getElementById('explore');
const bodyEl = document.querySelector('body');
const navMenu = document.querySelector('.navigation');
const landingEl = document.querySelector('.landing-area');
const xBtn = document.querySelector('#x-button');
const links = document.querySelector('a');

// Making explore button work

exploreBtn.addEventListener('click', function () {
  console.log('test');
  navMenu.classList.toggle('show-nav');
  landingEl.classList.toggle('hidden');
  exploreBtn.classList.toggle('hidden');
});

// making nav exit button work

xBtn.addEventListener('click', function () {
  navMenu.classList.toggle('show-nav');
  landingEl.classList.toggle('hidden');
  exploreBtn.classList.toggle('hidden');
});

// removing pre set clicked button styles

// links.addEventListener('click', function () {
//   links.style.color = 'red';
// });

const date = new Date();
console.log(date);
