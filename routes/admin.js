const { Router }=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const { ADMIN_SECRET } =require("../config")
const Zod=require("zod");
const bcrypt=require("bcryptjs");
const { adminModel, courseModel } =require("./db");
const { adminMiddleware }=require("../midleware/admin")


//login,signup,create a course, delete a corse,add course content

adminRouter.post("/signup",async function(req,res){
    const neededbody=Zod.object({
        email:Zod.string(),
        password: Zod.string(),

        firstName: Zod.string(),
        lastName: Zod.string(),
    })

    const valid = neededbody.safeParse(req.body);
    if(!valid.success){
        return res.json({
            msg:"invalid context"
        })
    }
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;

    const newpassword=await bcrypt.hash(password,5);

    await adminModel.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:newpassword
    })
    res.json({
        msg:"you are logged in"
    })

})

adminRouter.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const admin=await adminModel.findOne({
        email:email
    })
    const check=await bcrypt.compare(password,admin.password);
    if(!check){
       return  res.json({
            msg:"incorrect password"
        })
    }
    
        const token=jwt.sign({
            id:admin._id
        },ADMIN_SECRET);

        res.json({
             msg: "Signin successful",
            token
        })
})

adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;

    const { title, description,imageUrl,price}=req.body;
    const course=await courseModel.create({
        title,description,imageUrl,creatorid:adminId,price
    })
    
    res.json({
        Message:"course created",
        courseId: course._id
    })
})


 adminRouter.put("/course",async function(req,res){
    const adminId=req.userId;
    const {title, description,imageUrl,price,courseId}=req.body;
    const course=await courseModel.updateOne({
        _id:courseId,
        creatorid:adminId
    },{
        title,description,imageUrl,creatorid:adminId,price

    })
    res.json({
        Message:"course updated",
        courseId:course._id
    })
})
 
adminRouter.get("/course/bulk",async function(req,res){
    const adminId= req.userId;

    const course=await courseModel.find({
        creatorID:adminId
    })
    res.json({
        message:"course updated",
        course
    })

})

module.exports={
    adminRouter:adminRouter
}