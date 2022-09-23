//react,styling
import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./ListForm.module.css";
//components
import SearchAPI from "../SearchAPI";
import FilmList from "../FilmList";

//hooks
import useImdbAPI from "../../../hooks/useImdbAPI";
import { useDispatch, useSelector } from "react-redux";
import { createFilmList, updateFilmList } from "../../../actions/posts";
import { useGlobalContext } from "../../../hooks/GlobalContext";
const ListForm = () => {
    //HOOKS
    const isInitialLoad = useRef(false);
    const dispatch = useDispatch();
    const { closeFilmsModal, currentId, setCurrentId } = useGlobalContext();
    const { submitRequest, movieData, isLoading, isError } = useImdbAPI();
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
                const {
                    id,
                    title,
                    year,
                    filmPoster,
                    youtubeTrailerLink,
                    urlImdb,
                } = movieData;
                const newFilm = {
                    id,
                    title,
                    year,
                    filmPoster,
                    youtubeTrailerLink,
                    urlImdb,
                };

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

    // HANDLERS
    const handleRequest = (value) => {
        submitRequest(value);
    };

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
        closeFilmsModal();
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

    return (
        <Form
            onSubmit={handleSubmit}
            className={`${styles.formContainer} d-flex flex-column rounded  `}
        >
            {/* FILM LIST TITLE */}
            <Form.Group className={styles.formGroupContainer}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
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
                getMovieData={handleRequest}
                isLoading={isLoading}
                isError={isError}
            />

            {/* Current Movies List*/}
            {filmListData.films.length > 0 && (
                <FilmList films={filmListData.films} removeFilm={removeFilm} />
            )}

            <Button
                className={`${styles.myBtn} align-self-center`}
                variant="primary"
                type="submit"
                onClick={handleSubmit}
            >
                Submit List
            </Button>
        </Form>
    );
};

export default ListForm;
