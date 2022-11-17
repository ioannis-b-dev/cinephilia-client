import React from "react";
import { useGlobalContext } from "../hooks";
import { DeleteXIcon } from "../constants/icons";
import "./ModalWrap.scss";

const ModalWrap = (Component, cTitle) =>
    function HOC() {
        const { closeModal } = useGlobalContext();
        return (
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__header">
                        <h3>{cTitle}</h3>
                        <DeleteXIcon className="icon" onClick={closeModal} />
                    </div>
                    <div className="modal__body">
                        <Component />
                    </div>
                </div>
            </div>
        );
    };

export default ModalWrap;
