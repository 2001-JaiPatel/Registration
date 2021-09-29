const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URI } = process.env;

module.exports = {
    init: () => mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
};
