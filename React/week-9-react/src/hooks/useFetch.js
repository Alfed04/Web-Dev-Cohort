import { useEffect, useState } from "react"

export function useFetch(url,retryTime){
    const [finalData,setFinalData]=useState({})

    async function getDetails(){
       const resonse= await fetch(url)
       const json = await resonse.json()
       setFinalData(json)
    }

    useEffect(()=>{
        getDetails()
    },[url])

    useEffect(()=>{
        setInterval(getDetails,retryTime*1000)
    },[])


    return finalData;
}