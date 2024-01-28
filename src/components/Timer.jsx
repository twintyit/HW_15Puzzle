import React from 'react';
import { useState, useEffect } from 'react';
import { useRef } from 'react';

const Timer = ({ start, newGame, startTimer }) => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [stopTime, setStopTime] = useState({ hours: 0, minutes: 5, seconds: 0 });
    const { sRef, mRef, hRef } = {
        sRef: useRef(),
        mRef: useRef(),
        hRef: useRef()
    };
    const [timeIsOver, setTimeIsOver] = useState(false);

    useEffect(() => {
        let interval;
        if (start) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    const newSeconds = prevTime.seconds + 1;
                    if (newSeconds === 60) {
                        const newMinutes = prevTime.minutes + 1;
                        if (newMinutes === 60) {
                            return { hours: prevTime.hours + 1, minutes: 0, seconds: 0 };
                        }
                        return { ...prevTime, minutes: newMinutes, seconds: 0 };
                    }
                    return { ...prevTime, seconds: newSeconds };
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [start]);

    useEffect(() => {
        handleReset();

    }, [newGame]);

    const handleReset = () => {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        start = false;
        setTimeIsOver(false);
    };

    useEffect(() => {
        if (stopTime.seconds === time.seconds &&
            stopTime.minutes === time.minutes &&
            stopTime.hours === time.hours) {
            setTime({ hours: 0, minutes: 0, seconds: 0 });
            startTimer(false);
            setTimeIsOver(true);
        }
    }, [time.seconds]);

    const setTimer = () => {
        setStopTime({
            hours: parseInt(hRef.current.value, 10) ? parseInt(hRef.current.value, 10) : 0,
            minutes: parseInt(mRef.current.value, 10) ? parseInt(mRef.current.value, 10) : 0,
            seconds: parseInt(sRef.current.value, 10) ? parseInt(sRef.current.value, 10) : 0,
        });
    }

    return (

        <div>
            {timeIsOver ?
                <p>You lose</p> : <div>
                    <div className="timer">
                        {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
                    </div>
                    <div className='set-timer'>
                        <label htmlFor="">h:
                            <input ref={hRef} type="number" defaultValue={stopTime.hours} />
                        </label>
                        <label htmlFor="">m:
                            <input ref={mRef} type="number" defaultValue={stopTime.minutes} />
                        </label>
                        <label htmlFor="">s:
                            <input ref={sRef} type="number" defaultValue={stopTime.seconds} />
                        </label>
                        <button className='button' onClick={setTimer}>Set timer</button>
                    </div>

                </div>}
        </div>
    );
};

export default Timer;