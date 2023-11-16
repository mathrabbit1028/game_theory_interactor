const stoneDiv = document.getElementById('stones');
const result = document.getElementById("result");
let turn = 0

function reset() {
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
    if (turn) stoneDiv.style.borderColor = 'blue';
    else stoneDiv.style.borderColor = 'red';
}

function gameOver() {
    if (turn) result.textContent = "Red(선) player Win!";
    else result.textContent = "Blue(후) player Win!";
}