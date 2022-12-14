import React, { useState, useEffect } from "react";
import "./FilmAdd.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateFilmList } from "../../redux/actions/posts";

import Alert from "../../common/Alert/Alert";
import ModalWrap from "../../wrappers/ModalWrap";
const FilmAdd = ({ currentFilm }) => {
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("profile"));

    const myFilmLists = useSelector((state) =>
        state.posts.filter(
            (list) =>
                list.creator === user?.userObject?._id ||
                list.creator === user?.userObject?.sub
        )
    );

    useEffect(() => {
        if (alert.show) {
            const timeout = setTimeout(() => {
                setAlert({ show: false, msg: "" });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const addFilmToList = (currentList) => {
        const { films } = currentList;
        //TEST IF CURRENT FILM ALREADY EXISTS
        if (films.find((film) => film._id === currentFilm._id)) {
            setAlert({
                show: true,
                msg: "film already added to list",
                type: "danger",
            });
        } else {
            dispatch(
                updateFilmList(currentList._id, {
                    ...currentList,
                    films: [...films, currentFilm],
                })
            );
            setAlert({
                show: true,
                msg: "film successfully added to list",
                type: "success",
            });
        }
    };

    return (
        <div className="filmadd">
            {myFilmLists.length > 0
                ? myFilmLists.map((filmlist) => {
                      return (
                          <button
                              key={filmlist._id}
                              className="btn btn-secondary"
                              onClick={() => addFilmToList(filmlist)}
                          >
                              {filmlist.title}
                          </button>
                      );
                  })
                : "You currently dont have any lists"}

            {alert.show && <Alert msg={alert.msg} type={alert.type} />}
        </div>
    );
};

export default ModalWrap(FilmAdd, "Add to your Lists");
