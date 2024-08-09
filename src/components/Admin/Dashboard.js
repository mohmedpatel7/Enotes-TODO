import React, { useState, useEffect } from "react";
import "../style/style.css";
export default function Dashboard({ showAlert }) {
  const [users, setUsers] = useState([]);

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
        <h1>Users</h1>
        <br />
        <p className="animated-text">User information!</p>
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
                  <td>{user.date}</td>
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
        <h5>Total Users:{users.length}</h5>
      </div>
    </>
  );
}
