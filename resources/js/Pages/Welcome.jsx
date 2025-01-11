import TimerComponent from "@/components/TimerComponent";
import axios from "axios";
import { useState } from "react";

export default function Welcome() {
    const [timers, setTimers] = useState([]);

    const [timerName, setTimerName] = useState('');

    const handlerAddTImer = async (event) => {
        event.preventDefault();

        if (timerName) {
            setTimers((prevTImer) => [...prevTImer, timerName]);

            await axios.post('/add-timer', {name: timerName})
            setTimerName('');

        }
    }

    return (
        <>
            <div className="flex h-screen">
                <div className="m-auto bg-slate-900 w-1/2 h-1/2 rounded-xl p-10 overflow-y-scroll">
                    <form className="flex gap-3" onSubmit={handlerAddTImer}>
                        <input className="h-9 rounded-lg focus:border-none" value={timerName} type="text" placeholder="Aggiungi timer.." onChange={(e) => setTimerName(e.target.value)}/>
                        <input className="bg-slate-500 rounded-lg px-5" type="submit" value="add" />
                    </form>

                    {timers.map((timer) => (
                       <TimerComponent name={timer} />
                    ))}
                </div>
            </div>
        </>
    );
}
