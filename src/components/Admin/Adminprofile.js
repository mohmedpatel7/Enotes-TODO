import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Profile({
  showAdminProfile,
  setshowAdminProfile,
  showAlert,
}) {
  const [admin, setAdmin] = useState({ Aid: "", email: "", date: "" });

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/admin/getadmin`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch admin data");
      }

      const data = await response.json();
      setAdmin({ Aid: data.Aid, email: data.email, date: data.date });
    } catch (error) {
      showAlert("Failed to fetch admin data", "danger");
    }
  }, [showAlert]);

  useEffect(() => {
    if (showAdminProfile) {
      fetchAdminData();
    }
  }, [showAdminProfile, fetchAdminData]);

  const navigate = useNavigate();
  const logout = () => {
    const confirm = window.confirm("Are you sure you want to logout..?");
    if (confirm) {
      localStorage.removeItem("admin_token");
      setshowAdminProfile(false);
      navigate("/");
      showAlert("Logout successful...", "success");
    }
  };

  return (
    <Modal
      show={showAdminProfile}
      onHide={() => setshowAdminProfile(false)}
      className="profile-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Admin Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Admin Id:</strong> {admin.Aid}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="profile-btn"
          onClick={() => setshowAdminProfile(false)}
        >
          Close
        </Button>
        <Button className="profile-btn" onClick={logout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
