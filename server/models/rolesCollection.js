const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }, 
})

const RolesModel = mongoose.model("Roles", RolesSchema)

module.exports = RolesModel;