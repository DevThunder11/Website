const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Create an Express app
const app = express();

// Handle all requests under /QuiZGenQ/QData/**
app.get('/*', async (req, res) => {
  // Expect Firebase ID token in Authorization header: "Authorization: Bearer <TOKEN>"
  const authHeader = req.get('Authorization') || '';
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : '';

  let authorized = false;
  try {
    // Verify the ID token
    await admin.auth().verifyIdToken(idToken);
    authorized = true;
  } catch (err) {
    authorized = false;
  }

  // Always serve JavaScript MIME type for ES modules
  res.set('Content-Type', 'application/javascript');

  if (authorized) {
    // Serve the real module file from public/QuiZGenQ/QData
    const relPath = req.path.replace(/^\//, '');
    const filePath = path.join(__dirname, '..', 'public', 'QuiZGenQ', 'QData', relPath);
    if (fs.existsSync(filePath)) {
      try {
        const code = fs.readFileSync(filePath, 'utf8');
        return res.send(code);
      } catch (readErr) {
        // On error reading file, return a JS stub that logs error
        res.status(500).send(`console.error('Failed to load module: ${readErr.message}'); export default {};`);
      }
    } else {
      // File not found
      res.status(404).send("console.error('Module not found'); export default {};");
    }
  } else {
    // Not authorized: return stub module that redirects to unauthorized page
    res.status(200).send(`
      // Unauthorized stub module
      window.location.replace('/unauthorized.html');
      export default {};
    `);
  }
});

// Export the Cloud Function
exports.serveQData = functions.https.onRequest(app);