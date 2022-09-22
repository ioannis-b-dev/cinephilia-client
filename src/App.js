import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "./actions/posts";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Account from "./pages/Account";
import MainPage from "./pages/MainPage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmLists());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/filmlists" element={<MainPage />} />
                </Routes>
            </>
        </BrowserRouter>
    );
};

export default App;
