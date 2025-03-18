import loop, { COLS, ROWS, gameField } from './game.js';
import { initGrid, scoreTicker, moveTetromino, rotateTetromino, currentTetromino } from './utilities.js';

const initializeGame = () => {
    const startButton = document.getElementById('startButton');
    const container = document.getElementById('gameContainer');
    
    // Add transition after page load
    container.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
    
    startButton.addEventListener('click', () => {
        startButton.style.setProperty('display', 'none');
        container.classList.add('visible');
        initGrid();
        scoreTicker();
        requestAnimationFrame(loop)
        return () => {
            clearInterval(scoreTicker);
        };
    });
};

function handleKeyPress(event) {
    if (!currentTetromino.length) return;

    const moveAmount = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' ? 0 : -2;
    if (moveAmount === -2 || currentTetromino.length === 0) return;
    if (moveAmount === 1 || moveAmount === -1) {
        moveTetromino(moveAmount, COLS, gameField);
    } else if (moveAmount === 0) {
        rotateTetromino(gameField);
    }

}


document.addEventListener('keydown', (e) => handleKeyPress(e));
window.addEventListener('load', initializeGame);
