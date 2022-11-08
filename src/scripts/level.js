const levels = document.querySelector('.choose__level');
let userLevel;

levels.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.tagName.toLowerCase() === 'a') {
        userLevel = target.textContent;
        localStorage.setItem('level', userLevel);
        window.location.href = 'game.html';
    }
});
