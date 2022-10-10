import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Header.scss";
import { useGlobalContext } from "../../hooks";
const Header = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { setShowMyLists } = useGlobalContext();
    return (
        <header>
            <div className="container header__container">
                <h1>Welcome to Cinephilia</h1>
                <p>Create and Share filmlists between cinema enthusiasts.</p>
                <p>
                    The website is currently in alpha version. I would
                    appreciate your feedback regarding bugs and issues you
                    encountered as well as UI/UX suggestions
                </p>
                <p>
                    You can find more information here:{" "}
                    <a
                        href="https://docs.google.com/document/d/13uTtDNneqUeKxxEhbl6E96ClrYs23f1zUNjlEmSfFQk/edit?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Its not a virus
                    </a>
                </p>

                <Button
                    className="test__btn"
                    onClick={() => setShowMyLists(true)}
                >
                    <Link to={user ? "/filmlists" : "/account"}>
                        Get Started
                    </Link>
                </Button>
            </div>
        </header>
    );
};

export default Header;
