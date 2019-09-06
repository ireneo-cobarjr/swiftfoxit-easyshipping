<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;

class OrdersController extends Controller
{
    public function store() {
    
        $data = request()->validate([

            'from-country' => 'required',
            'from-address' => 'required|min:3',
            'from-city' => 'required|min:3',
            'from-state' => 'required|min:3',
            'from-zipcode' => 'required|min:3',

            'from-name' => 'required|min:3',
            'from-company' => 'required|min:3',
            'from-email' => 'required|email',
            'from-phone-type' => 'required',
            'from-phone-code' => 'required|digits_between:1,3',
            'from-phone-number' => 'required|digits_between:5,12',
            'from-phone-ext' => 'nullable',

            'to-country' => 'required',
            'to-address' => 'required|min:3',
            'to-city' => 'required|min:3',
            'to-state' => 'required|min:3',
            'to-zipcode' => 'required|min:3',

            'to-name' => 'required|min:3',
            'to-company' => 'required|min:3',
            'to-email' => 'required|email',
            'to-phone-type' => 'required',
            'to-phone-code' => 'required|digits_between:1,3',
            'to-phone-number' => 'required|digits_between:5,12',
            'to-phone-ext' => 'nullable',
        ]);
        
        $order = new Order();
        $order->fromCountry = request('from-country');
        $order->fromAddress = request('from-address');
        $order->fromCity = request('from-city');
        $order->fromState = request('from-state');
        $order->fromZipcode = request('from-zipcode');

        $order->fromName = request('from-name');
        $order->fromCompany = request('from-company');
        $order->fromEmail = request('from-email');
        $order->fromPhonetype = request('from-phone-type');
        $order->fromPhonecode = request('from-phone-code');
        $order->fromPhonenumber = request('from-phone-number');
        
        if(empty(request('from-phone-ext'))) {
            $order->fromPhoneext = "No Value provided";
        } else {
            $order->fromPhoneext = request('from-phone-ext');
        }

        $order->toCountry = request('to-country');
        $order->toAddress = request('to-address');
        $order->toCity = request('to-city');
        $order->toState = request('to-state');
        $order->toZipcode = request('to-zipcode');

        $order->toName = request('to-name');
        $order->toCompany = request('to-company');
        $order->toEmail = request('to-email');
        $order->toPhonetype = request('to-phone-type');
        $order->toPhonecode = request('to-phone-code');
        $order->toPhonenumber = request('to-phone-number');

        if(empty(request('to-phone-ext'))) {
            $order->toPhoneext = "No Value provided";
        } else {
            $order->fromPhoneext = request('to-phone-ext');
        }

        $order->save();
        
        return back();
    }
}
