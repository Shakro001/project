
'use strict';


const burgerElement = document.querySelector('.header__burger')
burgerElement.classList.remove('active')
burgerElement.addEventListener('click', burger)
function burger(event) {
    burgerElement.classList.toggle('active')
    document.querySelector('.menu').classList.toggle('open')
}




function handleButtonClick(buttons, itemsNftAnim, itemNftAnim) {
    itemsNftAnim.classList.add('active');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            itemsNftAnim.classList.toggle('active');

            for (let i = 0; i < itemNftAnim.length; i++) {
                itemNftAnim[i].style.transition = `all 2s ${0.2 * i - 1 + 0.8}s`;

                if (itemsNftAnim.classList.contains('active')) {
                    itemNftAnim[i].style.transition = `all 0.01s`;
                } else {
                    const buttonMar = document.querySelector('.page-fourth__button--vision')
                    buttonMar.style.marginTop = '35px'
                }
            }
        });
    });
}

const seeAllButtons = document.querySelectorAll('.page-two__button');
const itemsNftAnim = document.querySelector('.page-two__items');
const itemNftAnim = document.querySelectorAll('.page-two__item');
handleButtonClick(seeAllButtons, itemsNftAnim, itemNftAnim);

const seeAllButtonsTwo = document.querySelectorAll('.page-fourth__button');
const itemsNftAnimTwo = document.querySelector('.page-fourth__items');
const itemNftAnimTwo = document.querySelectorAll('.page-fourth__item');
handleButtonClick(seeAllButtonsTwo, itemsNftAnimTwo, itemNftAnimTwo);



function validateForm() {
    const emailInput = document.getElementById('emailForm');
    const falseMenu = document.querySelector('.form-accept-menu__false');
    const trueMenu = document.querySelector('.form-accept-menu__true');
    const ButtonForm = document.querySelectorAll('.page-fifth__button');

    falseMenu.classList.add('active');
    trueMenu.classList.add('active');

    ButtonForm.forEach(button => {
        button.addEventListener('click', function (event) {
            const emailValue = emailInput.value;
            event.preventDefault();

            if (!emailValue.includes("@gmail.com")) {
                falseMenu.classList.remove('active');
                setTimeout(function () {
                    falseMenu.classList.add('active')
                }, 4000);
            } else {
                trueMenu.classList.remove('active');
                setTimeout(function () {
                    trueMenu.classList.add('active')

                }, 4000);
                setTimeout(function () {
                    const form = document.querySelector('form');
                    form.submit();
                }, 0.5);
            }
        });
    });
}

validateForm();





function adaptiveMove() {
    const leftContent = document.querySelector('.page-fifth__left-content');
    const rightContent = document.querySelector('.page-fifth__right-content');
    const pageFifth = document.querySelector('.page-fifth');

    window.addEventListener('resize', () => {
        const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewportWidth < 1273) {

            if (!rightContent.classList.contains('moove')) {
                pageFifth.insertBefore(rightContent, leftContent);
                rightContent.classList.add('moove');
            }
        } else {
            if (rightContent.classList.contains('moove')) {
                pageFifth.insertBefore(rightContent, leftContent.nextSibling);
                rightContent.classList.remove('moove');
            }
        }
    });
}

adaptiveMove();





function scroll() {
    const scrollButton = document.querySelector('.page-one__learn-button')
    scrollButton.addEventListener('click', () => {
        const scrollTo = document.querySelector('.page-two__items')
        scrollTo.scrollIntoView({
            block: "center",
            behavior: "smooth"
        })

    })
}

scroll()


function loader(){
    window.addEventListener('load', ()=>{
        const loaderAnim = document.querySelector('.preloader')
        setTimeout(()=>{
          loaderAnim.classList.add('preloader--visibly')  
        }, 1000);
        
    })
}
loader()

