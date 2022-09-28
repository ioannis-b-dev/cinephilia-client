import React from "react";
import "./FilmList.scss";
const FilmList = ({ films, removeFilm }) => {
    return (
        <div className="app__filmlist">
            {films.map((film) => {
                const { id, title, year } = film;
                return (
                    <div className="app__filmlist-item rounded-pill" key={id}>
                        <p className="m-0">
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
};

export default FilmList;
