import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes_context/NoteContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

export default function NoteItem(props) {
  const { note, updateNote, showAlert } = props;

  const notes = useContext(NoteContext);
  const { del_note } = notes;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the card
    del_note(note._id);
    showAlert("deleted.", "success");
  };

  const handleUpdate = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the card
    updateNote(note);
  };

  const handleClick = () => {
    updateNote(note);
  };

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="col-md-6">
      <div className="card mb-4" onClick={handleClick}>
        <div className="card-header">{note.title}</div>
        <div className="card-body">
          <h5 className="card-title">{note.tag}</h5>
          <p className="card-text" style={{ whiteSpace: "pre-line" }}>
            {showFullDescription ? note.description : note.description.substring(0, 100)}
            {note.description.length > 100 && (
              <span onClick={handleReadMoreClick}>
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete}></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={handleUpdate}
          ></i>
        </div>
      </div>
    </div>
  );
}