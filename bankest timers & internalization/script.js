'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
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
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b) // slice method because we dont wanna change the original
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    // containerMovements.insertAdjacentHTML('afterbegin', html);
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// TODO: scrutinize this code more
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
// let currentAccount, timer;
let currentAccount;
let timer;
2;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ''; // Code is readed from right to left
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin // !!! we have to use Number() method
  ) {
    // findIndex() method
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// Sorting button

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/* 

console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.7);

console.log(Number('35'));
console.log(+'35'); // JS will convert it to number

///////////////////////////////
// NUMBER

// Parsing
// gets rid of nunecessarry symbols that are not numbers
// converts to number

// parseInt()
console.log(Number.parseInt('221rem', 10)); // '10' can avoid some bugs
console.log(Number.parseInt('2e1', 10));
console.log(Number.parseInt('e21', 10)); // has to start with number

// parseFloat()
// can read decimals
console.log(Number.parseFloat('2.4rem'));

// isNan()
// to check if something is not a number
console.log(Number.isNaN(23));
console.log(Number.isNaN('23'));
console.log(Number.isNaN(+'23x'));
console.log(Number.isNaN('23x'));
console.log(Number.isNaN(23 / 0));

// isFinite()
// checks if the number is true
// also the best way of checking if it is a number
console.log(Number.isFinite(32));
console.log(Number.isFinite('23'));
console.log(Number.isFinite(5 / 0));
console.log(Number.isFinite(NaN));

// isInteger()
console.log(Number.isInteger(21));
console.log(Number.isInteger(5.5));
console.log(Number.isInteger('5'));
console.log(Number.isInteger(5 / 0));

// TODO: All Methods to Memorize
// parseInt(), parseFloat(), isNan(), isFinite(), isInteger(),

///////////////////////////////
// MATH

// sqrt()
// taking square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

// max() & min()
console.log(Math.max(3, 5, 87, -54));
console.log(Math.max(3, 5, '87', 54));
console.log(Math.min(3, 5, -1, 7, 8));

// math constants
console.log(Math.PI);
console.log(Math.PI * Number.parseFloat('10rem') ** 2);
console.log(Math.trunc(Math.random() * 6 + 1));

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1 + min);

console.log(randomInt(5, 10));

// toFixed()
// it will return string
// parameter shows how many decimal is there

console.log((23).toFixed());
console.log((23).toFixed(1));
console.log((23).toFixed(2));
console.log(Number((123.456).toFixed(0)));
console.log(+(123.456).toFixed(1));
console.log(+(123.456).toFixed(2));

// Remainder operator

const isEven = (num) => (num % 2 === 0 ? 'even num' : 'odd num');
console.log(isEven(4));
console.log(isEven(1));
console.log(isEven(0));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';

    if (i % 3 === 0) row.style.backgroundColor = 'paleturquoise';
  });
});

//////////////////////////////////
// NUMBERIC SEPARATORS

// 2,874,600,000,000
const diameter = 2_874_600_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee1 = 15_00;
const transferFee2 = 1_500;

const PI = 3.1415;
console.log(PI);

console.log(Number('23_000'));
console.log(parseInt('23_000'));

//////////////////////////////////
// BıgInt (big integer)
// can store numbers no matter how big they are
// math methods wont work

console.log(2 ** 53 - 1);
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

console.log(31216231676372327737161233);
console.log(31216231676372327737161233n); // 'n' transforms regular number to BigInt number

console.log(BigInt(343424233333435)); // should be used with small numbers

// Operations
console.log(1000000n + 100000000000000n);

console.log(265473456765435457766456543846538n * 645454964964546454n);

const hugeNum = 4576879887654356879007658476365767n;
const normalNum = 35;
// console.log(hugeNum * normalNum);
console.log(hugeNum * BigInt(normalNum));

console.log(10n === 10);
console.log(10n == 10);
console.log(10n == '10');

console.log(typeof 5n);
console.log(hugeNum + ' is REALLY big!!!');

// Divisions
console.log(10n / 3n); // turn integer number
console.log(10 / 3);

//////////////////////////////////
// DATES

// creating date
const now = new Date();
console.log(now);

console.log(new Date('Sun Jul 14 2024 11:37:16'));
console.log(new Date('December 24, 2012'));
console.log(new Date(account1.movementsDates[0]));
console.log(account1.movementsDates[0]);
const date1 = new Date(account1.movementsDates[0]);
console.log(date1);

// year, month(0 based), day, hour, minute, second
console.log(new Date(2037, 10, 25, 15, 23, 5)); // month is 0 based
console.log(new Date(2037, 10, 41, 15, 23, 5)); // switch to next month if too much day

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // converting from days to miliseconds

// Working with dates & Methods
const future = new Date(2077, 10, 19, 15, 23, 10, 5, 3);
console.log(future);

console.log(future.getFullYear());
console.log(future.getMonth()); // 0 based
console.log(future.getUTCMonth());
console.log(future.getUTCDay());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getUTCHours());
console.log(future.getMinutes());
console.log(future.getUTCMinutes());
console.log(future.getSeconds());
console.log(future.getMilliseconds());

console.log(future.getTime()); // miliseconds that have passed
console.log(new Date(3404550190005));
console.log(future);

// current time stamp
console.log(Date.now());

future.setFullYear(2040);
console.log(future);

future.setHours(21);
future.setSeconds(12);
future.setMonth(11);
console.log(future);


// OPERATIONS WITH DATES
const future1 = new Date(2077, 10, 19, 15, 23, 10, 5, 3);
console.log(future1);
console.log(Number(future1));

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

const days1 = calcDaysPassed(
  new Date(2025, 5, 10, 12, 30, 2),
  new Date(2027, 5, 10, 12, 30, 2)
);
console.log(days1);
// console.log(days1 / (1000 * 60 * 60 * 24 * 365));
// console.log(days1 / (1000 * 60 * 60));

// INTERNATIOLIZING DATAS (INTL)
// making our application support different languages frojm users around the world

const date1 = new Date();
const date2 = new Date(2024, 0, 1, 2, 3, 4, 5);
const date3 = new Date(0);
const date4 = new Date('2024-01-02T15:10:00Z'); // month is not 0 based on string date
const date5 = new Date(1000); // you can pass i a given amount of miliseconds
const date6 = new Date(1261540000000); // 40 years later by 1000*60*60*24*40

console.log(date1);
console.log(date2);
console.log(date3);
console.log(date4);
console.log(date5);
console.log(date6);

const year1 = date6.getFullYear();
const month1 = date6.getMonth();
const day1 = date6.getDate(); // day in month
const day2 = date6.getDay(); // weekday, sunday as 0 monday as 1
const hour1 = date6.getHours();
const minute1 = date6.getMinutes();
const second1 = date6.getSeconds();

console.log(year1);
console.log(month1);
console.log(day1);
console.log(day2);
console.log(hour1);
console.log(minute1);
console.log(second1);

date6.setFullYear(2077);
date6.setMonth(0);
date6.setDate(2);
date6.setHours(19);
date6.setMinutes(3);
date6.setSeconds(2);

console.log(date6);

const date7 = new Date('2023-12-31');
const date8 = new Date('2024-01-01');

if (date8 > date7) {
  console.log('Happy New Year');
}
console.log((date8 - date7) / (1000 * 60 * 60));
console.log((date7 - date8) / (1000 * 60 * 60));

// INTERNATIONALIZING

// TODO:
const options1 = {
  style: 'currency', // unit, percent, currency are all options for style
  unit: 'mile-per-hour',
  unit: 'celsius',
  currency: 'EUR',
  // usegrouping: false,
};

const num = 32686433.41;

console.log('US: ', new Intl.NumberFormat('en-US', options1).format(num));
console.log('US: ', new Intl.NumberFormat('en-US').format(num));
console.log('GER: ', new Intl.NumberFormat('de-DE').format(num));
console.log('SYR: ', new Intl.NumberFormat('ar-SY').format(num));
console.log('SYR: ', new Intl.NumberFormat('ar-SY', options1).format(num));
console.log('BROWSER: ', new Intl.NumberFormat(navigator.language).format(num)); // navigator.language
console.log('UNDEFINDED: ', new Intl.NumberFormat(undefined).format(num)); // navigator.language

// TIMERS

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`pizza delivered with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/
