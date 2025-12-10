const jwt=require("jsonwebtoken");
const {USER_SECRET}=require("../config")

function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,USER_SECRET);
    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).json("invalid user");
    }
}

module.exports={
    userMiddleware:userMiddleware
}