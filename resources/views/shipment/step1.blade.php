<div class="row show" id="create-shipment-1"> {{-- step 1 --}}
    <div class="col-md" id="from-section">
        <div class="text-center">
            <div class="d-inline-block">
                <div class="form-group">
                    <h5 class="text-left d-inline-block w-75 mb-4">From</h5>
                    <label for="from-country" class="text-left w-75"><small>Country / Territory</small></label>
                    <select class="country-list w-75 d-inline-block form-control form-control-sm" name="from-country" id="from-country"></select>
                </div>
                <div class="form-group">
                    <label class="text-left w-75"><small>Address</small></label>
                    <input type="text" class="w-75" class="form-control form-control-sm" name="from-address" id="from-address">
                </div>
                <div class="d-inline-block w-75">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="text-left w-100"><small>City</small></label>
                                <input type="text" class="form-control form-control-sm" name="from-city" id="from-city">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="text-left w-100"><small>State</small></label>
                                <input type="text" class="form-control form-control-sm" name="from-state" id="from-state">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="text-left w-100"><small>Zip Code</small></label><br>
                                <input type="text" class="form-control form-control-sm" name="from-zipcode" id="from-zipcode">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col-md" id="to-section">
        <div class="text-center">
            <div class="d-inline-block">
                <div class="form-group">
                    <h5 class="text-left d-inline-block w-75 mb-4">To</h5>
                    <label for="to-country" class="text-left w-75"><small>Country / Territory</small></label>
                    <select class="country-list w-75 d-inline-block form-control form-control-sm" name="to-country" id="to-country"></select>
                </div>
                <div class="form-group">
                    <label class="text-left w-75"><small>Address</small></label>
                    <input type="text" class="w-75" class="form-control form-control-sm" name="to-address" id="to-address">
                </div>
                <div class="d-inline-block w-75">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="text-left w-100"><small>City</small></label>
                                <input type="text" class="form-control form-control-sm" name="to-city" id="to-city">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="text-left w-100"><small>State</small></label>
                                <input type="text" class="form-control form-control-sm" name="to-state" id="to-state">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="text-left w-100"><small>Zip Code</small></label><br>
                                <input type="text" class="form-control form-control-sm" name="to-zicode" id="to-zipcode">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> {{-- end step 1 --}}
