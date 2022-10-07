import React from "react";
import { useGlobalContext } from "../hooks";

// showModalListForm,
// openFilmsModal,
// closeFilmsModal,
// openMyListsModal,
// closeMyListsModal,
// showMyListsModal,

const ModalWrap = (Component, cTitle) =>
    function HOC() {
        const { closeModal } = useGlobalContext();
        return (
            <div className="app__modal-overlay app__modal-show">
                <div className="app__modalform ">
                    <div className="app__modal-header">
                        <h3>{cTitle}</h3>
                        <button
                            type="button"
                            className="app__btn-close "
                            aria-label="Close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="app__modalform-body">
                        <Component />
                    </div>
                </div>
            </div>
        );
    };

export default ModalWrap;
