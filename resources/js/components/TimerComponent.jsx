import { useState, useEffect } from "react";
import { format } from 'date-fns';
import axios from 'axios';

export default function TimerComponent({ data, onRemove }) {
    const { name, id, is_running, time: initialTime, start_date } = data;

    const [time, setTime] = useState(initialTime || 0);
    const [isRunning, setIsRunning] = useState(is_running || false);
    const [intervalId, setIntervalId] = useState(null);
    
    useEffect(() => {
        if (isRunning && !intervalId) {

            const newIntervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);

            setIntervalId(newIntervalId);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        };
    }, [isRunning, intervalId]);

    const toggleTimer = async () => {
        if (isRunning) {
            
            await axios.patch(`/update-timer/${id}`, {
                is_running: false,
                start_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                time: time,
            });

            clearInterval(intervalId);
            setIsRunning(false);
        } else {
            await axios.patch(`/update-timer/${id}`, {
                is_running: true,
                start_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                time: time,
            });

            const newIntervalId = setInterval(() => {
                setTime((prevTime) => {
                    const newTime = prevTime + 1;

                    return newTime; 
                });
            }, 1000);

            setIntervalId(newIntervalId);
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
