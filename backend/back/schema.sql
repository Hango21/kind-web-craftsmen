-- Run this script inside your cPanel phpPgAdmin or via command line to create the tables

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    occupation VARCHAR(255),
    student_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    grade VARCHAR(50) NOT NULL,
    prev_school VARCHAR(255),
    medical_conditions TEXT,
    special_needs TEXT,
    birth_certificate VARCHAR(500),
    report_cards VARCHAR(500),
    id_documents VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletters (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
