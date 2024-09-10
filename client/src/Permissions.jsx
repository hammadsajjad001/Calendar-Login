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
    <div className='permissions-main'>
      <div className='permissions-container'>
        <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>
          Permissions Management
        </h3>
        <div className='permission-input'>
          <input
            type='text'
            placeholder='Add a permission'
            required
            value={permission}
            onChange={e => {
              setPermission(e.target.value)
            }}
          />
          <button onClick={handleAddPermission}>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
        <div className='permission-allContent'>
          <div className='grid-container'>
            <div className='grid-header'>
              <div className='grid-item header-item'>User Name</div>
              <div className='grid-item header-item'>Permissions</div>
            </div>
            {users.length > 0 ? (
              users.map((user, index) => {
                const userPermissions = permissions.filter(permission => permission.userId === user._id);
                return (
                  <div className='grid-item' key={index}>
                    <div className='user-name'>{user.name}</div>
                    <div className='user-permissions'>
                      {userPermissions.length > 0 ? (
                        userPermissions.map((perm, idx) => <div key={idx}><ul><li>{perm.name}</li></ul></div>)
                      ) : (
                        <div>No permissions</div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
