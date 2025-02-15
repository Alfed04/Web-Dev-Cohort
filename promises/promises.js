console.log("Hiii Alfed , after how many days you are coming to code But I welcome you and you should promise me that you will keep coding daily for atleast 4to5 hours daily....")


function setTimeoutPromisified(duration){
   return new Promise(function(resolve){
    setTimeout(resolve,duration);
   });
}

setTimeoutPromisified(1000).then(function(){
    console.log("hii")
    setTimeoutPromisified(3000).then(function(){
        console.log("hello")
        setTimeoutPromisified(5000).then(function(){
            console.log("hii there")
        })
    })
})