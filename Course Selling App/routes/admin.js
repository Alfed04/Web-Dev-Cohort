const {Router}=require("express")
const adminRouter=Router()
const {adminModel, courseModel}=require("../db")
const jwt = require("jsonwebtoken")
const { JWT_ADMIN_PASSWORD }=require("../config")
const {adminMiddleware}=require("../middleware/admin")
adminRouter.post("/signup",async function(req,res){
    const { email,password,firstName,lastName} = req.body
    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })

   res.json({
    message: "You {admin/course-creator}have signed up ",
   });
})
adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body

    const admin=await adminModel.findOne({
        email:email,
        password:password
    })
    if(admin){
        const token=jwt.sign({
            id:admin._id
        },JWT_ADMIN_PASSWORD)
        res.json({
            token:token
        })
    }else{
        res.json({
            message:"Incorrect Credentials"
        })
    }
})


adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.adminId
    const {title,description,price,imageUrl}=req.body

    const course=await courseModel.create({
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId
    })
    res.json({
        message:"Course Created",
        courseId:course._id
    })

})



adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId=req.adminId
    const {title,description,price,imageUrl,courseId}=req.body

    const course=await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title:title,
        description:description,
        price:price,
        imageUrl:imageUrl,
        creatorId:adminId
    })
    res.json({
        message:"Course Updated",
        courseId:course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){
    const adminId=req.adminId

    const courses=await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"Course retreived",
        courses:courses
    })
})

module.exports={
    adminRouter:adminRouter
}