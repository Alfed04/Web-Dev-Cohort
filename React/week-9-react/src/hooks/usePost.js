import { useEffect, useState } from "react";

export function usePost (){
    const [post,setPost]=useState({});

    async function getDetails(){
    const response=await fetch("https://jsonplaceholder.typicode.com/posts/1")
    const json=await response.json();
    setPost(json)
  }

  useEffect(()=>{
    getDetails()
  },[])

  return post.title;

}