const { Router }=require("express");
const adminRouter=Router();
const jwt=require("jsonwebtoken");
const secret="ayush";
const Zod=require("zod");
const bcrypt=require("bcryptjs");
const { adminmodel:adminModel } =require("./db");


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
        },secret);

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

adminRouter.post("/course",function(req,res){
    res.json({
        msg: "course added successful"
    })
})

adminRouter.delete("/course",function(req,res){
    res.json({
        msg: "course deleted successful"
    })
})


adminRouter.put("/course",function(req,res){
    res.json({
        msg: "course deleted successful"
    })
})

adminRouter.get("/course/bulk",function(req,res){

})

module.exports={
    adminRouter:adminRouter
}