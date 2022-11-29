import React from "react";
import "./TopNav.scss";
import NavLinks from "../NavLinks/NavLinks";
import { NavToggleIcon } from "../../../../constants/icons";
const TopNav = ({ isMobileView, toggleMenu, isMenuOpen }) => {
    return (
        <div className="topnav">
            {isMobileView ? (
                <NavToggleIcon
                    className="header-icon"
                    onClick={() => toggleMenu(!isMenuOpen)}
                />
            ) : (
                <NavLinks toggleMenu={toggleMenu} />
            )}
        </div>
    );
};

export default TopNav;
