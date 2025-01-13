<?php

namespace App\Http\Controllers;

use App\Models\Timer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimerController extends Controller
{
    public function index() 
{

    // Ottieni la lista di tutti i timer
    $timers = Timer::get()->map(function ($timer)  {
        if ($timer->is_running) {
            // Converte la start_date in un'istanza Carbon
            $startDate = Carbon::parse($timer->start_date);
            // Calcola la differenza in secondi tra il tempo corrente e la start_date
            $secondsElapsed = $startDate->diffInSeconds(Carbon::now(), false);
            // Aggiungi i secondi trascorsi al tempo già salvato

            $timer->time = $timer->time + $secondsElapsed;
        }

        return $timer;
    });

    return Inertia::render('Welcome', [
        'getTimers' => $timers
    ]);
}


    public function store(Request $request) 
    {
        $timer = Timer::create([
            'name' => $request->name,
            'is_running' => false,
            'time' => 0,
            'start_date' => date("Y-m-d H:i:s"),
        ]);

        return response()->json($timer);
    }

    public function destroy($id)
    {
        $timer = Timer::findOrFail($id);

        $timer->delete();

        return response('Timer eliminato');
    }

    public function update(Request $request, $id)
    {

        $timer = Timer::findOrFail($id);
        $timer->update([
            'is_running' => $request->is_running,
            'time' => $request->time,
            'start_date' => $request->start_date,
        ]);


        return response('Timer eliminato');
    }
}