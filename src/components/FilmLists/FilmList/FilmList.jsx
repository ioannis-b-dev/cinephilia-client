import React from "react";
import "./FilmList.scss";
import Carousel from "./components/Carousel/Carousel";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
const FilmList = ({ filmlist }) => {
    const { films, title, name } = filmlist;
    console.log(filmlist);
    return (
        <div className="filmlist__container">
            <Header information={{ title, name }} />
            <Carousel films={films} />
            <Footer />
        </div>
    );
};

export default FilmList;
