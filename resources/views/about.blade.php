@extends('layout')

@section('title', 'About')

@section('content')
	<div class="nav-spacer"></div>
    <div class="container">
        <section>
            <div class="row">
                <div class="col-md-12">
                    <div class="about-us-post-type pt-5 pl-5 pr-5 pb-3 font-9">
                        <h3>About Us</h3>
                        <p class="font-weight-bold text-muted">History</p>
                        <p class="text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <button class="btn btn-dark btn-sm">Read More</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="about-us-post-type pt-5 pl-5 pr-5 pb-3 font-9">
                        <h3>Our Shipping Rate Engine</h3>
                        <p class="text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <button class="btn btn-dark btn-sm">Read More</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="about-us-post-type pt-5 pl-5 pr-5 pb-3 font-9">
                        <h3>Our Careers</h3>
                        <p class="text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <button class="btn btn-dark btn-sm">Read More</button>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="d-flex justify-content-center mt-5">
                <div class="about-us-share-post">
                    <span class="font-9">Share this post:
                        <a href="#" class="share-link">
                            <div class="d-inline-block share-on">
                                <div class="social-circle">
                                    <i class="fab fa-facebook-f"></i>
                                </div>
                                 on Facebook 
                            </div>
                        </a>
                        <a href="#" class="share-link">
                            <div class="d-inline-block share-on">
                                <div class="social-circle">
                                    <i class="fab fa-twitter"></i>
                                </div>
                                 on Twitter 
                            </div>
                        </a>
                        <a href="#" class="share-link">
                            <div class="d-inline-block share-on">
                                <div class="social-circle">
                                    <i class="fab fa-google-plus-g"></i>
                                </div>
                                 on Google +
                            </div>
                        </a>
                    </span>
                </div>
            </div>
        </section>
        <section class="testimonials">
            <div class="d-flex justify-content-center mt-5 pt-5">
                <div class="text-center">
                    <h3>Testimonials</h3>
                    <p>Learn what our Customers have to say</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="testimony-card">
                        <img class="customer-img" src="img/testimonial1.png">
                        <p class="testimony-text text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <span class="customer-name">Stanley Pena</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimony-card">
                        <img class="customer-img" src="img/testimonial2.png">
                        <p class="testimony-text text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <span class="customer-name">Kelly Jones</span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="testimony-card">
                        <img class="customer-img" src="img/testimonial3.png">
                        <p class="testimony-text text-justify font-9">Lorem ipsum dolor sit amet. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ornare congue erat, eu pretium elit hendrerit sed. Mauris a posuere mauris. Vivamus a tempor sem. Sed at consequat nunc. Vivamus ante metus, ultricies varius mauris ut, tempus maximus mi.</p>
                        <span class="customer-name">Nelson Leonard</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
@endsection
