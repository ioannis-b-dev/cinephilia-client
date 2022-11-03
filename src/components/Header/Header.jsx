import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useGlobalContext } from "../../hooks";
const Header = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { setShowMyLists } = useGlobalContext();
    return (
        <>
            <div>
                <h1 className="text-accent fs-600 ff-sans-medium uppercase">
                    Welcome to{" "}
                    <span className="d-block text-dark fs-800 ff-sans-medium uppercase">
                        Cinephilia
                    </span>
                </h1>
                <p>Create and Share filmlists between cinema enthusiasts.</p>
                <p>
                    The website is currently in alpha version. I would
                    appreciate your feedback regarding bugs and issues you
                    encountered as well as UI/UX suggestions
                </p>
                <p>
                    You can find more information here:{" "}
                    <a
                        className="text-accent"
                        href="https://docs.google.com/document/d/13uTtDNneqUeKxxEhbl6E96ClrYs23f1zUNjlEmSfFQk/edit?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Its not a virus
                    </a>
                </p>
            </div>

            <div className="test-it">
                <button
                    className="btn bg-transparent"
                    onClick={() => setShowMyLists(true)}
                >
                    <Link to={user ? "/filmlists" : "/account"}>
                        Get Started
                    </Link>
                </button>
            </div>
        </>
    );
};

export default Header;
