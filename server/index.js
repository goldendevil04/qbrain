const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://qbrain.vercel.app', 'https://qbrain.in'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Nodemailer configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // your email
      pass: process.env.SMTP_PASS  // your password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Email templates
const getContactEmailTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message - Qbrain</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center; color: white; }
    .content { background: #f9f9f9; padding: 20px; }
    .footer { background: #333; color: white; padding: 10px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Message</h1>
    </div>
    <div class="content">
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      
      <h2>Message</h2>
      <p>${data.message}</p>
    </div>
    <div class="footer">
      <p>This message was sent from the Qbrain website contact form.</p>
    </div>
  </div>
</body>
</html>
`;

const getAutoReplyTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank you for contacting Qbrain</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00D4FF, #39FF14); padding: 20px; text-align: center; color: white; }
    .content { background: #f9f9f9; padding: 20px; }
    .footer { background: #333; color: white; padding: 10px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You!</h1>
    </div>
    <div class="content">
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out to Qbrain! We've received your message and will get back to you within 24 hours.</p>
      <p>Our team is excited to connect with you and discuss how we can help with your technology needs.</p>
      
      <h3>What's Next?</h3>
      <ul>
        <li>We'll review your message carefully</li>
        <li>A team member will respond within 24 hours</li>
        <li>We'll provide detailed answers to your questions</li>
      </ul>
      
      <p>Best regards,<br>Team Qbrain</p>
    </div>
    <div class="footer">
      <p>This is an automated response from noreply@qbrain.in</p>
    </div>
  </div>
</body>
</html>
`;

// API Routes

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const transporter = createTransporter();

    // Send email to admin
    await transporter.sendMail({
      from: `"Qbrain Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'nkalam.ind@gmail.com',
      subject: `New Contact Message: ${subject}`,
      html: getContactEmailTemplate({ name, email, subject, message })
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: `"Qbrain Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting Qbrain',
      html: getAutoReplyTemplate(name)
    });

    res.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Application form endpoint
app.post('/api/application', upload.single('resume'), async (req, res) => {
  try {
    const applicationData = JSON.parse(req.body.applicationData);
    const resumeFile = req.file;
    
    const transporter = createTransporter();

    // Send application to admin
    await transporter.sendMail({
      from: `"Qbrain Applications" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'nkalam.ind@gmail.com',
      subject: `New Team Application - ${applicationData.personalInfo.fullName}`,
      html: `
        <h2>New Team Application</h2>
        <p><strong>Name:</strong> ${applicationData.personalInfo.fullName}</p>
        <p><strong>Email:</strong> ${applicationData.personalInfo.email}</p>
        <p><strong>Role:</strong> ${applicationData.personalInfo.preferredRole}</p>
        <p><strong>Quiz Score:</strong> ${applicationData.quizResults?.score || 'Not completed'}%</p>
        <p><strong>Motivation:</strong> ${applicationData.personalInfo.motivation}</p>
      `,
      attachments: resumeFile ? [{
        filename: resumeFile.originalname,
        path: resumeFile.path
      }] : []
    });

    // Send confirmation to applicant
    await transporter.sendMail({
      from: `"Qbrain Team" <${process.env.SMTP_USER}>`,
      to: applicationData.personalInfo.email,
      subject: 'Application Received - Qbrain Team',
      html: `
        <h2>Application Received!</h2>
        <p>Hi ${applicationData.personalInfo.fullName},</p>
        <p>Thank you for applying to join the Qbrain team! We've received your application and will review it shortly.</p>
        <p>Best regards,<br>Team Qbrain</p>
      `
    });

    res.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl, filename: req.file.filename });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;