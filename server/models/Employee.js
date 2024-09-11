const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  permissions: [
    {
      type: String,
    },
  ],
  roles: [
    {
      type: String,
    },
  ],
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
