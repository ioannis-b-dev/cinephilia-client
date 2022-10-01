import React from "react";
import "./FilmDelete.scss";
import ModalWrap from "../../wrappers/ModalWrap";
import { Button } from "react-bootstrap";
const FilmDelete = ({ confirmDelete, cancelDelete }) => {
    return (
        <div>
            <div>
                <p>Are you sure you want to delete this list?</p>
            </div>
            <div>
                <Button
                    type="submit"
                    className="app__btn-primary "
                    onClick={() => cancelDelete()}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="app__btn-primary"
                    onClick={confirmDelete}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ModalWrap(FilmDelete, "");
