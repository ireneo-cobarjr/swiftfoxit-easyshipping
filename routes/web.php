<?php

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

Route::view('/', 'home');
Route::view('Home', 'home');
Route::view('signin', 'signin');
Route::view('login', 'login');
Route::view('About', 'about');
Route::view('Track', 'track');
Route::view('Help', 'help');
Route::view('Pricing', 'pricing');
Route::view('Ship', 'ship');
