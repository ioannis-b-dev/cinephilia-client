import * as api from "../api";
import { AUTH, AUTH_ERROR } from "../../constants/actionTypes";

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate("/");
    } catch (error) {
        console.log(error);
        //user does not exist
        //Invalid Credentials
        let auth_error = error.response.data.message;
        dispatch({ type: AUTH_ERROR, auth_error });
        auth_error = null;
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate("/");
    } catch (error) {
        //User already Exists
        //Passwords dont match
        const auth_error = error.response.data.message;
        dispatch({ type: AUTH_ERROR, auth_error });
    }
};
