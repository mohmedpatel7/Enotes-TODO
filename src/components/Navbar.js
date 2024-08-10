import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./style/style.css";

export default function Navbar({
  setShowModal,
  setShowSignupModal,
  setshowProfile,
  setadminShowModal,
  setshowAdminProfile,
}) {
  // Check if user is logged in by checking the presence of token
  const isLoggedIn = !!localStorage.getItem("token"); // User login status
  const isAdminLogin = !!localStorage.getItem("admin_token"); // Admin login status

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top"> 
      <div className="container-fluid">
        <p className="navbar-brand">eNotes</p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Addnote">
                    ADD
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Yournotes">
                    Yournotes
                  </Link>
                </li>
              </>
            )}
            {isAdminLogin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex">
            {/* Display buttons based on login status */}
            {!isLoggedIn && !isAdminLogin && (
              <>
                <button
                  className="btn-profile me-2"
                  onClick={() => setadminShowModal(true)}
                  title="admin"
                >
                  <i className="fa-solid fa-user-tie"></i>
                </button>
                <button
                  className="btn btn-login me-2"
                  onClick={() => setShowModal(true)}
                  id="btn-login"
                >
                  Login
                </button>
                <button
                  className="btn btn-signup me-2"
                  onClick={() => setShowSignupModal(true)}
                  id="btn-signup"
                >
                  SignUp
                </button>
              </>
            )}
            {isLoggedIn && !isAdminLogin && (
              <>
                <button
                  className="btn-profile me-2"
                  onClick={() => setshowProfile(true)}
                  title="Profile"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
              </>
            )}
            {isAdminLogin && (
              <>
                <button
                  className="btn-profile me-2"
                  onClick={() => setshowAdminProfile(true)}
                  title="Profile"
                >
                  <i className="fa-solid fa-user"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
