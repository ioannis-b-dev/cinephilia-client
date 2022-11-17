import React, { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import { Alert, Loader } from "../../../common";
import { DeleteXIcon, SearchIcon } from "../../../constants/icons";
import "./SearchAPI.scss";
import { InputText } from "../../../common/Form";
import { useImdbAPI } from "../../../hooks";
const SearchAPI = ({ getFilmData, isError }) => {
    const [searchMovie, setSearchMovie] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    const [suggestionsList, setSuggestionsList] = useState([]);
    const { getSuggestions, suggestions, clearSuggestions } = useImdbAPI();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchMovie || searchMovie === "") return;
        setLoading(true);
        await getSuggestions(searchMovie);
        setLoading(false);
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
            <InputGroup className="test-this">
                <InputText
                    name="searchAPI"
                    type="text"
                    label="Search films"
                    placeholder="Search for a film to add"
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                >
                    {!isLoading ? (
                        suggestionsList.length > 0 ? (
                            <DeleteXIcon
                                className="icon"
                                type="button"
                                onClick={deleteSuggestions}
                            />
                        ) : (
                            <SearchIcon
                                className="icon icon-scale"
                                type="submit"
                                onClick={handleSearch}
                            />
                        )
                    ) : (
                        <Loader size={30} />
                    )}
                </InputText>
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
