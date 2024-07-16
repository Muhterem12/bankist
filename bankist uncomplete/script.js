// null: value that is intentionally empty
// undefined: no value assigned
('use strict');
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// Data
const account1 = {
  owner: 'Muhterem Alkan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
('');
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

// insertadjacentHTML()
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  // we create a copy by using the slice method
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  if (sort === true) {
    console.log('sort is true');
  }

  movs.forEach(function (mov, i, arr) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// console.log(containerMovements.innerHTML);

const user = 'Steven Thomas Williams'; // stw

// taking the first letters
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    // creating new property name on object
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
    // return acc.username;
  });

  // const username = user
  //   .toLowerCase()
  //   .split(' ')
  //   .map(function (name) {
  //     return name[0];
  //   })
  //   .join(' ');
  // return username;
};
createUserNames(accounts);
// console.log(accounts);

const calcDisplayBalance = function (account) {
  const balance1 = account.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${balance1}€`;
  account.balance = balance1;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(`${int} --- ${i} --- ${arr}`);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Maximum value
const max = movements.reduce(function (acc, mov) {
  if (mov > acc) {
    acc = mov;
  }
  return acc;
}, 0);

// Event Handler
let currentAccount;

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // prevent refreshing page (dont skip this step)

  currentAccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  // thanks to optional chaning this will be read only if currentAccount exist
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('password verified');

    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginPin.value = inputLoginUsername.value = '';

    // Update UI
    updateUI(currentAccount);
  } else {
    alert('Wrong password or username try again');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov * 0.1 >= amount)
  ) {
    // Add amount
    console.log('✅');

    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  // inputLoanAmount.value = '';
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // this is pretty common thing to do it prevents reloading the page

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(receiverAcc);
  console.log(amount);
  console.log(currentAccount);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc && // brilliant idea
    (currentAccount.balance >= amount) &
      (receiverAcc?.username !== currentAccount.username)
  ) {
    console.log('transfer valid');

    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*// LECTURES
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


/////////////////////////////////////////////////

// ARRAY METHODS

let arr = ['a', 'b', 'c', 'd', 'e', 'f'];

console.log(arr.slice(2)); // extracting all the way to the end
console.log(arr.slice(2, 5)); // sexon one is not included
console.log(arr.slice(-1)); // last element
console.log(arr.slice(-3)); // from the end of the array
console.log(arr.slice(1, -2));
console.log(arr.slice()); // creating copy
console.log([...arr]); // creating copy

// SPLICE
// works same way as slice but it mutates and changes array
// second one is the number of elements this time !
console.log('original array', arr);
console.log(arr.splice(1, 2)); // cuts out certain part
console.log('original array', arr);

// REVERSE
// mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2); // mutated arr2

// CONCAT
// concatinating 2 array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

// we already know 'push', 'shift', 'unshift', 'pop', 'ındexOf', 'includes'

// AT
// useful for getting the last element and method chaning

const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// traditional ways of getting the last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);

// with at method
console.log(arr3.at(-1)); // that easy
console.log(arr3.at(-2));

console.log('muhterem'.at(2));
console.log('muhterem'.at(-1));

// LOOPING OVER ARRAYS
// FOR EACH LOOP

const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements1.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1} You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
  }
}

// same thing with for each method
// order matter
console.log('--------- FOR EACH ----------');
movements1.forEach(function (mov, i, array) {
  if (mov > 0) {
    console.log(`mov ${i + 1} You deposited ${mov} ---> ${array}`);
  } else {
    console.log(`mov ${i + 1} You withdrew ${Math.abs(mov)} ---> ${array}`);
  }
});

// for each is also available with maps and sets
const currencies1 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies1.forEach(function (value, key, map) {
  console.log(`${key}: ${value} `);
});

let numbers1 = [1, 2, 3, 4, 5];

numbers1.forEach(double1);
numbers1.forEach(display1);

function display1(element) {
  console.log(element);
}

function double1(element, index, array) {
  array[index] = element * 2;
}

// Set
const currenciesUnique = new Set(['USD', 'GBD', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});


function checkDogs(arr) {
  arr.forEach(function (val, i, array) {
    const logger =
      val < 3
        ? `Dog number ${i + 1} is a puppy, and is ${val} years old`
        : `Dog number ${i + 1} is still a puppy `;
    console.log(logger);
  });
}

checkDogs(combinedArray);

// MAP METHOD
// returns a new array, doesent mutate real array

const eurToUsd = 1.5;

// const usdMap = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// with arrow function
// note: no need for 'return' in arrow function
const usdMap = movements.map((mov) => mov * eurToUsd);

console.log(movements);
console.log(usdMap);

const usdForEach = [];
// same thing with for of loop
for (const curr of movements) {
  usdForEach.push(curr * eurToUsd);
}

console.log(usdForEach);

const movementDesc = movements.map(function (mov, i, arr) {
  if (mov > 0) {
    return `Movement ${i + 1} You deposited ${mov}`;
  } else {
    return `Movement ${i + 1} You withdrew ${Math.abs(mov)}`;
  }
});

console.log(movementDesc);

// FILTER METHOD
// filters the input and gives filtered output

// filtering out negative values
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const withDrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withDrawals);

// REDUCE METHOD
// first one accumulates the value that we ultimately want
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 100); // start adding at '100'
console.log(balance);


// FIND METHOD
// it loops over the array
// returns first element in an array that satisfies this condition
// filter returns all elements that match the condition while find only returns the first one
// find only returns the element itself

const firstWithdrawal = movements.find(mov => mov < 0); // result is either true or false

// this is really powerful
const account = accounts.find(acc => acc.owner === 'Jessica Davis');

// SOME METHOD
// gives boolean value if elements meets conditions provided
// its like includes method but it checks for condition
// when we hear word 'any' its probably a good usecase for some method

console.log(movements.some((mov) => mov > 2000));


// EVERY METHOD
// returns true if all elements passes test
console.log(movements.every((mov) => mov > 0));
console.log(account2.movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));


// FLAT
// goes one level deep
// removing nested arrays and flatting
// what you write as argument is depth

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
const accountMovements = accounts.map((acc) => acc.movements);

console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);

console.log(arr.flat());
console.log(arrDeep.flat()); // still contains inner arrays
console.log(arrDeep.flat(1));
console.log(arrDeep.flat(2));

// FLATMAP
// combines map and flat method into one method
// map method but in the and it flattens the result

const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

const overalBalance1 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance1);

// SORT METHOD
// mutates original array
// sorts in lexicographic order

// String
const owners = ['Muhterem', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);
// console.log(movements.sort());

// a - b gives ascending array
// b - a gives descending array

movements.sort((a, b) => b - a);
console.log(movements);

// FILL METHOD

console.log(new Array([1, 2, 3, 4, 5, 6]));
console.log(new Array(1, 2, 3, 4, 5, 6));

const x = new Array(6);
console.log(x);

x.fill(1);
console.log(x);

const y = new Array(9);
y.fill(2, 4); // second parameter is where it starts
console.log(y);

const z = new Array(11);
z.fill(3, 3, 10); // 3rd parameter is where it will start to be empty
console.log(z);

x.fill(4);
console.log(x);

const alpha = new Array(10);
alpha.fill(5, 3, 8);
console.log(alpha);

// ARRAY.FROM METHOD
const pi = Array.from({ length: 6 }, () => 1);
console.log(pi);

const pi1 = Array.from({ length: 5 }, () => 4);
console.log(pi1);

const z1 = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(z1);

const randomDice = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(randomDice);

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (el) => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);
});
*/
/*
//////////////////////////////////
// Array Methods Practice

// 1.
// const bankDepositSum = accounts.map((acc) => acc.movements).flat();
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDepositSum);

// 2.

const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov >= 1000).length;

console.log(numDeposit1000);

// same thing using reduce
const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposit1000);

// ++ operator to left
let a = 3;
console.log(++a);

// TODO:  Important and new concept allert !!!
// making an object
// 3.
const { withdrawals, deposits } = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title => This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const capitalize = (word) =>
    word[0].toUpperCase() + word.slice(1).toLowerCase();

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return titleCase;
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('This is a LONG title'));
console.log(
  convertTitleCase('hello this is an apple but on it u can see lalalalalla')
);

*/

///////////////////////////////////////
// Coding Challenge #1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
/*
console.log('--- CHALLENGE ---');

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

// Using splice to create a new array
const newJulia = dogsJulia.slice(2, -1);
// elements in splice are cut out in this case the one before the last one and 3rd one is used

console.log(newJulia); // Output: [2, 12]

const combinedArray = [...newJulia, ...dogsKate];
console.log(combinedArray);

///////////////////////////////////////
// Coding Challenge #2

console.log('--- CHALLENGE 2 ---');

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(function (age) {
    if (age <= 2) {
      return 2 * age;
    } else {
      return 16 + age * 4;
  }
});
const adultDogs = humanAges.filter(function (age) {
  return age > 18;
});
console.log('dogs: ', humanAges);
console.log('adult dogs: ', adultDogs);

const average = adultDogs.reduce(function (acc, age) {
  return acc + age / adultDogs.length;
}, 0);

console.log(average);
};

calcAverageHumanAge([5, 6, 2, 1, 3, 0, 11]);

// USING ALL THEM TOGETHER
const eurToUsd1 = 1.1;
const totalDepositsUSD = movements
.filter((mov) => mov > 0)
.map((mov) => mov * eurToUsd1)
.reduce((acc, mov) => acc + mov);
console.log(totalDepositsUSD);

///////////////////////////////////////
// Coding Challenge #3

const calcAverageHumanAge1 = function (ages) {
  const humanAges1 = ages
  .map((age) => (age <= 2 ? 2 * age : 16 + 4 * age))
  .filter((age) => age > 18)
  // .reduce((acc, age, i, arr) => (acc + age) / arr.length, 0);
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAges1);
};

calcAverageHumanAge1([5, 6, 2, 1, 3, 0, 11]);
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 280, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 215, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach((dog) => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// 2.
const dogSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarahs dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } food`
);

// 3.
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recFood)
  .flatMap((obj) => obj.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recFood)
  .flatMap((obj) => obj.owners);
console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much !`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little !`);

// 5.
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 6.
console.log(
  dogs.some(
    (dog) => dog.recFood * 1.1 > dog.curFood && dog.recFood * 0.9 < dog.curFood
  )
);

// 7.
const eatingOk = dogs.filter(
  (dog) => dog.recFood * 1.1 > dog.curFood && dog.recFood * 0.9 < dog.curFood
);
console.log(eatingOk);

// 8.
const numbers = [11, 2, 12, 8, 7];
console.log(numbers.sort((a, b) => b - a));

// use slice() method to avoid chancing the original array
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
