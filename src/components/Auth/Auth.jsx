import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import styles from "./Auth.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { BsGoogle } from "react-icons/bs";
import axios from "axios";

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isError, setIsError] = useState({ show: false, msg: "" });
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
            setIsError({ show: true, msg: authAttempt.error });
            const timeout = setTimeout(() => {
                setIsError({ show: false, msg: "" });
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
        <Container
            className={`${styles.authContainer} d-flex flex-column align-items-center rounded`}
        >
            <h1>{isSignup ? "Sign Up" : "Sign In"}</h1>

            <Form onSubmit={handleSubmit} className="d-flex flex-column">
                {isSignup && (
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {isSignup && (
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    )}

                    <Form.Check
                        type="checkbox"
                        label="Show Password"
                        onClick={handleShowPassword}
                        value={showPassword}
                    />
                </Form.Group>

                <div className="d-flex flex-column justify-content-center">
                    <Button
                        onSubmit={handleSubmit}
                        className={styles.myBtn}
                        type="submit"
                    >
                        {isSignup ? "Sign up" : "Sign in"}
                    </Button>
                    <h3 className="align-self-center">or</h3>
                    <Button className={styles.myBtn} onClick={login}>
                        <BsGoogle /> Sign in with Google
                    </Button>
                </div>

                <Button
                    variant="link"
                    type="submit"
                    onClick={switchMode}
                    className="justify-self-center"
                >
                    {isSignup
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                </Button>
            </Form>

            {isError.show && (
                <p className={styles.errorContainer}>{isError.msg}</p>
            )}
        </Container>
    );
};
export default Auth;
