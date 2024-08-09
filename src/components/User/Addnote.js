import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes_context/NoteContext"; // Import NoteContext
import "../style/style.css";

export default function Addnote({ showAlert, setShowModal }) {
  // Use useContext hook to access the NoteContext
  const notes = useContext(NoteContext);
  const { add_note } = notes;

  const [noteData, setNote] = useState({ title: "", description: "", tag: "" });

  const handleChange = (event) => {
    // Spread the existing note object
    const updatedNote = { ...noteData };
    // Update the specific property based on the target name
    updatedNote[event.target.name] = event.target.value;
    // Set the updated note state
    setNote(updatedNote);
  };

  const handleClick = (event) => {
    event.preventDefault(); // used cause page not load..
    add_note(noteData.title, noteData.description, noteData.tag); // function call to add notes..
    setNote({ title: "", description: "", tag: "" }); // for clearing fields after submit...
    showAlert("Saved.", "success");
  };

  const handleReset = () => {
    setNote({ title: "", description: "", tag: "" });
  };

  // ... rest of your component code

  return (
    <div className="conatiner ">
      <div className="row" style={{ paddingTop: "75px" }}>
        <h2 class="animated-text">Add Notes...</h2>
      </div>

      {/*Add notes form */}
      <form>
        <div className=" my-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={noteData.title}
            aria-describedby="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={noteData.tag}
            onChange={handleChange}
            // Add this line for accessibility
            aria-describedby="tag"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          {/* <input
          type="textarea"
          className="form-control-description"
          id="description"
          name="description"
          onChange={handleChange}
          // Add this line for accessibility
          aria-describedby="description"
        /> */}
          <textarea
            type="textarea"
            className="form-control-description"
            id="description"
            name="description"
            value={noteData.description}
            onChange={handleChange}
            // Add this line for accessibility
            aria-describedby="description"
          ></textarea>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-2">
            <button
              className="btn-3d w-100"
              type="button"
              onClick={handleReset}
            >
              <span>Clear</span>
            </button>
          </div>
          <div className="col-12 col-md-2">
            {!localStorage.getItem("token") ? (
              <button
                className="btn-3d w-100 mb-2 mb-md-0"
                onClick={(event) => {
                  event.preventDefault();
                  setShowModal(true);
                }}
              >
                <span>Save</span>
              </button>
            ) : (
              <button
                className="btn-3d w-100 mb-2 mb-md-0"
                onClick={handleClick}
              >
                <span>Save</span>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
