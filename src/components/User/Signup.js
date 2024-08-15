import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Signup({
  showSignupModal,
  setShowSignupModal,
  showAlert,
  setProgress,
}) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to manage signup form input values
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State for password confirmation
  const [confirmPassword, setConfirmPassword] = useState("");
  // State for password visibility
  const [passwordVisible, setPasswordVisible] = useState(true);
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [cpasswordVisible, setcPasswordVisible] = useState(false);
  // Function to toggle password visibility
  const togglecPasswordVisibility = () => {
    setcPasswordVisible(!cpasswordVisible);
  };

  // Function to handle closing the modal
  const handleClose = () => setShowSignupModal(false);

  const { name, email, password } = signup; // destructure from the useState hook

  // Function to handle form submission
  const handleSave = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Password and Confirm password must be the same!");
      return;
    }

    try {
      // Send POST request to the server with signup details
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/auth/CreateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      // Check if the response is not ok (status outside of the 200 range)
      if (!response.ok) {
        const errorData = await response.json();
        // Throw an error with the message from the server
        throw new Error(errorData.error || "Something went wrong");
      }

      // Parse the response data
      const data = await response.json();
      if (data && data.Authentication_token) {
        setProgress(10);
        setProgress(30);
        setShowSignupModal(false);
        setProgress(50);
        localStorage.setItem("token", data.Authentication_token);
        setProgress(70); // Save the token in local storage
        showAlert("SignUp successful!", "success");
        setProgress(90);
        navigate("/"); // Redirect to home page
        setProgress(100);
      } else {
        // Unexpected response format
        showAlert("Invalid data..!", "danger");
      }
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
      showAlert(error.message, "danger"); // Show the error message
    }

    // Clear the form fields
    setSignup({ name: "", email: "", password: "" });
    setConfirmPassword(""); // Clear the confirm password field
  };

  // Function to handle input changes
  const handleChange = (event) => {
    setSignup({ ...signup, [event.target.name]: event.target.value }); // ...signup is called spread operator...
  };

  // Function to handle confirm password changes
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <>
      <div>
        <Modal show={showSignupModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSave} id="signupForm">
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  value={signup.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={signup.email}
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
                  value={signup.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "72%", // Adjusted to position the icon a bit lower
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="formBasicConfirmPassword"
                style={{ position: "relative" }}
              >
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type={cpasswordVisible ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="cpassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglecPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "72%", // Adjusted to position the icon a bit lower
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
              form="signupForm"
              className="modal-btn"
            >
              Signup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
