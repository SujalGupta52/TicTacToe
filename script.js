function gameBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++) {
            board[i].push(Cell());
        }
    }
    
    const getBoard = () => board;

    const playTurn = (row, column, player) => {
        board[row][column].fillValue(player);
    };

    const isWon = () => {
        let XCount = 0;
        let OCount = 0;
        for(let i = 0; i < 3; i++) {
            XCount = 0;
            OCount = 0;
            for(let j = 0; j < 3; j++) {
                if(board[i][j].getValue() == 'X') {
                    XCount++;
                }
                else if(board[i][j].getValue() == 'O') {
                    OCount++;
                }
            }
            if(XCount == 3) {
                return 'X';
            }
            else if(OCount == 3) {
                return 'O';
            }
        }
        for(let i = 0; i < 3; i++) {
            XCount = 0;
            OCount = 0;
            for(let j = 0; j < 3; j++) {
                if(board[j][i].getValue() == 'X') {
                    XCount++;
                }
                else if(board[j][i].getValue() == 'O') {
                    OCount++;
                }
            }
            if(XCount == 3) {
                return 'X';
            }
            else if(OCount == 3) {
                return 'O';
            }
        }
        XCount = 0;
        OCount = 0;
        for(let i = 0; i < 3; i++) {
            if(board[i][i].getValue() == 'X') {
                XCount++;
            }
            else if(board[i][i].getValue() == 'O') {
                OCount++;
            }
        }
        if(XCount == 3) {
            return 'X';
        }
        else if(OCount == 3) {
            return 'O';
        }
        XCount = 0;
        OCount = 0;
        for(let i = 2; i <= 0; i--) {
            if(board[i][i].getValue() == 'X') {
                XCount++;
            }
            else if(board[i][i].getValue() == 'O') {
                OCount++;
            }
        }
        if(XCount == 3) {
            return 'X';
        }
        else if(OCount == 3) {
            return 'O';
        }
        return null;
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        return boardWithCellValues;
    }

    const isFilled = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j].getValue() == '') {
                    return false;
                }
            }
        }
        return true;
    }

    return {getBoard, playTurn, isWon, printBoard, isFilled}
}

function Cell() {
    let value = '';

    const getValue = () => value;

    const fillValue = (player) => {
        value = player;
    };

    return {getValue, fillValue};
}

function gameBoardDOM() {
    const initialiseGameBoard = () => {
        const body = document.querySelector('body');
        const cellContainer = document.createElement("div");
        cellContainer.classList.toggle('cell-container');
        for(let i = 0; i < 9; i++) {
            const superCell = document.createElement('div');
            superCell.classList.toggle('super-cell');
            for(let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.classList.toggle('cell');
                superCell.appendChild(cell);
            }
            cellContainer.appendChild(superCell);
        }
        body.appendChild(cellContainer);
    }

    return {initialiseGameBoard};
}

function playGame() {
    const board = gameBoard();
    let activePlayer = 'O';
    while(board.isWon() != 'X' && board.isWon != 'O' && !board.isFilled()) {
        activePlayer = activePlayer == 'X' ? 'O' : 'X';
        const row = prompt(`Enter row for ${activePlayer}`);
        const column = prompt(`Enter column for ${activePlayer}`);
        board.playTurn(+row, +column, activePlayer);
        console.log(board.printBoard())
    }
    if(board.isWon() == 'X') console.log('X Won');
    else if(board.isWon() == 'O') console.log('O Won');
    else console.log("Round Tied");
}

const gameBoardDOMhandler = gameBoardDOM()
gameBoardDOMhandler.initialiseGameBoard();