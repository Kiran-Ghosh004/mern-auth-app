const express = require("express");
const router = express.Router();

// Public route for testing
router.get("/", (req, res) => {
    const products = [
        { name: "Product 1", price: 100 },
        { name: "Product 2", price: 200 },
        { name: "Product 3", price: 300 },
    ];

    res.status(200).json(products);
});

module.exports = router;
