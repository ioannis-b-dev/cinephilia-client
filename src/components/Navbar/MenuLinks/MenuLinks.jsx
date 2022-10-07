import React from "react";
import "./MenuLinks.scss";
import { Link } from "react-router-dom";
const MenuLinks = ({
    user,
    logout,
    toggleMenu,
    openFilmsModal,
    setShowMyLists,
}) => {
    return (
        <nav className="app__navbar-links-container">
            {user ? (
                <div className="app__navbar-links">
                    <button
                        className="app__btn-secondary"
                        onClick={() => {
                            setShowMyLists(false);
                            toggleMenu(false);
                        }}
                    >
                        <Link to="/filmlists">Browse Lists</Link>
                    </button>
                    <button
                        className="app__btn-secondary"
                        onClick={() => {
                            setShowMyLists(true);
                            toggleMenu(false);
                        }}
                    >
                        <Link to="/filmlists">My Lists</Link>
                    </button>
                    <button
                        className="app__btn-secondary"
                        onClick={() => {
                            openFilmsModal();
                            toggleMenu(false);
                        }}
                    >
                        <Link to="/filmlists">Create List</Link>
                    </button>
                </div>
            ) : (
                <div className="app__navbar-links">
                    <Link
                        to="/filmlists"
                        className="app__btn-secondary"
                        onClick={() => {
                            setShowMyLists(false);
                            toggleMenu(false);
                        }}
                    >
                        Browse Lists
                    </Link>
                </div>
            )}

            {user ? (
                <div className="app__navbar-user">
                    <h4>{user.userObject.userName || user.userObject.name}</h4>

                    <button
                        className="test__btn"
                        onClick={() => {
                            logout();
                            toggleMenu(false);
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="app__navbar-user">
                    <Link to="/account" className="test__btn">
                        Sign up
                    </Link>
                    <Link to="/account" className="app__btn-secondary">
                        Log in
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default MenuLinks;
