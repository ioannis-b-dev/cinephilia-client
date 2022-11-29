import React from "react";
import { useGlobalContext } from "../hooks";
import { DeleteXIcon } from "../constants/icons";
import "./ModalWrap.scss";

const ModalWrap = (Component, cTitle) =>
    function HOC(props) {
        // const { closeModal } = useGlobalContext();
        console.log(props.closeModal);
        return (
            <div className="modal">
                <div className="modal__container">
                    <div className="modal__header">
                        <h3>{cTitle}</h3>
                        <DeleteXIcon
                            className="icon"
                            onClick={props.closeModal}
                        />
                    </div>
                    <div className="modal__body">
                        <Component {...props} />
                    </div>
                </div>
            </div>
        );
    };

export default ModalWrap;
