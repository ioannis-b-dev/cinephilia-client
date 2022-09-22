import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SimpleModal(props) {
    const { confirmDelete, ...bProps } = props;

    return (
        <Modal
            {...bProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this list?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={bProps.onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SimpleModal;
