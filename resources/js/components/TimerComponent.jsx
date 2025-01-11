import { useState, useEffect } from "react";

export default function TimerComponent(props) {

    const [time, setTime] = useState(0);
    
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const toggleTimer = () => {
        
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        } else {

            const id = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            setIntervalId(id);
            setIsRunning(true);
        }
    };

    
    return (
        <div className="bg-slate-500 rounded-lg p-5 mt-6 flex justify-between items-center">
            <span className="text-2xl">{props.name}: {time}s</span>
            <button className="bg-slate-700 rounded-lg px-5 py-2" onClick={toggleTimer}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
    );
}
