import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext, useAuth } from "../../../../hooks";
import "../../styles.scss";

const NavLinks = () => {
    const { user, logout } = useAuth();
    const { openFilmsModal, setShowMyLists } = useGlobalContext();
    return (
        <ul className="nav__list">
            <li>
                <Link
                    to="/filmlists"
                    className="nav__link"
                    onClick={() => setShowMyLists(false)}
                >
                    Browse Lists
                </Link>
            </li>
            {user && (
                <>
                    <li>
                        <Link
                            to="/filmlists"
                            onClick={() => setShowMyLists(true)}
                            className="nav__link"
                        >
                            My Lists
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/filmlists"
                            onClick={openFilmsModal}
                            className="nav__link"
                        >
                            Create List
                        </Link>
                    </li>
                </>
            )}

            {user ? (
                <li className="nav-user">
                    <span className="nav__link username">
                        {user.userObject.userName || user.userObject.name}
                    </span>
                    <Link to="/" onClick={logout} className="nav__link">
                        Logout
                    </Link>
                </li>
            ) : (
                <li className="nav-user">
                    <Link to="/account" className="username nav__link">
                        Sign up
                    </Link>
                    <Link to="/account" className="nav__link">
                        Log in
                    </Link>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
