import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/modal.scss';

export default function ModalComponent(props) {
    const { show, onClose, children, modalTitle, header, footer, onSubmit, onUpdate, isEdit, modalCy, btnCy, disableButton } = props;
    return (
        <Modal
            centered
            show={show}
            onHide={onClose}
            onClose={onClose}
            data-cy={modalCy}
        >
            {
                header &&
                <Modal.Header closeButton>
                    <Modal.Title data-cy="modal-add-title">{modalTitle}</Modal.Title>
                </Modal.Header>
            }
            <Modal.Body>{children}</Modal.Body>
            {
                footer &&
                <Modal.Footer>
                  <Button 
                    data-cy={btnCy} 
                    onClick={isEdit ? onUpdate : onSubmit}
                    disabled={disableButton}
                    >
                        {isEdit ? "Simpan" : "Tambah"}
                    </Button>
                </Modal.Footer>
            }
        </Modal>
    )
}
