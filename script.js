function gameBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for(let j = 0; j < 3; j++) {
            board[i].push('');
        }
    }
    
    const getBoard = () => board;

    const playTurn = (row, column, player) => {
        board[row][column] = player;
    };

    const isWon = () => {
        if(isFilled()) return 'tied';
        let XCount = 0;
        let OCount = 0;
        for(let i = 0; i < 3; i++) {
            XCount = 0;
            OCount = 0;
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == 'X') {
                    XCount++;
                }
                else if(board[i][j] == 'O') {
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
                if(board[j][i] == 'X') {
                    XCount++;
                }
                else if(board[j][i] == 'O') {
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
            if(board[i][i] == 'X') {
                XCount++;
            }
            else if(board[i][i] == 'O') {
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
            if(board[i][i] == 'X') {
                XCount++;
            }
            else if(board[i][i] == 'O') {
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
        console.log(board);
    }

    const isFilled = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j] == '') {
                    return false;
                }
            }
        }
        return true;
    }

    return {getBoard, playTurn, isWon, printBoard}
}

function gameController() {
    let activePlayer = 'X';
    const board = gameBoard();
    const getActivePlayer = () => activePlayer;
    const switchPlayer = () => {
        activePlayer = activePlayer === 'O' ? 'X' : 'O';
    }
    const playTurn = (row, column) => {
        if(!board.isWon()) {
            board.playTurn(row, column, activePlayer);
            switchPlayer();
        }
        else {
            return board.isWon();
        }
    }

    return {getActivePlayer, playTurn, getBoard: board.getBoard, isWon: board.isWon};
}

function gameBoardDOM() {
    const game = gameController()
    console.log(game.getBoard())
    const updateGameBoard = () => {
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const cellContainer = document.querySelector('.cell-container');
        document.querySelector('.player').textContent = `${activePlayer}'s turn`;
        cellContainer.innerHTML = '';
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.toggle('cell');
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.textContent = board[i][j];
                cellContainer.append(cell);
            }
        }
        const cells = document.querySelectorAll('.cell-container .cell');
        console.log(cells)
        cells.forEach(cell => {
            cell.addEventListener('click' , clickHandler);
        });
    }
    function clickHandler(e) {
        const row = e.target.dataset.row;
        const column = e.target.dataset.column;
        let isWon = game.isWon();
        if(isWon == 'tied') {
            document.querySelector('.player').textContent = `Round Tied`;
        }

        else if(isWon != null) {
            document.querySelector('.player').textContent = `${isWon} won`;
        }

        else {
            game.playTurn(row, column);
            updateGameBoard();
        }

        isWon = game.isWon();

        if(isWon == 'tied') {
            document.querySelector('.player').textContent = `Round Tied`;
        }

        else if(isWon != null) {
            document.querySelector('.player').textContent = `${isWon} won`;
        }
    }
    updateGameBoard();

}

gameBoardDOM();