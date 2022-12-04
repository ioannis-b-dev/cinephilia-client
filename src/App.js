import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFilmLists } from "./redux/actions/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Home, Account, MainPage } from "./pages";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFilmLists());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="app">
                <Navigation />
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
