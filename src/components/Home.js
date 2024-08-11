import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/style.css";

const Home = ({ setshowGetst }) => {
  const isUser = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin_token");
  const navigate = useNavigate();
  return (
    <div>
      <div className="home-container " style={{ paddingTop: "82px" }}>
        <header className="hero">
          <h1 className="hero-title">Welcome to ENOTES</h1>
          <p className="hero-subtitle">Your personal note management app</p>
          <>
            {!localStorage.getItem("token") &&
              !localStorage.getItem("admin_token") && (
                <Link
                  className="btn btn-primary"
                  onClick={() => setshowGetst(true)}
                >
                  Get Started
                </Link>
              )}
            {localStorage.getItem("token") && (
              <Link to="/Addnote" className="btn btn-primary">
                Add Note
              </Link>
            )}
            {localStorage.getItem("admin_token") && (
              <Link to="/Dashboard" className="btn btn-primary">
                Dashboard
              </Link>
            )}
          </>
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
                class="fa-solid fa-table-columns feature-icon"
                onClick={() => navigate("/Dashboard")}
              ></i>
              <h3>Dashboard</h3>
              <p>Cheak Dashboard</p>
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
              <p>Cheakout your notes.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
