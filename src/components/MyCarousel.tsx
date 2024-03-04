import React from "react";
import { Carousel } from "react-bootstrap";

function MyCarousel() {
    const images = [
        {
            src: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
            alt: "Hiện đại, độc đáo",
            title: "Hiện đại, độc đáo",
            description: "Lấy cảm hứng từ những điều gần gũi nhất",
        },
        {
            src: "https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg",
            alt: "Đơn giản, mộc mạc",
            title: "Đơn giản, mộc mạc",
            description: "Chất liệu thân thiện với con người và môi trường",
        },
        {
            src: "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "Sang trọng, tinh tế",
            title: "Sang trọng, tinh tế",
            description: "Mang lại không gian thoải mái",
        },
    ];
    return (
        <div>
            <Carousel fade>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            style={{ height: "300px" }}
                            className="d-block w-100 img-hero-shop"
                            src={image.src}
                            alt={image.alt}
                        />
                        <Carousel.Caption>
                            <h3>{image.title}</h3>
                            <p>{image.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default MyCarousel;
