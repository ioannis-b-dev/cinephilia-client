import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "../../../../constants/icons";
import "./NavHeader.scss";
const NavHeader = () => {
    return (
        <div className="brand ">
            <Link to="/">
                <LogoIcon className="header-icon" />
            </Link>

            <Link to="/" className="brand-name">
                Cinephilia
            </Link>
        </div>
    );
};

export default NavHeader;
