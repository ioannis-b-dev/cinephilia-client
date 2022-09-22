import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./SearchAPI.module.css";
import Loader from "../../Loader";
const SearchAPI = ({ getMovieData, isLoading }) => {
    const [searchMovie, setSearchMovie] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchMovie || searchMovie === "") return;
        getMovieData(searchMovie);
        setSearchMovie("");
    };

    return (
        <>
            <Form.Group className={styles.formGroupContainer}>
                <Form.Label>Search Films</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search for movies"
                    required
                    value={searchMovie}
                    onChange={(e) => setSearchMovie(e.target.value)}
                />
            </Form.Group>
            {isLoading ? (
                <Loader />
            ) : (
                <Button
                    className={`${styles.myBtn} align-self-start`}
                    type="submit"
                    onClick={handleSearch}
                >
                    SEARCH
                </Button>
            )}
        </>
    );
};

export default SearchAPI;
