import React from "react";
import { Container, Button } from "react-bootstrap";
import styles from "./FilmCard.module.css";
import { useState } from "react";
import { useGlobalContext } from "../../../hooks/GlobalContext";

const FilmCard = ({ film }) => {
    const { filmPoster, title, youtubeTrailerLink, urlImdb } = film;
    const [showLinks, setShowLinks] = useState(false);
    const { openMyListsModal } = useGlobalContext();
    return (
        <Container
            className={`${styles.cardContainer} p-0 m-0`}
            onMouseEnter={() => setShowLinks(true)}
            onMouseLeave={() => setShowLinks(false)}
        >
            <img
                src={filmPoster}
                alt={title}
                className={`${styles.filmImage} ${
                    showLinks ? styles.lowOpacity : null
                }`}
            ></img>
            {showLinks && (
                <div className={styles.cardDetails}>
                    <Button className={styles.cardButton}>
                        <a href={urlImdb} target="_blank" rel="noreferrer">
                            IMDb
                        </a>
                    </Button>
                    <Button className={styles.cardButton}>
                        <a
                            href={youtubeTrailerLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch Trailer
                        </a>
                    </Button>
                    <Button
                        className={styles.cardButton}
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
