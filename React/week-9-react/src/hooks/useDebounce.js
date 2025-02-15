
import { useEffect, useState } from "react";

function useDebounce(value,delay){
  const [debouncedVal,setDebouncedVal]=useState(value)

  useEffect(()=>{
    const handler=setTimeout(()=>{
      setDebouncedVal(value)
    },delay)

    return ()=>{
      clearTimeout(handler)
    }

  },[value,delay])

  return debouncedVal;

}

function App(){
  const [inputVal,setInputVal]=useState(" ");
  const debouncedVal=useDebounce(inputVal,3000)
  useEffect(()=>{
    //want to do an expensive operation
    console.log("expensive operation carried out")
  },[debouncedVal])

  function change(e){
    setInputVal(e.target.value)
  }

  return <div>
    <input type="text" onChange={change}></input>
  </div>

}
export default App;







// import { useRef, useState } from "react";

// function useDebounce(originalFn){

//   const currentClock=useRef()

//   const fn=()=>{
//     clearTimeout(currentClock.current);
//     currentClock.current=setTimeout(originalFn,3000)
//   }

//   return fn ;
// }

// function App(){

//   function SendDataToBackend(){
//     fetch("https://jsonplaceholder.typicode.com/posts/1")
//   }
//   const debounceSearch=useDebounce(SendDataToBackend)


//   return <div>
//     <input type="text" onChange={debounceSearch}></input>
//   </div>

// }
// export default App;