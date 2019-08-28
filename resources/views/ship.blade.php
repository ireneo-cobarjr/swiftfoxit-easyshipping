@extends('layout')

@section('title', 'Ship')

@section('body-background', '#f1f1f1')

@section('content')
	<div class="nav-spacer"></div>
    <div class="container-fluid mt-5">
        <div class="container">
            <div id="get-quote">
                <h4 class="d-inline-block">Create Shipment</h4>
                
                <div id="progress-visual" class="float-right d-inline-block">
                    <span id="visual-s1"></span>
                    <span id="visual-s2"></span>
                    <span id="visual-s3"></span>
                    <span id="visual-s4"></span>
                </div>
                <form>
                <div class="card-type card-mid-divided p-3 mt-3">
                    @include('shipment.step1')
                    @include('shipment.step2')
                    @include('shipment.step3')
                    <div class="d-flex flex-row-reverse mt-5" id="end-on-final">
                        <button class="btn btn-success" id="create-shipment-next" id-process="step1">Next</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>

@endsection

