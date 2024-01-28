import React, { useState, useEffect } from 'react';

const Board = ({ startTimer, startNewGame }) => {
    const [buttons, setButtons] = useState([]);
    const [numbers, setNumbers] = useState([]);
    const [emptyCoord, setEmptyCoord] = useState({ x: 3, y: 3 });
    const [size, setSize] = useState(16);
    const [isNewGame, setNewGame] = useState(false);

    useEffect(() => {
        const buttonArray = fillArrayOfButtons();
        setUpGame(buttonArray);
        setNewGame(false);
    }, [isNewGame]);

    const fillArrayOfButtons = () => {
        const buttonArray = [];
        for (let i = 1; i <= size; i++) {
            if (i === size) {
                buttonArray.push(null);
                continue;
            }
            buttonArray.push(i);
        }
        return buttonArray;
    };

    const setUpGame = (numbers) => {
        const shuffledNumbers = [...numbers].sort(() => Math.random() - 0.5);
        setNumbers(shuffledNumbers);
        setButtons(shuffledNumbers.map((number, index) => {
            if (number === null) {
                const emptyButton = {
                    x: Math.floor(index / 4),
                    y: index % 4
                }
                setEmptyCoord(emptyButton);
            }
            return number;
        }));
    };

    const handleButtonClick = (index) => {
        startTimer(true);
        const currentX = Math.floor(index / 4);
        const currentY = index % 4;

        if (isAdjacentToEmpty(currentX, currentY)) {
            const newButtons = [...buttons];
            newButtons[emptyCoord.x * 4 + emptyCoord.y] = buttons[index];
            newButtons[currentX * 4 + currentY] = null;
            setButtons(newButtons);
            setEmptyCoord({ x: currentX, y: currentY });
        }
    };

    const isAdjacentToEmpty = (x, y) => {
        const { x: emptyX, y: emptyY } = emptyCoord;
        return (Math.abs(x - emptyX) === 1 && y === emptyY) || (x === emptyX && Math.abs(y - emptyY) === 1);
    };

    const startNewGameClick = () => {
        setNewGame(true);
        startTimer(false);
        startNewGame();
    }

    return (
        <div className='game-container'>
            <div>
                <button className='button' onClick={startNewGameClick}>New game</button>
            </div>
            <div className="grid">
                {buttons.map((number, index) => (
                    <button className={`button ${number === null ? 'emptyButton' : ''}`} key={index} onClick={() => handleButtonClick(index)}>
                        {number}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default Board;