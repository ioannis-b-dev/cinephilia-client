import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "../redux/actions/posts";
import { FilmLists, FilmsForm, FilmAdd } from "../components";
import { useGlobalContext } from "../hooks";

const MainPage = () => {
    const dispatch = useDispatch();
    const { showFilmsForm, showFilmAdd } = useGlobalContext();
    useEffect(() => {
        dispatch(getFilmLists());
    }, []);

    return (
        <>
            <FilmLists />
            {showFilmsForm && <FilmsForm />}
            {showFilmAdd && <FilmAdd />}
        </>
    );
};

export default MainPage;
