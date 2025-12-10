const mongoose=require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const schema=mongoose.Schema;

const userSchema=new schema({
    email: { type: String, required: true, unique: true },
    password:String,
    firstName:String,
    lastName:String
})

const adminSchema=new schema({
    email:{ type: String, required: true, unique: true },
    password:String,
    firstName:String,
    lastName:String

})

const courseSchema=new schema({
    title:String,
    description:String,
    price:Number,
    createrid:ObjectId,
    imageUrl:String

})

const purchaseSchema=new schema({
    userId:ObjectId,
    courseId:ObjectId


})

const userModel=mongoose.model("user",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}