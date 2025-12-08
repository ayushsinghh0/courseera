const { Router }=require("express");
const userrouter=Router();
const secret="ayush";
const jwt=require("jsonwebtoken")
const { usermodel } =require("./db");






userrouter.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    const name=req.body.name;

    const users=jwt.sign({
        id: userrouter._id.toString()
    },secret);

})

function auth(req,res,next){
    const name=req.body.name;
    const email=rew.body.email;

}


userrouter.post("/signin",function(req,res){

})

module.exports={
    userrouter:userrouter
}