import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useGlobalContext } from "../../hooks";
const Header = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { setShowMyLists } = useGlobalContext();
    return (
        <>
            <div className="header">
                <h1 className="text-accent fs-600 ff-sans-medium uppercase">
                    Welcome to
                    <span className="d-block text-dark fs-800 ff-sans-medium uppercase">
                        Cinephilia
                    </span>
                </h1>
                <p>A social media platform based on ImDb API</p>
                <p>
                    <span className="text-accent">Create</span> and{" "}
                    <span className="text-accent">Share</span> filmlists with
                    cinema enthusiasts.
                </p>
                <Link className="btn" to={user ? "/filmlists" : "/account"}>
                    Get Started
                </Link>
            </div>
        </>
    );
};

export default Header;
