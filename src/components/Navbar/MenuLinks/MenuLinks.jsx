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
        <>
            {user ? (
                <div>
                    <h4 className="app__navbar-user">
                        {user.userObject.userName || user.userObject.name}
                    </h4>
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

                    <button
                        className="app__navbar-logout-btn"
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
                    <button className="app__btn-secondary">
                        <Link to="/filmlists">Browse Lists</Link>
                    </button>
                    <button className="app__btn-secondary">
                        <Link to="/account">Login</Link>
                    </button>
                </div>
            )}
        </>
    );
};

export default MenuLinks;
