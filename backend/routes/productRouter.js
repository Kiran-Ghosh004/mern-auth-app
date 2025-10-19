const ensureAuth = require("../middlewares/auth");


const router = require("express").Router();


router.get("/", ensureAuth,(req, res) => {
    console.log("Authenticated user:", req.user);
    res.status(200).send([{
        name: "Product 1",
        price: 100
    },
    {
        name: "Product 2",
        price: 200
    },
    {
        name: "Product 3",
        price: 300
    }]);
});



module.exports = router;