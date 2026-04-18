<?php

// routes/api.php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'getUser']);
    Route::put('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'delete']);
});