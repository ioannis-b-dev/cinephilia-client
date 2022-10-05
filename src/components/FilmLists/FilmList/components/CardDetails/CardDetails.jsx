import React from "react";
import { useGlobalContext } from "../../../../../hooks";
import "./CardDetails.scss";
const CardDetails = ({ film }) => {
    const { youtubeTrailerLink, urlImdb } = film;
    const { openMyListsModal } = useGlobalContext();
    return (
        <div className="carousel__card-details">
            <button className="app__btn-primary">
                <a href={urlImdb} target="_blank" rel="noreferrer">
                    IMDb
                </a>
            </button>
            <button className="app__btn-primary">
                <a href={youtubeTrailerLink} target="_blank" rel="noreferrer">
                    Watch Trailer
                </a>
            </button>
            <button
                className="app__btn-primary"
                onClick={() => openMyListsModal(film)}
            >
                Add to my List
            </button>
        </div>
    );
};

export default CardDetails;
