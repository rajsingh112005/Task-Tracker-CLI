const mongoose = require('mongoose');

require('dotenv').config();
const url = process.env.MONGO_URI;

const connectdb = async () => {
    try {
        await mongoose.connect(url);
        
    } catch (err) {
        console.log("Error connecting to the database:", err.message);
    }
};

module.exports = connectdb;