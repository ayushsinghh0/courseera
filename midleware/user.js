const jwt=require("jsonwebtoken");
const {USER_SECRET}=require("../config")

function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,)
}