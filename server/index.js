const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

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

app.post("/signup", async (req, res) => {
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
        res.json({ status: "success", name: user.name });
      } else {
        res.json("The password is incorrect.");
      }
    } else {
      res.json("No record existed");
    }
  });
});

// Add a new role to a user
app.post("/addRole", async (req, res) => {
  const { userId, role } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: "User ID and role are required" });
  }

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure roles is initialized as an array
    if (!user.roles) {
      user.roles = [];
    }

    if (user.roles.includes(role)) {
      return res.status(400).json({ message: "Role already assigned" });
    }

    user.roles.push(role);
    await user.save();

    res.json({ message: "Role added successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error adding role", error: err.message });
  }
});

// Update an existing role for a user
app.put("/updateRole", async (req, res) => {
  const { userId, oldRole, newRole } = req.body;

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the old role
    const roleIndex = user.roles.indexOf(oldRole);
    if (roleIndex === -1) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Update the role
    user.roles[roleIndex] = newRole;
    await user.save();

    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a role from a user
app.delete("/deleteRole", async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the role
    const roleIndex = user.roles.indexOf(role);
    if (roleIndex === -1) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Remove the role
    user.roles.splice(roleIndex, 1);
    await user.save();

    res.json({ message: "Role deleted successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error deleting role", error: err });
  }
});

// Permissions

// Get users For permission and userstab
app.get("/userstab", async (req, res) => {
  try {
    const userList = await EmployeeModel.find().select(
      "name email permissions roles"
    );
    res.json(userList);
  } catch (err) {
    console.log(err);
  }
});

app.post("/addPermission", async (req, res) => {
  const { userId, permission } = req.body;

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.permissions.includes(permission)) {
      return res.status(400).json({ message: "Permission already assigned" });
    }

    user.permissions.push(permission);
    await user.save();

    res.json({ message: "Permission added successfully", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/updatePermission", async (req, res) => {
  const { userId, oldPermission, newPermission } = req.body;

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const permissionIndex = user.permissions.indexOf(oldPermission);
    if (permissionIndex === -1) {
      return res.status(404).json({ message: "Permission not found" });
    }

    user.permissions[permissionIndex] = newPermission;
    await user.save();

    res.json({ message: "Permission updated successfully", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/deletePermission", async (req, res) => {
  const { userId, permission } = req.body;

  try {
    const user = await EmployeeModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const permissionIndex = user.permissions.indexOf(permission);
    if (permissionIndex === -1) {
      return res.status(404).json({ message: "Permission not found" });
    }

    user.permissions.splice(permissionIndex, 1);
    await user.save();

    res.json({ message: "Permission deleted successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error deleting permission", error: err });
  }
});

app.listen(3001, () => {
  console.log("Server is running");
});
