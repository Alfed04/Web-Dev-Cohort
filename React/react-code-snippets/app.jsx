import { useState } from 'react'
import './App.css'

function App() {

  return (
      <div>
        <ToggleMessage/>
        <ToggleMessage/>
        <ToggleMessage/>

      </div>
  )
}
function ToggleMessage(){
  const [isVisible,setVisible]=useState(true);
  function toggle(){
    setVisible(!isVisible)
  }
  return (
    <div>
      <button onClick={toggle}>
        Toggle message
      </button>
      {isVisible && <p>This message is conditionally rendered</p>}
    </div>
  )
}

export default App


//#2
import {React, useEffect, useState} from 'react'
export default function App(){
  const [currentTab,setCurrentTab]=useState("Feed")

  useEffect(function(){
    console.log("The tab is currently set to "+currentTab)
  },[currentTab])

  return (
    <div>
      <button onClick={()=>{setCurrentTab("Feed")}} style={{color: currentTab=="Feed"?"red":"black"}}>Feed</button>
      <button onClick={()=>{setCurrentTab("Notifications")}} style={{color: currentTab=="Notifications"?"red":"black"}}>Notifications</button>
      <button onClick={()=>{setCurrentTab("News")}} style={{color: currentTab=="News"?"red":"black"}}>News</button>
      <button onClick={()=>{setCurrentTab("Contact Us")}} style={{color: currentTab=="Contact Us"?"red":"black"}}>Contact Us</button>
      
    </div>
  )
}


import {React, useEffect, useState} from 'react'
export default function App(){
  const [currentTab,setCurrentTab]=useState(1)
  const [tabData,setTabData]=useState({})
  const [loading,setLoading]=useState(false)

  useEffect(function(){
    setLoading(true)
    fetch('https://jsonplaceholder.typicode.com/todos/'+currentTab)
      .then(async response => {
        const tabData=await response.json()
        setTabData(tabData)
        setLoading(false)
      })
  },[currentTab])

  return (
    <div>
      <button onClick={()=>{setCurrentTab(1)}} style={{color: currentTab==1?"red":"black"}}>Todo#1</button>
      <button onClick={()=>{setCurrentTab(2)}} style={{color: currentTab==2?"red":"black"}}>Todo#2</button>
      <button onClick={()=>{setCurrentTab(3)}} style={{color: currentTab==3?"red":"black"}}>Todo#3</button>
      <button onClick={()=>{setCurrentTab(4)}} style={{color: currentTab==4?"red":"black"}}>Todo#4</button>
      <br />
      {loading==true ?"Loading ...":tabData.title}
    </div>
  )
}


//#3
function App(){
  return (
    // <div style={{display:"flex"}}>
    //   <Card innerContent={"hi there"}/>
    //   <Card  innerContent={<div style={{color:"green"}}>What do you want to post ? <br/><input></input></div>}/>
    // </div>
    <div style={{display:"flex"}}>
      <Card>
        hi there
      </Card>
      <Card>
        <div style={{color:"green"}}>
          What do you want to post ? <br/>
          <input></input>
        </div>
      </Card>
    </div>
  );
}

function Card({children}){
  return (
    // <div style={{background:"black",color:"white",margin:10,padding:10,borderRadius:10}}>
    //   {innerContent}
    // </div>
    <div style={{background:"black",color:"white",margin:10,padding:10,borderRadius:10}}>
      {children}
    </div>
  );
}

export default App;

//#4
function App(){
  const todos=[
    {
      "title":"Go to gym",
      "done":true
    },
    {
      title:"Eat foooood",
      done:false
    }
  ]
  const todoComponents=todos.map(todo=><ToDo title={todo.title} done={todo.done}/>)

  return <div>
    {todoComponents}
  </div>
}

function ToDo({title,done}){
  return (
    <div>
      {title}
      {done?"Done!":"Not done!"}
    </div>
  );
}
export default App;

//#5
export default function App(){
  return <div>
    <Todo key={1} title={"Go to Gym"} done={true}></Todo>
    <Todo key={2} title={"Eat food"} done={false}></Todo>
  </div>
}


function Todo({title,done}){
  return <div>
    {title} - 
    {done?"Done!":"Not done!"}
  </div>
}

//#6
export default function App(){
  return <div>
    <Component/>
  </div>
}

const myComponentStyles={color:"black",background:"red",padding:10,borderRadius:20}
function Component(){
  return (
  // <div style={myComponentStyles}>
  //   Hello World
  // </div>
  //same result as above
  <div style={{color:"black",background:"red",padding:10,borderRadius:20}}>
    Hello World
  </div>
  );
}

//#7 Prop Drilling

import React, { useState } from 'react'
function App(){
  const [count ,setCount]=useState(1)
  return <div>
    <Parent count={count} setCount={setCount}/>
  </div>
}

function Parent({count,setCount}){
  return <div>
    <Increase count={count} setCount={setCount}/>
    <Decrease count={count} setCount={setCount}/>
    <Value  count={count}/>
  </div>
}

function Increase({count,setCount}){
  return <div>
    <button onClick={()=>setCount(count+1)}>Increase</button>
  </div>
}
function Decrease({count,setCount}){
  return <div>
    <button onClick={()=>setCount(count-1)}>Decrease</button>
  </div>
}
function Value({count}){
  return <div>
    <p>Count:{count}</p>
  </div>
}
export default App;

//#Context API
import React, { createContext, useContext, useState } from 'react'

const CountContext=createContext()
function App(){
  const [count ,setCount]=useState(1)
  return <div>
     <CountContext.Provider value={{
      count:count,
      setCount:setCount
    }}>
    <Parent />
    </CountContext.Provider>
  </div>
}

function Parent(){
  
  return <div>
      <Increase />
      <Decrease/>
      <Value/>
  </div>
}

function Increase(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count+1)}>Increase</button>
  </div>
}
function Decrease(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count-1)}>Decrease</button>
  </div>
}
function Value(){
  const {count}=useContext(CountContext)
  return <div>
    <p>Count:{count}</p>
  </div>
}
export default App;

//#Context API ii
import React, { createContext, useContext, useState } from 'react'

const CountContext=createContext()

function CountContextProvider({children}){
  const [count ,setCount]=useState(0)
  return <CountContext.Provider value={{
    count:count,
    setCount:setCount
  }}>
    {children}
  </CountContext.Provider>
}

function App(){
  return <div>
    <CountContextProvider>
      <Parent />
    </CountContextProvider>
  </div>
}

function Parent(){
  
  return <div>
      <Increase />
      <Decrease/>
      <Value/>
  </div>
}

function Increase(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count+1)}>Increase</button>
  </div>
}
function Decrease(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count-1)}>Decrease</button>
  </div>
}
function Value(){
  const {count}=useContext(CountContext)
  return <div>
    <p>Count:{count}</p>
  </div>
}
export default App;


//#Context API iii
import React, { createContext, useContext, useState } from 'react'

const CountContext=createContext()

function CountContextProvider({children}){
  const [count ,setCount]=useState(0)
  return <CountContext.Provider value={{
    count:count,
    setCount:setCount
  }}>
    {children}
  </CountContext.Provider>
}

function App(){
  return <div>
    <Parent/>
  </div>
}

function Parent(){
  
  return <div>
    <CountContextProvider>
      <Increase />
      <Decrease/>
      <Value/>
    </CountContextProvider>
    
  </div>
}

function Increase(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count+1)}>Increase</button>
  </div>
}
function Decrease(){
  const {count,setCount}=useContext(CountContext)
  return <div>
    <button onClick={()=>setCount(count-1)}>Decrease</button>
  </div>
}
function Value(){
  const {count}=useContext(CountContext)
  return <div>
    <p>Count:{count}</p>
  </div>
}
export default App;

//Custom Hooks Start from here
//# useCounter hook
import { useState } from "react";

function useCounter(){
  const [ count ,setCount]=useState(0);
  function increase(){
    setCount(count+1)
  }
  return {
    count,
    increase
  };
}

function App(){
  return <div>
    <Counter />
    <Counter />
    <Counter />
  </div>
}

function Counter(){
  const {count,increase}=useCounter()
  return <div>
    <p>count : {count}</p>
    <button onClick={increase}>increase</button>
  </div>
}

export default App;


//#usePost hook
import { useEffect, useState } from "react";

function usePost(){
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

function App(){
  
  const postTitle=usePost()

  return (
  <div>
    {postTitle}
  </div>
  );
}
export default App;

//# useFetch hook

import { useEffect, useState } from "react";

function useFetch(url){
  const [finalData,setFinalData]=useState({})

  async function  getDetails(){
    const response = await fetch(url)
    const json = await response.json()
    setFinalData(json)
  }

  useEffect(()=>{
    getDetails()
  },[url])

  return finalData;
}

function App(){
  const [currentPost,setCurrentPost]=useState(1)

  const finalData=useFetch("https://jsonplaceholder.typicode.com/posts/"+currentPost)

  return <div>
    {/* {JSON.stringify(finalData)} */}
    {finalData.title}
    <br />
    <button onClick={()=>setCurrentPost(currentPost+1)}>Increase Current Post : {currentPost}</button>
  </div>
}
export default App;

//#useIsOnline hook
import { useEffect, useState } from "react";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Clean up the event listeners on component unmount
    return () => {
  console.log("useIsOnline hook is called")
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return isOnline;
};


function App(){

  const isOnline=useIsOnline()

  return <div>
    {isOnline?"online hu":"Online nahi hu"}
  </div>

}
export default App;


//#useDebounce hook
import { useRef, useState } from "react";

function useDebounce(originalFn){

  const currentClock=useRef()

  const fn=()=>{
    clearTimeout(currentClock.current);
    currentClock.current=setTimeout(originalFn,3000)
  }

  return fn ;
}

function App(){

  function SendDataToBackend(){
    fetch("https://jsonplaceholder.typicode.com/posts/1")
  }
  const debounceSearch=useDebounce(SendDataToBackend)


  return <div>
    <input type="text" onChange={debounceSearch}></input>
  </div>

}
export default App;


//#useDebounce hook ii

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