import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "../redux/actions/posts";
import { FilmLists } from "../components";
import { FilmsForm, FilmAdd } from "../modals";
import { useGlobalContext } from "../hooks";
const MainPage = () => {
    const dispatch = useDispatch();
    const { showFilmsForm, closeFilmsModal, closeFilmAddModal, showFilmAdd } =
        useGlobalContext();
    useEffect(() => {
        dispatch(getFilmLists());
    });

    return (
        <main className="main-page">
            <FilmLists />
            {showFilmsForm && <FilmsForm closeModal={closeFilmsModal} />}
            {showFilmAdd.show && (
                <FilmAdd
                    currentFilm={showFilmAdd.currFilm}
                    closeModal={closeFilmAddModal}
                />
            )}
        </main>
    );
};

export default MainPage;
