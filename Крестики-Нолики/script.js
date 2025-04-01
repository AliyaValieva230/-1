let cells = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = false;

const board = document.getElementById('board');
const message = document.getElementById('message');
const playButton = document.getElementById('playButton');

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
};

const computerMove = () => {
    const availableCells = cells.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    if (randomIndex !== undefined) {
        cells[randomIndex] = 'O';
        renderBoard();
    }
};

const handleCellClick = (index) => {
    if (cells[index] || !gameActive) return;

    cells[index] = currentPlayer;
    renderBoard();
    const winner = checkWinner();
    if (winner) {
        message.textContent = `${winner} победил!`;
        gameActive = false;
    } else if (!cells.includes(null)) {
        message.textContent = "Ничья!";
        gameActive = false;
    } else {
        currentPlayer = 'O';
        computerMove();
        const winnerAfterMove = checkWinner();
        if (winnerAfterMove) {
            message.textContent = `${winnerAfterMove} победил!`;  // Исправлено сообщение
            gameActive = false;
        } else if (!cells.includes(null)) {
            message.textContent = "Ничья!";
            gameActive = false;
        } else {
            currentPlayer = 'X';
        }
    }
};

const renderBoard = () => {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
};

const startGame = () => {
    cells.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
    renderBoard();
};

playButton.addEventListener('click', startGame);
