import React from "react";
import { Link } from "react-router-dom";
import "./style/style.css";

const Home = ({ setshowGetst }) => {
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
          <div className="feature">
            <i className="fa-solid fa-plus-circle feature-icon"></i>
            <h3>Add Notes</h3>
            <p>Easily add new notes to keep track of your tasks and ideas.</p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-edit feature-icon"></i>
            <h3>Update Notes</h3>
            <p>Update your notes anytime to keep your information current.</p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-trash feature-icon"></i>
            <h3>Delete Notes</h3>
            <p>Remove notes that are no longer needed with a single click.</p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-database feature-icon"></i>
            <h3>Store Notes</h3>
            <p>Your notes are securely stored and easily accessible.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
