//react,styling
import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "./FilmsForm.scss";
//components
import SearchAPI from "./SearchAPI/SearchAPI";
import FilmList from "./FilmList/FilmList";

//hooks
import { useImdbAPI, useGlobalContext } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { createFilmList, updateFilmList } from "../../redux/actions/posts";

import ModalWrap from "../../wrappers/ModalWrap";
import { InputText } from "../../common/Form";
import { Alert } from "../../common";
const FilmsForm = ({ closeModal }) => {
    //HOOKS
    const isInitialLoad = useRef(false);
    const dispatch = useDispatch();
    const { currentId, setCurrentId } = useGlobalContext();
    const { movieData, isError, getFilmData } = useImdbAPI();
    const [alert, setAlert] = useState({ msg: "", type: "danger" });
    const alertRef = useRef();
    const currentFilmList = useSelector((state) =>
        currentId ? state.posts.find((list) => list._id === currentId) : null
    );
    const user = JSON.parse(localStorage.getItem("profile"));
    const [filmListData, setFilmListData] = useState({
        films: [],
        title: "",
    });

    //USEEFFECT FOR IMD API
    useEffect(() => {
        if (isInitialLoad) {
            if (movieData) {
                const newFilm = movieData;

                setFilmListData((prevListData) => {
                    const { films } = prevListData;
                    return {
                        ...prevListData,
                        films: [...films, newFilm],
                    };
                });
            }
        } else {
            isInitialLoad.current = true;
        }
    }, [movieData]);

    //USEEFFECT FOR UPDATING FILMLISTS
    useEffect(() => {
        if (currentFilmList) setFilmListData(currentFilmList);
    }, [currentFilmList]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (filmListData.films.length === 0) {
            setAlert({
                msg: "You need at least 1 film for your list",
                type: "danger",
            });
            alertRef.current.show();
            return;
        }
        if (currentId) {
            dispatch(
                updateFilmList(currentId, {
                    ...filmListData,
                    name: user?.userObject?.name || user?.userObject?.userName,
                })
            );
        } else {
            dispatch(
                createFilmList({
                    ...filmListData,
                    name: user?.userObject?.name || user?.userObject?.userName,
                })
            );
        }
        closeModal();
        clearCurrList();
    };

    const removeFilm = (id) => {
        setFilmListData((prevListData) => {
            const { films } = prevListData;
            return {
                ...prevListData,
                films: films.filter((item) => item.id !== id),
            };
        });
    };

    const clearCurrList = () => {
        setFilmListData({
            films: [],
            title: "",
        });

        setCurrentId(null);
    };
    const handleRequest = (value) => {
        getFilmData(value);
    };

    return (
        <Form onSubmit={handleSubmit} className="listform ">
            <InputText
                name="listTitle"
                type="text"
                label="Title"
                placeholder="Enter List Title"
                value={filmListData.title}
                onChange={(e) =>
                    setFilmListData({
                        ...filmListData,
                        title: e.target.value,
                    })
                }
            />

            {/* Movie Search*/}
            <SearchAPI getFilmData={handleRequest} isError={isError} />

            {/* Current Movies List*/}
            {filmListData.films.length > 0 && (
                <div className="app__listform-films">
                    <FilmList
                        films={filmListData.films}
                        removeFilm={removeFilm}
                    />
                </div>
            )}

            <Button
                className="FORM__BUTTON"
                variant="primary"
                type="submit"
                onClick={handleSubmit}
            >
                Submit List
            </Button>
            <Alert ref={alertRef} message={alert.msg} type={alert.type} />
        </Form>
    );
};

export default ModalWrap(FilmsForm, "Create a List");
