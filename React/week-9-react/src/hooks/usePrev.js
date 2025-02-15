import { useEffect, useRef } from "react";

export function usePrev(value){
    const ref=useRef()

    useEffect(()=>{
        ref.current=value
    },[value])

    return ref.current;
}

//it returns first , effect gets called later
//refs do not re-render when they change

//usePrevious hook alternative solution
function usePrevious(value, initial) {
    const ref = useRef({ target: value, previous: initial });
    if (ref.current.target !== value) {
      ref.current.previous = ref.current.target;
      ref.current.target = value;
    }
    return ref.current.previous;
  }

//   Difficulties with the new usePrevious?

// Basically, as long as you’re willing to compare the old and the new value, it’s fine, but if you have a huge object to diff (meaning deep comparison), this might be a problem, and the usePrevious hook could become too heavy computationally speaking.

// Be aware that this alternative implementation should be used only when it’s sustainable and when the standard usePrevious is causing you bugs. Not every component re-renders in the way you saw in the codesandbox I showed you before.