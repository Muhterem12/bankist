'use strict';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab'); // 3 buttons
const tabsContainer = document.querySelector('.operations__tab-container'); // 3 titles together
const tabsContent = document.querySelectorAll('.operations__content'); // all content

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

/*
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);
*/

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // pageXOffset & pageYOffset
  console.log('Current scroll (X/Y): ', window.pageXOffset, pageYOffset);

  // getting viewport height and width
  console.log(
    'height/width viewport: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  console.log(s1coords);

  // Smooth Scrolling

  //old school way
  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  */
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // modern way
  // scrollIntoView()
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////
// Event Delegation scrolling

// TODO: we simply added one event handler function to the parent element of all the elements that we are interested in
// and determined where the click event came form

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    // getAttribute(att)
    const id = e.target.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

// Tabbed Component

// ////// Bad practice -->
// tabs.forEach((t) =>
//   t.addEventListener('click', () => console.log('tab clicked'))
// );

////// Do this -->
tabsContainer.addEventListener('click', function (e) {
  // null is the result of closest() when there is no matching element to be found
  // Guard clause
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  // Content area
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((cont) =>
    cont.classList.remove('operations__content--active')
  );

  console.log(clicked.dataset.tab);
  // activate tab
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // when adding dont use '.' (dot)
});

// Nav Fade Animation

// for not repeating
const handleHover = function (e, opacity) {
  // e is always the event

  // console.log(this, '-----', e, '-----', e.currentTarget, '---op--', opacity); // value in bind is returned
  if (e.target.classList.contains('nav__link')) {
    // const clicked = e.target;
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // console.log(siblings);
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// mouseover
nav.addEventListener('mouseover', handleHover.bind(0.5)); // bind returns a new function // this value is 0.5
// mouseout
nav.addEventListener('mouseout', handleHover.bind(1));

/*
// Sticky navigation

// console.log(window.scrollY);
// scroll event is not really efficient it should be avoided
// in scroll event event parameter is pretty useless
const initialCoords = section1.getBoundingClientRect();

// you need to select window before scrolling event
window.addEventListener('scroll', function () {
  // console.log(window.scrollY);

  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
});

window.addEventListener('scroll', function () {
  if (window.scrollY < initialCoords.top) nav.classList.remove('sticky');
});
*/
/////////////////////////////////
// Intersectin Observer API

// entries are array of threshold
const obsCallback = function (entries, observer) {
  // entries.forEach((entry) => console.log(entry));
};
const obsOptions = {
  // when null is written we are able to see observe our target element intersecting the entire viewport
  root: null, // root is the element that the target is intersecting
  // threshold: 0.1, // percentage of intersection in which observer callback will be called
  threshold: [0, 0.2], // when array is used function is called multiple times
};

// in IntersectionObserver we have to pass in callback function and object of options
const observer = new IntersectionObserver(obsCallback, obsOptions); // use observer to observe an element

observer.observe(section1); // section1 is the target

// Better Way of Sticky Navigation
const navHeight = nav.getBoundingClientRect().height;

const sticky_nav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting === false) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const header_observer = new IntersectionObserver(sticky_nav, {
  root: null,
  threshold: 0,
  // rootMargin: '-97px', // specifies a margin around the roots intersection area
  rootMargin: `-${navHeight}px`,
});
header_observer.observe(header);

// Revealing Elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // Unobserve
  observer.unobserve(entry.target); // unobserve ends the observing of a specified Element or SVGElement
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // TODO: // PERMANENTLY COMMENT İT OUT
  // section.classList.add('section--hidden');
});

// Load event
// load event
// window.addEventListener('load', () => console.log('whole page is loaded'));

// Lazy Loading Images
const loadImg = function (entries, observer) {
  // console.log(entries);
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Changing the image
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  }); // The load event is fired when the whole page has loaded
};

const imgTargets = document.querySelectorAll('img[data-src'); // selecting all images which have 'data-src'
// console.log(imgTargets);

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

///////////////////////
// TODO: SLIDER COMPONENT

const slides = document.querySelectorAll('.slide'); // all slides individually
const slider = document.querySelector('.slider'); // all slides together
const btnLeft = document.querySelector('.slider__btn--left'); // left btn
const btnRight = document.querySelector('.slider__btn--right'); // right btn
const dotContainer = document.querySelector('.dots'); // contains dots

// slider.style.transform = 'scale(0.4) translateX(-800%)';
// slider.style.overflow = 'visible'; // setting overflow = visible

// Changing slides
let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    // -100% 0% 200% 300%
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Active dot
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach((dot) => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

// next slide

// previous slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Creating dots (inserting to html)
const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class = "dots__dot" data-slide="${i}"></button>`
    );
  });
};

// initializing the page
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();
// Event handlers

btnLeft.addEventListener('click', prevSlide);

// Attaching event hanfler to arrow keys

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

btnRight.addEventListener('click', nextSlide);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    // const { slide } = e.target.dataset.slide; // with destructuring
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

/*
document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  // Mathcking stategy
  if (e.target.classList.contains('nav__link')) console.log('LINK');
});
*/

/////////////////////////////
// LECTURES
/////////////////////////////

/*

// documentElement
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');

// getElementByTagName
const allButtons = document.getElementsByTagName('button'); //
console.log(allButtons);

// getElementsByClassName()
console.log(document.getElementsByClassName('btn'));
console.log(document.querySelectorAll('.btn'));

// createElement()
const message = document.createElement('div');
console.log(message);

// classList
message.classList.add('cookie-message');

// message.textContent =
// 'We use cookies for improved functionality and analytics.';

// innerHTML
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="bnt btn--close-cookie">Got it!</button>';
console.log(message);

// inserting to dom
// prepend() & apend()
header.prepend(message);
// header.append(message);

// cloneNode
// header.append(message.cloneNode(true));

// before && after
header.after(message);
header.before(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    e.preventDefault();

    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// we can see ones that we set on javascript
console.log(message.style.backgroundColor);
console.log(message.style.width);

// cant see
console.log(message.height); // undefined
console.log(message.style.color);
console.log(message.style.alignItems);

// getComputedStyle
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).display);
console.log(getComputedStyle(message).alignItems);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(
  getComputedStyle(message).height,
  10 + 40 + 'px'
);
console.log(getComputedStyle(message).height);

// :root
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes & Custom Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// getAttribute & setAttribute
console.log(logo.getAttribute('designer1'));
logo.setAttribute('company', 'bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// dataset
console.log(logo.dataset.versionNumber); // converting to camelCase

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
console.log(logo.classList.contains('nav__logo')); // Boolean

// logo.className = 'muhterem'; // overwrites all other classes

// EVENTS


// on event properties

h1.onmouseenter = function (e) {
  alert('mouse enter');
};

h1.onmouseleave = function (e) {
  alert('mouse left');
};

h1.onclick = function (e) {
  console.log('Clicked ');
};

// removing event listener

const alertH1 = function (e) {
  alert('mouse is on h1 element');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);


// e.target shows where the event happened
// e.currentTarget shows the element where event handler is attached
// e.currentTarget is same as this keyword

// first the event travels down all the way to the targer and than it bubbles back up
// when true is set element is listening for the event as traavels down to target

// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();

  console.log('LINK ', e.target, e.currentTarget);

  console.log(e.currentTarget === this);

  // stop propagation
  // e.stopPropagation(); // propagation phase never happened for this event
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = 'blue';

  console.log('LINKS', e.target, e.currentTarget);

  console.log(e.currentTarget === this);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV ', e.target, e.currentTarget);

    console.log(e.currentTarget === this);
  },
  false // event is popped when it is going to target thus it will be the first one to appear in console, by default its set to false
);

// Dom Traversing

// Going downwards (child):
console.log(h1.querySelectorAll('.highlight')); // gives node list

console.log(h1.childNodes); // gives nodelist
console.log(h1.children); // gives html collection // more useful than childNodes
h1.firstElementChild.style.color = 'blue';
h1.lastElementChild.style.color = 'black';

// Going upwards (parents):
console.log(h1.parentNode);
console.log(h1.parentElement); // used more but exact same result

// closest(): finding parent element no matter how far it is in DOM tree
h1.closest('.header').style.background = 'var(--gradient-secondary)';
closeModal;

console.log(h1 === h1.closest('h1')); // true

// Going sideways (siblings):
console.log(h1.parentElement);

// returning element
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// returning node
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.nextSibling.nextSibling.nextSibling.nextSibling);

console.log(h1.parentElement.children);
console.log(...h1.parentElement.children);
console.log([...h1.parentElement.children]);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/

// Lifecycle DOM events

// DOMContentLoaded -->
// doesent wait for images to load, just html and javascript shuould be loaded to fire this event
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('hellooo  ', e);
});

// load --> when all page is loaded event is fired
window.addEventListener('load', function (e) {
  console.log('hi niga  ', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log('test');
  e.returnValue = 'no matter what you write same pop-up';
});
