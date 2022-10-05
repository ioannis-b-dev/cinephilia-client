import React from "react";

//swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

//swiper styles
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

import "./Carousel.scss";
import Card from "../Card/Card";
const Carousel = ({ films }) => {
    return (
        <Swiper {...options} className="filmlist__carousel">
            {films.map((film) => {
                return (
                    <SwiperSlide
                        key={film.id}
                        className="filmlist__carousel-slide"
                    >
                        <Card film={film} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default Carousel;

const options = {
    slidesPerView: 4,
    loopedSlidesLimit: false,
    spaceBetween: 0,
    loop: true,
    pagination: {
        clickable: true,
    },
    modules: [Pagination, Navigation],
    navigation: true,
    breakpoints: {
        300: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 0,
        },
    },
};
