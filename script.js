// declaring and initializing variables that link to all the buttons
const studyIncreaseBtn = document.querySelector('#more-study');
const studyDecreaseBtn = document.querySelector('#less-study');
const breakIncreaseBtn = document.querySelector('#more-break');
const breakDecreaseBtn = document.querySelector('#less-break');
const playBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');

// declaring and initializing variables that link to all times
let studyTime = document.querySelector('#change-study');
let breakTime = document.querySelector('#change-break');
let timerTime = document.querySelector('#time');

let minutesStudy = 25;
let secondsStudy = minutesStudy * 60;
let minutesBreak = 5;
let secondsBreak = minutesBreak * 60;

let chosenMinutesStudy = minutesStudy;
let chosenMinutesBreak = minutesBreak;

let breakRunning = false;
let studyRunning = true;

let countDownBreak;
let countDownStudy;

let secondsLeftStudy;
let secondsLeftBreak;

studyIncreaseBtn.addEventListener('click', () => {
    minutesStudy++;
    secondsStudy = minutesStudy * 60;
    chosenMinutesStudy = minutesStudy;
    studyTime.textContent = minutesStudy;
    if (studyRunning) {
        let remainderSeconds = secondsStudy % 60; 
        let displayTime = `${minutesStudy} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    }
});

studyDecreaseBtn.addEventListener('click', () => {
    minutesStudy--;
    secondsStudy = minutesStudy * 60;
    chosenMinutesStudy = minutesStudy;
    studyTime.textContent = minutesStudy;
    if (studyRunning) {
        let remainderSeconds = secondsStudy % 60; 
        let displayTime = `${minutesStudy} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    }
});

breakIncreaseBtn.addEventListener('click', () => {
    minutesBreak++;
    secondsBreak = minutesBreak * 60;
    chosenMinutesBreak = minutesBreak;
    breakTime.textContent = minutesBreak;
    if (breakRunning) {
        let remainderSeconds = secondsBreak % 60;
        let displayTime = `${minutesBreak} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    }
});

breakDecreaseBtn.addEventListener('click', () => {
    minutesBreak--;
    secondsBreak = minutesBreak * 60;
    chosenMinutesBreak = minutesBreak;
    breakTime.textContent = minutesBreak;
    if (breakRunning) {
        let remainderSeconds = secondsBreak % 60;
        let displayTime = `${minutesBreak} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    }
});

playBtn.addEventListener('click', () => {
    if (studyRunning) {
        studyTimer(secondsStudy);
    } 
    else if (breakRunning) {
        breakTimer(secondsBreak);
    }
});

pauseBtn.addEventListener('click', () => {
    if (studyRunning) {
        clearInterval(countDownStudy);
        secondsStudy = secondsLeftStudy;
    } else if (breakRunning) {
        clearInterval(countDownBreak);
        secondsBreak = secondsLeftBreak;
    }
});

stopBtn.addEventListener('click', () => {
    if (studyRunning) {
        clearInterval(countDownStudy);
        minutesStudy = chosenMinutesStudy;
        secondsStudy = minutesStudy * 60;
        let remainderSeconds = secondsStudy % 60; 
        let displayTime = `${minutesStudy} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    } else if (breakRunning) {
        clearInterval(countDownBreak);
        minutesBreak = chosenMinutesBreak;
        secondsBreak = minutesBreak * 60;
        let remainderSeconds = secondsBreak % 60;
        let displayTime = `${minutesBreak} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
        timerTime.textContent = displayTime;
    }
});

function studyTimer(seconds) {
    const now = Date.now();
    const future = now + seconds * 1000;
    displayTimeLeft(seconds);

    countDownStudy = setInterval(() => {
        secondsLeftStudy = Math.round((future - Date.now()) / 1000);
        if (secondsLeftStudy < 0) {
            breakTimer(secondsBreak);
            timerTime.style.color = '#92E4F0';
            studyRunning = false;
            breakRunning = true; 
            clearInterval(countDownStudy);
            return;
        }
        displayTimeLeft(secondsLeftStudy);
    }, 1000);
}

function breakTimer(seconds) {
    const now = Date.now();
    const future = now + seconds * 1000;
    displayTimeLeft(seconds);

    countDownBreak = setInterval(() => {
        secondsLeftBreak = Math.round((future - Date.now()) / 1000);
        if (secondsLeftBreak < 0) {
            studyTimer(secondsStudy);
            timerTime.style.color = 'white';
            studyRunning = true;
            breakRunning = false;
            clearInterval(countDownBreak);
            return;
        }
        displayTimeLeft(secondsLeftBreak);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60; 
    let displayTime = `${minutes} : ${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
    timerTime.textContent = displayTime;
}





