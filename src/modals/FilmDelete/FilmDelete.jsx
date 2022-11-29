import React from "react";
import "./FilmDelete.scss";
import ModalWrap from "../../wrappers/ModalWrap";
const FilmDelete = ({ confirmDelete, closeModal }) => {
    return (
        <div className="filmdelete">
            <div className="text">
                <p>Are you sure you want to delete this list?</p>
            </div>
            <div className="cta">
                <button className="btn btn-primary" onClick={confirmDelete}>
                    Delete
                </button>
                <button className="btn bg-accent" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ModalWrap(FilmDelete, "");
