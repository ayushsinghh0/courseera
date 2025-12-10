const { Router }=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const { ADMIN_SECRET } =require("../config")
const Zod=require("zod");
const bcrypt=require("bcryptjs");
const { adminModel, courseModel } =require("./db");
const { adminMiddleWare }=require("../midleware/admin")


//login,signup,create a course, delete a corse,add course content

adminRouter.post("/signup",async function(req,res){
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

    await adminModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:newpassword
    })
    res.json({
        msg:"you are logged in"
    })

})

adminRouter.get("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const admin=await adminModel.findOne({
        email:email
    })
    const check=bcrypt.compare(password,admin.password);
    if(!check){
        res.json({
            msg:"incorrect password"
        })
    }
    if(admin){
        const token=jwt.sign({
            id:admin._id
        },ADMIN_SECRET);

        res.json({
             msg: "Signin successful",
            token:true
        })
    }
    else{
        res.json({
            msg:"invalid"
        })
    }


})

adminRouter.post("/course",adminMiddleWare,async function(req,res){
    adminId=req.userId;

    const { title, description,imageUrl,price}=req.body;
    await courseModel.create({
        title,description,imageUrl,createrid:adminId,price
    })
    
    res.json({
        Message:"course created",
        courseId: course._id
    })
})


adminRouter.put("/course",adminMiddleWare,async function(req,res){
    const {title, description,imageUrl,price}=req.body;
    await findOne.courseModel({

    })
})

adminRouter.get("/course/bulk",function(req,res){

})

module.exports={
    adminRouter:adminRouter
}