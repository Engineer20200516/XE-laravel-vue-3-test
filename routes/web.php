<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('{any?}', function () {
    return view('application');
})->where('any', '.*');

// Route::get('send', NotifierController::class)->where('', '');

// Route::get('mail', function () {
//     $order = App\Order::find(1);
//     return (new App\Notifications\StatusUpdate($order))
//         ->toMail($order->user);
// });

