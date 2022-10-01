import React from "react";
import { Container, Button } from "react-bootstrap";
import "./FilmCard.scss";
import { useState } from "react";
import { useGlobalContext } from "../../../hooks";

const FilmCard = ({ film }) => {
    const { filmPoster, title, youtubeTrailerLink, urlImdb } = film;
    const [showLinks, setShowLinks] = useState(false);
    const { openMyListsModal } = useGlobalContext();
    return (
        <Container
            className={"app__filmcard p-0 m-0"}
            onMouseEnter={() => setShowLinks(true)}
            onMouseLeave={() => setShowLinks(false)}
        >
            <img
                src={filmPoster}
                alt={title}
                className={`${showLinks ? "low-opacity" : null}`}
            ></img>
            {showLinks && (
                <div className="app__filmcard-details">
                    <Button className="app__btn-primary">
                        <a href={urlImdb} target="_blank" rel="noreferrer">
                            IMDb
                        </a>
                    </Button>
                    <Button className="app__btn-primary">
                        <a
                            href={youtubeTrailerLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch Trailer
                        </a>
                    </Button>
                    <Button
                        className="app__btn-primary"
                        onClick={() => openMyListsModal(film)}
                    >
                        Add to my List
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default FilmCard;
