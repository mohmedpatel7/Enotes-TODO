import React, { useContext, useState } from "react";
import NoteContext from "../../context/notes_context/NoteContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";

export default function NoteItem(props) {
  const { note, updateNote, showAlert } = props;

  const notes = useContext(NoteContext);
  const { del_note } = notes;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [shareLinks, setShareLinks] = useState(null); // State for share links

  const handleDelete = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the card
    del_note(note._id);
    showAlert("deleted.", "success");
  };

  const handleUpdate = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up to the card
    updateNote(note);
  };

  const handleReadMoreClick = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Share note API call..
  const handleShare = async (noteid) => {
    // Toggle shareLinks visibility
    if (shareLinks) {
      // If links are already visible, hide them
      setShareLinks(null);
      return;
    }

    try {
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/Notes/ShareNote/${noteid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json(); // Extract data from response
      setShareLinks(data.shareLinks); // Set the share links in state
    } catch (error) {
      console.error(error);
    }
  };

  const openShareLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="col-md-6">
      <div className="card mb-4">
        <div className="card-header">{note.title}</div>
        <div className="card-body">
          <h5 className="card-title">{note.tag}</h5>
          <p className="card-text" style={{ whiteSpace: "pre-line" }}>
            {showFullDescription
              ? note.description
              : note.description.substring(0, 100)}
            {note.description.length > 100 && (
              <span
                onClick={handleReadMoreClick}
                style={{
                  color: "#4BA4A6",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </span>
            )}
          </p>
          <i
            className="fa-solid fa-trash-can mx-2"
            onClick={handleDelete}
            title="Delete"
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={handleUpdate}
            title="Update"
          ></i>
          <i
            className="fa-solid fa-share mx-2"
            onClick={() => handleShare(note._id)}
            style={{ fontSize: "18px", cursor: "pointer" }}
            title="Share"
          ></i>

          {/* Conditionally render share links with icons */}
          {shareLinks && (
            <div className="share-links mt-2">
              <i
                className="fa-brands fa-facebook mx-2"
                onClick={() => openShareLink(shareLinks.facebook)}
                style={{ fontSize: "18px", cursor: "pointer" }}
              ></i>
              <i
                className="fa-brands fa-whatsapp mx-2"
                onClick={() => openShareLink(shareLinks.whatsapp)}
                style={{ fontSize: "20px", cursor: "pointer" }}
              ></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
