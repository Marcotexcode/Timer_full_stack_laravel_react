<?php
use App\Http\Controllers\TimerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [TimerController::class, 'index']);
Route::post('/add-timer', [TimerController::class, 'store']);
Route::delete('/delete-timer/{id}', [TimerController::class, 'destroy']);
Route::patch('/update-timer/{id}', [TimerController::class, 'update']);

require __DIR__.'/auth.php';

