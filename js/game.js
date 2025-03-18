import { SCORE, fallingTetromino, currentTetromino, findFullRows, removeFullRows, spawnNewTetromino, updateField } from './utilities.js';

const COLS = 10;
const ROWS = 20;
let GAME_OVER = false;
let rAF;
let gameField = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let lastTriggerScore = false;

function loop() {
    if (GAME_OVER) {
        return;
    }
    
    if (SCORE % 10 === 0 && !lastTriggerScore) {
        spawnNewTetromino(gameField, COLS, rAF);
        lastTriggerScore = true;
    } else if (SCORE % 10 !== 0) {
        lastTriggerScore = false;
    }
    if (SCORE % 10 === 8) {
        while (currentTetromino.length > 0) {
            gameField = fallingTetromino(gameField, ROWS);
        }
        gameField = removeFullRows(gameField, findFullRows(gameField), COLS);
    }
    updateField(gameField, ROWS, COLS);
    
    rAF = requestAnimationFrame(loop);
}

export { COLS, ROWS, gameField };
export default loop;