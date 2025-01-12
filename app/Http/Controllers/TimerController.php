<?php

namespace App\Http\Controllers;

use App\Models\Timer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimerController extends Controller
{

    public function index() 
    {
        $timers = Timer::get();

        return  Inertia::render('Welcome', [
            'getTimers' => $timers
        ]);
    }

    public function store(Request $request) 
    {
        $timer = Timer::create([
            'name' => $request->name
        ]);

        return response()->json($timer);
    }

    public function destroy($id)
    {
        $timer = Timer::findOrFail($id);

        $timer->delete();

        return response('Timer eliminato');
    }
}
