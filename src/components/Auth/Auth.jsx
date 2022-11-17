import React, { useState, useEffect, useRef } from "react";
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
    const [alert, setAlert] = useState({ type: "", msg: "" });
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alertRef = useRef(null);
    const authAttempt = useSelector((state) => state.auth.authData);

    useEffect(() => {
        if (authAttempt?.error) {
            setAlert({ type: "danger", msg: authAttempt.error });
            alertRef.current.show();
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
        <div className="authentication-form container">
            <div className="header ">
                <h1 className="header__title fs-600 ff-sans-light">
                    {isSignup ? "REGISTER" : "LOGIN"}
                </h1>
                <p className="header__legend letter-spacing-4">
                    {isSignup
                        ? "Please fill in the information below: "
                        : "Please enter your email and password"}
                </p>
            </div>
            <Alert ref={alertRef} message={alert.msg} type={alert.type} />
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    ></input>
                    {/* <small className="letter-spacing-4">
                        <span className="text-success">important Info </span> /{" "}
                        <span className="text-alert"> error message</span>
                    </small> */}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                    {/* <small className="letter-spacing-4">
                        <span className="text-success">important Info </span> /{" "}
                        <span className="text-alert"> error message</span>
                    </small> */}
                </div>
                <button className="btn btn-primary">
                    {isSignup ? "REGISTER" : "LOGIN"}
                </button>
                {!isSignup && (
                    <h3 className="text-center fs-400 ff-sans-light line-height-1">
                        OR
                    </h3>
                )}
                {!isSignup && (
                    <button className="btn btn-primary" onClick={login}>
                        <GoogleIcon /> <span>OOGLE LOGIN</span>
                    </button>
                )}
                <p className="text-center">
                    {isSignup
                        ? "Already have an account? "
                        : "Don't have an account? "}
                    <button className="text-accent" onClick={switchMode}>
                        {isSignup ? "Sign in" : "Sign up"}
                    </button>
                </p>
            </form>

            {/* 
                

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                    ></input>
                    <small className="letter-spacing-4">
                        <span className="text-success">important Info </span> /{" "}
                        <span className="text-alert"> error message</span>
                    </small>
                </div>
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
            </Form> */}
        </div>
    );
};
export default Auth;
