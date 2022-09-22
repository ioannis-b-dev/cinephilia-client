import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FilmLists from "../components/FilmLists";
import { getFilmLists } from "../actions/posts";
import ModalListForm from "../components/ModalListForm";
import MyListsModal from "../components/MyListsModal";
function MainPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmLists());
    }, []);

    return (
        <div className="mainpage-container">
            <FilmLists />
            <ModalListForm />
            <MyListsModal />
        </div>
    );
}

export default MainPage;
