const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: null, required: true },
    lastname: { type: String, default: null },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String, required: false },
    description: { type: String, required: false },
    hobby: { type: Array, required: false },
    gender: { type: String, required: false },
    city: { type: String, required: false },
    status: { type: String, required: false }
});

module.exports = mongoose.model('user', userSchema);
