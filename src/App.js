import React, { useState, } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import Adminprofile from "./components/Admin/Adminprofile";
import Dashboard from "./components/Admin/Dashboard";
import Getstatrt from "./components/Getstatrt";
import LoadingBar from "react-top-loading-bar";
import AdminLoginWrapper from "./components/Admin/AdminLoginWrapper";
import Files from "./components/User/Files";

function App() {
  const [showModal, setShowModal] = useState(false); //login
  const [showSignupModal, setShowSignupModal] = useState(false); //signup
  const [showProfile, setshowProfile] = useState(false); //profile
  const [showadminModal, setadminShowModal] = useState(false); //admin
  const [showAdminProfile, setshowAdminProfile] = useState(false);
  const [alert, setAlert] = useState(null); //alert
  const [showGetst, setshowGetst] = useState(false);
  const [showUpdtModel, setshowUpdtModel] = useState(false);
  const [progress, setProgress] = useState(0); //Top loading bar..

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
          <LoadingBar color="red" progress={progress} />
          <Navbar
            setShowModal={setShowModal}
            setShowSignupModal={setShowSignupModal}
            setshowProfile={setshowProfile}
            showAlert={showAlert}
            setadminShowModal={setadminShowModal}
            setshowAdminProfile={setshowAdminProfile}
          />
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
                  <Addnote
                    showAlert={showAlert}
                    setShowModal={setShowModal}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                exact
                path="/Yournotes"
                element={
                  <YourNote
                    showAlert={showAlert}
                    setShowModal={setShowModal}
                    showUpdtModel={showUpdtModel}
                    setshowUpdtModel={setshowUpdtModel}
                    setProgress={setProgress}
                  />
                }
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/dashboard"
                element={<Dashboard showAlert={showAlert} />}
              />
              <Route
                exact
                path="/adminLogin"
                element={
                  <AdminLoginWrapper
                    setadminShowModal={setadminShowModal}
                    showadminModal={showadminModal}
                    showAlert={showAlert}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                exact
                path="/files"
                element={<Files showAlert={showAlert} />}
              />
            </Routes>
          </div>
          <Login
            showModal={showModal}
            setShowModal={setShowModal}
            showAlert={showAlert}
            setProgress={setProgress}
          />
          <Signup
            showSignupModal={showSignupModal}
            setShowSignupModal={setShowSignupModal}
            showAlert={showAlert}
            setProgress={setProgress}
          />
          <Profile
            showProfile={showProfile}
            setshowProfile={setshowProfile}
            showAlert={showAlert}
            setProgress={setProgress}
          />
          <Adminprofile
            showAdminProfile={showAdminProfile}
            setshowAdminProfile={setshowAdminProfile}
            showAlert={showAlert}
            setProgress={setProgress}
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
