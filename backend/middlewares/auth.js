const jwt = require("jsonwebtoken");
const ensureAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ message: " unaotherized jwt token is required" });
    }
    try{
        const decoded=jwt.verify(authHeader,process.env.secrete_key);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).send({ message: " unauthorized, Invalid token" });
    }
}

module.exports=ensureAuth;
