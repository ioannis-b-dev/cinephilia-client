import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext, useNavigation } from "../../hooks";
// import TopMenu from "./TopMenu/TopMenu";
// import SideMenu from "./SideMenu/SideMenu";
import { LogoIcon, NavToggleIcon } from "../../constants/icons";
import { Link } from "react-router-dom";
import TopNav from "./TopNav/TopNav";
const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );

    const { openFilmsModal, setShowMyLists } = useGlobalContext();
    const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <header className="primary-header">
            <div className="brand">
                <Link to="/">
                    <LogoIcon className="header-icon" />
                </Link>

                <Link to="/" className="brand-name">
                    Cinephilia
                </Link>
            </div>
            {!isMobileView ? (
                <TopNav />
            ) : (
                <NavToggleIcon className="header-icon" />
            )}
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
