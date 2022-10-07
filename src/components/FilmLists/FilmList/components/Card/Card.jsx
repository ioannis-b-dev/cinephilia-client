import React, { useState } from "react";
import CardDetails from "../CardDetails/CardDetails";
import "./Card.scss";

const Card = ({ film }) => {
    const { filmPoster, title } = film;
    const [showLinks, setShowLinks] = useState(false);

    return (
        <div
            className="carousel__card "
            onMouseEnter={() => setShowLinks(true)}
            onMouseLeave={() => setShowLinks(false)}
        >
            <img
                src={filmPoster}
                alt={title}
                className={`${showLinks ? "low-opacity" : null}`}
            ></img>
            {showLinks && <CardDetails film={film} />}
        </div>
    );
};

export default Card;
