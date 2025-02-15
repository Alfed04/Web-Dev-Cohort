const mongooose=require("mongoose")
const Schema=mongooose.Schema
const ObjectId=Schema.ObjectId

const userSchema=new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})

//Admin or Course Creator
const adminSchema=new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
})
const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const userModel=mongooose.model("user",userSchema)
const adminModel=mongooose.model("admin",adminSchema)
const courseModel=mongooose.model("course",courseSchema)
const purchaseModel=mongooose.model("purchase",purchaseSchema)

module.exports={
    userModel:userModel,
    adminModel:adminModel,
    courseModel:courseModel,
    purchaseModel:purchaseModel
}