import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faPen,
    faTrash,
    faXmark
} from '@fortawesome/free-solid-svg-icons'

export default function Permissions() {
    const [users, setUsers] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [newPermission, setNewPermission] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [permissionToEdit, setPermissionToEdit] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/userstab')
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch(err => {
                console.log('Could not fetch users:', err)
            })
    }, [])

    // Modal
    const handleModalShow = (user, permission = '') => {
        console.log('Show Modal for User:', user)
        setSelectedUser(user)
        setIsModalActive(true)
        setNewPermission(permission)
        setPermissionToEdit(permission)
        setEditMode(!!permission)
    }

    const handleModalClose = () => {
        setIsModalActive(false)
        setSelectedUser(null)
        setNewPermission('')
        setEditMode(false)
        setPermissionToEdit('')
    }

    const handleSavePermission = () => {
        if (!selectedUser || !newPermission) {
            alert('Please enter a permission')
            return
        }

        if (editMode) {
            axios
                .put('http://localhost:3001/updatePermission', {
                    userId: selectedUser._id,
                    oldPermission: permissionToEdit,
                    newPermission
                })
                .then(response => {
                    setUsers(
                        users.map(user =>
                            user._id === selectedUser._id
                                ? {
                                    ...user,
                                    permissions: user.permissions.map(p =>
                                        p === permissionToEdit ? newPermission : p
                                    )
                                }
                                : user
                        )
                    )
                    handleModalClose()
                })
                .catch(err => {
                    console.log('Could not update permission:', err)
                })
        } else {
            axios
                .post('http://localhost:3001/addPermission', {
                    userId: selectedUser._id,
                    permission: newPermission
                })
                .then(response => {
                    setUsers(
                        users.map(user =>
                            user._id === selectedUser._id
                                ? { ...user, permissions: [...user.permissions, newPermission] }
                                : user
                        )
                    )
                    handleModalClose()
                })
                .catch(err => {
                    console.log('Could not add permission:', err)
                })
        }
    }

    const handleDeletePermission = (user, permission) => {
        if (!user) {
            alert('User not found')
            return
        }

        axios
            .delete('http://localhost:3001/deletePermission', {
                data: {
                    userId: user._id,
                    permission
                }
            })
            .then(response => {
                setUsers(
                    users.map(u =>
                        u._id === user._id
                            ? {
                                ...u,
                                permissions: u.permissions.filter(p => p !== permission)
                            }
                            : u
                    )
                )
            })
            .catch(err => {
                console.log('Could not delete permission:', err)
            })
    }

    return (
        <div className='permissions-main'>
            <div className='container permissions-container'>
                <div className='row permissions-header'>
                    <div className='col-sm-3'>Name</div>
                    <div className='col-sm-5'>Permissions</div>
                    <div className='col-sm-2'>Add Permission</div>
                </div>
                {users.length > 0 ? (
                    users.map(user => (
                        <div className='row permission-content-display' key={user._id}>
                            <div className='col-sm-3 p-3 '>{user.name}</div>
                            <div className='col-sm-5 p-3 permission-list-div'>
                                {' '}
                                {user.permissions &&
                                    user.permissions.map((permission, index) => (
                                        <div key={index} className='permission-list'>
                                            <div className='permission-list-item'>{permission}</div>
                                            <div className="edit-delete-permission">
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    className='editPermission-icon'
                                                    onClick={() => handleModalShow(user, permission)}
                                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className='deletePermission-icon'
                                                    onClick={() => handleDeletePermission(user, permission)}
                                                    style={{ marginLeft: '10px', cursor: 'pointer' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className='col-sm-1'>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className='addPermission-icon'
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
                <div className='modal-permission'>
                    <div className='modal-header'>
                        <h5 className='modal-heading'>
                            {editMode ? 'Edit Permission' : 'Add A Permission'}
                        </h5>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className='permission-modal-close'
                            onClick={handleModalClose}
                        />
                    </div>
                    <div className='modal-content'>
                        <div className='user-permission'>
                            {' '}
                            <h5>Name:</h5>
                            <h5 style={{ marginLeft: '4rem' }}>
                                {selectedUser ? selectedUser.name : ''}
                            </h5>
                        </div>
                        <div className='modal-container'>
                            <h5>{editMode ? 'New Permission :' : 'Permission :'}</h5>
                            <input
                                type='text'
                                value={newPermission}
                                onChange={e => setNewPermission(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className='modal-save-permission'>
                        <button onClick={handleSavePermission}>
                            {editMode ? 'Save Changes' : 'Save'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
