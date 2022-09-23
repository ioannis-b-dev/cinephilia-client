import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "./SearchAPI.module.css";
import Loader from "../../Loader";
const SearchAPI = ({ getMovieData, isLoading, isError }) => {
    const [searchMovie, setSearchMovie] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchMovie || searchMovie === "") return;
        await getMovieData(searchMovie);
        setSearchMovie("");
        if (isError) {
            setAlert({
                show: true,
                msg: isError,
                type: "danger",
            });
        }
    };

    useEffect(() => {
        if (alert.show) {
            const timeout = setTimeout(() => {
                setAlert({ show: false, msg: "" });
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [alert]);
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

            <div
                className={`text-center rounded ${
                    alert.type === "success"
                        ? styles.alertSuccess
                        : styles.alertDanger
                }`}
            >
                {alert.msg}
            </div>
        </>
    );
};

export default SearchAPI;
