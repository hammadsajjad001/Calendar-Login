import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function Roles() {
  const [users, setUsers] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState("");

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

  // Modal
  const handleModalShow = (user, role = "") => {
    console.log("Show Modal for User:", user);
    setSelectedUser(user);
    setIsModalActive(true);
    setNewRole(role);
    setRoleToEdit(role);
    setEditMode(!!role);
  };

  const handleModalClose = () => {
    setIsModalActive(false);
    setSelectedUser(null);
    setNewRole("");
    setEditMode(false);
    setRoleToEdit("");
  };

  const handleSaveRole = () => {
    if (!selectedUser || !newRole) {
      alert("Please enter a role");
      return;
    }

    if (editMode) {
      axios
        .put("http://localhost:3001/updateRole", {
          userId: selectedUser._id,
          oldRole: roleToEdit,
          newRole,
        })
        .then((response) => {
          setUsers(
            users.map((user) =>
              user._id === selectedUser._id
                ? {
                    ...user,
                    roles: user.roles.map((r) =>
                      r === roleToEdit ? newRole : r
                    ),
                  }
                : user
            )
          );
          handleModalClose();
        })
        .catch((err) => {
          console.log(
            "Could not update role:",
            err.response ? err.response.data : err.message
          );
        });
    } else {
      axios
        .post("http://localhost:3001/addRole", {
          userId: selectedUser._id,
          role: newRole,
        })
        .then((response) => {
          setUsers(
            users.map((user) =>
              user._id === selectedUser._id
                ? { ...user, roles: [...user.roles, newRole] }
                : user
            )
          );
          handleModalClose();
        })
        .catch((err) => {
          console.log(
            "Could not add role:",
            err.response ? err.response.data : err.message
          );
        });
    }
  };

  const handleDeleteRole = (user, role) => {
    if (!user) {
      alert("User not found");
      return;
    }

    axios
      .delete("http://localhost:3001/deleteRole", {
        data: {
          userId: user._id,
          role,
        },
      })
      .then((response) => {
        setUsers(
          users.map((u) =>
            u._id === user._id
              ? {
                  ...u,
                  roles: u.roles.filter((r) => r !== role),
                }
              : u
          )
        );
      })
      .catch((err) => {
        console.log("Could not delete role:", err);
      });
  };

  return (
    <div className="roles-main">
      <div className="container roles-container">
        <div className="row roles-header">
          <div className="col-sm-3">Name</div>
          <div className="col-sm-5">Roles</div>
          <div className="col-sm-2">Add Role</div>
        </div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="row role-content-display" key={user._id}>
              <div className="col-sm-3 p-3 ">{user.name}</div>
              <div className="col-sm-5 p-3 role-list-div">
                {user.roles &&
                  user.roles.map((role, index) => (
                    <div key={index} className="role-list">
                      <div className="role-list-item">{role}</div>
                      <div className="edit-delete-role">
                        <FontAwesomeIcon
                          icon={faPen}
                          className="editRole-icon"
                          onClick={() => handleModalShow(user, role)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="deleteRole-icon"
                          onClick={() => handleDeleteRole(user, role)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-sm-1">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="addRole-icon"
                  onClick={() => handleModalShow(user)}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
      {isModalActive && (
        <div className="modal-role">
          <div className="modal-header">
            <h5 className="modal-heading">
              {editMode ? "Edit Role" : "Add A Role"}
            </h5>
            <FontAwesomeIcon
              icon={faXmark}
              className="role-modal-close"
              onClick={handleModalClose}
            />
          </div>
          <div className="modal-content">
            <div className="user-role">
              {" "}
              <h5>Name:</h5>
              <h5 style={{ marginLeft: "1rem" }}>
                {selectedUser ? selectedUser.name : ""}
              </h5>
            </div>
            <div className="modal-container">
              <h5>{editMode ? "New Role :" : "Role :"}</h5>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="modal-save-role">
            <button onClick={handleSaveRole}>
              {editMode ? "Save Changes" : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
