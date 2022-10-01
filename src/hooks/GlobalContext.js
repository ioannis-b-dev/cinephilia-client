import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [showFilmsForm, setShowFilmsForm] = useState(false);
    const [showFilmAdd, setShowFilmAdd] = useState(false);
    const [showMyLists, setShowMyLists] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [currentFilm, setCurrentFilm] = useState(null);
    const [currentId, setCurrentId] = useState(null);

    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    const removeAlert = () => {
        setAlert({ show: false, type: "", msg: "" });
    };

    const openMyListsModal = (film) => {
        setShowFilmAdd(true);
        setCurrentFilm(film);
    };

    const openFilmsModal = () => {
        setShowFilmsForm(true);
    };

    const openConfirmModal = () => {
        setShowConfirm(true);
    };

    const closeModal = () => {
        setShowFilmAdd(false);
        setCurrentFilm(null);
        setShowFilmsForm(false);
        setShowConfirm(false);
    };

    return (
        <AppContext.Provider
            value={{
                showFilmsForm,
                showFilmAdd,
                showConfirm,
                showMyLists,
                showAlert,

                openFilmsModal,
                openMyListsModal,
                openConfirmModal,
                closeModal,
                removeAlert,

                setCurrentId,
                setShowMyLists,
                currentId,
                currentFilm,
                alert,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
