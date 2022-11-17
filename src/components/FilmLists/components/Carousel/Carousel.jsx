import React from "react";

//swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

//swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import "./Carousel.scss";
import { Card } from "../../components";
const Carousel = ({ films }) => {
    return (
        <Swiper {...options} className="carousel">
            {films.map((film) => {
                return (
                    <SwiperSlide key={film.id}>
                        <Card film={film} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default Carousel;

const options = {
    slidesPerView: 3,
    loopedSlidesLimit: false,
    spaceBetween: 25,
    loop: true,
    pagination: {
        clickable: true,
    },
    modules: [Pagination, Navigation],

    navigation: true,
    breakpoints: {
        250: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
};
