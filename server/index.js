const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const RolesModel = require("./models/rolesCollection");
const PermissionsModel = require("./models/PermissionsCollections");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/s ignup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new EmployeeModel({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  await EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("The password is incorrect.");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.get("/roles", async (req, res) => {
  await RolesModel.find()
    .then((roles) => res.json(roles))
    .catch((err) => res.status(500).json(err));
});

app.post("/roles", async (req, res) => {
  await RolesModel.create(req.body)
    .then((role) => res.json(role))
    .catch((err) => res.status(500).json(err));
});

app.put("/roles/:id", async (req, res) => {
  await RolesModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((role) => res.json(role))
    .catch((err) => res.status(500).json(err));
});

app.delete("/roles/:id", async (req, res) => {
  await RolesModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Role deleted successfully" }))
    .catch((err) => res.status(500).json(err));
});

// Permissions

app.get("/permissions", async (req, res) => {
  await PermissionsModel.find()
    .then((permissions) => res.json(permissions))
    .catch((err) => res.status(500).json(err));
});

app.post("/permissions", async (req, res) => {
  await PermissionsModel.create(req.body)
    .then((permission) => res.json(permission))
    .catch((err) => res.status(500).json(err));
});

app.put("/permissions/:id", async (req, res) => {
  await PermissionsModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .then((permission) => res.json(permission))
    .catch((err) => res.status(500).json(err));
});

app.delete("/permissions/:id", async (req, res) => {
  await PermissionsModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Permission deleted successfully" }))
    .catch((err) => res.status(500).json(err));
});

// Get users For permission

// Get users
app.get('/users', async (req, res) => {
  try {
    const users = await EmployeeModel.find().select('name');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.listen(3001, () => {
  console.log("Server is running");
});
