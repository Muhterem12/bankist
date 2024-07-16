// ----- SHORTCUTS TO MEMORIZE ----- //
// command + 'R' --> reloads page

'use strict';

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '❗️' : ''} ${type.replaceAll(
    '_',
    ''
  )} ${getCode(from)}, ${getCode(to)}, (${time.replace(':', 'h')})`.padStart(
    37
  );
  console.log(output);
}

const weekDays1 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  // ESG ENHANCED OBJECT LITERALS
  [weekDays1[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays1[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays1[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

console.log(openingHours);

const restaurant = {
  // numGuests: 21,
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 ENHANCED OBJECT LITERALS

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // ES6 ENHANCED ONJECT LITERALS
  // CREATİNG PROPERTY WİTH VARİABLE NAME !

  openingHours,

  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20.00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicius pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// OPTİONAL CHAİNİNG ?.
console.log('--- OPTIONAL CHAINING ?. ---');

if (restaurant.openingHours.mons) {
  console.log(restaurant.openingHours.mon.open);
}

// with optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);
// if monday doesent exist open will not be read

const weekDays2 = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of weekDays2) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// for methods you write optional chaning between function name and parameters
console.log(restaurant.order?.(2, 0) ?? 'Method doesent exist');
console.log(restaurant.border?.(2, 0) ?? 'Method doesent exist');

// Arrays
const users = [{ name: 'Muhterem', email: 'alkanahmetmuho@gmail.com' }];

// if (users.length > 0) console.log(users[0].name);
// else console.log('user array empty');

console.log(users[0]?.name ?? 'user array empty');

/*
const ingredients = [
  prompt("let's enter ingredient 1"),
  prompt('ingredient 2 ?'),
  prompt('ingreadient 3 ?'),
];
console.log(ingredients);

// Dont do this -->
restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// Do this -->
restaurant.orderPasta(...ingredients);
*/

// Spread operator on objects
const newRestaurant = { foundedIn: 1889, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Zurnaci Baba';
console.log(restaurantCopy.name);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del sole, 21',
  starterIndex: 1,
});

// THE SPREAD OPERATOR '...'
// we use it in places where otherwise we would write values separated by commas

// let arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]]
// INSTEAD DO THIS
let arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(newArr);

// Writing Individual Elements
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Splitting Letters
const str = 'Muhterem';
const strLetters = [...str];
console.log(strLetters);
console.log(strLetters[2]);
console.log(...str);

/*
// DESTRUCTİRİNG OBJECTS

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// use menu = [] to set its value to default (you will not get undefined)
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
// TODO: WRAP İN PARENTHESİS
({ a, b } = obj);
console.log(a, b);

// Nested objects

const { fri } = openingHours;
const {
  fri: { open, close },
} = openingHours;
console.log(fri);
console.log(open, close);

// DESTRUCTIRING ARRAYS //

  // const testArray = [2, 3, 4];
  // const [a, b, c] = testArray;
  // console.log(a, b, c);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// SWİTCHİNG VARİABLES
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// This can be useful
// DESTRUCTIRING İNSİDE DESTRUCTIRING
const [i, , [j, k]] = nested;
console.log(i, j, k);

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/

// REST PATTERNS and PARAMETERS
// rest patttern does the opposite of the spread operator
// spread operator is to unpack an array, while rest is to pack an array
// Spread is on right side while rest is on left side of '='
// rest, collects elements that are unused during the desturcturing process

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(otherFood);

// Objects
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(5, 3, 4, 1);

const x = [35, 21, 17, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'salami', 'olives', 'spinach');
restaurant.orderPizza('sausage');

console.log('--- SHORT CIRCUITNG ---');

// SHORT CIRCUITNG
// LOGICAL OPEARTORS
// '&&' and '||'

// OR OPERATOR
// short circuiting: for 'or' operator it means that if first value is truthy it will be first

console.log('--- OR ---');

console.log(0 || 'muhterem');
console.log(2 || 10);
console.log(null || '' || 0 || 'truthy' || 3);

restaurant.numGuests = 0;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

const guest2 = restaurant.numGuests || 20;
console.log(guest2);

console.log('--- AND ---');

// if the value is truthy evaluation continues
console.log(0 && 'Muhterem');
console.log(7 && 'hii');
console.log(9 && 12 && 'lallal' && undefined && 'HUBDJH');

// Practical example
// we first check if 'orderPizza' exist

/* 
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spinach', 'sausage');
}
*/

// INSTEAD DO THIS

restaurant.orderPizza &&
  restaurant.orderPizza('mushroom', 'spinach', 'sausage');

// NULLISH COALESCİNG OPERATOR '??'
// Or operator consideres 0 as falsy, but there is a solution for that
// It works like or but it fixes that error

const guestCoalescing = restaurant.numGuests ?? 10;
console.log(guestCoalescing);

// LOGICAL ASSIGNMENT OPERATORS

console.log('--- LOGICAL ASSIGNMENT OPERATORS ---');

const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// adding numGuests property to the ones that dont have that
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// console.log(rest1.numGuests, rest2.numGuests);

// Writing the same thing in more concise way
// OR assignment operator // dont use this
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
console.log(rest1.numGuests, rest2.numGuests);

// AND assignment operator // Dont use this
rest2.owner = rest2.owner && 'ANONYMOUS';
rest1.owner = rest1.owner && 'ANONYMOUS';

rest2.owner &&= 'ANONYMOUS';
rest2.owner &&= 'ANONYMOUS';
// what writing 'or' equal does is if the first thing is not true the sexon thing will be active

///////////////////////////////////////
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    tie: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;

const [gk, ...fieldPlayers] = players1;

// const allPlayers = players1.concat(players2);
const allPlayers = [...players1, ...players2];

// const players1Final = players1.push('Thiago', 'Coutinho', 'Perisic');
const players1Final = [...players1, 'Thiago', 'Courhinho', 'Perisic'];
console.log(players1);

// const team1 = game.odds.team1;
// const draw = game.odds.tie;
// const team2 = game.odds.team2;

// TODO:
const {
  odds: { team1, tie: draw, team2 },
} = game;
console.log(team1, draw, team2);

const printGoals = function (...playersScored) {
  console.log(`${playersScored.length}, ${playersScored}`);
};
printGoals('muhterem', 'alkan', 'someone', 'someone2', 'hello');
printGoals(...game.scored);

team1 > team2 && console.log('Team 1 is more likely to win');
team2 > team1 && console.log('Team 2 is more likely to win');

// CHALLANGE OVER

console.log('--- FOR-OF LOOP ---');

// FOR-OF LOOP
// originally for-of loop was meant to give you the current element

const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu1) console.log(item);
// item variable is always the current element in each iteration

// entries, creates array with current elements index number
for (const item of menu1.entries()) {
  console.log(item);
}

/*
for (const item of menu1.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
*/

for (const [i, el] of menu1.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log('--- ENHANCED OBJECT LITERALS ---');
// ENHANCED OBJECT LITERALS
// ES6 introduced 3 ways that makes writing object literals easier

// LOOPING OBJECTS

// looping over property names (keys)
const properties = Object.keys(openingHours);

// for (const something of Object.keys(key))
for (const day of properties) {
  console.log(day);
}

console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
console.log(openStr);

// Property values
const values = Object.values(openingHours);
console.log(...values);

// entries is names plus values together for objects
// for arrays its index and value
// Entire object
const entries = Object.entries(openingHours);
console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

///////////////////////////////////////
// Coding Challenge #2

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2,
//       }

// 1.
for (const [i, playerName] of game.scored.entries()) {
  console.log(`goal ${i + 1}: ${playerName}`);
}

// 2.
let average = 0;
for (const odd of Object.values(game.odds)) {
  average += odd;
}
average / game.odds.length;
console.log(average);

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'tie' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

console.log('--- SETS ---');
// SETS
// set is a collection of unique values
// you cant retrieve values in sets
// sets are iterables meaning that we can loop over them

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);
// checking how many different elements are in there
console.log(ordersSet.size);
// checking if it includes a certain element
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('bread'));
// adding element
ordersSet.add('Garlic Bread');
console.log(ordersSet);
// deleting element
ordersSet.delete('Garlic Bread');
console.log(ordersSet);
// deleting all elements
/*
ordersSet.clear();
console.log(ordersSet);
*/

console.log(new Set('Alkan'));

// looping over sets
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
// const staffUnique = new Set(staff);
console.log(staffUnique);

console.log('--- MAPS ---');
// MAPS
// data structure that we can use to map values into keys
// keys can have any type
const restMap = new Map();
restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');
console.log(restMap.set(2, 'Lisbon, Portugal'));

restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

// 'gap' property
console.log(restMap);
console.log(restMap.get('open'));
console.log(restMap.get('categories'));
console.log(restMap.get(true));

// power of booleans as mapkeys
const time = 10;
console.log(
  restMap.get(time > restMap.get('open') && time < restMap.get('close'))
);

// 'has' property
console.log(restMap.has('categories'));
// deleting property
restMap.delete(2);
console.log(restMap);
// size property
console.log(restMap.size);

const testArr = [1, 2];
restMap.set([1, 2], 'Test');
restMap.set(testArr, 'Test');
console.log(restMap.size);

// this is undefined because what we write and the actual array ([1, 2]) are not the same object in the heap
console.log(restMap.get([1, 2]));
console.log(restMap.get(testArr));

restMap.set(document.querySelector('h1'), 'Heading');
console.log(restMap.get(document.querySelector('h1')));

// Maps: iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);
console.log(question);

// Convert Object to map
// Use this trick whenever you need a map and you already have an object
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// iteration
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}

// const answer = prompt('Your answer');
const answer = 'permanent';
console.log(answer);

console.log(question.get(answer == 3));
// console.log(question.get(true));

// !!! converting map to array
console.log(question);
console.log(...question);
console.log(question.keys);
console.log(question.entries);
console.log(question.values);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2.
gameEvents.delete(64);
console.log(gameEvents);

// 3.
const time1 = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${Math.trunc(
    time1 / gameEvents.size
  )} minutes`
);

// 4.
let half = '';
for (const [key, value] of gameEvents.entries()) {
  key <= 45 ? (half = 'FIRST HALF') : (half = 'SECOND HALF');
  console.log(`[${half}] ${key}: ${value}`);
}

console.log('--- STRINGS ---');
// STRING
// Working with strings

const airline = 'THY Turkish Airlines';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.indexOf('T'));
console.log(airline.lastIndexOf('s'));
console.log(airline.indexOf('s'));
console.log(airline.indexOf('kish'));

console.log(airline.slice(4)); // result doesent change the actual airline
console.log(airline.slice(4, 11));
// Without hard coding

console.log(airline.slice(0, airline.indexOf(' '))); // extracting the first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // the last word
// extracting from the end '-'
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  //  B and E are middle seats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('Middle seat')
    : console.log('Not middle seat');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalization on name
const passenger = 'mUhtEReM';
const passengerLower = passenger.toLowerCase();
const passengerUpper = passenger.toUpperCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

var correctedName = '';
function capitalCorrector(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}
console.log(capitalCorrector('aLkAN'));

// Comparing emails
console.log('Hello \nWorld \n!');

const email = 'hello@muhterem.io';
const loginEmail = ' Hello@Muhterem.io \n';

// const lowerEmail = loginEmail.toLowerCase();
// trim removes whitespaces from the beginning and end of a string
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
// first one is replaces second is what replaces it
// it doesent mutate the original string
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS, priceGB);

const announcement =
  'All passengers come to barding door 23. Boarding door 23!';
// console.log(announcement.replace('door', 'gate').replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

// Booleans
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320'));
console.log(plane1.startsWith('A32'));
console.log(plane1.endsWith('0ne'));

if (plane1.startsWith('Airbus') && plane1.endsWith('neo'))
  console.log("starts with 'AirBus' ends with 'Neo'");

// Practice example
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('you are NOT allowed on plane');
  } else {
    console.log('Welcome!');
  }
};

checkBaggage('I have a laptop, some food and a pocket Knife');
checkBaggage('socks and water bottle');
checkBaggage('me and my homies form al-Qaeda with knife and gun 💣 🥷');

// SPLIT
console.log('a+very+nice+string');
console.log('a+very+nice+string'.split('+'));
console.log('Muhterem Alkan'.split(' '));
const totalNames = 'Muhterem Alkan'.split(' ');

const [firstName2, lastName2] = totalNames;
console.log(firstName2, lastName2);

// JOIN (opposite of split)
// like spread operator takes out values from array
const newName = ['Mr', firstName2, lastName2.toUpperCase()].join(' ');
const newNameSlash = ['Mr', firstName2, lastName2.toUpperCase()].join('/');
console.log(newName);
console.log(newNameSlash);

const capitalizedName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizedName('jessica ann smith davis');
capitalizedName('muhterem alkan');

// Padding
// adding character until string has a desired length
const message = 'Go to gate 23!'; // 14 characters
console.log(message.padStart(16, '+'));
console.log(message.padEnd(20, '+'));
console.log(message.padStart(19, '-').padEnd(24, '-'));

const maskCreditCard = function (number) {
  const str = number + ''; // converting to string because when one is string all will be string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(98764321));
console.log(maskCreditCard(12144787524355452));
console.log(maskCreditCard('41324135151414251543643'));

// Repeat
const message2 = 'Bad weather... All Departues Delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(12);
planesInLine(4);
planesInLine(0);

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  // console.log(text);
  // console.log(rows);

  for (const [i, row] of rows.entries(entries)) {
    const [first, second] = row.toLowerCase().trim().split('_');
    // console.log(first, second);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20, ' ')}${'✅'.repeat(i + 1)}`);
  }
});
