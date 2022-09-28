import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "../../Loader/Loader";
import Alert from "../../Alert/Alert";
const SearchAPI = ({ getMovieData, isLoading, isError }) => {
    const [searchMovie, setSearchMovie] = useState("");
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchMovie || searchMovie === "") return;
        await getMovieData(searchMovie);
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
    return (
        <>
            <Form.Group>
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
                    className="app__btn-primary align-self-start"
                    type="submit"
                    onClick={handleSearch}
                >
                    SEARCH
                </Button>
            )}

            {alert.show && <Alert msg={alert.msg} type={alert.type} />}
        </>
    );
};

export default SearchAPI;
