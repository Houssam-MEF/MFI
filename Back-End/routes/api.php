<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\HeadCountController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('cors')->apiResource('headcount', HeadCountController::class);

Route::apiResource('headcount', HeadCountController::class);


Route::get('/filter', [\App\Http\Controllers\API\HeadCountController::class, 'filter']);

Route::put('/headcount/{hid}', [HeadCountController::class, 'update']);
