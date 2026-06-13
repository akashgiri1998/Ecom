import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Enable CORS for frontend origin (Vite runs on port 5173 by default)
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());

// Path to submissions file
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'submissions.json');

// Ensure data directory exists
async function ensureDataSetup() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error establishing data directory/file:', error);
  }
}

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, services, message } = req.body;

  // Simple validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name, email, and message are required fields.' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide a valid email address.' 
    });
  }

  const newSubmission = {
    id: Date.now().toString(),
    name,
    email,
    services: services || [],
    message,
    timestamp: new Date().toISOString()
  };

  try {
    await ensureDataSetup();
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
    const submissions = JSON.parse(fileContent);
    
    submissions.push(newSubmission);
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');

    // Simulate sending email to orvexatechnologies@gmail.com
    console.log('\n==================================================');
    console.log(`[EMAIL NOTIFICATION TO: orvexatechnologies@gmail.com]`);
    console.log(`Subject: New Lead from Orvexa Technologies Website`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Services of Interest: ${Array.isArray(services) ? services.join(', ') : 'None specified'}`);
    console.log(`Message:\n${message}`);
    console.log('==================================================\n');

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will contact you shortly.',
      submissionId: newSubmission.id
    });
  } catch (error) {
    console.error('Submission recording failed:', error);
    return res.status(500).json({
      success: false,
      message: 'A server error occurred. Please try again later.'
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Orvexa Backend] Running on http://localhost:${PORT}`);
});
