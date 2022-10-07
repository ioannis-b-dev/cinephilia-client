import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Alert, Loader } from "../../../common";
import { DeleteXIcon, SearchIcon } from "../../../constants/icons";
import "./SearchAPI.scss";
import { useImdbAPI } from "../../../hooks";
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
                    className="FORM__INPUT no-brd "
                    placeholder="Search for movies"
                    required
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                />

                <InputGroup.Text className="py-0 px-0 debug-this">
                    {!isLoading ? (
                        suggestionsList.length > 0 ? (
                            <DeleteXIcon
                                className="app__search-icon "
                                type="button"
                                onClick={deleteSuggestions}
                            />
                        ) : (
                            <SearchIcon
                                className="app__search-icon"
                                type="submit"
                                onClick={handleSearch}
                            />
                        )
                    ) : (
                        <Loader />
                    )}
                </InputGroup.Text>
            </InputGroup>

            {suggestionsList.length > 0 && (
                <div className="app__search-suggestions">
                    {suggestionsList.map((film) => {
                        const { id, title, description } = film;
                        return (
                            <p
                                key={id}
                                className=""
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
