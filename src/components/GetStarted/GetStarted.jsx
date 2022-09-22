import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import styles from "./GetStarted.module.css";
import { useGlobalContext } from "../../hooks/GlobalContext";
function GetStarted() {
    const user = JSON.parse(localStorage.getItem("profile"));
    const { setShowMyLists } = useGlobalContext();
    return (
        <Container className={`rounded ${styles.mainContainer}`}>
            <div>
                <h1>Welcome to Cinephilia</h1>
            </div>
            <div>
                <p>
                    This is a webpage to create and share filmlists between
                    cinema enthusiasts
                </p>
            </div>
            <div>
                <Button
                    className={styles.myBtn}
                    onClick={() => setShowMyLists(false)}
                >
                    <Link to="/filmlists">Browse Lists</Link>
                </Button>
                <Button
                    className={styles.myBtn}
                    onClick={() => setShowMyLists(true)}
                >
                    <Link to={user ? "/filmlists" : "/account"}>
                        Create List
                    </Link>
                </Button>
            </div>
        </Container>
    );
}

export default GetStarted;
