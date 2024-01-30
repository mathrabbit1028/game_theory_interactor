const stoneDiv = document.getElementById('stones');
const result = document.getElementById('result');
const buttons = document.getElementsByClassName("take");
let turn = 0

function reset() {
    turn = 0;
    cnt = 31;
    update();
    result.textContent = "";
}

function take(removeCnt) {
    if (cnt < removeCnt) alert("You can't take more than what remains.")
    else {
        cnt -= removeCnt;
        turn = 1 - turn;
    }
    update();
    if (cnt == 0) {
        gameOver();
    }
}

function update() {
    while (stoneDiv.firstChild) {
        stoneDiv.removeChild(stoneDiv.firstChild);
    }
    for (let i = 1; i <= cnt; i++) {
        const img = document.createElement('img');
        img.src = "stone.svg";
        stoneDiv.appendChild(img);
        if (i % 10 == 0) stoneDiv.appendChild(document.createElement('br'))
    }
    for (let i = cnt + 1; i <= 40; i++) {
        const img = document.createElement('img');
        img.src = "stone.svg";
        img.classList.add('transparent')
        stoneDiv.appendChild(img);
        if (i % 10 == 0) stoneDiv.appendChild(document.createElement('br'))
    }
    if (turn) {
        stoneDiv.style.borderColor = 'blue';
        for (let i = 0; i < 3; i++) {
            buttons[i].id = '';
            buttons[i].onclick = '';
        }
        for (let i = 3; i < 6; i++) {
            buttons[i].id = 'blue';
            buttons[i].onclick = function() { take(i-2); };
        }
    }
    else {
        stoneDiv.style.borderColor = 'red';
        for (let i = 0; i < 3; i++) {
            buttons[i].id = 'red';
            buttons[i].onclick = function() { take(i+1); };
        }
        for (let i = 3; i < 6; i++) {
            buttons[i].id = '';
            buttons[i].onclick = '';
        }
    }
}

function gameOver() {
    if (turn) result.textContent = "Red(선) player Win!";
    else result.textContent = "Blue(후) player Win!";
}