import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Permissions() {
  const [permission, setPermission] = useState('')
  const [permissions, setPermissions] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/permissions')
      .then(response => {
        console.log('Fetched permissions:', response.data)
        setPermissions(response.data)
      })
      .catch(error => console.error('Error fetching permissions:', error))

    axios
      .get('http://localhost:3001/users')
      .then(response => {
        console.log('Fetched users:', response.data)
        setUsers(response.data)
      })
      .catch(error => console.error('Error fetching users:', error))
  }, [])

  const handleAddPermission = () => {
    if (permission.trim()) {
      const newPermission = { name: permission }
      if (isEditing) {
        axios
          .put(
            `http://localhost:3001/permissions/${permissions[editIndex]._id}`,
            newPermission
          )
          .then(response => {
            console.log('Updated permission:', response.data)
            const updatedPermissions = [...permissions]
            updatedPermissions[editIndex] = response.data
            setPermissions(updatedPermissions)
            setIsEditing(false)
            setEditIndex(null)
          })
          .catch(error => console.error('Error updating permission:', error))
      } else {
        axios
          .post('http://localhost:3001/permissions', newPermission)
          .then(response => {
            console.log('Added permission:', response.data)
            setPermissions([...permissions, response.data])
          })
          .catch(error => console.error('Error adding permission:', error))
      }
      setPermission('')
    }
  }

  const handleEditPermission = index => {
    setPermission(permissions[index].name)
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleDeletePermission = index => {
    axios
      .delete(`http://localhost:3001/permissions/${permissions[index]._id}`)
      .then(() => {
        console.log('Deleted permission:', permissions[index]._id)
        const updatedPermissions = permissions.filter((_, i) => i !== index)
        setPermissions(updatedPermissions)
      })
      .catch(error => console.error('Error deleting permission:', error))
  }

  return (
    <div className="permissions-main">
    <div className="container permissions-container">
      <div className="row permissions-header">
        <div className="col-sm-3">Name</div>
        <div className="col-sm-5">Permissions</div>
        <div className="col-sm-2">Add Permission</div>
      </div>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
          <div className="row permission-content-display" key={user._id}>
            <div className="col-sm-3 p-3 ">{user.name}</div>
            <div className="col-sm-5 p-3 permission-list-div">
              {Array.isArray(user.permissions) &&
                user.permissions.map((permission, index) => (
                  <div key={index} className="permission-list">
                    <div className="permission-list-item">{permission}</div>
                    <div className="edit-delete-permission">
                      <FontAwesomeIcon
                        icon={faPen}
                        className="editPermission-icon"
                        onClick={() => handleEditPermission(user, permission)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="deletePermission-icon"
                        onClick={() => handleDeletePermission(user, permission)}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-sm-1">
              <FontAwesomeIcon
                icon={faPlus}
                className="addPermission-icon"
                onClick={() => handleAddPermission(user)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
    {isModalActive && (
      <div className="modal-permission">
        <div className="modal-header">
          <h5 className="modal-heading">
            {editMode ? "Edit Permission" : "Add A Permission"}
          </h5>
          <FontAwesomeIcon
            icon={faXmark}
            className="permission-modal-close"
            onClick={handleModalClose}
          />
        </div>
        <div className="modal-content">
          <div className="user-permission">
            <h5>Name:</h5>
            <h5 style={{ marginLeft: "4rem" }}>
              {selectedUser ? selectedUser.name : ""}
            </h5>
          </div>
          <div className="modal-container">
            <h5>{editMode ? "New Permission :" : "Permission :"}</h5>
            <input
              type="text"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="modal-save-permission">
          <button onClick={handleSavePermission}>
            {editMode ? "Save Changes" : "Save"}
          </button>
        </div>
      </div>
    )}
  </div>
  
  )
}
