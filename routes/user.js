const { Router }=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const secret="ayushsingh";
const Zod=require("zod");
const bcrypt=require("bcryptjs");
const { userModel } =require("./db");






userRouter.post("/signup",async function(req,res){
     const neededbody=Zod.object({
            email:Zod.string(),
            password: Zod.string(),
            firstname: Zod.string(),
            lastname: Zod.string(),
        })
    
        const valid = neededbody.safeParse(req.body);
        if(!valid.success){
            res.json({
                msg:"invalid context"
            })
        }
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const email=req.body.email;
        const password=req.body.password;
    
        const newpassword=await bcrypt.hash(password,5);
    
        await userModel.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:newpassword
        })
        res.json({
            msg:"you are logged in"
        })
    
})
userRouter.post("/signin",async function(req,res){
      const email=req.body.email;
        const password=req.body.password;
    
        const user=await userModel.findOne({
            email:email
        })
        const check=bcrypt.compare(password,user.password);
        if(!check){
            res.json({
                msg:"incorrect password"
            })
        }
        if(user){
            const token=jwt.sign({
                id:user._id
            },secret);
    
            res.json({
                 msg: "Signin successful",
                token
            })
        }
        else{
            res.json({
                msg:"invalid"
            })
        }
    

})

module.exports={
    userRouter:userRouter
}