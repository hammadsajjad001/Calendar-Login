const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const PermissionsModel = mongoose.model("Permissions", PermissionsSchema);

module.exports = PermissionsModel;
