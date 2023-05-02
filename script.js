let chosingArea = document.querySelector('.wrapper');
selectXBtn = chosingArea.querySelector('.playerX');
selectOBtn = chosingArea.querySelector('.playerO')
playingArea = document.querySelector('.playArea');
players = document.querySelector('.players');
playerBoxs = document.querySelector('.playArea');
allBox = document.querySelectorAll('.playBoxs .box-group span');
userActive = document.querySelector('.players .user');
robotActive = document.querySelector('.players .robot');
resultArea = document.querySelector('.resultArea');
resultText = resultArea.querySelector('.resultText');
replayBtn = resultArea.querySelector('.replayBtn');


//when we chose playerO button
selectOBtn.onclick = () => {
    chosingArea.classList.add("hide");
    playingArea.classList.add("show");
    players.classList.add('player');
}

//when we chose playerX button
selectXBtn.onclick = () => {
    chosingArea.classList.add("hide");
    playingArea.classList.add("show");
}


//we defines onclick addeventlistener in every playbox
window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}


//prefix value define 
let playerXIcon = "fa-solid fa-xmark";
playerOIcon = "fa-regular fa-circle";
playerSign = 'X'; //default user player sign
runbot = true;


//user clicked function 
function clickedBox(element) {
    if (players.classList.contains('player')) {
        playerSign = 'O';
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        element.setAttribute('id', playerSign);
        userActive.classList.remove('active');
        robotActive.classList.add('active');
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute('id', playerSign);
        userActive.classList.remove('active');
        robotActive.classList.add('active');
    }
    element.style.pointerEvents = "none";
    // playerBoxs.style.pointerEvents = "none";

    setTimeout(() => { robot(runbot) }, 800);
    winner();
}

//robot auto click function
function robot() {
    let boxCount = [];

    if (runbot) {
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) {
                boxCount.push(i);
            }
        }

        //get random number between 0 and 8
        let randomBox = boxCount[Math.floor(Math.random() * boxCount.length)];
        if (boxCount.length > 0) {
            playerSign = "O"; //default robot player sing

            if (players.classList.contains('player')) {
                playerSign = "X";
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                robotActive.classList.remove('active');
                userActive.classList.add('active');
            } else {
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                allBox[randomBox].setAttribute("id", playerSign);
                robotActive.classList.remove('active');
                userActive.classList.add('active');
            }
            // to limit box area not to override playersign again
            allBox[randomBox].style.pointerEvents = 'none';
            winner();
        }
    }
}

//for winner result functions

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

//check boxs's id with playersign whether it's same or not
function checkIdSign(val1, val2, val3, sign) {
    if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
        return true;
    };
}

//set winner key
function winner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign)) {
        runbot = false;
        robot(runbot);
        setTimeout(() => {
            resultArea.classList.add("show");
            playingArea.classList.remove("show");
        }, 700);

        resultText.innerHTML = `Congratulation🎉🎊`;
    } else {
        if (getIdVal(1) != '' && getIdVal(2) != '' && getIdVal(3) != '' && getIdVal(4) != '' && getIdVal(5) != '' && getIdVal(6) != '' && getIdVal(7) != '' && getIdVal(8) != '' && getIdVal(9) != '') {
            runbot = false;
            robot(runbot);
            setTimeout(() => {
                resultArea.classList.add("show");
                playingArea.classList.remove("show");
            }, 700);

            resultText.innerHTML = `Match has been drawn!`;
        }
    }
}


//when we click replay btn
replayBtn.onclick = () => {
    window.location.reload();
}