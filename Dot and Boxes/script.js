// Dot and Boxes 게임 보드를 만드는 클래스
class DotBoxesGame {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.horizontalLines = this.createLines(rows + 1, cols);
    this.verticalLines = this.createLines(rows, cols + 1);
    this.boxes = this.createBoxes(rows, cols);
    this.currentPlayer = 1;
  }

  // 선을 생성하는 함수
  createLines(rows, cols) {
    return Array.from({ length: rows }, () => new Array(cols).fill(false));
  }

  // 상자를 생성하는 함수
  createBoxes(rows, cols) {
    return Array.from({ length: rows }, () =>
      new Array(cols).fill(false)
    );
  }

  // 해당 위치의 선을 그을 수 있는지 확인하는 함수
  canDrawLine(isHorizontal, row, col) {
    if (isHorizontal) {
      return this.horizontalLines[row][col] === false;
    } else {
      return this.verticalLines[row][col] === false;
    }
  }

  // 선을 그리는 함수
  drawLine(isHorizontal, row, col) {
    if (isHorizontal) {
      this.horizontalLines[row][col] = true;
    } else {
      this.verticalLines[row][col] = true;
    }
  }

  // 상자를 확인하는 함수
  checkBoxes() {
    let boxesCompleted = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (
          this.horizontalLines[i][j] &&
          this.horizontalLines[i + 1][j] &&
          this.verticalLines[i][j] &&
          this.verticalLines[i][j + 1]
        ) {
          if (!this.boxes[i][j]) {
            this.boxes[i][j] = true;
            boxesCompleted++;
          }
        }
      }
    }

    return boxesCompleted;
  }

  // 플레이어 변경 함수
  changePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  // 현재 게임 상태를 출력하는 함수 (보드 출력)
  printBoard() {
    let board = '';
    
    // 가로 선을 그립니다.
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols + 1; j++) {
        board += (this.horizontalLines[i][j] ? '―' : '  ');
        if (j < this.cols) {
          board += (this.boxes[i][j] ? '■' : ' ');
        }
      }
      board += '\n';
      
      // 세로 선을 그립니다.
      if (i < this.rows) {
        for (let j = 0; j < this.cols; j++) {
          board += (this.verticalLines[i][j] ? '│ ' : '  ');
        }
        board += '\n';
      }
    }
    
    console.log(board); // 보드를 콘솔에 출력합니다. (혹은 다른 출력 방식을 선택할 수 있습니다)
  }

  play() {
    let linesDrawn = 0;
    const totalLines = (this.rows * (this.cols + 1)) + ((this.rows + 1) * this.cols);
    let completedBoxes = 0;

    while (linesDrawn < totalLines) {
      this.printBoard();

      const row = parseInt(prompt(`Player ${this.currentPlayer}, enter row:`));
      const col = parseInt(prompt(`Player ${this.currentPlayer}, enter column:`));
      const isHorizontal = (prompt('Horizontal line? (yes/no)') === 'yes');

      if (row >= 0 && row <= this.rows && col >= 0 && col <= this.cols) {
        const isValidLine = isHorizontal ? this.canDrawLine(true, row, col) : this.canDrawLine(false, row, col);

        if (isValidLine) {
          isHorizontal ? this.drawLine(true, row, col) : this.drawLine(false, row, col);

          const boxesCompleted = this.checkBoxes();
          completedBoxes += boxesCompleted;

          if (boxesCompleted === 0) {
            this.changePlayer();
          }
        } else {
          console.log('Invalid line. Try again.');
        }
      } else {
        console.log('Invalid input. Try again.');
      }

      linesDrawn++;
    }

    this.printBoard();
    console.log(`Game Over! Player ${completedBoxes % 2 === 0 ? 2 : 1} wins!`);
  }
}

// 게임 시작
const dotBoxesGame = new DotBoxesGame(3, 3); // 예시로 3x3 보드를 생성
dotBoxesGame.play(); // 게임 실행
