import React from "react";

export default function Getstatrt() {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="modal-btn"
              >
                Cancel
              </Button>
            </div>
            <div className="row">
              <Button
                variant="primary"
                type="submit"
                form="loginForm"
                className="modal-btn"
              >
                Login
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
