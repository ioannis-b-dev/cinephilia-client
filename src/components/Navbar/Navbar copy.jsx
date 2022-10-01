import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Navbar as Navboot, Button, Container } from "react-bootstrap";
import { GiFilmProjector } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useNavigation, useGlobalContext } from "../hooks";
const Navbar = () => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile"))
    );
    const { openFilmsModal, setShowMyLists } = useGlobalContext();
    const { isMobileView, isMenuOpen, setIsMenuOpen } = useNavigation();
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

    return <></>;
};

export default Navbar;
