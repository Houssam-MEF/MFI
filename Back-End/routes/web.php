<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HeadCountController;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/homepage', function () {
    return view('homepage');
});

Route::post('/homepage/truncateTable', [HeadCountController::class, 'truncateTable'])->name('truncateTable');

Route::post('/homepage/import', [HeadCountController::class, 'import'])->name('import');

Route::get('/users/export', [UserController::class, 'export']);
