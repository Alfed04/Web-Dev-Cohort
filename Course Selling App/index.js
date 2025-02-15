const express=require("express")
const app=express()
const mongooose=require("mongoose")
const jwt=require("jsonwebtoken")
const JWT_SECRET="alfedkhan@2002"
const {userRouter}=require("./routes/user")
const { courseRouter}=require("./routes/course")
const { adminRouter}=require("./routes/admin")
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT;
const DATABASE_CONNECTION_STRING=process.env.DATABASE_CONNECTION_STRING;
// const {UserModel,AdminModel,CourseModel,PurchaseModel}=require("./db")
// Add route skeleton for user login, signup, purchase a course, sees all courses, sees the purchased courses course

app.use(express.json())
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)

async function  main(){
    await mongooose.connect(DATABASE_CONNECTION_STRING)
    app.listen(3000)
    console.log(`Listening on port no. ${PORT}`)
}

main()