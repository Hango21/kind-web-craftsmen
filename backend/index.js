require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. ONLINE APPLICATION SYSTEM API
// This endpoint receives the registration form payload from the frontend.
app.post("/api/applications", async (req, res) => {
    try {
        const {
            parentName, parentPhone, parentEmail, occupation,
            studentName, dob, grade, prevSchool, medical, needs
        } = req.body;

        const newApplication = await db.query(
            `INSERT INTO applications (
        parent_name, parent_phone, parent_email, occupation,
        student_name, dob, grade, prev_school, medical_conditions, special_needs
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [parentName, parentPhone, parentEmail, occupation, studentName, dob, grade, prevSchool, medical, needs]
        );

        res.status(201).json({
            message: "Application submitted successfully!",
            application: newApplication.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error handling application" });
    }
});

// 2. NEWSLETTER SUBSCRIPTION API
app.post("/api/newsletter", async (req, res) => {
    try {
        const { email } = req.body;
        const newSub = await db.query(
            "INSERT INTO newsletters (email) VALUES ($1) RETURNING *",
            [email]
        );
        res.status(201).json({ message: "Subscribed successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error handling subscription" });
    }
});

// Basic Health Check
app.get("/api/health", (req, res) => {
    res.json({ status: "Backend is running!" });
});

// Init Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
