import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Profile({ showProfile, setshowProfile, showAlert }) {
  const [user, setUser] = useState({ name: "", email: "", date: "" });

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/auth/getuser`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser({ name: data.name, email: data.email, date: data.date });
    } catch (error) {
      showAlert("Failed to fetch user data", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    if (showProfile) {
      fetchUserData();
    }
  }, [showProfile, fetchUserData]);

  const navigate = useNavigate();
  const logout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    // If the user confirms, proceed with logout
    if (confirmLogout) {
      localStorage.removeItem("token");
      setshowProfile(false);
      navigate("/");
      showAlert("Logout successful...", "success");
    } else {
      // If the user cancels, do nothing
      showAlert("Logout cancelled.", "info");
    }
  };

  return (
    <Modal
      show={showProfile}
      onHide={() => setshowProfile(false)}
      className="profile-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>User:</strong>
          {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Join:</strong> {new Date(user.date).toLocaleDateString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="profile-btn" onClick={() => setshowProfile(false)}>
          Close
        </Button>
        <Button className="profile-btn" onClick={logout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
