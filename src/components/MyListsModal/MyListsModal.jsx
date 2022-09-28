import React, { useState, useEffect } from "react";
import "./MyListsModal.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateFilmList } from "../../actions/posts";
import { useGlobalContext } from "../../hooks/GlobalContext";
import { Button } from "react-bootstrap";
import Alert from "../Alert/Alert";
const MyListsModal = () => {
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const dispatch = useDispatch();
    const { showMyListsModal, closeMyListsModal, currentFilm } =
        useGlobalContext();
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
        <div
            className={`app__modal-overlay ${
                showMyListsModal && "app__modal-show"
            }`}
        >
            <div className="app__modalmylists">
                <div className="app__modal-header">
                    <h3>Add it your Lists</h3>
                    <button
                        type="button"
                        className="app__btn-close btn-close btn-close-white"
                        aria-label="Close"
                        onClick={closeMyListsModal}
                    ></button>
                </div>
                <div className="app__modal-body">
                    {myFilmLists.length > 0
                        ? myFilmLists.map((filmlist) => {
                              return (
                                  <Button
                                      key={filmlist._id}
                                      variant="link"
                                      onClick={() => addFilmToList(filmlist)}
                                  >
                                      {filmlist.title}
                                  </Button>
                              );
                          })
                        : "You currently dont have any lists"}
                </div>
                {alert.show && <Alert msg={alert.msg} type={alert.type} />}
            </div>
        </div>
    );
};

export default MyListsModal;
