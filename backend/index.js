require('dotenv').config();
const express = require('express');
const app = express();
require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter');

const PORT = process.env.PORT || 8080;

// ✅ FIX 1: call cors() — it’s a function
app.use(cors());

// ✅ FIX 2: Parse JSON bodies
app.use(bodyParser.json());

// ✅ Routes
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    // ✅ Clickable link
    console.log(`🚀 Server is running on: http://localhost:${PORT}`);
});
