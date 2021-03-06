var numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40];
let newArray = [];
var time = 3;
var finish = 0;
var container = document.getElementById("container");
var count = 1;
var text;
var interval;
var diff = 0;
var res = document.getElementById("reset");
var startText;
var stimer = document.getElementsByClassName("stimer")[0];
var mstimer = document.getElementsByClassName("mstimer")[0];
let removeBox = document.getElementsByClassName("box");
let removeNumber = document.getElementsByClassName("number");
let k = 0;
let dispBest = document.getElementById("bestTime");
let dis;
let sec;
let msec;
let s;
let ms;
let disTime = document.getElementsByClassName('timebest');
let refreshDiv;
var best = new Array();
best = JSON.parse(localStorage.getItem('best'));

setup();
res.addEventListener('click', function () {
    for (var i = 19; i >= 0; i--) {
        removeBox[i].parentNode.removeChild(removeBox[i]);
    }
    finish = 2;
    setup();
});
function setup() {
    time = 3;
    startText = document.createElement("p");
    startText.innerHTML = "Click to Start!";
    startText.classList.add("clickText");
    container.appendChild(startText);
    container.addEventListener('click', startCountDown);

    res.innerHTML = "";
    let newBox = document.createElement('p');
    newBox.classList.add('newReset');
    res.appendChild(newBox);
    newBox.innerHTML = "Reset";

    best = JSON.parse(localStorage.getItem('best'));
    if (localStorage.getItem('best') === null)
        disTime[0].innerHTML = "0:000 S";
    else {
        for (var i = 0; i < best.length; i++) {
            displayBest();
        }
    }
}

//calling counting 3,2,1.... function
function startCountDown() {
    interval = setInterval(countDown, 1000);
}

//counting 3,2,1... function
function countDown() {
    startText.innerHTML = time + "...";
    time--;
    container.removeEventListener('click', startCountDown);
    if (time < 0)
        stopCountDown();
}

function stopCountDown() {
    clearInterval(interval);
    startText.innerHTML = "";
    newArray = shuffle(numArray);
    stopWatch();
    display();
    event();
}

//displaying grid and numbers
function display() {
    for (var i = 0; i < 20; i++) {

        const myDiv = document.createElement('div');
        container.appendChild(myDiv);
        myDiv.classList.add("box");
        const para = document.createElement("p");
        para.innerHTML = newArray[i];
        para.classList.add("number");
        myDiv.appendChild(para);

    }
}

//shuffle given array till 20
function shuffle(arr) {
    for (var i = 20 - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

//click function
function event() {
    var number = document.getElementsByClassName("box");
    var block = document.getElementsByClassName("number");
    count = 1;
    finish = 0;
    for (let i = 0; i < 20; i++) {
        number[i].addEventListener('click', function () {

            if ((parseInt(block[i].innerHTML) === count) && 20 + count <= 40) {
                block[i].innerHTML = 20 + count;
                count++;
            }
            else if (parseInt(block[i].innerHTML) == count) {
                block[i].innerHTML = "";
                count++;
            }
            if (count == 41)
                finish = 1;

        });
    }
}


//timer function
function stopWatch() {
    s = 0;
    ms = 0;
    var initial = Date.now();
    var curr;
    var timer = setInterval(function () {
        if (finish == 0) {
            curr = Date.now();
            diff = curr - initial;
            s = Math.floor(diff / 1000);
            ms = diff - (Math.floor(diff / 1000) * 1000);
            stimer.innerHTML = s;
            if (Math.floor(ms / 10) === 0) {
                mstimer.innerHTML = '00' + ms + ' S';
            }
            else if (Math.floor(ms / 100) === 0) {
                mstimer.innerHTML = '0' + ms + ' S';
            }
            else
                mstimer.innerHTML = ms + ' S';
        }
        else if (finish == 1) {
            clearInterval(timer);
            bestTimer();
            res.innerHTML = "";
            let newBox = document.createElement('p');
            newBox.classList.add('newGame')
            res.appendChild(newBox);
            newBox.innerHTML = "New Game";
        }
        else if (finish == 2) {
            clearInterval(timer);
            stimer.innerHTML = '0';
            mstimer.innerHTML = '000 ms';
        }

    }, 1);

}

function bestTimer() {
    best = best || [];
    best.push(diff);
    localStorage.setItem('best', JSON.stringify(best));
    best = JSON.parse(localStorage.getItem('best'));
    best.sort((a, b) => a - b);
    if (best.length > 5)
        best.pop();
    localStorage.setItem('best', JSON.stringify(best));
    displayBest();
}

function displayBest() {
    best = JSON.parse(localStorage.getItem('best'));
    disTime = document.getElementsByClassName('timebest');
    for (var i = 0; i < best.length; i++) {
        sec = Math.floor(best[i] / 1000);
        msec = best[i] - (Math.floor(best[i] / 1000) * 1000);
        if (Math.floor(msec / 10) === 0) {
            disTime[i].innerHTML = sec + ':00' + msec + ' S';
        }
        else if (Math.floor(msec / 100) === 0) {
            disTime[i].innerHTML = sec + ':0' + msec + ' S';
        }
        else {
            disTime[i].innerHTML = sec + ': ' + msec + ' S';
        }
    }
}