'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('header');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Making all modal btns open modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////// creating the cookie element ///////////////////////

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>`;
header.append(message);

const closeCookie = document.querySelector('.btn--close--cookie');

// remove the cookie message
closeCookie.addEventListener('click', function () {
  message.remove();
});

// Cookie styles
message.style.backgroundColor = '#37383d';
message.style.color = 'white';
message.style.width = '120%';
Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// message.style.height = console.log(getComputedStyle(message).height); // shows current height

//////////// SMOOTH SCROLLING ////////////////////

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation //

const navLinks = document.querySelectorAll('.nav__link');
const navLinksContainer = document.querySelector('.nav__links');

const navScroll = function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
};

// navLinks.forEach(function(el){
//   el.addEventListener('click', navScroll);
// })

navLinksContainer.addEventListener('click', navScroll);

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  // find tab
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Apply active class to tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Remove active content class
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Apply active content class to appropriate tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Nav link hover effect

const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // find elements
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    // Apply styles
    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

// Loading each section

const allSections = document.querySelectorAll('.section');

const showSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading the images

const allImgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

allImgs.forEach(img => imgObserver.observe(img));

///////////////// CREATING THE SLIDER ///////////////////

const slider = function () {
  // Selecting elements

  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const maxSlides = slides.length - 1;
  let currentSlide = 0;

  // Creating the dots and the active dot

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // Function that actually moves the slides
  const goToSlide = function (s) {
    slides.forEach(function (slide, i) {
      slide.style.transform = `translateX(${100 * (i - s)}%)`;
    });
  };

  // Initial conditions

  const init = function () {
    createDots();
    activateDot(currentSlide);
    goToSlide(0);
  };

  init();

  // Function for the next button

  const nextSlide = function () {
    if (currentSlide === maxSlides) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Function for the previous button

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlides;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // Event listeners

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
};

slider();
