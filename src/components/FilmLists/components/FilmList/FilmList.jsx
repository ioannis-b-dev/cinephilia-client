import React from "react";
import "./FilmList.scss";
import { Carousel, CTA } from "../../components";
const FilmList = ({ filmlist }) => {
    const { films, title, name, creator, _id } = filmlist;

    return (
        <section className="filmlist">
            <div className="info">
                <div className="info-desc">
                    <h3 className="text-center fs-600">{title}</h3>
                    <h3 className="text-center">@{name}</h3>
                </div>
                <CTA creator={creator} listId={_id} />
            </div>
            <Carousel films={films} />
        </section>
    );
};

export default FilmList;
