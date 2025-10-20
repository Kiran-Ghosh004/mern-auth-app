require('dotenv').config();
const express = require('express');
const app = express();
require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const productRouter = require('./routes/productRouter'); // fixed typo

const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (you can restrict later)
app.use(cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
