import './variables';
import { cards } from './cards';
import { init } from './timer';
import { screenResult } from './result';
import { stopTimer } from './timer';
import { finalTime } from './timer';
import { levelScreen } from './levelScreen';

export function gameScreen(app) {
    app.textContent = '';

    const header = document.createElement('div');
    header.classList.add('header');
    const timer = document.createElement('div');
    timer.classList.add('timer');
    const timerNaming = document.createElement('div');
    timerNaming.classList.add('timer__naming');
    const timerNameMin = document.createElement('p');
    timerNameMin.classList.add('timer__name', 'timer__name_min');
    timerNameMin.textContent = 'min';
    const timerNameSek = document.createElement('p');
    timerNameSek.classList.add('timer__name', 'timer__name_sek');
    timerNameSek.textContent = 'sek';
    timerNaming.appendChild(timerNameMin);
    timerNaming.appendChild(timerNameSek);
    const timerTime = document.createElement('p');
    timerTime.classList.add('timer__time');
    timerTime.setAttribute('id', 'time');
    timerTime.textContent = '00.00';
    timer.appendChild(timerNaming);
    timer.appendChild(timerTime);
    const headerBtn = document.createElement('button');
    headerBtn.classList.add('header__btn');
    headerBtn.textContent = 'Начать заново';
    header.appendChild(timer);
    header.appendChild(headerBtn);
    app.appendChild(header);

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
    let cardsForLevel = [];
    let cardsResult = [];
    let cardsFinally = [];
    const cards = [
        'spades_A',
        'spades_K',
        'spades_Q',
        'spades_J',
        'spades_10',
        'spades_9',
        'spades_8',
        'spades_7',
        'spades_6',
        'hearts_A',
        'hearts_K',
        'hearts_Q',
        'hearts_J',
        'hearts_10',
        'hearts_9',
        'hearts_8',
        'hearts_7',
        'hearts_6',
        'diamonds_A',
        'diamonds_K',
        'diamonds_Q',
        'diamonds_J',
        'diamonds_10',
        'diamonds_9',
        'diamonds_8',
        'diamonds_7',
        'diamonds_6',
        'clubs_A',
        'clubs_K',
        'clubs_Q',
        'clubs_J',
        'clubs_10',
        'clubs_9',
        'clubs_8',
        'clubs_7',
        'clubs_6',
    ];

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    shuffle(cards);

    let currentArrayOfCards = document.querySelectorAll('.card__field_card');

    cardsForLevel = randomArray(cards, numCards / 2);

    cardsResult = [...cardsForLevel, ...cardsForLevel];

    console.log(cardsResult);

    cardsFinally = cardsResult.sort(() => Math.random() - 0.5);

    console.log(cardsFinally);

    const imagesFront = document.querySelectorAll('.image_front');
    const imagesBack = document.querySelectorAll('.image_back');

    for (let index = 0; index < cardsFinally.length; index++) {
        imagesFront.forEach((image: any) => {
            image.setAttribute('data-card', cardsFinally[index++]);
            let data = image.dataset;
            image.setAttribute('src', `static/image/${String(data.card)}.png`);
        });
    }

    let timerId = setTimeout(() => {
        showAll();
    }, 0);
    setTimeout(() => {
        clearTimeout(timerId), hide(), cleanArray(), init();
    }, 5000);

    function cleanArray() {
        numCards = 0;
        cardsForLevel = [];
        cardsResult = [];
        cardsFinally = [];
    }

    function showAll() {
        imagesFront.forEach((image: any) => {
            image.style.visibility = 'visible';
        });
    }

    function hide() {
        imagesFront.forEach((image: any) => {
            //image.style.transform = 'rotateY(3.142rad)';
            image.style.visibility = 'hidden';
        });
    }

    function randomArray(arr: any, len: number) {
        arr.sort(function () {
            return Math.random() > 0.5;
        });

        arr.length = len;

        return arr;
    }

    currentArrayOfCards.forEach((test) => {
        test.addEventListener('onclick', () => {});
    });

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let listener = function (event) {
        let target = event.target;
        console.dir(target);
        if (lockBoard) return;
        if (target === firstCard) return;
        target.classList.add('flip');
        target.nextElementSibling.style.visibility = 'visible';
        //target.nextElementSibling.style.transform = 'rotateY(3.142rad)';

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

    currentArrayOfCards.forEach((test) => {
        test?.addEventListener('click', listener);
    });

    headerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        stopTimer();
        const app = document.querySelector('.app');
        levelScreen(app);
    });

    function checkForMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            console.log(firstCard.dataset.card);
            console.log(secondCard.dataset.card);
            disableCards();
            if (Array.from(imagesBack).every((elem) => elem.classList.contains('flip'))) {
                stopTimer();
                let gameStatus = 'win';
                screenResult(gameStatus, finalTime);
            }
            return;
        } else {
            stopTimer();
            let gameStatus = 'lose';
            screenResult(gameStatus, finalTime);
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
}
