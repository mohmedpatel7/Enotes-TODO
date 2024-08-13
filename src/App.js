import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addnote from "./components/User/Addnote";
import About from "./components/About";
import NoteState from "./context/notes_context/NoteState";
import Alert from "./components/Alert";
import YourNote from "./components/User/YourNote";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Footer from "./components/Footer";
import Profile from "./components/User/Profile";
import Adminlogin from "./components/Admin/Adminlogin";
import Adminprofile from "./components/Admin/Adminprofile";
import Dashboard from "./components/Admin/Dashboard";
import Getstatrt from "./components/Getstatrt";

function App() {
  const [showModal, setShowModal] = useState(false); //login
  const [showSignupModal, setShowSignupModal] = useState(false); //signup
  const [showProfile, setshowProfile] = useState(false); //profile
  const [showadminModal, setadminShowModal] = useState(false); //admin
  const [showAdminProfile, setshowAdminProfile] = useState(false);
  const [alert, setAlert] = useState(null); //alert
  const [showGetst, setshowGetst] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar
            setShowModal={setShowModal}
            setShowSignupModal={setShowSignupModal}
            setshowProfile={setshowProfile}
            showAlert={showAlert}
            setadminShowModal={setadminShowModal}
            setshowAdminProfile={setshowAdminProfile}
          />
          {/* Pass setShowModal to Navbar */}
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    setshowGetst={setshowGetst}
                    setShowModal={setShowModal}
                    setShowSignupModal={setShowSignupModal}
                    showAlert={showAlert}
                  />
                }
              />
              <Route
                exact
                path="/Addnote"
                element={
                  <Addnote showAlert={showAlert} setShowModal={setShowModal} />
                }
              />
              <Route
                exact
                path="/Yournotes"
                element={
                  <YourNote showAlert={showAlert} setShowModal={setShowModal} />
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/dashboard"
                element={<Dashboard showAlert={showAlert} />}
              />
            </Routes>
          </div>
          <Login
            showModal={showModal}
            setShowModal={setShowModal}
            showAlert={showAlert}
          />
          <Signup
            showSignupModal={showSignupModal}
            setShowSignupModal={setShowSignupModal}
            showAlert={showAlert}
          />
          <Profile
            showProfile={showProfile}
            setshowProfile={setshowProfile}
            showAlert={showAlert}
          />
          <Adminlogin
            showadminModal={showadminModal}
            setadminShowModal={setadminShowModal}
            showAlert={showAlert}
          />
          <Adminprofile
            showAdminProfile={showAdminProfile}
            setshowAdminProfile={setshowAdminProfile}
            showAlert={showAlert}
          />
          <Getstatrt
            showGetst={showGetst}
            setshowGetst={setshowGetst}
            setShowModal={setShowModal}
            setShowSignupModal={setShowSignupModal}
          />
          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
