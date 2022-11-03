import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "./redux/actions/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { Home, Account, MainPage } from "./pages";
import "./App.scss";
const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmLists());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/filmlists" element={<MainPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
