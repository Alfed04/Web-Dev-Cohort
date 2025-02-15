const fs=require('fs')

function main(filePath){
    fs.readFile(filePath,'utf-8',(err,data)=>{
        let total=0
        for( let i=0;i<data.length;i++){
            if(data[i]===" "){
                total++;
            }
        }
        console.log(`The ${filePath} has ${total+1} words`)
    })
}

main(process.argv[2])