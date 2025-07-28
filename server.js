// server.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve data folder for blog posts
app.use('/data', express.static(__dirname + '/data'));


// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route: Homepage (default)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route: Get blog posts (JSON API)
app.get('/api/blog', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'blog-posts.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not load blog posts' });
    }
    res.json(JSON.parse(data));
  });
});

// Route: Contact form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    // Configure mail transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email (set in .env)
        pass: process.env.EMAIL_PASS  // Your app password
      }
    });

    // Email details
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

// 404 Fallback (if no route matches)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
