const outerGrid = document.getElementById('ultimate-tic-tac-toe');
let innerGrids = [];
const result = document.getElementById("result");
let turn = 0;
let now = 9;
grid = []
win = new Array(9).fill(-1)
winner = -1;


function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const innerGrid = document.createElement('div');
        innerGrid.classList.add('inner-grid');

        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('outer-idx', i);
            cell.setAttribute('inner-idx', j);
            innerGrid.appendChild(cell);
        }

        outerGrid.appendChild(innerGrid);
        innerGrids.push(innerGrid);
    }


    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    trun = 0;
    now = 9;
    winner = -1;

    for (let i = 0; i < 9; i++) {
        grid.push(new Array(9).fill(-1));
    }
    win = new Array(9).fill(-1)
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const outer = clickedCell.getAttribute('outer-idx');
    const inner = clickedCell.getAttribute('inner-idx');

    if ((now === 9 || win[now] != -1 || now === outer) && win[outer] == -1 && grid[outer][inner] === -1) {
        const imageElement = document.createElement('img');
        if (turn) imageElement.src = 'x.svg';
        else imageElement.src = 'o.svg';
        grid[outer][inner] = turn;
        clickedCell.appendChild(imageElement);
        turn = 1 - turn;
        now = inner;
        update();
    }
}

function update() {
    if (turn) outerGrid.style.borderColor = 'blue';
    else outerGrid.style.borderColor = 'red';

    for (let i = 0; i < 9; i++) innerGrids[i].style.borderColor = 'gray';
    if (now < 9 && win[now] === -1) innerGrids[now].style.borderColor = 'black';
    else for (let i = 0; i < 9; i++) innerGrids[i].style.borderColor = 'black';

    for (let i = 0; i < 9; i++) {
        if (win[i] != -1) continue;
        if (grid[i][0] != -1 && grid[i][0] === grid[i][1] && grid[i][1] == grid[i][2]) win[i] = grid[i][0];
        if (grid[i][3] != -1 && grid[i][3] === grid[i][4] && grid[i][4] == grid[i][5]) win[i] = grid[i][3];
        if (grid[i][6] != -1 && grid[i][6] === grid[i][7] && grid[i][7] == grid[i][8]) win[i] = grid[i][6];
        if (grid[i][0] != -1 && grid[i][0] === grid[i][3] && grid[i][3] == grid[i][6]) win[i] = grid[i][0];
        if (grid[i][1] != -1 && grid[i][1] === grid[i][4] && grid[i][4] == grid[i][7]) win[i] = grid[i][1];
        if (grid[i][2] != -1 && grid[i][2] === grid[i][5] && grid[i][5] == grid[i][8]) win[i] = grid[i][2];
        if (grid[i][0] != -1 && grid[i][0] === grid[i][4] && grid[i][4] == grid[i][8]) win[i] = grid[i][0];
        if (grid[i][2] != -1 && grid[i][2] === grid[i][4] && grid[i][4] == grid[i][6]) win[i] = grid[i][2];
        if (win[i] != -1) {
            const imageElement = document.createElement('img');
            if (win[i]) imageElement.src = 'x.svg';
            else imageElement.src = 'o.svg';
            outerGrid.replaceChild(imageElement, outerGrid.childNodes[i + 1]);
        }
    }

    if (win[0] != -1 && win[0] === win[1] && win[1] == win[2]) winner = win[0];
    if (win[3] != -1 && win[3] === win[4] && win[4] == win[5]) winner = win[3];
    if (win[6] != -1 && win[6] === win[7] && win[7] == win[8]) winner = win[6];
    if (win[0] != -1 && win[0] === win[3] && win[3] == win[6]) winner = win[0];
    if (win[1] != -1 && win[1] === win[4] && win[4] == win[7]) winner = win[1];
    if (win[2] != -1 && win[2] === win[5] && win[5] == win[8]) winner = win[2];
    if (win[0] != -1 && win[0] === win[4] && win[4] == win[8]) winner = win[0];
    if (win[2] != -1 && win[2] === win[4] && win[4] == win[6]) winner = win[2];

    if (winner != -1) {
        if (winner) result.textContent = "X(후) player Win!";
        else result.textContent = "O(선) player Win!";
    }
}

window.onload = function() {
    initializeBoard();
};