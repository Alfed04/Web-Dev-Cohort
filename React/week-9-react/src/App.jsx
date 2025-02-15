import { useIsOnline } from "./hooks/useIsOnline";



function App(){

  const isOnline=useIsOnline()

  return <div>
    {isOnline?"online hu":"Online nahi hu"}
  </div>

}
export default App;

