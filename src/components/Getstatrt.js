import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalTitle } from "react-bootstrap";

export default function Getstatrt({
  showGetst,
  setshowGetst,
  setShowSignupModal,
  setShowModal,
}) {
  const handleClose = () => setshowGetst(false);
  return (
    <div>
      <Modal show={showGetst} onHide={handleClose}>
        <Modal.Header className="custom-modal-header" closeButton>
          <ModalTitle>Get Start</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <Button
                variant="primary"
                onClick={() => {
                  setShowSignupModal(true);
                  setshowGetst(false);
                }}
                type="button"
                className="modal-btn"
              >
                SignUp
              </Button>
            </div>
            <br />
            <div className="row">
              <Button
                variant="primary"
                onClick={() => {
                  setShowModal(true);
                  setshowGetst(false);
                }}
                type="button"
                className="modal-btn"
              >
                Login
              </Button>
            </div>
            <span>*Login if you already have an account.</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="modal-btn"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
