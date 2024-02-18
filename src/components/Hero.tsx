import React from "react";
import { useNavigate } from "react-router-dom";

function Hero(props: any) {
    const navigate = useNavigate();

    return (
        <div>
            {/* Start Hero Section */}
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>{props.title}</h1>
                                <p className="mb-4">{props.description}</p>
                                <p>
                                    <span
                                        onClick={() => navigate("/shop")}
                                        className="btn btn-secondary me-2"
                                    >
                                        Shop Now
                                    </span>
                                    <a
                                        href="#"
                                        className="btn btn-white-outline"
                                    >
                                        Explore
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img-wrap">
                                <img
                                    src="./assets/images/couch.png"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero Section */}
        </div>
    );
}

export default Hero;
