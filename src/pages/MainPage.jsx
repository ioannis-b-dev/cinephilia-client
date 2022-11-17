import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "../redux/actions/posts";
import { FilmLists, FilmsForm } from "../components";
import { useGlobalContext } from "../hooks";

const MainPage = () => {
    const dispatch = useDispatch();
    const { showFilmsForm, showFilmAdd } = useGlobalContext();
    useEffect(() => {
        dispatch(getFilmLists());
    });

    return (
        <main className="main-page">
            <FilmLists />
            {showFilmsForm && <FilmsForm />}
            {/* {showFilmAdd && <FilmAdd />} */}
        </main>
    );
};

export default MainPage;
