
import './App.css'

function App() {
  
  return (
    <div className='h-screen bg-white dark:bg-black'>
      <div className='text-black dark:text-white'>
        HI there
      </div>
      <button onClick={()=>{
        document.querySelector("html").classList.toggle("dark")
      }} className='text-black dark:text-white'>Toggle theme
      </button>
    </div>
  )
}

export default App
