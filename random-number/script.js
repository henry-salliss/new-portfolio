'use strict';

// setup
let hiddenNumber = (document.querySelector('.number').value = Math.trunc(
  Math.random() * 20 + 1
));

let score = 10;
document.querySelector('.score').textContent = score;

const scoreDisplay = function (theScore) {
  document.querySelector('.score').textContent = theScore;
};
console.log(document.querySelector('.number').value);

let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayBox = function (input) {
  document.querySelector('.number').textContent = input;
};

// Enter key config
const input = document.querySelector('.guess');
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    document.querySelector('.check').click();
  }
});

// Again button config
document.querySelector('.again').addEventListener('click', function () {
  hiddenNumber = document.querySelector('.number').value = Math.trunc(
    Math.random() * 20 + 1
  );

  displayBox(hiddenNumber);

  console.log(hiddenNumber);

  score = 10;

  document.querySelector('.score').textContent = score;

  displayBox('?');

  displayMessage('Start guessing...');

  document.querySelector('.guess').value = '';

  document.querySelector('.number').style.width = '15rem';

  document.querySelector('body').style.backgroundColor = '#222';
});

// Check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //   When there is no guess
  if (!guess) {
    displayMessage('Please enter a number 😊');

    // When the guess is correct
  } else if (guess === hiddenNumber) {
    displayMessage('Correct! 🎉');

    score++;
    document.querySelector('.score').textContent = score;

    displayBox(hiddenNumber);

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    highScore = score;

    document.querySelector('.highscore').textContent = score;

    // When the guess is incorrect
  } else if (guess !== hiddenNumber) {
    if (score > 1) {
      displayMessage(
        guess < hiddenNumber ? 'Too low, try again!' : 'Too high, try again!'
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('You lost! ☹');

      document.querySelector('.score').textContent = 0;

      document.querySelector('body').style.backgroundColor = '#e60000';
    }
  }
});
