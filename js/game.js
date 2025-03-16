import { SCORE, getRandomTetromino } from './utilities.js';
const COLS = 10;
const ROWS = 20;
let GAME_OVER = false;
let rAF;

function loop(gameField) {
    if (GAME_OVER) {
        return;
    }

    if (SCORE % 5 === 0 && SCORE !== 0 && !loop.lastTriggerScore) {
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
                }
            }
        }
        loop.lastTriggerScore = true;
    } else if (SCORE % 5 !== 0) {
        loop.lastTriggerScore = false;
    }
    
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const square = document.getElementById(`square-${y * COLS + x+1}`);
            square.style.opacity = gameField[y][x] === 0 ? '0.1' : '1';
        }
    }
    rAF = requestAnimationFrame(() => loop(gameField));
}
export { COLS, ROWS };
export default loop;