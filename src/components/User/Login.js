import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../style/style.css";

export default function Login({
  showModal,
  setShowModal,
  showAlert,
  setProgress,
}) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to manage login form input values
  const [login, setLogin] = useState({ email: "", password: "" });
  // Function to handle closing the modal
  const handleClose = () => setShowModal(false);

  // Function to handle form submission
  const handleSave = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to the server with login details
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: login.email,
            password: login.password,
          }),
        }
      );

      // Check if the response is not ok (status outside of the 200 range)
      if (!response.ok) {
        // Parse the response data for error details
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      // Parse the response data
      const data = await response.json();

      if (data.Authentication_token) {
        setProgress(0);
        setProgress(20);
        setShowModal(false);
        setProgress(30);
        // Save the auth-token and redirect...
        localStorage.setItem("token", data.Authentication_token);
        setProgress(50); // Saving token in local storage...
        showAlert("Login successfully...", "success");
        setProgress(70);
        navigate("/"); // If user is logged in, redirect to home page
        setProgress(90);
        setLogin({ email: "", password: "" });
        setProgress(100);
      } else {
        // Handle unexpected successful response cases
        setShowModal(false);
        showAlert("invalid email or password..!", "danger");
      }
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
      setShowModal(false);
      showAlert(error.message, "danger"); // Show the error message
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value }); // ...login is called spread operator...
  };

  //password visible eye fucntion ...
  const [passwordVisible, setPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSave} id="loginForm">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicPassword"
                style={{ position: "relative" }}
              >
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type={!passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "72%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="modal-btn"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="loginForm"
              className="modal-btn"
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
