import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "./Header.scss";
import { useGlobalContext } from "../../hooks/GlobalContext";
const Header = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { setShowMyLists } = useGlobalContext();
    return (
        <Container className="app__header rounded">
            <div className="app__header-desc">
                <h1>Welcome to Cinephilia</h1>
                <p>Create and Share filmlists between cinema enthusiasts.</p>
                <p>
                    The website is currently in alpha version. I would
                    appreciate <br />
                    your feedback regarding bugs and issues you encountered
                    <br /> as well as UI/UX suggestions
                </p>
                <p>
                    You can find more information here:{" "}
                    <a
                        href="https://docs.google.com/document/d/13uTtDNneqUeKxxEhbl6E96ClrYs23f1zUNjlEmSfFQk/edit?usp=sharing"
                        target="_blank"
                    >
                        Its not a virus
                    </a>
                </p>
            </div>

            <div className="app__header-footer">
                <Button
                    className="app__btn-primary"
                    onClick={() => setShowMyLists(false)}
                >
                    <Link to="/filmlists">Browse Lists</Link>
                </Button>
                <Button
                    className="app__btn-primary"
                    onClick={() => setShowMyLists(true)}
                >
                    <Link to={user ? "/filmlists" : "/account"}>
                        Create List
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default Header;
