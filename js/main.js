import loop, { COLS, ROWS } from './game.js';
import { initGrid, scoreTicker } from './utilities.js';

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
        requestAnimationFrame(() => loop(Array(ROWS).fill().map(() => Array(COLS).fill(0))))
        return () => {
            clearInterval(scoreTicker);
        };
    });
};

window.addEventListener('load', initializeGame);
