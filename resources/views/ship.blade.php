@extends('layout')

@section('title', 'Ship')

@section('body-background', '#f1f1f1')

@section('content')
	<div class="nav-spacer"></div>
    <div class="container-fluid mt-5">
        <div class="container">
            <div id="get-quote">
                <h4>Create Shipment </h4>
                <form>
                <div class="card-type card-mid-divided p-3 mt-3">
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
                    
                    <div class="row hide throw-off mb-5" id="create-shipment-2"> {{-- step 2 --}}
                        <div class="col-md-6">
                            <div class="text-center">
                                <div class="d-inline-block w-100">
                                    <div class="form-group">
                                        <h5 class="text-left d-inline-block w-75 mb-4" id="step-2-from-label">From</h5>
                                        <label for="from-name" class="text-left w-75"><small>Name</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="from-name" name="from-name">
                                    </div>
                                    <div class="form-group">
                                        <label class="text-left w-75" for="from-company"><small>Company</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="from-company" name="from-company">
                                    </div>
                                    <div class="form-group">
                                        <label class="text-left w-75" for="from-email"><small>Email Address</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="from-email" name="from-email">
                                    </div>
                                    <div class="w-75 d-inline-block">
                                        <div id="from-phone-area">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="from-phone-type"><small>Phone Type</small></label>
                                                        <select class="form-control form-control-sm" name="from-phone-type" id="from-phone-type">
                                                            <option value="office">Office</option>
                                                            <option value="mobile">Mobile</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="from-phone-code"><small>Code</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="from-phone-code" name="to-phone-code">
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="from-phone-number"><small>Phone</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="from-phone-number" name="to-phone-number">
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="from-phone-ext"><small>Extension</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="from-phone-ext" name="to-phone-ext">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-dark btn-sm float-left" id="add-phone-from" style="padding: .1em .25em"><i class="fas fa-plus-square"></i> Phone</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="text-center">
                                <div class="d-inline-block w-100">
                                    <div class="form-group">
                                        <h5 class="text-left d-inline-block w-75 mb-4" id="step-2-to-label">To</h5>
                                        <label for="to-name" class="text-left w-75"><small>Name</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="to-name" name="to-name">
                                    </div>
                                    <div class="form-group">
                                        <label class="text-left w-75" for="to-company"><small>Company</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="to-company" name="to-company">
                                    </div>
                                    <div class="form-group">
                                        <label class="text-left w-75" for="to-email"><small>Email Address</small></label>
                                        <input type="text" class="w-75" class="form-control form-control-sm" id="to-email" name="to-email">
                                    </div>
                                    <div class="w-75 d-inline-block">
                                        <div id="to-phone-area">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="to-phone-type"><small>Phone Type</small></label>
                                                        <select class="form-control form-control-sm" name="to-phone-type" id="to-phone-type">
                                                            <option value="office">Office</option>
                                                            <option value="mobile">Mobile</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="to-phone-code"><small>Code</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="to-phone-code" name="to-phone-code">
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="to-phone-number"><small>Phone</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="to-phone-number" name="to-phone-number">
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <div class="form-group">
                                                        <label class="text-left w-100" for="to-phone-ext"><small>Extension</small></label>
                                                        <input class="form-control form-control-sm" type="text" id="to-phone-ext" name="to-phone-ext">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button class="btn btn-dark btn-sm float-left" id="add-phone-to" style="padding: .1em .25em"><i class="fas fa-plus-square"></i> Phone</button>
                                    </div>
                                </div>
                        	</div>
                    	</div>
                    </div> {{-- end step 2 --}}
                    
                    <div class="row hide throw-off" id="create-shipment-3"> {{-- step 3 --}}
                        <div id="create-shipment-3-summary">
                            <div class="row" style="padding: .5em 1.2em">
                                <div class="col-md-5 summary-div">
                                    <div class="map-pointer-icon"><i class="fas fa-map-marker-alt"></i></div>
                                    <div class="summary-card">
                                        <span><small>From:</small></span><br>
                                        <h5 id="summary-from-country" style="color: #595959"></h5>
                                        <span id="summary-from-address"></span><br>
                                        <span id="summary-from-csz"></span>
                                    </div>
                                </div>
                                <div class="col-md-5 summary-div">
                                    <div class="map-pointer-icon"><i class="fas fa-map-marker-alt"></i></div>
                                    <div class="summary-card">
                                        <span><small>To:</small></span><br>
                                        <h5 id="summary-to-country" style="color: #595959"></h5>
                                        <span id="summary-to-address"></span><br>
                                        <span id="summary-to-csz"></span>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="d-flex justify-content-center align-items-center w-100 h-100">
                                        <button class="btn btn-dark btn-sm" id="back-step-2"><i class="fas fa-edit"></i> Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="misc w-100">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="pseudo-btn-1" id="docs-btn"><i class="fas fa-file-alt"></i> <span>Documents</span></div>
                                            <span class="text-muted misc-aside"><small>Documents include legal, financial or business paperwork. Items with monetary value are NOT considered a document shipment. </small></span>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="pseudo-btn-1" id="packages-btn"><i class="fas fa-box"></i> <span>Packages</span></div>
                                            <span class="text-muted misc-aside"><small>Packages are goods, merchandise or commodities for personal or commercial purposes. </small></span>
                                        </div>
                                    </div>
                                    <div id="package-extras">
                                        <div id="show-hide" class="hide throw-off">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="border-gray-panel">
                                                        <h5>What is the value of your shipment?</h5>
                                                        <div class="form-group">
                                                            <label><small>Value</small></label><br>
                                                            <div class="custom-input">
                                                                <div class="currency-symbol"><i class="fas fa-dollar-sign"></i></div>
                                                                <input type="text">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="border-gray-panel">
                                                        <h5>Protect your Shipment</h5>
                                                        <p>You value your shipment and so we do - dont forget to protect your shipment! <a href="#">Learn about our shipment protection options.</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div id="notices">
                                        <div id="default-notice" class="notice show">
                                            <div class="notice-box">
                                                <p>Not sure if its a Document or Package? <br><small><i class="fas fa-chevron-right"></i> <a href="#">We can help you decide.</a></small></p>
                                            </div>
                                        </div>
                                        <div id="docs-notice" class="notice throw-off hide">
                                            <div class="notice-box">
                                                <p><h6>Is it a document?</h6><small>Some items you might think are documents are not – check before completing your shipment.</small></p>
                                            </div>
                                        </div>
                                        <div id="basic-notice" class="notice throw-off hide">
                                            <div class="notice-box">
                                                <p><h6>Prohibited Items</h6><small>Some items that are prohibited when shipping to this country.<br><a href="#">See prohibitied items.</a></small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="packages-panel">
                                        <h5>Package Details</h5>
                                        <div class="packages-panel-head">
                                            <div class="row">
                                                <div class="col-md-1"><span class="text-muted">Quantity</span></div>
                                                <div class="col-md-1"><span class="text-muted">Weight(Kg)</span></div>
                                                <div class="col-md-5"><span class="text-muted">Dimensions(cm)</span></div>
                                            </div>
                                        </div>
                                        <div class="packages-panel-body">
                                            <div id="box-area">
                                            </div>
                                            <div class="w-100 h-100 d-flex justify-content-end align-items-center mt-4">
                                                <button class="btn btn-dark btn-sm" id="add-package"><i class="fas fa-plus-square"></i> Add Package</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> {{-- end step 3 --}}
                    
                    
                    <div class="d-flex flex-row-reverse mt-5">
                        <button class="btn btn-success" id="create-shipment-next" id-process="step1">Next</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>

@endsection

