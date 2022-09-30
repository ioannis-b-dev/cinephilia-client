import React from "react";
import "./ModalListForm.scss";
import ListForm from "./ListForm/ListForm";
import { useGlobalContext } from "../../hooks/GlobalContext";
function ModalListForm() {
    const { showModalListForm, closeFilmsModal } = useGlobalContext();
    return (
        <div
            className={`app__modal-overlay ${
                showModalListForm && "app__modal-show"
            }`}
        >
            <div className="app__modalform rounded">
                <div className="app__modal-header">
                    <h3>Create a List</h3>
                    <button
                        type="button"
                        className="app__btn-close btn-close btn-close-white"
                        aria-label="Close"
                        onClick={closeFilmsModal}
                    ></button>
                </div>
                <div className="app__modalform-body">
                    <ListForm />
                </div>
            </div>
        </div>
    );
}

export default ModalListForm;
