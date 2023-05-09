import React,{useEffect,useState} from 'react'

function Class3() {
    useEffect(()=>{
        console.log('Mounting...');
        return ()=>{
            console.log ('unmounting...');
        }
    },[])
    const [count,setCount] = useState (0)
  return (
    <div>
        <button onClick={()=>setCount(count+1)}>increment</button>
      <h1>hello i am class 3 show/hide  </h1>
      <h1>count:{count}</h1>
    </div>  
  )
}

export default Class3
