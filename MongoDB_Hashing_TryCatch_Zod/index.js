const bcrypt=require("bcrypt")
const express =require("express")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
const JWT_SECRET="alfedkhan@123"
const {UserModel,TodoModel}=require("./db")
const {z} =require("zod")
const app=express()
app.use(express.json())


mongoose.connect("mongodb+srv://admin:41OKilru4Ldl8KJh@alfed-cluster.ao1es.mongodb.net/todo-app-database")

app.post("/signup",async function(req,res){

    const requiredBody=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(100),
        name:z.string().min(3).max(100)
    })
    const parseBodyWithSucces=requiredBody.safeParse(req.body)
    console.log(parseBodyWithSucces)
    if(!parseBodyWithSucces.success){
        res.json({
            message:"Incorrect format"
        })
        return
    }

    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    const errorThrown=false
    try{const hashedPassword=await bcrypt.hash(password,5)
    console.log(hashedPassword)

    await UserModel.create({
        email:email,
        password:hashedPassword,
        name:name
    })}catch(e){
        res.json({
            message:"User already exists"
        })
        errorThrown=true
    }

    if(!errorThrown){
        res.json({
            message:"You are signed up"
        })
    }


})
app.post("/signin",async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user=await UserModel.findOne({
        email:email
    })
    if(!user){
        res.status(403).json({
            message:"User do not exist in our database"
        })
        return
    }
    console.log(user.password)
    const passwordMatch= await bcrypt.compare(password,user.password)
    if(passwordMatch){
        const token=jwt.sign({
            id:user._id.toString()
        },JWT_SECRET)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
})
app.post("/todo",auth,async function(req,res){
    const userId=req.userId
    const title=req.body.title
    const done=req.body.done
    await TodoModel.create({
        title:title,
        done:done,
        userId:userId
    })
    res.json({
        message:"To Do created"
    })
    
})
app.get("/todos",auth,async function(req,res){
    const userId=req.userId
    const todos=await TodoModel.find({
        userId:userId
    })
    res.json({
        todos
    })
})

function auth(req,res,next){
    const token=req.headers.token;

    const decodeData=jwt.verify(token,JWT_SECRET)
    console.log(decodeData)


    if(decodeData){
        req.userId=decodeData.id
        next()
    }else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }

}

app.listen(3000,function(){
    console.log("I am listening to the requests coming at port number no 3000")
})