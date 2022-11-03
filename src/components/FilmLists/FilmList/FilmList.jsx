import React from "react";
import "./FilmList.scss";
import Carousel from "./components/Carousel/Carousel";
import { LikeIcon, ShareIcon } from "../../../constants/icons";
const FilmList = ({ filmlist, index }) => {
    const { films, title, name } = filmlist;
    return (
        <section className="filmlist">
            <div className="info">
                <div className="info-desc">
                    <h3 className="text-center fs-600">{title}</h3>
                    <h3 className="text-center">@{name}</h3>
                </div>
                <div className="info-cta">
                    <LikeIcon />
                    <ShareIcon />
                </div>
            </div>
            <Carousel films={films} />
        </section>
    );
};

export default FilmList;

/* <div className="filmlist__footer">
                <div className="filmlist__footer-icons">
                    <LikeIcon />
                    <ShareIcon />
                </div>
                <div className="filmlist__footer-desc">
                    <h3>@{name}</h3>
                    <h3>{title}</h3>
                </div>
            </div> */
