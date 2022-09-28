import React, { useState, useContext } from "react";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [showModalListForm, setShowModalListForm] = useState(false);
    const [showMyListsModal, setShowMyListsModal] = useState(false);
    const [currentFilm, setCurrentFilm] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [showMyLists, setShowMyLists] = useState(false);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };
    const removeAlert = () => {
        setAlert({ show: false, type: "", msg: "" });
    };

    const openMyListsModal = (film) => {
        setShowMyListsModal(true);
        setCurrentFilm(film);
    };
    const closeMyListsModal = () => {
        setShowMyListsModal(false);
        setCurrentFilm(null);
    };

    const openFilmsModal = () => {
        setShowModalListForm(true);
    };
    const closeFilmsModal = () => {
        setShowModalListForm(false);
    };

    return (
        <AppContext.Provider
            value={{
                showModalListForm,
                openFilmsModal,
                closeFilmsModal,
                openMyListsModal,
                closeMyListsModal,
                currentId,
                setCurrentId,
                showMyLists,
                setShowMyLists,
                showMyListsModal,
                currentFilm,
                alert,
                showAlert,
                removeAlert,
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
