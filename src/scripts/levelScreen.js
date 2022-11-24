//import { app } from './level';
import './variables.js';
import { gameScreen } from './gameScreen.js';

export let userLevel;
export function levelScreen(app) {
    app.textContent = '';
    const choose = document.createElement('div');
    choose.classList.add('choose');
    const chooseTitle = document.createElement('h2');
    chooseTitle.classList.add('choose__title');
    chooseTitle.textContent = 'Выбери сложность';
    const chooseLevel = document.createElement('div');
    chooseLevel.classList.add('choose__level');
    const chooseLevel1 = document.createElement('a');
    chooseLevel1.classList.add('choose__level_1', 'level');
    chooseLevel1.textContent = '1';
    const chooseLevel2 = document.createElement('a');
    chooseLevel2.classList.add('choose__level_2', 'level');
    chooseLevel2.textContent = '2';
    const chooseLevel3 = document.createElement('a');
    chooseLevel3.classList.add('choose__level_3', 'level');
    chooseLevel3.textContent = '3';
    chooseLevel.appendChild(chooseLevel1);
    chooseLevel.appendChild(chooseLevel2);
    chooseLevel.appendChild(chooseLevel3);
    const button = document.createElement('button');
    button.classList.add('choose__btn');
    button.textContent = 'Старт';
    choose.appendChild(chooseTitle);
    choose.appendChild(chooseLevel);
    choose.appendChild(button);
    app.appendChild(choose);

    const levels = document.querySelectorAll('.level');
    levels.forEach((level) => {
        level.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;
            userLevel = target.textContent;
            localStorage.setItem('level', userLevel);
            gameScreen(app);
        });
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'game.html';
    });
}
