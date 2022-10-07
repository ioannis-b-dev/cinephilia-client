import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "../../../constants/icons";
import "./NavHeader.scss";
const NavHeader = () => {
    return (
        <div className="app__navbar-header">
            <Link to="/">
                <LogoIcon className="app__navbar-logo" />
            </Link>

            <Link to="/" className="app__navbar-title">
                Cinephilia
            </Link>
        </div>
    );
};

export default NavHeader;
