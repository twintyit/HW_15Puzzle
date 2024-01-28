import React, { useState } from 'react';
import Board from './Board';
import Timer from './Timer';

const Game = () => {

    const [start, setStart] = useState(false);
    const [newGame, setNewGame] = useState(false);

    const startTimer = (bool) => {
        setStart(bool);
    };

    const startNewGame = () => {
        setNewGame(!newGame);
    }

    return (
        <div className='main'>
            <div className='container'>
                <h2 className='head'>Sliding Puzzle</h2>
                <Board startTimer={startTimer} startNewGame={startNewGame} ></Board>
                <Timer start={start} newGame={newGame} startTimer={startTimer}></Timer>
            </div>
        </div>
    );
};

export default Game;