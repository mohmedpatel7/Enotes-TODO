import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../../context/notes_context/NoteContext";
import NoteItem from "./NoteItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function YourNote({
  showAlert,
  showUpdtModel,
  setshowUpdtModel,
}) {
  // Access note data and fetch notes function from NoteContext
  const notes = useContext(NoteContext);
  const { note, get_note, updt_note } = notes;

  let navigate = useNavigate();
  // Fetch notes on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      get_note();
    } else {
      navigate("/YourNotes");
    }
  }, [navigate, get_note]);

  // State variable to control modal visibility
  // const [showUpdtModel, setshowUpdtModel] = useState(false);

  // State variable to store the edited note data
  const [noteData, setNote] = useState({
    _id: "",
    title: "",
    description: "",
    tag: "",
  });

  // Function to close the modal
  const handleClose = () => setshowUpdtModel(false);

  //handle save
  const handleSave = () => {
    updt_note(
      noteData.id,
      noteData.edit_title,
      noteData.edit_description,
      noteData.edit_tag
    );
    showAlert("Updated.", "success");
    setshowUpdtModel(false);
  };

  // Function to handle input changes and update state
  const handleChange = (event) => {
    const updatedNote = { ...noteData }; // Spread the existing note data
    updatedNote[event.target.name] = event.target.value; // Update specific property based on target name
    setNote(updatedNote); // Update the state with modified note data
  };

  // Function to open the modal and pre-populate the form with the selected note details
  const updateNote = (currentNote) => {
    setshowUpdtModel(true);
    setNote({
      id: currentNote._id,
      edit_title: currentNote.title,
      edit_description: currentNote.description,
      edit_tag: currentNote.tag,
    });
  };

  return (
    <div className="">
      <button
        type="button"
        className="btn btn-primary d-none my-5"
        onClick={() => setshowUpdtModel(true)}
      >
        Launch demo modal
      </button>

      {/* Edit Note Modal */}
      <Modal show={showUpdtModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={noteData.edit_title}
                onChange={handleChange}
                name="edit_title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTag">
              <Form.Label>Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                value={noteData.edit_tag}
                onChange={handleChange}
                name="edit_tag"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={noteData.edit_description}
                onChange={handleChange}
                name="edit_description"
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSave} className="modal-btn">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container" style={{ paddingTop: "100px" }}>
        <div className="row">
          <h2>Your Notes...</h2>
          <div className="conatainer mx-3">
            {note.length === 0 && "No Notes Avalable..."}
          </div>
          {/* Map through notes and render NoteItem components */}
          {note.map((note, index) => (
            <NoteItem
              key={index}
              updateNote={updateNote}
              note={note}
              showAlert={showAlert}
              setshowUpdtModel={setshowUpdtModel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
