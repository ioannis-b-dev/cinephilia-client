import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../redux/actions/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleIcon } from "../../constants/icons";
import axios from "axios";
import { Alert } from "../../common";
import "./Auth.scss";

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: "" });
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authAttempt = useSelector((state) => state.auth.authData);

    useEffect(() => {
        if (authAttempt?.error) {
            setAlert({ show: true, msg: authAttempt.error });
            const timeout = setTimeout(() => {
                setAlert({ show: false, msg: "" });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [authAttempt]);

    const login = useGoogleLogin({
        onSuccess: async (resp) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${resp.access_token}`,
                        },
                    }
                );

                const userObject = res.data;
                dispatch({ type: "AUTH", data: { userObject } });
                navigate("/");
            } catch (err) {
                console.log(err);
            }
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    return (
        <Form onSubmit={handleSubmit} className="authForm">
            <header className="Form__Header">
                <h1 className="Form__Title">
                    {isSignup ? "REGISTER" : "LOGIN"}
                </h1>
                <p className="Form__Legend">
                    {isSignup
                        ? "Please fill in the information below: "
                        : "Please enter your email and password"}
                </p>
            </header>

            {isSignup && (
                <Form.Group className="mb-3">
                    <Form.Control
                        className="FORM__INPUT"
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3">
                <Form.Control
                    className="FORM__INPUT"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Control
                className="FORM__INPUT mb-3"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />

            {isSignup && (
                <Form.Control
                    className="FORM__INPUT mb-3"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
            )}

            <Form.Check
                type="checkbox"
                label="Show Password"
                onClick={handleShowPassword}
                value={showPassword}
            />

            <div className="d-flex flex-column justify-content-center">
                <button
                    onSubmit={handleSubmit}
                    className="FORM__BUTTON"
                    type="submit"
                >
                    {isSignup ? "CREATE MY ACCOUNT" : "Sign in"}
                </button>
                {!isSignup && <h3 className="align-self-center">or</h3>}
                {!isSignup && (
                    <button className="FORM__BUTTON" onClick={login}>
                        <GoogleIcon /> Sign in with Google
                    </button>
                )}

                <Button
                    variant="link"
                    type="submit"
                    onClick={switchMode}
                    className="FORM__LINK"
                >
                    {isSignup
                        ? "Already have an account? Sign in"
                        : "Don't have an account? Sign up"}
                </Button>
            </div>

            {alert.show && <Alert msg={alert.msg} type={alert.type} />}
        </Form>
    );
};
export default Auth;
