<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::group(
        [
            'middleware' => 'auth:sanctum'
        ],
        function () {
            Route::get('logout', [AuthController::class, 'logout']);
            Route::get('user', [AuthController::class, 'user']);
        }
    );
});

Route::group(
    [
        'middleware' => 'auth:sanctum'
    ],
    function () {
        Route::get('companies/all', [CompanyController::class, 'all']);
        Route::resource('companies', CompanyController::class);
        Route::resource('employees', EmployeeController::class);
    }
);
