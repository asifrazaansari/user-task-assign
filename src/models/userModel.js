const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true, lowercase: true },
    role: { type: String, require: true, trim: true },
    department: { type: String, require: true, trim: true }

}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
