import React from "react";
import styles from "./FilmList.module.css";

function FilmList({ films, removeFilm }) {
    return (
        <div className={`${styles.listContainer} `}>
            {films.map((film) => {
                const { id, title, year } = film;
                return (
                    <div
                        className={`${styles.filmItem} rounded-pill `}
                        key={id}
                    >
                        <p className={styles.filmDescription}>
                            {title}
                            {year}
                        </p>

                        <button
                            type="button"
                            className="btn-close btn-close-white btn-xs"
                            onClick={() => removeFilm(id)}
                        ></button>
                    </div>
                );
            })}
        </div>
    );
}

export default FilmList;
