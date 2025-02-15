const express =require("express")
const jwt=require("jsonwebtoken")
const JWT_SECRET="iamAlfed"
const app=express()

app.use(express.json())

let users=[]

app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username,password
    })
    res.json({
        message:"You are signed up"
    })
})

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password)
            foundUser=users[i]
    }
    if(!foundUser){
        res.json({
            message:"Credentials Incorrect"
        })
    }else{
        const token=jwt.sign({
            username
        },JWT_SECRET)
        res.json({
            token:token
        })
    }
})

app.post("/me",function(req,res){
    const token=req.headers.token
    const decodedData=jwt.verify(token,JWT_SECRET)

    if(decodedData.username){
    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===decodedData.username && users[i].password===decodedData.password)
            foundUser=users[i]
    }

    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
}


})