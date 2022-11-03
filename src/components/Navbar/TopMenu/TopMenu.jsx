import React from "react";
import "./TopMenu.scss";
import { MenuIcon } from "../../../constants/icons";
import TopLinks from "../TopLinks/TopLinks";
import NavHeader from "../NavHeader/NavHeader";
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
            <NavHeader />
            {!isMobileView ? (
                <TopLinks
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
    );
};

export default TopMenu;
