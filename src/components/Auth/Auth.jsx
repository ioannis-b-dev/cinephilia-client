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

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className="auth">
            <div className="header ">
                <h1 className="header__title fs-600 ff-sans-light">
                    {isSignup ? "REGISTER" : "LOGIN"}
                </h1>
                <p className="header__legend">
                    {isSignup
                        ? "Please fill in the information below: "
                        : "Please enter your email and password"}
                </p>
            </div>
            <Alert ref={alertRef} message={alert.msg} type={alert.type} />
            <form className="form" onSubmit={handleSubmit}>
                {isSignup && (
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        ></input>
                    </div>
                )}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                </div>
                {isSignup && (
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        ></input>
                    </div>
                )}
                <button className="btn btn-primary">
                    {isSignup ? "CREATE MY ACCOUNT" : "LOGIN"}
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
                        {isSignup ? "Sign in" : "Create one"}
                    </button>
                </p>
            </form>
        </div>
    );
};
export default Auth;
