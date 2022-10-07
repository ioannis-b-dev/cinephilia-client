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
const FilmsForm = () => {
    //HOOKS
    const isInitialLoad = useRef(false);
    const dispatch = useDispatch();
    const { closeModal, currentId, setCurrentId } = useGlobalContext();
    const { movieData, isLoading, isError, getFilmData } = useImdbAPI();
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
        <Form onSubmit={handleSubmit} className="app__listform ">
            {/* FILM LIST TITLE */}
            <Form.Group className="app__listform-title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    className="FORM__INPUT "
                    placeholder="Enter list title"
                    value={filmListData.title}
                    onChange={(e) =>
                        setFilmListData({
                            ...filmListData,
                            title: e.target.value,
                        })
                    }
                />
            </Form.Group>

            {/* Movie Search*/}
            <SearchAPI
                getFilmData={handleRequest}
                isLoading={isLoading}
                isError={isError}
            />

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
        </Form>
    );
};

export default ModalWrap(FilmsForm, "Create a List");
