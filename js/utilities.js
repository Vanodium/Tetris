let SCORE = 0;
const tetrominos = [
    // I
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    // J
    [
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    // L 
    [
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ],
    // O
    [
        [1,1],
        [1,1]
    ],
    // S
    [
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ],
    // Z
    [
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    // T
    [
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ]

];

let currentTetromino = [];

const initGrid = () => {
    const canvas = document.getElementById('gameCanvas');
        for (let i = 1; i <= 200; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.id = `square-${i}`;
        canvas.appendChild(square);
    }
}

const scoreTicker = (initDelay = 1000) => {
    let delay = initDelay;
    const tick = () => {
        const scoreDisplay = document.getElementById('score');
        SCORE++;
        scoreDisplay.textContent = SCORE;
        delay *= 0.99;
        setTimeout(tick, delay);
    };
    setTimeout(tick, delay);
};

const getRandomTetromino = () => {
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
};

const fallingTetromino = (gameField, ROWS) => {
    let newField = gameField;
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        if ((!currentTetromino.some(([cy, cx]) => cy === y + 1 && cx === x) && y < ROWS-1 && newField[y+1][x] !== 0) || y === ROWS-1) {
            currentTetromino = [];
            return newField;
        }
    }
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        newField[y][x] = 0;
        currentTetromino[i][0]++;
    }
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        newField[y][x] = 1;
    }
    return newField

}
export { initGrid, scoreTicker, SCORE, tetrominos, getRandomTetromino, fallingTetromino, currentTetromino };