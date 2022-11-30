let seconds: number = 0;
let minutes: number = 0;
export let finalTime: string;
let timerID: any;

export function init() {
    timer();
}

function tick() {
    seconds++;
    if (seconds >= 60) {
        minutes++;
        seconds = seconds - 60;
    }
}
function add() {
    tick();
    let time: any = document.getElementById('time');
    time.textContent = (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds);
    timer();
}

function timer() {
    timerID = setTimeout(add, 1000);
}

export const stopTimer = () => {
    let time: any = document.getElementById('time');
    time.textContent = '00:00';
    clearTimeout(timerID);
    finalTime = (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds);
    seconds = 0;
    minutes = 0;
    return finalTime;
};
