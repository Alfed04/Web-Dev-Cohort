import { useState } from "react";

export function useCounter(){
  const [ count ,setCount]=useState(0);
  function increase(){
    setCount(count+1)
  }
  return {
    count,
    increase
  };
}