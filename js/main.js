import loop, { COLS, gameField } from './game.js';
import { initGrid, scoreTicker, moveTetromino, rotateTetromino, currentTetromino, speedUp } from './utilities.js';

const MOVEMENT_MAP = {
    'ArrowLeft': -1,
    'ArrowRight': 1, 
    'ArrowUp': -2,
    'ArrowDown': 2
};

const initializeGame = () => {
    const startButton = document.getElementById('startButton');
    const container = document.getElementById('gameContainer');
    // Animation is added after appearing so it doesnt blink
    container.style.transition = 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out';
    
    // switch to the game screen after clicking the start button
    startButton.addEventListener('click', () => {
        startButton.style.setProperty('display', 'none');
        container.classList.add('visible');
        
        initGrid();
        const tickerInterval = scoreTicker();
        requestAnimationFrame(loop);
        
        return () => clearInterval(tickerInterval);
    });
};

const handleKeyPress = (event) => {
    if (!currentTetromino.length) return;

    const moveAmount = MOVEMENT_MAP[event.key] || 0;
    if (moveAmount === 0) return;

    switch(moveAmount) {
        case -1:
        case 1:
            moveTetromino(moveAmount, COLS, gameField);
            break;
        case -2:
            rotateTetromino(gameField);
            break;
        case 2:
            speedUp();
            break;
    }
};

document.addEventListener('keydown', handleKeyPress);
window.addEventListener('load', initializeGame);
