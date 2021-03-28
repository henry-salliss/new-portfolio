'use strict';

// Getting elements from HTML
const exploreBtn = document.getElementById('explore');
const bodyEl = document.querySelector('body');
const navMenu = document.querySelector('.navigation');
const landingEl = document.querySelector('.landing-area');
const xBtn = document.querySelector('#x-button');
const links = document.querySelector('a');
const toggleNav = document.querySelector('#show-nav');
const mainNav = document.querySelector('.main-nav');
const headerDivider = document.querySelector('.header-divider');
const navBtn = document.querySelector('.bar1, .bar2, bar3');
const lightDarkBtn = document.getElementById('toggle-mode');
const footerLightDark = document.querySelector('#toggle-footer-mode');
const container = document.querySelector('.container');
const htmlContainer = document.querySelector('.html-cont');
const footerEl = document.querySelector('.footer-el');
const headingEls = document.querySelector('.html-header');

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
