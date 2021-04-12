// 'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Henry Salliss',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-03-28T17:01:17.194Z',
    '2021-04-01T23:36:17.929Z',
    '2021-04-02T10:51:36.790Z',
  ],
  currency: 'GBP',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Cristiano Ronaldo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-03-27T18:49:59.371Z',
    '2021-03-30T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const transactionWait = document.querySelector('.loan-wait');
const loanConfirmed = document.querySelector('.loan-confirmed');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// format numbers

const formatCurrency = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// formatting the dates

const formatSimpleDate = date => {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth()}`.padStart(2, 0);
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// configuring main date

// labelDate.textContent = formatSimpleDate(new Date());

// console.log(formatSimpleDate(new Date()));

const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // return formatSimpleDate(date);
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// Displaying the movements

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDates(date, acc.locale);
    const formattedMov = formatCurrency(movement, acc.currency, acc.locale);
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i}: ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Implementing sort feature

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
  console.log(currentAccount.movements);
});

// displaying balance

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov, i) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${formatCurrency(
    acc.balance,
    acc.currency,
    acc.locale
  )}`;
};

// displaying summary

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurrency(
    incomes,
    acc.currency,
    acc.locale
  )}`;

  const outgoings = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  const newOut = Number(outgoings.toString().slice(1));
  labelSumOut.textContent = `-${formatCurrency(
    newOut,
    acc.currency,
    acc.locale
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(desposit => (desposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    acc.currency,
    acc.locale
  )}`;
};

// creating the usernames

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};

// Update UI function

createUsernames(accounts);

const updateUI = function (acc) {
  // display movements

  displayMovements(acc);

  // display balance

  calcPrintBalance(acc);

  // display summary

  calcDisplaySummary(acc);
};

// creating the logout timer

const startLogoutTimer = function () {
  // Call the timer every second
  const tick = function () {
    // Display time remaining to the UI
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds left logout user and stop timer
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Login to get started`;
    }

    // decrease time
    time--;
  };

  let time = 300;

  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// implementing the login functionality

let currentAccount, timer;

btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and message

    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }!`;
    containerApp.style.opacity = 100;

    // implement the date

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    const now = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear the input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // start the timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    updateUI(currentAccount);
  }
});

// making the transfers work

btnTransfer.addEventListener('click', function (e) {
  // prevent page reload
  e.preventDefault();

  // define amount

  const amount = Number(inputTransferAmount.value);

  // find recipient

  const recipient = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(recipient);

  // determine conditions for transfer

  if (
    recipient &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    recipient.username !== currentAccount.username
  ) {
    // show message
    transactionWait.style.opacity = 1;
    containerApp.style.opacity = 0;
    setTimeout(() => {
      console.log('transfer valid');
      // completing the transfer

      currentAccount.movements.push(-amount);
      recipient.movements.push(amount);
      inputTransferAmount.value = inputTransferTo.value = '';
      inputTransferAmount.blur();

      // Add the transfer date

      currentAccount.movementsDates.push(new Date().toISOString());
      recipient.movementsDates.push(new Date().toISOString());

      // update the ui

      updateUI(currentAccount);

      // hide message
      transactionWait.style.opacity = 0;
      containerApp.style.opacity = 1;

      // restart the timer

      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }
});

// adding the loan functionality

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    amount <= currentAccount.balance * 10 &&
    currentAccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    // show message
    transactionWait.style.opacity = 1;
    containerApp.style.opacity = 0;
    setTimeout(function () {
      // make movement
      currentAccount.movements.push(amount);

      // adding the date
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);

      // hide message
      transactionWait.style.opacity = 0;
      containerApp.style.opacity = 1;
      // restart the timer

      clearInterval(timer);
      timer = startLogoutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

// closing the account event handler

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  // determine conditions for deletion
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // find account index
    const deletedAccIndex = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // delete the account from the accounts array
    accounts.splice(deletedAccIndex, 1);

    // logout user
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Login to get started`;
  }
});

// fake login just for practice purposes

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// console.log(new Date());

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// setTimeout

// const ingredients = ['Pepperoni', 'Ham'];

// const pizzaTimer = setTimeout(
//   (ing1, ing2) =>
//     console.log(
//       `your pizza has arrived after 3 seconds, it comes with ${ing1} and ${ing2}`
//     ),
//   3000,
//   ...ingredients
// );

// if (ingredients.includes('Ham')) clearTimeout(pizzaTimer);

// const formatTime = date => {
//   const hour = `${date.getHours()}`.padStart(2, 0);
//   const min = `${date.getMinutes()}`.padStart(2, 0);
//   const second = `${date.getSeconds()}`.padStart(2, 0);

//   return `${hour}:${min}:${second}`;
// };

// const clock = setInterval(() => {
//   const now = formatTime(new Date());
//   console.log(now);
// }, 1000);
