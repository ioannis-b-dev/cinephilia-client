import React from "react";
import styles from "./ModalListForm.module.css";
import ListForm from "./ListForm";
import { useGlobalContext } from "../../hooks/GlobalContext";
function ModalListForm() {
    const { showModalListForm, closeFilmsModal } = useGlobalContext();
    return (
        <div
            className={`${styles.modalOverlay} ${
                showModalListForm && styles.showModal
            }`}
        >
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h3>Create a List</h3>
                    <button
                        type="button"
                        className={` btn-close btn-close-white ${styles.closeBtn}`}
                        aria-label="Close"
                        onClick={closeFilmsModal}
                    ></button>
                </div>
                <div className={styles.modalBody}>
                    <ListForm />
                </div>
            </div>
        </div>
    );
}

export default ModalListForm;
