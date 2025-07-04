
"use strict";

const burgers = document.querySelectorAll('.header__burger-menu');

burgers.forEach((burger) => {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        const nav = burger.closest('.header').querySelector('.header__nav');
        nav.classList.toggle('open');
    });
});



new Swiper('.page-home__swiper-container', {
    navigation: {
        nextEl: '.page-home__arrow-next',
        prevEl: '.page-home__arrow-back'
    },
    slidesPerView: 1,
    speed: 1200,
    simulateTouch: false,
    allowMouseEvents: false,
})

new Swiper('.page-services__items', {
    navigation: {
        nextEl: '.page-services__next',
        prevEl: '.page-services__back'
    },
    spaceBetween: 0,
    simulateTouch: false,
    allowMouseEvents: false,
    
    
    breakpoints: {
        650: {
            slidesPerView: 2,
            speed: 1200,
            spaceBetween: 24,
        },
        320: {
            slidesPerView: 1,
            speed: 1200,
            spaceBetween: 24,
        }

    }


})


new Swiper('.page-shippinng__items', {
    navigation: {
        nextEl: '.page-shippinng__next',
        prevEl: '.page-shippinng__back'
    },

    speed: 1000,
    spaceBetween: 24,
    simulateTouch: false,
    allowMouseEvents: false,

    breakpoints: {
        0: {
            slidesPerView: 1.3,
        },
        375: {
            slidesPerView: 2,
        },
        630: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        }
    }
})



function updateContent(screenWidth) {
    const slideTwo = document.querySelector('.slide-two-title');
    const slideFour = document.querySelector('.slide-four-title');

    switch (true) {
        case screenWidth <= 470:
            slideTwo.innerText = "Experienced staff";
            slideFour.innerText = "Negotiation support";

            break;
        case screenWidth <= 991:
            slideTwo.innerText = "Cargo delivery from Japan to France";
            slideFour.innerText = "Professional support in negotiations";

            break;
        default:
            slideTwo.innerText = "Cargo delivery from Japan to France";

            break;
    }
}

window.addEventListener('resize', function () {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    updateContent(screenWidth);
});

updateContent(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);




const mainTitles = document.querySelectorAll('.page-home__title');
const mainParagraphs = document.querySelectorAll('.page-home__paragraph');
const header = document.querySelector('.header');

window.addEventListener('load', () => {
    mainTitles.forEach(title => {
        title.classList.add('active');
    });

    mainParagraphs.forEach(paragraph => {
        paragraph.classList.add('active');
    });

    header.classList.add('active');
});




function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('title');
        }
    });
}









function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('active');
        }
    });
}

let options = {
    threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.title');
let elementsTwo = document.querySelectorAll('.paragraph');

for (let elm of elements) {
    observer.observe(elm);
}
for (let elmTwo of elementsTwo) {
    observer.observe(elmTwo);
}




window.addEventListener('load', () => {
    const loader = document.querySelector('.preloader');
    setTimeout(() => {
        loader.classList.add('active');
    }, 1000);
});



