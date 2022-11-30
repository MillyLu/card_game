import { levelScreen } from './levelScreen';

export function screenResult(gameStatus: string, finalTime: string) {
    const app = document.querySelector('.app');
    const container = document.querySelector('.container');
    const opacity = document.createElement('div');
    opacity.classList.add('opacity');

    const result = document.createElement('div');
    result.classList.add('result');
    const resultImage = document.createElement('img');
    resultImage.classList.add('result__img');
    const resultTitle = document.createElement('h2');
    if (gameStatus === 'win') {
        resultImage.setAttribute('src', `static/image/win.png`);
        resultTitle.classList.add('result__title', 'result__title_win');
        resultTitle.textContent = 'Вы выиграли!';
    } else {
        resultImage.setAttribute('src', `static/image/lose.png`);
        resultTitle.classList.add('result__title', 'result__title_lose');
        resultTitle.textContent = 'Вы проиграли!';
    }
    const resultTime = document.createElement('p');
    resultTime.classList.add('result__time');
    resultTime.textContent = 'Затраченное время';
    const resultTimer = document.createElement('h2');
    resultTimer.classList.add('result__timer');
    resultTimer.textContent = finalTime;
    const resultButton = document.createElement('button');
    resultButton.classList.add('result__button');
    resultButton.textContent = 'Играть снова';
    result.appendChild(resultImage);
    result.appendChild(resultTitle);
    result.appendChild(resultTime);
    result.appendChild(resultTimer);
    result.appendChild(resultButton);
    container?.appendChild(opacity);
    app?.appendChild(result);

    //const buttonAgain = document.querySelector('.button');
    resultButton.addEventListener('click', (e) => {
        e.preventDefault();
        opacity.classList.add('hidden');
        const app = document.querySelector('.app');
        levelScreen(app);
    });
}
