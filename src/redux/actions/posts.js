import * as api from "../api";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../../constants/actionTypes";

//action creators
export const getFilmLists = () => async (dispatch) => {
    try {
        const { data } = await api.fetchFilmLists();
        const action = { type: FETCH_ALL, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};

export const createFilmList = (filmList) => async (dispatch) => {
    try {
        const { data } = await api.createFilmList(filmList);
        const action = { type: CREATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};

export const updateFilmList = (id, filmList) => async (dispatch) => {
    try {
        const { data } = await api.updateFilmList(id, filmList);
        const action = { type: UPDATE, payload: data };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteFilmList = (id) => async (dispatch) => {
    try {
        await api.deleteFilmList(id);
        const action = { type: DELETE, payload: id };
        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};
