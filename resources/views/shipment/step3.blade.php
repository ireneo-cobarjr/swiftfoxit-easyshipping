<div class="row hide throw-off" id="create-shipment-3"> {{-- step 3 --}}
    @include('shipment.step3-parts.summary')
    <div class="step3-cont w-100">
        <div class="misc w-100">
            @include('shipment.step3-parts.misc')
            @include('shipment.step3-parts.package')
        </div>
        <div class="row throw-off hide mt-5" id="final">
            <div class="col-md-4">
                <div id="date-picker-container">
                    <input class="ml-3" id="date-picker" type="text" style="opacity: 0">
                </div>
            </div>
            <div class="col-md-8 pt-5 pr-5 pl-0">
                <div class="delivery-details">
                    <div class="text-center d-inline-block p-2" style="width: 225px">
                        <span class="dd-head"><small>Ship Date:</small></span><br>
                        <div class="bg-light p-1">
                            <span class="delivery-day text-uppercase"></span><br>
                            <span class="delivery-date"></span><br>
                            <span class="delivery-month"></span>
                            <span class="delivery-year"></span>
                        </div>
                    </div>
                    <div class="d-inline-block float-right" id="final-rate">
                        <span>Estimated Rate:</span><br>
                        <span id="rate"><sup>US$</sup> <span style="font-weight: 700">142.83</span></span>
                        <div class="ml-3 mt-2">
                            <span><small>Transaction Charges</small></span><br>
                            <span><small>US$ 120.00</small></span><br>
                            <span><small><a href="#">Details <i class="fas fa-chevron-down"></i></a></small></span>
                        </div>
                        <button class="btn btn-dark float-right" style="margin-top: -1.5rem; margin-right: 1rem;">Make Payment</button>
                    </div>
                    <div id="delivered-on" class="text-center" style="width: 225px;"><small>Shipped by:</small><br> 1 to 6 of Day(s)</div>
                </div>
            </div>
        </div>
    </div>
</div> {{-- end step 3 --}}
