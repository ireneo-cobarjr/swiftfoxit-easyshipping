@extends('layout')

@section('title', 'Home')
@section('navbar', 'white')
@section('content')
	<section class="container-fluid" id="home-banner">
		<div class="container">
			<div class="vh-100 d-flex align-items-center">
				<div>
					<h1>Compare International <br>Shipping Rates</h1>
					<p class="text-muted">Simple, Easy Process | Trusted by Companies</p>
					<button class="btn btn-dark btn-lg mt-5">Sign Up Now!</button>
				</div>
			</div>
		</div>		
	</section>
    <section class="container pt-5 pb-5 mt-5">
        <div class="text-center">
            <h3>How It Works</h3>
            <div class="row">
                <div class="col-md-4">
                    <div class="how-it-works hiw-1">
                        <div class="hiw-img" id="img-1">
                            <img src="img/circle1.png">
                        </div>
                        <p class="green-text">Step 1</p>
                        <p class="hiw-title">Provide Dimensions</p>
                        <p class="hiw-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="how-it-works hiw-1">
                        <div class="hiw-img" id="img-2">
                            <img src="img/circle2.png">
                        </div>
                        <p class="green-text">Step 2</p>
                        <p class="hiw-title">Compare Prices</p>
                        <p class="hiw-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="how-it-works hiw-1">
                        <div class="hiw-img" id="img-3">
                            <img src="img/circle3.png">
                        </div>
                        <p class="green-text">Step 3</p>
                        <p class="hiw-title">Save Time and Money</p>
                        <p class="hiw-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
