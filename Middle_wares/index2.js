const express=require("express")
const app=express()

app.use(express.json())

function sum(req,res){
    const a=parseInt(req.body.a)
    const b=parseInt(req.body.b)
    res.send({
        answer:a+b
    })
}

app.post("/sum",sum)

app.listen(3000)