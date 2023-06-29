import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/modal.scss';

export default function ModalComponent(props) {
    const { show, onClose, children, modalTitle, header, footer, onSubmit, onUpdate, isEdit } = props;
    return (
        <Modal
            centered
            show={show}
            onHide={onClose}
            onClose={onClose}
        >
            {
                header &&
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                    {/* <p className="btn-modal-close" onClick={onClose}>
                        <i className="fa fa-times text-danger"></i>
                    </p> */}
                </Modal.Header>
            }
            <Modal.Body>{children}</Modal.Body>
            {
                footer &&
                <Modal.Footer>
                  <Button data-cy="todo-add-button" onClick={isEdit ? onUpdate : onSubmit}>{isEdit ? "Simpan" : "Tambah"}</Button>
                </Modal.Footer>
            }
        </Modal>
    )
}
