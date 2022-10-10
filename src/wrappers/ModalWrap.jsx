import React from "react";
import { useGlobalContext } from "../hooks";
import "./ModalWrap.scss";

const ModalWrap = (Component, cTitle) =>
    function HOC() {
        const { closeModal } = useGlobalContext();
        return (
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__header">
                        <h3>{cTitle}</h3>
                        <button
                            type="button"
                            className="btn-close "
                            aria-label="Close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <Component />
                </div>
            </div>
        );
    };

export default ModalWrap;
