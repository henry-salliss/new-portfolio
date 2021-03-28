'use strict';

// Selecting elements

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting condtions

//  Declare global variables
let playing;
let scores = [];
let activePlayer;
let currentScore;

const init = function () {
  playing = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling the dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a number

    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display the dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. When a 1 is not rolled

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // 4. Switch to other player
      switchPlayer();
    }
  }
});

// Configuring the hold button

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Store current score in main score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. finish game if score = 100

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // 3. if not switch player
      switchPlayer();
    }
  }
});

// Configuring the New game button

btnNew.addEventListener('click', init);
