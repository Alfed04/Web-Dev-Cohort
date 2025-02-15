const express=require("express")
const app=express()

// function logger(req,res,next){
//     req.name="Alfed Khan , Do something for your family"
//     console.log("The url is "+req.url)
//     console.log("The url is "+req.hostname)
//     console.log("The method is "+req.method)
//     console.log("The timestamp is "+new Date())
//     next()
// }

let counter=0;
function increaseCounter(req,res,next){
    counter+=1;
    console.log(counter)
    next()
}
app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
    // console.log(req.name)
    res.json({
      answer: a + b,
    });
  }
);


app.use(increaseCounter)


app.get("/divide", function (req, res) {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)
  res.json({
    answer: a / b,
  });
});

app.get("/subtract", function (req, res) {
  const a = parseInt(req.query.a)
  const b = parseInt(req.query.b)
  res.json({
    answer: a - b,
  });
});

app.listen(3000,()=>{
    console.log("I am listening to the requests coming at port 3000")
})