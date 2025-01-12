import { useState } from "react";

export default function TimerComponent({data, onRemove}) {
    const { name, id } = data


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
            <span className="text-2xl">{name}: {time}s</span>
            <div className="flex gap-2">
                <button className="bg-slate-700 btn" onClick={toggleTimer}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button className="bg-slate-700 btn" onClick={() => onRemove(id)}>X</button>
            </div>
        </div>
    );
}
