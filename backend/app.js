// app.js
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;