import React, { useState } from "react";
import NoteContext from "./NoteContext"; // importin notecontext from NoteContext.js...

const NoteState = (props) => {
  const host = "https://enotes-backend-3k2a.onrender.com"; // host is the backend server address

  const notes = [];
  const [note, setNote] = useState(notes);

  //Add note funtion...
  const add_note = async (title, description, tag) => {
    //api call
    //Fetch api function...
    const postData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    const data = { title, description, tag };
    postData(`${host}/api/notes/addnotes`, data);
  };

  //Update note function...
  const updt_note = async (id, title, description, tag) => {
    //api call
    //Fetch api function...
    const updtData = async (url, data) => {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        await response.json();
      } catch (error) {
        console.error(error);
      }
    };
    const data = { title, description, tag };
    updtData(`${host}/api/notes/updatenotes/${id}`, data);

    let newNote = JSON.parse(JSON.stringify(note));
    //update logic..
    for (let index = 0; index < newNote.length; index++) {
      const element = note[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNote(newNote);
  };

  //Delete note funtion..
  const del_note = async (id) => {
    //api call
    const delData = async (url) => {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };
    const confirm = window.confirm(
      "Do you really wants to delete the note... ?"
    );
    if (confirm) {
      await delData(`${host}/api/notes/deletenotes/${id}`); // delete note function call..
      const newNotes = note.filter((note) => note._id !== id);
      setNote(newNotes);
    }
  };

  // fetch note function..
  const get_note = async () => {
    // Fetch API function...
    const getData = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const result = await response.json();
        setNote(result); // Update the state with the fetched data
      } catch (error) {
        console.error("Error:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    await getData(`${host}/api/notes/fetchallnotes`);
  };

  return (
    <NoteContext.Provider
      value={{ note, add_note, updt_note, del_note, get_note }}
    >
      {props.children} {/* Render child components that use the context */}
    </NoteContext.Provider>
  );
};

export default NoteState;
