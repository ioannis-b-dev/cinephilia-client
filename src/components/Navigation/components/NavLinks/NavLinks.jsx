import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext, useAuth } from "../../../../hooks";

import "./NavLinks.scss";

const NavLinks = ({ toggleMenu }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { setShowMyLists, openFilmsModal } = useGlobalContext();
    const handleCreate = () => {
        navigate("/filmlists");
        openFilmsModal();
        toggleMenu(false);
    };
    return (
        <div className="links">
            <Link
                to="/filmlists"
                className="link"
                onClick={() => {
                    setShowMyLists(false);
                    toggleMenu(false);
                }}
            >
                Browse Lists
            </Link>

            {user && (
                <>
                    <Link
                        to="/filmlists"
                        onClick={() => {
                            setShowMyLists(true);
                            toggleMenu(false);
                        }}
                        className="link"
                    >
                        My Lists
                    </Link>

                    <button onClick={handleCreate} className="link text-accent">
                        Create List
                    </button>
                </>
            )}

            {user ? (
                <div className="nav-user">
                    <span className="link username">
                        {user.userObject.userName || user.userObject.name}
                    </span>
                    <Link
                        to="/"
                        onClick={() => {
                            logout();
                            toggleMenu(false);
                        }}
                        className="link"
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="nav-user">
                    <Link
                        to="/account"
                        className="username link"
                        onClick={() => toggleMenu(false)}
                    >
                        Sign up
                    </Link>
                    <Link
                        to="/account"
                        className="nav__link"
                        onClick={() => toggleMenu(false)}
                    >
                        Log in
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavLinks;
