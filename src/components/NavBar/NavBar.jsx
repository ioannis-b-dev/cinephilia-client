import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { Navbar, Button, Container } from "react-bootstrap";
import { GiFilmProjector } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContext";
const NavBar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const { openFilmsModal, setShowMyLists } = useGlobalContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    return (
        <Navbar className={styles.navMain}>
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <Link to="/">
                        <GiFilmProjector
                            className={styles.navLogo}
                        ></GiFilmProjector>
                    </Link>

                    <Link to="/" className={styles.navTitle}>
                        Cinephilia
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {user ? (
                        <div className="d-flex">
                            <Navbar.Text className={styles.loggedInUser}>
                                {user.userObject.userName ||
                                    user.userObject.name}
                            </Navbar.Text>
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
                                    <Link to="/filmlists">My Lists</Link>
                                </Button>
                                <Button
                                    className={styles.myBtn}
                                    onClick={openFilmsModal}
                                >
                                    <Link to="/filmlists">Create List</Link>
                                </Button>

                                <Button
                                    className={styles.logoutBtn}
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Button className={styles.myBtn}>
                                <Link to="/filmlists">Browse Lists</Link>
                            </Button>
                            <Button className={styles.myBtn}>
                                <Link to="/account">Login</Link>
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
