import React from "react";
import "./FilmList.scss";
import Carousel from "./components/Carousel/Carousel";

const FilmList = ({ filmlist, index }) => {
    const { films, title, name } = filmlist;
    return (
        <section>
            <div className="filmlist__container">
                <div className="filmlist__header">
                    <h2>{title}</h2>
                </div>
                <Carousel films={films} />
                <div className="filmlist__footer">
                    WORK IN PROGRESS ADD BUTTONS HERE
                </div>
            </div>
        </section>
    );
};

export default FilmList;
