import { SCORE, fallingTetromino, currentTetromino, findFullRows, removeFullRows, spawnNewTetromino, updateField } from './utilities.js';

const COLS = 10;
const ROWS = 20;
let GAME_OVER = false;
let rAF;
let gameField = Array(ROWS).fill().map(() => Array(COLS).fill(0));
let lastTriggerScore = false;
let loss = false;

function loop() {
    if (GAME_OVER) {
        return;
    }
    
    if (SCORE % 10 === 0 && !lastTriggerScore) {
        loss = spawnNewTetromino(gameField, COLS);
        if (loss) {
            cancelAnimationFrame(rAF);
            GAME_OVER = true;
            window.location.reload();
        }
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