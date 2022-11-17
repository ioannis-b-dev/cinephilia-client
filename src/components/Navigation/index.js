import React from "react";
import "./styles.scss";

import { useNavigation } from "../../hooks";
import { TopNav, SideNav, NavHeader } from "./components";

const Navbar = () => {
    const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation();
    return (
        <header className="primary-header">
            <NavHeader />
            <TopNav
                isMobileView={isMobileView}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {isMobileView && <SideNav isMenuOpen={isMenuOpen} />}
        </header>
    );
};

export default Navbar;

/* <TopMenu
                user={user}
                logout={logout}
                isMobileView={isMobileView}
                toggleMenu={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                openFilmsModal={openFilmsModal}
                setShowMyLists={setShowMyLists}
            /> */

/* <SideMenu
                user={user}
                logout={logout}
                isMobileView={isMobileView}
                toggleMenu={setIsMenuOpen}
                isMenuOpen={isMenuOpen}
                openFilmsModal={openFilmsModal}
                setShowMyLists={setShowMyLists}
            /> */
