const books = [
  {
    // year: '2024',
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],

    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    // keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

const [firstBook, secondBook] = books;
const [, , thirdBook] = books;
console.log(firstBook, secondBook, thirdBook);

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];

const [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
console.log(ratingStars);
console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

// DESTRUCTURİNG OBJECTS

console.log('DESTRUCTURİNG OBJECTS');

const { title, author, ISBN } = books[0];
console.log(title, author, ISBN);

const { keywords: tags } = books[0];
console.log(tags);

const { language, programmingLanguage = 'unknown' } = books[6];

let bookTitle = 'unknown';
let bookAuthor = 'unknown';
({ title: bookTitle, author: bookAuthor } = books[0]);
console.log(bookTitle);

const {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = books[0];
console.log(bookRating);

function printBookInfo({ title, author, year = 'year unknown' }) {
  console.log(`${title} by ${author}, ${year}`);
}
printBookInfo(books[0]);

// spread operator always shows what is in the thing
// SPREAD OPERATOR
const bookAuthors = [...books[0].author, ...books[1].author];
console.log(bookAuthors);
console.log(...books);
console.log(...books[0].author);

function spellWord(word) {
  console.log(...word);
}
const spreadArr1 = [3, 4, 5];
const spreadArr2 = [1, 2, ...spreadArr1];
console.log(spreadArr2);

// REST PATTERN AND PARAMETERS

const [mainKeyword, ...rest] = books[0].keywords;
console.log(mainKeyword, rest);

const { publisher: bookPublisher, ...restOfTheBook } = books[1];
console.log(bookPublisher);
console.log(restOfTheBook);

function printBookAuthorsCount(title, ...authors) {
  console.log(`The book "${title}" has ${authors.length} authors`);
}
printBookAuthorsCount(books[2].title, 'Muhterem', 'Alkan', 'Ahmet');

// SHORT CIRCUITNG
// '&&' and '||'

function hasExamplesInJava(book) {
  return book.programmingLanguage === 'Java' || 'no data available';
}
console.log(hasExamplesInJava(books[0]));

for (let i = 0; i < books.length; i++) {
  books[i].onlineContent &&
    console.log(`"${books[i].title}" provides online content`);
}

for (let i = 0; i < books.length; i++) {
  books[i].onlineContent ??
    console.log(
      `"${books[i].title} provides no data about its online content"`
    );
}

for (let i = 0; i < books.length; i++) {
  // books[i].edition = books[i].edition ?? 1;
  books[i].edition ??= 1;
}

// to get a boolean value you can use bigger or smaller
for (let i = 0; i < books.length; i++) {
  books[i].highlighted &&= !(books[i].thirdParty.goodreads.rating < 4.2);
}

// FOR-0F LOOP

let pageSum = 0;

for (let book of books) {
  pageSum += book.pages;
}
console.log(pageSum);

const allAuthors = [];

for (const book of books) {
  if (typeof book.author === 'string') {
    allAuthors.push(book.author);
  } else {
    for (const author of book.author) {
      allAuthors.push(author);
    }
  }
}

console.log(allAuthors);

for (const [i, author] of allAuthors.entries()) {
  console.log(`${i + 1}. ${author}`);
}

// ENHANCED OBJECT LITERALS

const bookData = [
  ['title', 'Computer Networking: A Top-Down Approach'],
  ['author', ['James F. Kurose', 'Keith W. Ross']],
  ['publisher', 'Addison Wesley'],
];

const newBook = {
  [bookData[0][0]]: bookData[0][1],
  [bookData[1][0]]: bookData[1][1],
  [bookData[2][0]]: bookData[2][1],
};

const pages = 880;

const newBook2 = {
  title: 'The C Programming Language',
  author: ['Brian W. Kernighan', 'Dennis M. Ritchie'],
  pages,
};

function getFirstKeyword(book) {
  console.log(book.keywords?.[0]);
}
getFirstKeyword(books[1]);
/*
// TODO:
console.log('');
// TODO:
// SETS
//
//
//
const allKeywords = [];
console.log(allKeywords);
for (i = 0; i < books.lenght; i++) {
  allKeywords.push(...books[i].keywords);
  console.log(books[i].edition);
}
for (const book of books) {
  allKeywords.push(...book.keywords);
}

console.log(allKeywords);
//
//
//
//
// TODO:
console.log('');
// TODO:
*/

// MAPS
// data structures that we can use to map values into keys
const bookMap = new Map([
  ['title', 'Clean Code'],
  ['author', 'Robert C. Martin'],
]);

bookMap.set('pages', 464);

console.log(`${bookMap.get('title')} by ${'author'}`);
console.log(bookMap.size);

bookMap.set(true, 'The author of the book is known');
console.log(bookMap.get(bookMap.has('author')));

if (bookMap.get('author')) console.log(`Author is ${bookMap.get('author')}`);

// Maps iteration
const firstBookMap = new Map(Object.entries(books[0]));
for (const [key, value] of firstBookMap)
  typeof value === 'number' && console.log(value);

// STRINGS

console.log(books[0].ISBN);
console.log(
  books[0].ISBN['4'],
  books[0].ISBN['6'],
  books[0].ISBN['8'],
  books[0].ISBN['9']
);

const quote =
  'A computer once beat me at chess, but it was no match for me at kick boxing';
console.log(quote.indexOf('chess'));
console.log(quote.slice(quote.lastIndexOf(' ') + 1));

function isContributor(author) {
  console.log(author.slice(author.lastIndexOf(' ') + 1) === '(Contributor)');
}

isContributor(books[1].author[2]);

function normalizeAuthorName(authorName) {
  authorName = authorName.trim();
  const firstName1 = authorName.slice(0, authorName.indexOf(' '));
  let lastName2 = '';
  // if (authorName.slice(authorName.lastIndexOf(' ') + 1 === '(Contributor)')) {
  //   lastName2 = authorName.slice(
  //     authorName.indexOf(' ') + 1,
  //     authorName.lastIndexOf(' ')
  //   );
  // }
  var true1 = '';
  if (authorName.indexOf(' ') === authorName.lastIndexOf(' ')) {
    lastName2 = authorName.slice(
      authorName.indexOf(' ') + 1,
      authorName.length
    );
  } else {
    lastName2 = authorName.slice(
      authorName.indexOf(' ') + 1,
      authorName.lastIndexOf(' ')
    );
  }

  const capitalizedFirstName =
    firstName1[0].toUpperCase() + firstName1.slice(1).toLowerCase();
  const capitalizedLastName =
    lastName2[0].toUpperCase() + lastName2.slice(1).toLowerCase();

  return capitalizedFirstName + ' ' + capitalizedLastName;
  return true1;
}
console.log(normalizeAuthorName('   jUliE sussMan (Contributor)'));
console.log(normalizeAuthorName('hello my name is Muhterem'));

const newBookTitle = books[1].title.replace('Programs', 'Software');
console.log(newBookTitle);

function logBookTheme(title) {
  title = title.toLowerCase();

  if (title.startsWith('computer')) {
    console.log('This book is about computers');
  } else if (title.includes('algorithm') && title.includes('structures')) {
    console.log('This book is about algorithms and data structures');
  } else if (
    title.endsWith('system') ||
    (title.endsWith('systems') && !title.includes('operating'))
  ) {
    console.log(
      'This book is about some systems, but definetely not about operating systems'
    );
  }
}

logBookTheme(books[2].title);

function logBookCategories(str) {
  const categories = str.split(';');
  console.log(categories);

  for (let category of categories) {
    console.log(category);
  }
}

const bookCategories =
  'science;computing;computer science;algorithms;business;operating systems;networking;electronics';
logBookCategories(bookCategories);

function getKeywordsAsString(books) {
  const keywords = [];
  console.log(keywords);
}
