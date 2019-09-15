@extends('layout')

@section('title', 'Ship')
@section('navbar', 'black')

@section('body-background', 'white')

@section('content')
    <div class="nav-spacer">
    </div>

    <div class="container-fluid text-center pt-5 pb-5 bg-yellow">
        <h2 style="font-weight: 400" id="ship-slogan">Get a Quote and Compare our Services</h2>
        <div class="container p-3 w-75">
            <form id="shipping" data-url="{{route('send')}}">
                <div class="blinker pl-5 pr-5 mt-5">
                    <div class="blinker-item show" id="blinker-item-1">
                        <div class="row w-75">
                            <h5 class="text-left d-inline-block mb-4 pl-3">From</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-7">
                                <select class="d-inline-block input-1 w-100" name="from-country" id="from-country">
                                    <option value="US" selected>United States</option>
                                </select>
                                <label for="from-country" class="text-left d-block"><small>Country / Territory</small></label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" class="input-1 w-100" name="from-city" id="from-city">
                                <label class="text-left w-100"><small>City</small></label>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <h5 class="d-inline-block mb-4 text-left pl-4">To</h5>
                        </div>
                        <div class="row">
                            <div class="col-md-7">
                                <select class="country-list d-inline-block input-1 w-100" name="to-country" id="to-country"></select>
                                <label for="to-country" class="text-left d-block"><small>Country / Territory</small></label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" class="input-1 w-100" name="to-city" id="to-city">
                                <label class="text-left w-100"><small>City</small></label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mt-5">
                            <button type="button" class="btn btn-blue blink-trigger" blinker-target="blinker-item-2" blinker-from="blinker-item-1">Next</button>
                        </div>
                    </div> {{-- blinker item 1 --}}
                    <div class="blinker-item hide throw-off" id="blinker-item-2">
                        <div class="row">
                            <div class="col-md-12">
                                <h4 class="text-left mt-3 mb-3" style="font-weight: 400">What will you ship?</h4>
                                <div style="background-color: white" class="p-3">
                                    <div class="d-flex justify-content-end">
                                        <label>Measurement in:</label>
                                        <select class="d-inline-block form-control form-control-sm input-1 gray box-units" id="box-units">
                                            <option value="metric" selected>Kilogram(kg) / Centimeter (cm)</option>
                                            <option value="english">pound (lb) / inch (in)</option>
                                        </select>
                                    </div>
                                    <div id="box-area">
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-flex justify-content-end mt-3">
                                                <button type="button" class="btn btn-sm btn-dark" id="add-box">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100 mt-5">
                                <div class="d-inline-block mt-5">
                                    <button type="button" class="btn btn-blue btn-lg blink-trigger" blinker-target="blinker-item-3" blinker-from="blinker-item-2">Get Quote</button>
                                </div>
                            </div>
                        </div>
                    </div> {{-- blinker item 2 --}}
                    <div class="blinker-item hide throw-off" id="blinker-item-3">
                        <div class="container text-center">
                            <h3 style="font-weight: 400">Your Rate</h3>
                            <h1 class="display-1" style="font-weight: 400">$481.25</h1>
                            <p class="mt-3 mb-3">Promotion code <input class="input-1" id="promo-code"><button type="button" class="btn btn-sm btn-outline-dark btn-rounded">Apply</button></p>
                            <p class="mt-5"><span style="font-weight: 500; font-size: 1.35rem">Estimated Delivery Monday 8, Aug 2019</span><br><small>Delivered via Fedex Company</small></p>
                        </div>
                        <div class="text-center mt-5">
                            <button type="button" class="btn btn-lg btn-blue d-inline-block blink-trigger" blinker-target="blinker-item-4" blinker-from="blinker-item-3">Ship Now!</button>
                        </div>
                    </div> {{-- blinker item 3 --}}
                    <div class="blinker-item hide throw-off" id="blinker-item-4">
                        <div class="summary summary-done" id="summary-1">
                            <div class="d-flex justify-content-around align-items-center mb-5">
                                <div class="d-inline-block">
                                    <span>Total Weight</span><br>
                                    <h4 id="total-weight">11.5 kg</h4>
                                </div>
                                <div class="d-inline-block">
                                    <h2>$481.25</h2>
                                </div>
                                <div class="d-inline-block"><button type="button" class="btn btn-outline-dark btn-rounded blink-trigger" blinker-target="blinker-item-2" blinker-from="blinker-item-4">Edit</button></div>
                            </div>
                        </div>
                        <div class="summary white summary-working" id="summary-2">
                            <div class="sum-head mb-5" id="head1"><h3>Please complete your full address and recipent's address</h3></div>
                            <div class="d-flex justify-content-around align-items-center mb-5">
                                <div>
                                    <p id="summary-from-country">From Country</p>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Address">
                                    </div>
                                    <p id="summary-from-city">City</p>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="State">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="zip code">
                                    </div>
                                    <div class="form-group mt-5">
                                        <input class="input-1 on-work" placeholder="Sender name">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Sender email">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Sender phone">
                                    </div>
                                </div>
                                <div>
                                    <p id="summary-to-country">to Country</p>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Address">
                                    </div>
                                    <p id="summary-to-city">City</p>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="State">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="zip code">
                                    </div>
                                    <div class="form-group mt-5">
                                        <input class="input-1 on-work" placeholder="Recipient name">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Recipient email">
                                    </div>
                                    <div class="form-group">
                                        <input class="input-1 on-work" placeholder="Recipient phone">
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-blue" id="summary-2-next" data-state="next">Next</button>
                            </div>
                        </div>
                        <div class="summary white summary-working" id="summary-3">
                            <div class="sum-head mb-5" id="head2"><h3>Specify the contents of your shipment</h3></div>
                            <div class="d-flex justify-content-right align-items-center pl-3">
                                <button type="button" class="btn btn-dark" id="add-item" style="padding: .125rem .75rem">Add Item</button>
                            </div>
                            <div id="item-area">
                            </div>
                            <div class="d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-blue" id="summary-3-next" data-state="next">Next</button>
                            </div>
                        </div>
                        <div class="summary white summary-working" id="summary-4">
                            <div class="d-flex justify-content-around align-items-center mb-5">
                                <div class="container text-center">
                                    <h1 class="display-3">$481.25</h1>
                                    <p class="mb-5"><span>Shipping Fees: $200</span><br><span>Discount: $100</span><br><span>Protection: $10</span></p>
                                </div>
                            </div>
                            <div class="form-check mb-3">
                              <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                              <label class="form-check-label" for="defaultCheck1">
                                Accept Terms and Conditions.
                              </label>
                            </div>
                            @csrf
                            <div class="d-flex justify-content-center align-items-center">
                                <button type="button" class="btn btn-blue" id="send">Pay and get the label</button>
                            </div>
                        </div>
                    </div> {{-- blinker item 4 --}}

                </div> {{-- blinker --}}
            </form>
        </div>
    </div>
@endsection

