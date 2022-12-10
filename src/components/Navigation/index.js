import React, { useRef, useLayoutEffect, useState } from "react";
import "./styles.scss";

import { useNavigation } from "../../hooks";
import { TopNav, SideNav, NavHeader } from "./components";

const Navbar = () => {
    const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation();
    const navRef = useRef(null);
    const [yoffset, setYoffset] = useState(0);

    useLayoutEffect(() => {
        //positions sidemenu after navheader + 1px for border bottom
        setYoffset(navRef.current.offsetHeight);
    }, [isMobileView]);

    return (
        <div className="primary-header" ref={navRef}>
            <NavHeader />
            <TopNav
                isMobileView={isMobileView}
                isMenuOpen={isMenuOpen}
                toggleMenu={setIsMenuOpen}
            />

            <SideNav
                isMobileView={isMobileView}
                isMenuOpen={isMenuOpen}
                toggleMenu={setIsMenuOpen}
                yoffset={yoffset}
            />
        </div>
    );
};

export default Navbar;
