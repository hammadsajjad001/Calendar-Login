const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')
const RolesModel = require('./models/rolesCollection')
const PermissionsModel = require('./models/PermissionsCollections')

const app = express()
app.use(express.json())
app.use(cors())

mongoose
  .connect('mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
  })

app.post('/', (req, res) => {
  EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  EmployeeModel.findOne({ email: email }).then(user => {
    if (user) {
      if (user.password === password) {
        res.json('success')
      } else {
        res.json('The password is incorrect.')
      }
    } else {
      res.json('No record existed')
    }
  })
})

app.get('/roles', (req, res) => {
  RolesModel.find()
    .then(roles => res.json(roles))
    .catch(err => res.status(500).json(err))
})

app.post('/roles', (req, res) => {
  RolesModel.create(req.body)
    .then(role => res.json(role))
    .catch(err => res.status(500).json(err))
})

app.put('/roles/:id', (req, res) => {
  RolesModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(role => res.json(role))
    .catch(err => res.status(500).json(err))
})

app.delete('/roles/:id', (req, res) => {
  RolesModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Role deleted successfully' }))
    .catch(err => res.status(500).json(err))
})

// Permissions

app.get('/permissions', (req, res) => {
  PermissionsModel.find()
    .then(permissions => res.json(permissions))
    .catch(err => res.status(500).json(err))
})

app.post('/permissions', (req, res) => {
  PermissionsModel.create(req.body)
    .then(permission => res.json(permission))
    .catch(err => res.status(500).json(err))
})

app.put('/permissions/:id', (req, res) => {
  PermissionsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(permission => res.json(permission))
    .catch(err => res.status(500).json(err))
})

app.delete('/permissions/:id', (req, res) => {
  PermissionsModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Permission deleted successfully' }))
    .catch(err => res.status(500).json(err))
})

app.listen(3001, () => {
  console.log('Server is running')
})
