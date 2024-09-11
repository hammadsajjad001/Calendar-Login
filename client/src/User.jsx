import React, { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/userstab")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log("Could not fetch users:", err);
      });
  }, []);
  return (
    <div className="usertab-main">
      <div className="container usertab-container">
        <div className="row user-header">
          <div className="col-sm-4 user-heading">Name</div>
          <div className="col-sm-8 email-heading">Email</div>
        </div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="row user-content-display" key={user._id}>
              <div className="col-sm-4 p-3 ">
                <li>{user.name}</li>
              </div>
              <div className="col-sm-8 p-3">&nbsp;{user.email}</div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}
