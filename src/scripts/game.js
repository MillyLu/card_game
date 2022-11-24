import { cards } from './cards.js';
import './variables.js';
import './level.js';

import '../style/style.css';
export * from './game.js';

console.log('!!!!');
const app = document.querySelector('.app');
app.textContent = '';
const cardField = document.createElement('div');
cardField.classList.add('card__field');

let fragment = document.createDocumentFragment();
let numCards;
if (window.localStorage.level === '1') {
    numCards = 12;
} else if (window.localStorage.level === '2') {
    numCards = 24;
} else if (window.localStorage.level === '3') {
    numCards = 36;
}

//let card, imageBack, imageFront, imagesBack, imagesFront, cards;

for (let i = 0; i < numCards; i++) {
    const card = document.createElement('div');
    card.classList.add('card__field_card');
    const imageBack = document.createElement('img');
    imageBack.classList.add('image_back');
    imageBack.setAttribute('src', 'static/image/рубашка.png');
    const imageFront = document.createElement('img');
    imageFront.classList.add('image_front');
    card.appendChild(imageBack);
    card.appendChild(imageFront);
    fragment.appendChild(card);
}

cardField.appendChild(fragment);
app.appendChild(cardField);

let tests = document.querySelectorAll('.card__field_card');

let cardsForLevel = randomArray(cards, numCards / 2);

let cardsResult = [...cardsForLevel, ...cardsForLevel];

console.log(cardsResult);

let cardsFinally = cardsResult.sort(() => Math.random() - 0.5);

console.log(cardsFinally);

const imagesFront = document.querySelectorAll('.image_front');
const imagesBack = document.querySelectorAll('.image_back');

for (let index = 0; index < cardsFinally.length; index++) {
    imagesFront.forEach((image) => {
        image.setAttribute('data-card', cardsFinally[index++]);
        let data = image.dataset;
        image.setAttribute('src', `static/image/${String(data.card)}.png`);
    });
}

window.addEventListener('load', () => {
    let timerId = setTimeout(() => {
        showAll();
    }, 0);
    setTimeout(() => {
        clearTimeout(timerId), hide();
    }, 5000);
});

function showAll() {
    imagesFront.forEach((image) => {
        image.style.visibility = 'visible';
    });
}

function hide() {
    imagesFront.forEach((image) => {
        image.style.transform = 'rotateY(3.142rad)';
        image.style.visibility = 'hidden';
    });
}

function randomArray(arr, len) {
    arr.sort(function () {
        return Math.random() > 0.5;
    });

    arr.length = len;

    return arr;
}

tests.forEach((test) => {
    test.addEventListener('onclick', () => {});
});

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let listener = function (event) {
    let target = event.target;
    console.dir(target);
    if (lockBoard) return;
    if (this === firstCard) return;
    target.classList.add('flip');
    target.nextElementSibling.style.visibility = 'visible';
    target.nextElementSibling.style.transform = 'rotateY(3.142rad)';

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = target.nextElementSibling;
        return;
    }

    if (firstCard !== 'undefined') {
        secondCard = target.nextElementSibling;
        console.log(firstCard.dataset.card);
        console.log(secondCard.dataset.card);
        checkForMatch();
        return;
    }
};

tests.forEach((test) => {
    test.addEventListener('click', listener);
});

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        console.log(firstCard.dataset.card);
        console.log(secondCard.dataset.card);
        disableCards();
        if (Array.from(imagesBack).every((elem) => elem.classList.contains('flip'))) {
            alert('Вы выиграли!');
        }
        return;
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', listener);
    secondCard.removeEventListener('click', listener);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.previousElementSibling.classList.remove('flip');
        firstCard.style.visibility = 'hidden';
        secondCard.previousElementSibling.classList.remove('flip');
        secondCard.style.visibility = 'hidden';
        lockBoard = false;
        lockBoard = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [undefined, undefined];
}
