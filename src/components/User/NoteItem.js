import React, { useContext } from "react";
import NoteContext from "../../context/notes_context/NoteContext"; // Import NoteContext
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

export default function NoteItem(props) {
  const { note, updateNote, showAlert } = props;

  const notes = useContext(NoteContext);
  const { del_note } = notes;

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header">{note.title}</div>
        <div className="card-body">
          <h5 className="card-title">{note.tag}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={() => {
              del_note(note._id);
              showAlert("deleted.", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
