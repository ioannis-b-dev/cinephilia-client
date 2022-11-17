import React from "react";
import "./TopNav.scss";
import NavLinks from "../NavLinks/NavLinks";
import { NavToggleIcon } from "../../../../constants/icons";
const TopNav = ({ isMobileView, setIsMenuOpen, isMenuOpen }) => {
    return (
        <nav className="topnav">
            {isMobileView ? (
                <NavToggleIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
            ) : (
                <NavLinks />
            )}
        </nav>
    );
};

export default TopNav;
