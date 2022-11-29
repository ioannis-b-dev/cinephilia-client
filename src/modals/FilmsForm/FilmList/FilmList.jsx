import React from "react";
import "./FilmList.scss";
const FilmList = ({ films, removeFilm }) => {
    return (
        <div className="app__filmlist">
            {films.map((film) => {
                const { id, title } = film;
                return (
                    <div className="app__filmlist-item " key={id}>
                        <p className="m-0">{title}</p>

                        <button
                            type="button"
                            className="btn-close btn-close-dark btn-xs"
                            onClick={() => removeFilm(id)}
                        ></button>
                    </div>
                );
            })}
        </div>
    );
};

export default FilmList;
