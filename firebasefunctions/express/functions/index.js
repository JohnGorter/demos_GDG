const functions = require('firebase-functions');
const express = require('express')
const app = express()
app.get('/url', (req, res) => {
  res.end('response')
})
exports.api = functions.https.onRequest(app);