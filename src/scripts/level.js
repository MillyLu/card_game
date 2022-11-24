import './variables.js';
import '../style/style.css';
import { levelScreen } from './levelScreen.js';
//import { gameScreen } from './gameScreen.js';

//export const levels = document.querySelector('.choose__level');
//export const button = document.querySelector('.choose__btn');

export const app = document.querySelector('.app');

levelScreen(app);

/*levels.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    if (target.tagName.toLowerCase() === 'a') {
        console.log(target);
        userLevel = target.textContent;
        localStorage.setItem('level', userLevel);
        window.location.href = 'game.html';
    }
});
button.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'game.html';
});

import './game.js';*/
