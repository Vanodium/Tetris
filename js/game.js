import { SCORE, getRandomTetromino, fallingTetromino, currentTetromino, findFullRows, removeFullRows } from './utilities.js';
const COLS = 10;
const ROWS = 20;
let GAME_OVER = false;
let rAF;
let gameField = Array(ROWS).fill().map(() => Array(COLS).fill(0));

function loop() {
    if (GAME_OVER) {
        return;
    }
    
    if (SCORE % 10 === 0 && !loop.lastTriggerScore) {
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
    } else if (SCORE % 10 !== 0) {
        loop.lastTriggerScore = false;
    }
    if (SCORE % 10 === 8) {
        while (currentTetromino.length > 0) {
            gameField = fallingTetromino(gameField, ROWS);
        }
        gameField = removeFullRows(gameField, findFullRows(gameField), COLS);
    }
    
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const square = document.getElementById(`square-${y * COLS + x+1}`);
            square.style.opacity = gameField[y][x] === 0 ? '0.1' : '1';
        }
    }
    rAF = requestAnimationFrame(loop);
}

export { COLS, ROWS, gameField };
export default loop;