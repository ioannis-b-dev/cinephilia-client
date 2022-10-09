import React from "react";
import "./SideLinks.scss";
import { Link } from "react-router-dom";
const SideLinks = ({
    user,
    logout,
    toggleMenu,
    openFilmsModal,
    setShowMyLists,
}) => {
    return (
        <nav>
            {user ? (
                <div>
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
                <div>
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

export default SideLinks;
