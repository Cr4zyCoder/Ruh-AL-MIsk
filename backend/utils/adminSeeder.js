const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User.model');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);

        const email = "admin@ruhalmisk.com"; // Default admin email
        const password = "MiskAdmin2026!";   // Initial secure password

        const userExists = await User.findOne({ email });

        if (userExists) {
            userExists.role = 'admin';
            await userExists.save();
            console.log('User already exists. Elevated to Admin role.');
        } else {
            await User.create({
                name: "House Administrator",
                email,
                password,
                role: 'admin'
            });
            console.log('New Admin account created successfully!');
        }

        console.log('-----------------------------------');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('-----------------------------------');
        console.log('Please change your password after logging in.');

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
