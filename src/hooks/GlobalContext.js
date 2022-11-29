import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [showMyLists, setShowMyLists] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
    //GLOBAL MODALS
    const [showFilmsForm, setShowFilmsForm] = useState(false);
    const [showFilmAdd, setShowFilmAdd] = useState({
        show: false,
        currFilm: null,
    });
    const openFilmsModal = () => {
        setShowFilmsForm(true);
    };
    const closeFilmsModal = () => {
        setShowFilmsForm(false);
    };
    const openFilmAddModal = (film) => {
        setShowFilmAdd({
            show: false,
            currFilm: film,
        });
    };
    const closeFilmAddModal = () => {
        setShowFilmAdd({
            show: false,
            currFilm: null,
        });
    };

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    const removeAlert = () => {
        setAlert({ show: false, type: "", msg: "" });
    };

    return (
        <AppContext.Provider
            value={{
                showAlert,
                removeAlert,
                alert,
                showMyLists,
                setCurrentId,
                setShowMyLists,
                currentId,

                openFilmsModal,
                closeFilmsModal,
                showFilmsForm,
                openFilmAddModal,
                closeFilmAddModal,
                showFilmAdd,
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
