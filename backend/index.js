require('dotenv').config();
const express = require('express');
const app = express();
require('./models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const productRouer = require('./routes/productRouter');

const PORT = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');

});

app.use('/products',productRouer);
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});