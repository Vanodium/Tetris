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

const scoreTicker = (initDelay = 500) => {
    let delay = initDelay;
    const tick = () => {
        const scoreDisplay = document.getElementById('score-value');
        SCORE++;
        scoreDisplay.textContent = `${SCORE}`;
        delay *= 0.995;
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

function moveTetromino(moveAmount, COLS, gameField) {
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        const newX = x + moveAmount;
        
        if (newX < 0 || newX >= COLS || (newX >= 0 && gameField[y][newX] === 1 && !currentTetromino.some(([ty, tx]) => ty === y && tx === newX))) {
            return;
        }
    }

    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        gameField[y][x] = 0;
    }

    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        currentTetromino[i][1] = x + moveAmount;
        gameField[y][x + moveAmount] = 1;
    }
}

function rotateTetromino(gameField) {
    // Clear current position
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        gameField[y][x] = 0;
    }

    // Calculate new rotated positions
    const rotated = mapRotation(currentTetromino);
    
    // Check if rotation is valid (within bounds and no collisions)
    const isValid = rotated.every(([y, x]) => 
        y >= 0 && y < gameField.length &&
        x >= 0 && x < gameField[0].length &&
        gameField[y][x] === 0
    );

    // Apply rotation if valid
    if (isValid) {
        currentTetromino = rotated;
    }

    // Update game field with new positions
    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        gameField[y][x] = 1;
    }
}

function mapRotation(tetromino) {
    if (tetromino.length === 0 || (tetromino[0][1] === tetromino[2][1] && tetromino[0][0] === tetromino[2][0])) return tetromino;
    let center;
    if (tetromino.every(([y, _]) => y === tetromino[0][0])) {
        center = tetromino[Math.floor((tetromino.length - 1) / 2)];
    } else {
        center = tetromino[Math.floor((tetromino.length) / 2)];
    }
    
    return tetromino.map(([y, x]) => {
        const dy = y - center[0];
        const dx = x - center[1];
        
        const newDy = dx;
        const newDx = -dy;
        
        return [
            center[0] + newDy,
            center[1] + newDx
        ];
    });
}

const findFullRows = (gameField) => {
    let fullRows = [];
    for (let i = 0; i < gameField.length; i++) {
        if (gameField[i].every(cell => cell === 1)) {
            fullRows.push(i);
        }
    }
    return fullRows;
}

const removeFullRows = (gameField, fullRows, COLS) => {
    let newField = []
    for (let i = 0; i < fullRows.length; i++) {
        newField.push(new Array(COLS).fill(0))
    }
    for (let i = 0; i < gameField.length; i++) {
        if (!fullRows.includes(i)) {
            newField.push(gameField[i])
        }
    }
    return newField;
}

const speedUp = () => {
    if (SCORE % 10 < 7) {
        SCORE += 7 - (SCORE % 10);
    }
}

export { initGrid, scoreTicker, SCORE, tetrominos, getRandomTetromino, fallingTetromino, currentTetromino, moveTetromino, rotateTetromino, speedUp, findFullRows, removeFullRows };