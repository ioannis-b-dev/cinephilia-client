import React from "react";
import "./FilmList.scss";
import Carousel from "./components/Carousel/Carousel";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
const FilmList = ({ filmlist, index }) => {
    const { films, title, name } = filmlist;
    return (
        <div className={`filmlist__container ${index % 2 === 0 && "invert"}`}>
            <div className="filmlist">
                <Header information={{ title, name }} />
                <Carousel films={films} />
                <Footer />
            </div>
        </div>
    );
};

export default FilmList;
