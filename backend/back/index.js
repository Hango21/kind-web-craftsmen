require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const db = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- File Upload Setup ---
// Files will be stored in: /home/yourusername/uploads/applications/
const UPLOAD_DIR = path.join(process.env.HOME || __dirname, "uploads", "applications");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        // Format: timestamp-fieldname-originalname
        const uniqueName = `${Date.now()}-${file.fieldname}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },  // 10 MB per file
    fileFilter: (req, file, cb) => {
        const allowed = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, JPG, PNG, and DOC files are allowed."));
        }
    },
});

// Serve uploaded files statically (for admin access)
app.use("/uploads", express.static(path.join(process.env.HOME || __dirname, "uploads")));

// 1. ONLINE APPLICATION SYSTEM API (with file uploads)
const applicationUpload = upload.fields([
    { name: "birthCertificate", maxCount: 1 },
    { name: "reportCards", maxCount: 1 },
    { name: "idDocuments", maxCount: 1 },
]);

app.post("/api/applications", (req, res) => {
    applicationUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const {
                parentName, parentPhone, parentEmail, occupation,
                studentName, dob, grade, prevSchool, medical, needs
            } = req.body;

            // Get file paths (or null if not uploaded)
            const files = req.files || {};
            const birthCertPath = files.birthCertificate ? files.birthCertificate[0].filename : null;
            const reportCardsPath = files.reportCards ? files.reportCards[0].filename : null;
            const idDocsPath = files.idDocuments ? files.idDocuments[0].filename : null;

            const newApplication = await db.query(
                `INSERT INTO applications (
                    parent_name, parent_phone, parent_email, occupation,
                    student_name, dob, grade, prev_school, medical_conditions, special_needs,
                    birth_certificate, report_cards, id_documents
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
                [
                    parentName, parentPhone, parentEmail, occupation,
                    studentName, dob, grade, prevSchool, medical, needs,
                    birthCertPath, reportCardsPath, idDocsPath
                ]
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

// 3. CONTACT FORM API
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        const newContact = await db.query(
            `INSERT INTO contacts (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, phone, subject, message]
        );

        res.status(201).json({
            message: "Message received! We will respond shortly.",
            contact: newContact.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error handling contact message" });
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
