import React, { useState }from 'react'
import QuickActivityLogic from '../pages/quickActivity/QuickActivityLogic';

export const Stopwatch = () => {

    // const [isActive, setIsActive] = useState(false);
    // const [isPaused, setIsPaused] = useState(true);
    // const [time, setTime] = useState(0);

    const { time, setTime, isPaused, setIsPaused, isActive, setIsActive } = QuickActivityLogic();

    React.useEffect(() => {
        let interval = null;

        if (isActive && isPaused === false) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };

    }, [isActive, isPaused]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(false)
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const handleEndActivity = () => {
        setIsPaused(true)
        // setTimeExport(true)
        // console.log(time)
    }

    

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    }



    return {
        handleEndActivity,
        time,
        render: (
        <div className='stop-watch'>
            <Timer time={time} />
            <ControlButtons handleStart={handleStart} handleReset={handleReset} handlePauseResume={handlePauseResume} isPaused={isPaused} isActive={isActive} />
            
        </div>
    )}
}



export const Timer = ({ time }) => {


    return (
        <div className='timer'>
            <span className='timer__digits'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span className='timer__digits'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>

        </div>


    );
}


const ControlButtons = ({ handleStart, handleReset, handlePauseResume, isPaused, isActive}) => {

    const StartButton = (
        <button className='btn-timer btn-start' onClick={handleStart}>
            start time
        </button>
    );

    const ActiveButtons = (
        <div className='btn-grp'>
            <button className='btn-timer btn-two' onClick={handleReset}>
                Reset
            </button>
            <button className='btn-timer btn-one' onClick={handlePauseResume}>
                {isPaused ? "Resume" : "Pause"}
            </button>
        </div>
    );

    return(
        <div className='Control-Buttons'>
            <div>{isActive ? ActiveButtons : StartButton}</div>
        </div>
    );
}
