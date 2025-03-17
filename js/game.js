import { SCORE, getRandomTetromino, fallingTetromino, currentTetromino } from './utilities.js';
const COLS = 10;
const ROWS = 20;
let GAME_OVER = false;
let rAF;
let gameField = Array(ROWS).fill().map(() => Array(COLS).fill(0));

function loop() {
    if (GAME_OVER) {
        return;
    }
    
    if (SCORE % 5 === 0 && !loop.lastTriggerScore) {
        const tetromino = getRandomTetromino();
        const startX = Math.floor((COLS - tetromino[0].length) / 2);
        const startY = 0;
        for (let y = 0; y < tetromino.length; y++) {
            for (let x = 0; x < tetromino[y].length; x++) {
                if (tetromino[y][x] && gameField[startY + y][startX + x]) {
                    alert('Score: ' + SCORE);
                    cancelAnimationFrame(rAF);
                    GAME_OVER = true;
                    window.location.reload();
                    return;
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
        loop.lastTriggerScore = true;
    } else if (SCORE % 5 !== 0) {
        loop.lastTriggerScore = false;
    }
    if (SCORE % 5 === 4) {
        while (currentTetromino.length > 0) {
            gameField = fallingTetromino(gameField, ROWS);
        }
    }
    
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const square = document.getElementById(`square-${y * COLS + x+1}`);
            square.style.opacity = gameField[y][x] === 0 ? '0.1' : '1';
        }
    }
    rAF = requestAnimationFrame(loop);
}
function handleKeyPress(event) {
    if (!currentTetromino.length) return;

    const moveAmount = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    if (!moveAmount || currentTetromino.length === 0) return;

    for (let i = 0; i < currentTetromino.length; i++) {
        const [y, x] = currentTetromino[i];
        const newX = x + moveAmount;
        
        if (newX < 0 || newX >= COLS || (newX >= 0 && gameField[y][newX] === 1 && !currentTetromino.some(([ty, tx]) => ty === y && tx === newX))) {
            return;
        }
    }
    // alert(moveAmount);

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

document.addEventListener('keydown', (e) => handleKeyPress(e));

export { COLS, ROWS };
export default loop;