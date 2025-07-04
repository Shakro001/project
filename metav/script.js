"use strict";

function header() {
  const burger = document.querySelector('.header__burger');
  const headerMenu = document.querySelector('.header__nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    headerMenu.classList.toggle('active');

  
    if (headerMenu.classList.contains('active')) {

      window.addEventListener('scroll', preventScroll);
    } else {

      window.removeEventListener('scroll', preventScroll);
    }
  });

  function preventScroll() {
    window.scrollTo({ top: 0 });
  }
}

header();

new Swiper('.page-video__items', {

  slidesPerView: 1,
  spaceBetween: 54,
  speed: 1200,
  // breakpoints: {
  // },

})

window.onload = function () {
  const parallax = document.querySelector('.paralax')
  if (parallax) {
    const forImg = 40;
    const speed = 0.05;
    let positionX = 0, positionY = 0;
    let coordXprocent = 0, coordYprocent = 0;
    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + (distX * speed)
      positionY = positionY + (distY * speed)
      parallax.style.cssText = `transform: translate(${positionX / forImg}%,${positionY / forImg}%);`;

      requestAnimationFrame(setMouseParallaxStyle)
    }
    setMouseParallaxStyle();

    parallax.addEventListener('mousemove', (e) => {
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      coordXprocent = coordX / parallaxWidth * 100;
      coordYprocent = coordY / parallaxHeight * 100;
    })


  }

}


const time = 1500;
const step = 2;

function outNum(num, elem) {
  let l = document.querySelector('.' + elem,);
  let n = 0;
  let t = Math.round(time / (num / step));
  let interval;

  function updateNumber() {
    if (n < num) {
      n += step;
      l.innerHTML = n - 1;
      setTimeout(updateNumber, t);
    }
  }

  updateNumber();
}

outNum(15, 'page-home__num--zero');
outNum(41, 'page-home__num--one');
outNum(29, 'page-home__num--two');


function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('vis');
    }
  });
}

let options = {
  threshold: [0.1]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.header__container');
let page = document.querySelectorAll('.page-home__right-content');
let titleHome = document.querySelectorAll('.page-home__title');
let about = document.querySelectorAll('.page-about');
let text = document.querySelectorAll('.page-func__text');
let func = document.querySelectorAll('.page-func__items');
let videoText = document.querySelectorAll('.page-video__text');
let video = document.querySelectorAll('.page-video__items');


for (let elm of elements) {
  observer.observe(elm);
}
for (let elm of page) {
  observer.observe(elm);
}
for (let elm of titleHome) {
  observer.observe(elm);
}
for (let elm of about) {
  observer.observe(elm);
}
for (let elm of text) {
  observer.observe(elm);
}
for (let elm of func) {
  observer.observe(elm);
}
for (let elm of videoText) {
  observer.observe(elm);
}
for (let elm of video) {
  observer.observe(elm);
}


