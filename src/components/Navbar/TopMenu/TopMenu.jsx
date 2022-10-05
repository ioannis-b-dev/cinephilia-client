import React from "react";
import "./TopMenu.scss";
import { Link } from "react-router-dom";
import { LogoIcon, MenuIcon } from "../../../constants/icons";
import MenuLinks from "../MenuLinks/MenuLinks";
const TopMenu = ({
    user,
    logout,
    isMobileView,
    isMenuOpen,
    toggleMenu,
    openFilmsModal,
    setShowMyLists,
}) => {
    return (
        <div className="app__navbar">
            <div className="app__navbar-header">
                <Link to="/">
                    <LogoIcon className="app__navbar-logo" />
                </Link>

                <Link to="/" className="app__navbar-title">
                    Cinephilia
                </Link>
            </div>
            <div className="app__navbar-menu">
                {!user || !isMobileView ? (
                    <MenuLinks
                        user={user}
                        logout={logout}
                        toggleMenu={toggleMenu}
                        openFilmsModal={openFilmsModal}
                        setShowMyLists={setShowMyLists}
                    />
                ) : (
                    <MenuIcon
                        className="app__navbar-toggle"
                        onClick={() => toggleMenu(!isMenuOpen)}
                    />
                )}
            </div>
        </div>
    );
};

export default TopMenu;
