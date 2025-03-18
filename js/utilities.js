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

const updateField = (gameField, ROWS, COLS) => {
    return gameField.reduce((_, row, y) => {
        row.reduce((_, cell, x) => {
            const square = document.getElementById(`square-${y * COLS + x + 1}`);
            square.style.opacity = cell === 0 ? '0.1' : '1';
        }, null);
    }, null);
};

const getRandomTetromino = () => {
    return tetrominos[Math.floor(Math.random() * tetrominos.length)];
};

const spawnNewTetromino = (gameField, COLS) => {
    const tetromino = getRandomTetromino();
    const startX = Math.floor((COLS - tetromino[0].length) / 2);
    const startY = 0;
    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {
            if (tetromino[y][x] && gameField[startY + y][startX + x]) {
                alert('Score: ' + SCORE);
                return true;
            }
        }
    }
    for (let y = 0; y < tetromino.length; y++) {
        for (let x = 0; x < tetromino[y].length; x++) {
            if (tetromino[y][x]) {
                gameField[startY + y][startX + x] = tetromino[y][x];
                currentTetromino.push([startY + y, startX + x]);
            }
        }
    }
    return false;
}
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

    const rotated = mapRotation(currentTetromino);
    
    // Check if rotation is valid
    const isValid = rotated.every(([y, x]) => 
        y >= 0 && y < gameField.length &&
        x >= 0 && x < gameField[0].length &&
        gameField[y][x] === 0
    );

    if (isValid) {
        currentTetromino = rotated;
    }

    // Add the tetromino to the game field
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
    // rotate the tetromino matrix 90 degrees clockwise
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
    if (fullRows.length > 0) {
        glowAnimation('gameCanvas');
    }
    
    return [
        ...Array(fullRows.length).fill().map(() => Array(COLS).fill(0)),
        ...gameField.filter((_, index) => !fullRows.includes(index))
    ];
};

const speedUp = () => {
    shakeAnimation('score-value');
    if (SCORE % 10 < 8) {
        SCORE += 8 - (SCORE % 10);
    }
}

const shakeAnimation = (id) => {
    const scoreValue = document.getElementById(id);
    scoreValue.style.transition = 'transform 0.1s ease-in-out';
    scoreValue.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreValue.style.transform = 'scale(1)';
    }, 100);
}

const glowAnimation = (id) => {
    const element = document.getElementById(id);
    element.style.transition = 'all 0.2s ease-out';
    element.style.transform = 'scale(1.02)';
    element.style.filter = 'brightness(1.5)';
    element.style.textShadow = '0 0 20px #00ff00, 0 0 40px #00ff00';
    element.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.5)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.filter = 'brightness(0.8)';
        element.style.textShadow = 'none';
        element.style.boxShadow = 'none';
    }, 200);
}

export { initGrid, scoreTicker, SCORE, tetrominos, getRandomTetromino, spawnNewTetromino, fallingTetromino, currentTetromino, moveTetromino, rotateTetromino, speedUp, findFullRows, removeFullRows, shakeAnimation, glowAnimation, updateField };