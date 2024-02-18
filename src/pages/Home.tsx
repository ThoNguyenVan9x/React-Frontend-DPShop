import React from "react";
import Hero from "../components/Hero";
import NavbarShop from "../components/NavbarShop";
import ProductItem from "../components/ProductItem";

function Home() {
    return (
        <div>
            <div>
                <Hero
                    title="Thiết kế tối giản"
                    description="Chúng tôi luôn cố gắng tạo ra những sản phẩm đơn giản, mang hơi hướng hiện đại, phù hợp với mọi không gian"
                />

                {/* Start Product Section */}
                <div className="product-section">
                    <div className="container">
                        <div className="row">
                            {/* Start Column 1 */}
                            <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                                <h2 className="mb-4 section-title">
                                    Được chế tạo bằng những vật liệu tuyệt vời
                                </h2>
                                <p className="mb-4">
                                    Sản phẩm của chúng tôi luôn được hoàn thiện
                                    từ những vật liệu thân thiện và đạt chuẩn.{" "}
                                </p>
                                <p>
                                    <a href="#" className="btn">
                                        Explore
                                    </a>
                                </p>
                            </div>
                            <ProductItem
                                id={100}
                                name={"Nordic Chair"}
                                price={15000000}
                                image={"/assets/images/product-1.png"}
                            />
                            <ProductItem
                                id={101}
                                name={"Kruzo Aero Chair"}
                                price={10000000}
                                image={"/assets/images/product-2.png"}
                            />
                            <ProductItem
                                id={102}
                                name={"Ergonomic Chair"}
                                price={25000000}
                                image={"/assets/images/product-3.png"}
                            />
                        </div>
                    </div>
                </div>
                {/* End Product Section */}
                {/* Start Why Choose Us Section */}
                <div className="why-choose-section">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-6">
                                <h2 className="section-title">
                                    Tại sao nên chọn chúng tôi
                                </h2>
                                <p>
                                    Đến với chúng tôi, các bạn sẽ được hỗ trợ
                                    tận tình từ chất lượng sản phẩm, cách thức
                                    thanh toán dễ dàng đến chế độ bảo hành lâu
                                    dài.
                                </p>
                                <div className="row my-5">
                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img
                                                    src="/assets/images/truck.svg"
                                                    alt="Image"
                                                    className="imf-fluid"
                                                />
                                            </div>
                                            <h3>
                                                Vận chuyển miễn phí &amp; Nhanh
                                                chóng
                                            </h3>
                                            <p>
                                                Chính sách hỗ trợ và miễn phí
                                                vận chuyển với những đơn hàng từ
                                                5 triệu.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img
                                                    src="/assets/images/bag.svg"
                                                    alt="Image"
                                                    className="imf-fluid"
                                                />
                                            </div>
                                            <h3>Dễ dàng mua sắm</h3>
                                            <p>
                                                Bạn có thể đến trực tiếp
                                                showroom mua sắm hoặc đặt hàng
                                                ngay tại website.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img
                                                    src="/assets/images/support.svg"
                                                    alt="Image"
                                                    className="imf-fluid"
                                                />
                                            </div>
                                            <h3>Hỗ trợ giải đáp 24/7</h3>
                                            <p>
                                                Hãy gọi điện trực tiếp đến
                                                hotline hoặc gửi mail cho chúng
                                                tôi nếu có bất kỳ thắc mắc gì.
                                                Tư vấn viên sẽ giải đáp cho bạn
                                                24/7.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img
                                                    src="/assets/images/return.svg"
                                                    alt="Image"
                                                    className="imf-fluid"
                                                />
                                            </div>
                                            <h3>Đổi trả dễ dàng</h3>
                                            <p>
                                                Các bạn có thể đổi trả sản phẩm
                                                dễ dàng, nhanh chóng nếu có bất
                                                cứ lỗi nào từ nhà sản xuất.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="img-wrap">
                                    <img
                                        src="/assets/images/why-choose-us-img.jpg"
                                        alt="Image"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Why Choose Us Section */}
                {/* Start We Help Section */}
                <div className="we-help-section">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-lg-7 mb-5 mb-lg-0">
                                <div className="imgs-grid">
                                    <div className="grid grid-1">
                                        <img
                                            src="/assets/images/img-grid-1.jpg"
                                            alt="Untree.co"
                                        />
                                    </div>
                                    <div className="grid grid-2">
                                        <img
                                            src="/assets/images/img-grid-2.jpg"
                                            alt="Untree.co"
                                        />
                                    </div>
                                    <div className="grid grid-3">
                                        <img
                                            src="/assets/images/img-grid-3.jpg"
                                            alt="Untree.co"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 ps-lg-5">
                                <h2 className="section-title mb-4">
                                    We Help You Make Modern Interior Design
                                </h2>
                                <p>
                                    Donec facilisis quam ut purus rutrum
                                    lobortis. Donec vitae odio quis nisl dapibus
                                    malesuada. Nullam ac aliquet velit. Aliquam
                                    vulputate velit imperdiet dolor tempor
                                    tristique. Pellentesque habitant morbi
                                    tristique senectus et netus et malesuada
                                </p>
                                <ul className="list-unstyled custom-list my-4">
                                    <li>
                                        Donec vitae odio quis nisl dapibus
                                        malesuada
                                    </li>
                                    <li>
                                        Donec vitae odio quis nisl dapibus
                                        malesuada
                                    </li>
                                    <li>
                                        Donec vitae odio quis nisl dapibus
                                        malesuada
                                    </li>
                                    <li>
                                        Donec vitae odio quis nisl dapibus
                                        malesuada
                                    </li>
                                </ul>
                                <p>
                                    <a href="#" className="btn">
                                        Explore
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End We Help Section */}
                {/* Start Popular Product */}
                <div className="popular-product">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="product-item-sm d-flex">
                                    <div className="thumbnail">
                                        <img
                                            src="/assets/images/product-1.png"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="pt-3">
                                        <h3>Nordic Chair</h3>
                                        <p>
                                            Donec facilisis quam ut purus rutrum
                                            lobortis. Donec vitae odio{" "}
                                        </p>
                                        <p>
                                            <a href="#">Read More</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="product-item-sm d-flex">
                                    <div className="thumbnail">
                                        <img
                                            src="/assets/images/product-2.png"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="pt-3">
                                        <h3>Kruzo Aero Chair</h3>
                                        <p>
                                            Donec facilisis quam ut purus rutrum
                                            lobortis. Donec vitae odio{" "}
                                        </p>
                                        <p>
                                            <a href="#">Read More</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                                <div className="product-item-sm d-flex">
                                    <div className="thumbnail">
                                        <img
                                            src="/assets/images/product-3.png"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="pt-3">
                                        <h3>Ergonomic Chair</h3>
                                        <p>
                                            Donec facilisis quam ut purus rutrum
                                            lobortis. Donec vitae odio{" "}
                                        </p>
                                        <p>
                                            <a href="#">Read More</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Popular Product */}
                {/* Start Testimonial Slider */}
                <div className="testimonial-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 mx-auto text-center">
                                <h2 className="section-title">Testimonials</h2>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="testimonial-slider-wrap text-center">
                                    <div id="testimonial-nav">
                                        <span
                                            className="prev"
                                            data-controls="prev"
                                        >
                                            <span className="fa fa-chevron-left" />
                                        </span>
                                        <span
                                            className="next"
                                            data-controls="next"
                                        >
                                            <span className="fa fa-chevron-right" />
                                        </span>
                                    </div>
                                    <div className="testimonial-slider">
                                        <div className="item">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-8 mx-auto">
                                                    <div className="testimonial-block text-center">
                                                        <blockquote className="mb-5">
                                                            <p>
                                                                “Donec facilisis
                                                                quam ut purus
                                                                rutrum lobortis.
                                                                Donec vitae odio
                                                                quis nisl
                                                                dapibus
                                                                malesuada.
                                                                Nullam ac
                                                                aliquet velit.
                                                                Aliquam
                                                                vulputate velit
                                                                imperdiet dolor
                                                                tempor
                                                                tristique.
                                                                Pellentesque
                                                                habitant morbi
                                                                tristique
                                                                senectus et
                                                                netus et
                                                                malesuada fames
                                                                ac turpis
                                                                egestas. Integer
                                                                convallis
                                                                volutpat dui
                                                                quis
                                                                scelerisque.”
                                                            </p>
                                                        </blockquote>
                                                        <div className="author-info">
                                                            <div className="author-pic">
                                                                <img
                                                                    src="/assets/images/person-1.png"
                                                                    alt="Maria Jones"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <h3 className="font-weight-bold">
                                                                Maria Jones
                                                            </h3>
                                                            <span className="position d-block mb-3">
                                                                CEO, Co-Founder,
                                                                XYZ Inc.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* END item */}
                                        <div className="item">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-8 mx-auto">
                                                    <div className="testimonial-block text-center">
                                                        <blockquote className="mb-5">
                                                            <p>
                                                                “Donec facilisis
                                                                quam ut purus
                                                                rutrum lobortis.
                                                                Donec vitae odio
                                                                quis nisl
                                                                dapibus
                                                                malesuada.
                                                                Nullam ac
                                                                aliquet velit.
                                                                Aliquam
                                                                vulputate velit
                                                                imperdiet dolor
                                                                tempor
                                                                tristique.
                                                                Pellentesque
                                                                habitant morbi
                                                                tristique
                                                                senectus et
                                                                netus et
                                                                malesuada fames
                                                                ac turpis
                                                                egestas. Integer
                                                                convallis
                                                                volutpat dui
                                                                quis
                                                                scelerisque.”
                                                            </p>
                                                        </blockquote>
                                                        <div className="author-info">
                                                            <div className="author-pic">
                                                                <img
                                                                    src="/assets/images/person-1.png"
                                                                    alt="Maria Jones"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <h3 className="font-weight-bold">
                                                                Maria Jones
                                                            </h3>
                                                            <span className="position d-block mb-3">
                                                                CEO, Co-Founder,
                                                                XYZ Inc.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* END item */}
                                        <div className="item">
                                            <div className="row justify-content-center">
                                                <div className="col-lg-8 mx-auto">
                                                    <div className="testimonial-block text-center">
                                                        <blockquote className="mb-5">
                                                            <p>
                                                                “Donec facilisis
                                                                quam ut purus
                                                                rutrum lobortis.
                                                                Donec vitae odio
                                                                quis nisl
                                                                dapibus
                                                                malesuada.
                                                                Nullam ac
                                                                aliquet velit.
                                                                Aliquam
                                                                vulputate velit
                                                                imperdiet dolor
                                                                tempor
                                                                tristique.
                                                                Pellentesque
                                                                habitant morbi
                                                                tristique
                                                                senectus et
                                                                netus et
                                                                malesuada fames
                                                                ac turpis
                                                                egestas. Integer
                                                                convallis
                                                                volutpat dui
                                                                quis
                                                                scelerisque.”
                                                            </p>
                                                        </blockquote>
                                                        <div className="author-info">
                                                            <div className="author-pic">
                                                                <img
                                                                    src="/assets/images/person-1.png"
                                                                    alt="Maria Jones"
                                                                    className="img-fluid"
                                                                />
                                                            </div>
                                                            <h3 className="font-weight-bold">
                                                                Maria Jones
                                                            </h3>
                                                            <span className="position d-block mb-3">
                                                                CEO, Co-Founder,
                                                                XYZ Inc.
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* END item */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Testimonial Slider */}
                {/* Start Blog Section */}
                <div className="blog-section">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-6">
                                <h2 className="section-title">Recent Blog</h2>
                            </div>
                            <div className="col-md-6 text-start text-md-end">
                                <a href="#" className="more">
                                    View All Posts
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                                <div className="post-entry">
                                    <a href="#" className="post-thumbnail">
                                        <img
                                            src="/assets/images/post-1.jpg"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <div className="post-content-entry">
                                        <h3>
                                            <a href="#">
                                                First Time Home Owner Ideas
                                            </a>
                                        </h3>
                                        <div className="meta">
                                            <span>
                                                by{" "}
                                                <a href="#">Kristin Watson</a>
                                            </span>{" "}
                                            <span>
                                                on <a href="#">Dec 19, 2021</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                                <div className="post-entry">
                                    <a href="#" className="post-thumbnail">
                                        <img
                                            src="/assets/images/post-2.jpg"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <div className="post-content-entry">
                                        <h3>
                                            <a href="#">
                                                How To Keep Your Furniture Clean
                                            </a>
                                        </h3>
                                        <div className="meta">
                                            <span>
                                                by <a href="#">Robert Fox</a>
                                            </span>{" "}
                                            <span>
                                                on <a href="#">Dec 15, 2021</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                                <div className="post-entry">
                                    <a href="#" className="post-thumbnail">
                                        <img
                                            src="/assets/images/post-3.jpg"
                                            alt="Image"
                                            className="img-fluid"
                                        />
                                    </a>
                                    <div className="post-content-entry">
                                        <h3>
                                            <a href="#">
                                                Small Space Furniture Apartment
                                                Ideas
                                            </a>
                                        </h3>
                                        <div className="meta">
                                            <span>
                                                by{" "}
                                                <a href="#">Kristin Watson</a>
                                            </span>{" "}
                                            <span>
                                                on <a href="#">Dec 12, 2021</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Blog Section */}
            </div>
        </div>
    );
}

export default Home;
