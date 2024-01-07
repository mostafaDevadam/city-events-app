import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export const CustomModal = ({ show, handleClose }) => {
    /*const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);*/

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want remove it?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose(false)}>
                        No
                    </Button>
                    <Button variant="primary" onClick={() => handleClose(true)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
