-- Run this ONLY if you already created the old tables and need to update them.
-- If you are starting fresh, use schema.sql instead.

-- Add file upload columns to existing applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS birth_certificate VARCHAR(500);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS report_cards VARCHAR(500);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS id_documents VARCHAR(500);

-- Create the contacts table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
