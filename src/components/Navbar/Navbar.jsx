import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Navbar as Navboot, Button, Container } from "react-bootstrap";
import { GiFilmProjector } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../hooks/GlobalContext";

const Navbar = () => {
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
        <Navboot className="app__navbar">
            <Container>
                <Navboot.Brand className="d-flex align-items-center">
                    <Link to="/">
                        <GiFilmProjector className="app__navbar-logo"></GiFilmProjector>
                    </Link>

                    <Link to="/" className="app__navbar-title">
                        Cinephilia
                    </Link>
                </Navboot.Brand>
                <Navboot.Toggle />
                <Navboot.Collapse className="justify-content-end">
                    {user ? (
                        <div className="d-flex">
                            <Navboot.Text className="app__navbar-user">
                                {user.userObject.userName ||
                                    user.userObject.name}
                            </Navboot.Text>
                            <div>
                                <Button
                                    className="app__btn-secondary"
                                    onClick={() => setShowMyLists(false)}
                                >
                                    <Link to="/filmlists">Browse Lists</Link>
                                </Button>
                                <Button
                                    className="app__btn-secondary"
                                    onClick={() => setShowMyLists(true)}
                                >
                                    <Link to="/filmlists">My Lists</Link>
                                </Button>
                                <Button
                                    className="app__btn-secondary"
                                    onClick={openFilmsModal}
                                >
                                    <Link to="/filmlists">Create List</Link>
                                </Button>

                                <Button
                                    className="app__navbar-logout-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Button className="app__btn-secondary">
                                <Link to="/filmlists">Browse Lists</Link>
                            </Button>
                            <Button className="app__btn-secondary">
                                <Link to="/account">Login</Link>
                            </Button>
                        </div>
                    )}
                </Navboot.Collapse>
            </Container>
        </Navboot>
    );
};

export default Navbar;
