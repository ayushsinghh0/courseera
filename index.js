const express=require("express");
const { userrouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const {adminRouter}=require("./routes/admin")
const app=express();

app.use(express.json());

app.use("/user",userrouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);






app.listen(3000);