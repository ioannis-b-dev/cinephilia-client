import React from "react";
import { useGlobalContext } from "../../../../hooks";
import "./CardDetails.scss";
const CardDetails = ({ film }) => {
    const { youtubeTrailerLink, urlImdb } = film;
    const { openMyListsModal } = useGlobalContext();
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
                onClick={() => openMyListsModal(film)}
            >
                Add to my List
            </button>
        </div>
    );
};

export default CardDetails;
