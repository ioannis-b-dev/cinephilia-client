import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Loader from "../../Loader/Loader";
import Alert from "../../Alert/Alert";
import { AiOutlineSearch } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import "./SearchAPI.scss";
import useImdbAPI from "../../../hooks/useImdbAPI";
const SearchAPI = ({ getFilmData, isLoading, isError }) => {
    const [searchMovie, setSearchMovie] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const [suggestionsList, setSuggestionsList] = useState([]);
    const { getSuggestions, suggestions, clearSuggestions } = useImdbAPI();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchMovie || searchMovie === "") return;
        await getSuggestions(searchMovie);

        setSearchMovie("");
    };

    useEffect(() => {
        if (isError) {
            setAlert({
                show: true,
                msg: isError,
                type: "danger",
            });
            const timeout = setTimeout(() => {
                setAlert({ show: false, msg: "" });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [isError]);

    useEffect(() => {
        if (suggestions) {
            setSuggestionsList(suggestions);
        }
    }, [suggestions]);

    const confirmFilm = async (e, id) => {
        e.preventDefault();
        await getFilmData(id);
        setSuggestionsList([]);
        clearSuggestions();
    };

    const deleteSuggestions = (e) => {
        e.preventDefault();
        setSuggestionsList([]);
        clearSuggestions();
    };
    return (
        <>
            <Form.Label>Search Films</Form.Label>
            <InputGroup className="test-this">
                <Form.Control
                    type="text"
                    className="test-this-this"
                    placeholder="Search for movies"
                    required
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                />

                <InputGroup.Text className="py-0 px-0 debug-this">
                    {!isLoading ? (
                        suggestionsList.length > 0 ? (
                            <TiDelete
                                className="app__search-icon"
                                type="button"
                                onClick={deleteSuggestions}
                            ></TiDelete>
                        ) : (
                            <AiOutlineSearch
                                className="app__search-icon"
                                type="submit"
                                onClick={handleSearch}
                            ></AiOutlineSearch>
                        )
                    ) : (
                        <Loader />
                    )}
                </InputGroup.Text>
            </InputGroup>

            {suggestionsList.length > 0 && (
                <div className="app__search-suggestions rounded">
                    {suggestionsList.map((film) => {
                        const { id, title, description } = film;
                        return (
                            <p
                                key={id}
                                className="rounded"
                                onClick={(e) => confirmFilm(e, id)}
                            >
                                {`${title}  ${description}`}
                            </p>
                        );
                    })}
                </div>
            )}
            {alert.show && <Alert msg={alert.msg} type={alert.type} />}
        </>
    );
};

export default SearchAPI;
