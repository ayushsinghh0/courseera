const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;
mongoose.connect("mongodb+srv://admin:ayushsingh@cluster0.puqfpej.mongodb.net/coursera")

const schema=mongoose.Schema;

const userSchema=new schema({
    email:{ type: String, unique:true },
    password:String,
    firstName:String,
    lastName:String
})

const adminSchema=new schema({
     email:String,
    password:String,
    firstName:String,
    lastName:String

})

const courseSchema=new schema({
    title:String,
    courseId:String,
    description:String,
    price:Number,
    createrid:ObjectId,
    imageurl:String

})

const purchaseSchema=new schema({
    userId:ObjectId,
    courseId:ObjectId


})

const usermodel=mongoose.model("user",userSchema);
const adminmodel=mongoose.model("admin",adminSchema);
const coursemodel=mongoose.model("course",courseSchema);
const purchasemodel=mongoose.model("purchase",purchaseSchema);

module.exports={
    usermodel,
    adminmodel,
    coursemodel,
    purchasemodel
}