import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Roles () {
  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  useEffect(() => {
    // Fetch roles from the server when the component mounts
    axios
      .get('http://localhost:3001/roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error('Error fetching roles:', error))
  }, [])

  const handleAddRole = () => {
    if (role.trim()) {
      if (isEditing) {
        axios
          .put(`http://localhost:3001/roles/${roles[editIndex]._id}`, {
            name: role
          })
          .then(response => {
            const updatedRoles = [...roles]
            updatedRoles[editIndex] = response.data
            setRoles(updatedRoles)
            setIsEditing(false)
            setEditIndex(null)
          })
          .catch(error => console.error('Error updating role:', error))
      } else {
        axios
          .post('http://localhost:3001/roles', { name: role })
          .then(response => setRoles([...roles, response.data]))
          .catch(error => console.error('Error adding role:', error))
      }
      setRole('')
    }
  }

  const handleEditRole = index => {
    setRole(roles[index].name)
    setIsEditing(true)
    setEditIndex(index)
  }

  const handleDeleteRole = index => {
    axios
      .delete(`http://localhost:3001/roles/${roles[index]._id}`)
      .then(() => {
        const updatedRoles = roles.filter((_, i) => i !== index)
        setRoles(updatedRoles)
      })
      .catch(error => console.error('Error deleting role:', error))
  }

  return (
    <div className='roles-container'>
      <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>
        Role Management
      </h3>
      <div className='role-input'>
        <input
          type='text'
          placeholder='Add a role'
          required
          value={role}
          onChange={e => {
            setRole(e.target.value)
          }}
        />
        <button onClick={handleAddRole}>{isEditing ? 'Update' : 'Add'}</button>
      </div>
      <div className='roles-display'>
        {roles.map((item, index) => (
          <ul key={item._id}>
            <li>{item.name}</li>
            <div>
            <button onClick={() => handleEditRole(index)}>Edit</button>
            <button onClick={() => handleDeleteRole(index)}>Delete</button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  )
}
