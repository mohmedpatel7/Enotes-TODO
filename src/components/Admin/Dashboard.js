import React, { useState, useEffect } from "react";
import "../style/style.css";
export default function Dashboard({ showAlert }) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const response = await fetch(
          `https://enotes-backend-3k2a.onrender.com/api/notes/getUserdata`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "admin-token": localStorage.getItem("admin_token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        showAlert("Failed to fetch user data", "danger");
      }
    };
    fetchUserdata();

    const fetchNotesData = async () => {
      try {
        const response = await fetch(
          `https://enotes-backend-3k2a.onrender.com/api/notes/getNoteDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "admin-token": localStorage.getItem("admin_token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        showAlert("Failed to fetch user data", "danger");
      }
    };
    fetchNotesData();
  }, [showAlert]);

  const deleteUser = async (user_id) => {
    try {
      const response = await fetch(
        `https://enotes-backend-3k2a.onrender.com/api/auth/deleteUser/${user_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "admin-token": localStorage.getItem("admin_token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      // Remove the deleted user from the state
      setUsers(users.filter((user) => user._id !== user_id));
      showAlert("User deleted successfully", "success");
    } catch (error) {
      showAlert("Failed to delete user", "danger");
    }
  };

  return (
    <>
      <div className="container" style={{ paddingTop: "75px" }}>
        <div className="row">
          <div className="col-md-1">
            <h1>Users</h1>
          </div>
          <div className="col-md-9"></div>
          <div className="col-md-2">
            <h5>Total Users:{users.length}</h5>
          </div>
        </div>
        <br />
        <div className="table-responsive">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Username</th>
                <th>Email</th>
                <th>Date of Join</th>
                <th>No of Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.date).toDateString()}</td>
                  <td>{user.noteCount}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash-can mx-2"
                      onClick={() => {
                        deleteUser(user._id);
                        showAlert("deleted.", "success");
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="table-responsive">
          <h1>Latest Addons</h1>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Username</th>
                <th>Email</th>
                <th>Addons</th>
              </tr>
            </thead>
            <tbody>
              {data.map((note, index) => (
                <tr key={note._id}>
                  <td>{index + 1}</td>
                  <td>{note.user.name}</td>
                  <td>{note.user.email}</td>
                  <td>{new Date(note.date).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
