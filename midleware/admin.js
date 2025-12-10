const { verify } = require("jsonwebtoken");
const {ADMIN_SECRET}=require("../config");
const jwt=require("jsonwebtoken");

function adminMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,ADMIN_SECRET);
    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).json("invalid admin");
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}
