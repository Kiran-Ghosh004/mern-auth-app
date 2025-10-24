const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
    // 🔹 Log all headers to debug Postman requests
    console.log('req.headers:', req.headers);

    const authHeader = req.headers['authorization'];

    console.log('Authorization header:', authHeader); // logs the specific header

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: JWT token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('❌ JWT verification failed:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

module.exports = ensureAuth;
