import React from "react";
import "./Header.scss";
const Header = ({ information }) => {
    const { title } = information;
    return (
        <div className="filmlist__header">
            <h2>{title}</h2>
        </div>
    );
};

export default Header;
