import React from "react";
import "./FilmList.scss";
import { Carousel, Info } from "../../components";
const FilmList = ({ filmlist }) => {
    const { films, title, name, creator, _id } = filmlist;

    return (
        <section className="filmlist">
            <Info title={title} name={name} creator={creator} _id={_id} />
            <Carousel films={films} />
        </section>
    );
};

export default FilmList;
