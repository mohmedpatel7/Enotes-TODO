import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/style.css";

const Home = ({ setshowGetst, showAlert }) => {
  const isUser = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin_token");
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "" });
  const [admin, setAdmin] = useState({ Aid: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://enotes-backend-3k2a.onrender.com/api/auth/getuser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": isUser,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser({ name: data.name });
      } catch (error) {
        showAlert("Failed to fetch user data", "danger");
      }
    };

    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          `https://enotes-backend-3k2a.onrender.com/api/admin/getadmin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "admin-token": isAdmin,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin data");
        }

        const data = await response.json();
        setAdmin({ Aid: data.Aid });
      } catch (error) {
        showAlert("Failed to fetch admin data", "danger");
      }
    };

    if (isUser) fetchUserData();
    if (isAdmin) fetchAdminData();
  }, [isUser, isAdmin, showAlert]);

  return (
    <div>
      <div className="home-container" style={{ paddingTop: "82px" }}>
        <header className="hero">
          <h1 className="hero-title">Welcome to ENOTES</h1>
          <p className="hero-subtitle">Your personal note management app</p>
          <br />
          {!isUser && !isAdmin && (
            <Link
              className="btn btn-primary"
              onClick={() => setshowGetst(true)}
            >
              Get Started
            </Link>
          )}
          {isUser && !isAdmin && (
            <h1 style={{ textTransform: "uppercase" }}>HELLO, {user.name}</h1>
          )}
          {!isUser && isAdmin && (
            <h1 style={{ textTransform: "uppercase" }}>HELLO, {admin.Aid}</h1>
          )}
        </header>

        <section className="features">
          {!isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-plus-circle feature-icon"
                onClick={() => setshowGetst(true)}
              ></i>
              <h3>Add Notes</h3>
              <p>Easily add new notes to keep track of your tasks and ideas.</p>
            </div>
          )}
          {isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-plus-circle feature-icon"
                onClick={() => navigate("/Addnote")}
              ></i>
              <h3>Add Notes</h3>
              <p>Easily add new notes to keep track of your tasks and ideas.</p>
            </div>
          )}
          {!isUser && isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-table-columns feature-icon"
                onClick={() => navigate("/Dashboard")}
              ></i>
              <h3>Dashboard</h3>
              <p>Check Dashboard</p>
            </div>
          )}
          {!isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-edit feature-icon"
                onClick={() => setshowGetst(true)}
              ></i>
              <h3>Update Notes</h3>
              <p>Update your notes anytime to keep your information current.</p>
            </div>
          )}
          {isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-edit feature-icon"
                onClick={() => navigate("/YourNotes")}
              ></i>
              <h3>Update Notes</h3>
              <p>Update your notes anytime to keep your information current.</p>
            </div>
          )}
          {!isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-trash feature-icon"
                onClick={() => setshowGetst(true)}
              ></i>
              <h3>Delete Notes</h3>
              <p>Remove notes that are no longer needed with a single click.</p>
            </div>
          )}
          {isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-trash feature-icon"
                onClick={() => navigate("/YourNotes")}
              ></i>
              <h3>Delete Notes</h3>
              <p>Remove notes that are no longer needed with a single click.</p>
            </div>
          )}
          {!isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-database feature-icon"
                onClick={() => setshowGetst(true)}
              ></i>
              <h3>Store Notes</h3>
              <p>Your notes are securely stored and easily accessible.</p>
            </div>
          )}
          {isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-note-sticky feature-icon"
                onClick={() => navigate("/YourNotes")}
              ></i>
              <h3>View Notes</h3>
              <p>Check out your notes.</p>
            </div>
          )}
          {!isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-share feature-icon"
                onClick={() => setshowGetst(true)}
              ></i>
              <h3>Share Notes</h3>
              <p>Share your note to diffrent plateforms.</p>
            </div>
          )}
          {isUser && !isAdmin && (
            <div className="feature">
              <i
                className="fa-solid fa-share feature-icon"
                onClick={() => navigate("/YourNotes")}
              ></i>
              <h3>Share Notes</h3>
              <p>Share your note to diffrent plateforms.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
