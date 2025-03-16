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

const initGrid = () => {
    const canvas = document.getElementById('gameCanvas');
        for (let i = 1; i <= 200; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.id = `square-${i}`;
        canvas.appendChild(square);
    }
}

const scoreTicker = () => {
    return setInterval(() => {
        const scoreDisplay = document.getElementById('score');
        SCORE++;
        scoreDisplay.textContent = SCORE;
    }, 300);
};

const getRandomTetromino = () => {
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
};


export { initGrid, scoreTicker, SCORE, tetrominos, getRandomTetromino };