import ConfirmComponent from "@/components/ConfirmComponent";
import TimerComponent from "@/components/TimerComponent";
import axios from "axios";
import { useState } from "react";

export default function Welcome({getTimers}) {

    const [timers, setTimers] = useState(getTimers || []);
    const [timerName, setTimerName] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timerIdToRemove, setTimerIdToRemove] = useState(null);

    const handlerAddTimer = async (event) => {

        event.preventDefault();

        if (!timerName) {
            setError("Nome timer obblgatorio!");
            return;
        }

        if (timerName) {
            try {
                const resp = await axios.post('/add-timer', {name: timerName});

                setTimers((prevTimer) => [...prevTimer, resp.data]);

                setTimerName('');
                setError('');
            } catch (error) {
                setError("Errore durante l'aggiunta del timer!");
                console.error("Errore durante l'aggiunta del timer: ", error)
            }
        }
    }

    const handleRemoveTimer = async (id) => {
        setIsModalOpen(true);
        setTimerIdToRemove(id);
    }

    const confirmDeleteTimer = async () => {
        if (timerIdToRemove) {
            try {
                await axios.delete(`/delete-timer/${timerIdToRemove}`);

                setTimers((prevTimer) => prevTimer.filter((timer) => timer.id !== timerIdToRemove));
                setError(' ');
                setIsModalOpen(false);
            } catch (error) {
                setIsModalOpen(false);
                setError("Errore durante l'eliminazione del timer!");
                console.error("Errore durante l'eliminazione del timer: ", error)
            }
        }
    }

    const cancelDeleteTimer = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="relative m-auto bg-slate-900 w-1/2 h-1/2 rounded-xl p-10 overflow-y-scroll">
                    <div className="absolute py-0.5 px-2 rounded-md mb-2 text-red-600 top-2.5 left-8">{error}</div>
                    <form className="flex gap-3" onSubmit={handlerAddTimer}>
                        <input className="h-9 rounded-lg focus:border-none" value={timerName} type="text" placeholder="Aggiungi timer.." onChange={(e) => setTimerName(e.target.value)}/>
                        <input className="bg-slate-500 btn" type="submit" value="Add" />
                    </form>
                    {timers.map((timer) => (
                       <TimerComponent data={timer} onRemove = {handleRemoveTimer}/>
                    ))}
                </div>

                <ConfirmComponent
                    isModalOpen={isModalOpen}
                    onConfirm={confirmDeleteTimer} 
                    onCancel={cancelDeleteTimer}   
                />
            </div>
        </>
    );
}
