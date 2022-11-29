import React from "react";

import "./CardDetails.scss";
import { useGlobalContext } from "../../../../hooks";
const CardDetails = ({ film }) => {
    const { youtubeTrailerLink, urlImdb } = film;
    const { openFilmAddModal } = useGlobalContext();
    return (
        <div className="carousel__card-details">
            <a
                href={urlImdb}
                target="_blank"
                rel="noreferrer"
                className="card__link"
            >
                IMDb
            </a>

            <a
                href={youtubeTrailerLink}
                target="_blank"
                rel="noreferrer"
                className="card__link"
            >
                Watch Trailer
            </a>

            <button
                className="card__link"
                onClick={() => openFilmAddModal(film)}
            >
                Add to my List
            </button>
        </div>
    );
};

export default CardDetails;
