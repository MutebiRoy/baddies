const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/db');  // Assuming you have a db setup file

// Register new user
exports.registerUser = async (req, res) => {
    const { username, email, password, birthday } = req.body;
    try {

        // 1. Log received data
        console.log("Received signup data:", req.body);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user to the database
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password_hash, birthday) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email, birthday",
            [username, email, hashedPassword, birthday]
        );

        console.log("Prepared SQL query:", newUser.query);

        res.status(201).json({
            userId: newUser.rows[0].user_id,
            username: newUser.rows[0].username,
            email: newUser.rows[0].email,
            birthday: newUser.rows[0].birthday
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Failed to register user due to an internal error." });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query("SELECT user_id, username, password_hash FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            return res.status(404).json('User not found');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(400).json('Invalid credentials');
        }

        // Create and assign a token
        const token = jwt.sign({ id: user.rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.header('auth-token', token).json({ message: "Logged in successfully!", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Login failed due to an internal error." });
    }
};

// Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await pool.query("SELECT user_id, username, email, birthday FROM users");
        res.status(200).json(users.rows);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users due to an internal error." });
    }
};
