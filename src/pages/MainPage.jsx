import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "../actions/posts";
import { FilmLists, ModalListForm, MyListsModal } from "../components";

const MainPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmLists());
    }, []);

    return (
        <div className="app__main-page">
            <FilmLists />
            <ModalListForm />
            <MyListsModal />
        </div>
    );
};

export default MainPage;
