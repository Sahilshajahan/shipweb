// import './App.css'
// import Header from './components/Header'
import { useState } from "react";
function App() {
  const [count,setCount] =useState(0)
  // const data = 'sahil shajahan'
  // const addcount = () => {}
  const addcount=()=> {
    setCount(count+1) 
    console.log(count);
  }
  return ( 
    <div>
      {/* <h1 style={{color:'yellow', backgroundColor:'red'}}>hello world</h1>
      <p className='hello'> this is sample text in app.js by p tag{data} </p> 
      <FHello />
      <Header data={data}/> */}
      <button onClick={addcount}>ADD</button>
      <h1> 2nd floor,Counter: {count}</h1>
    </div>
    );
}

export default App;

// function FHello() { 
//   return <h4 className='hello'>this i sthe functionn callling hello method</h4>
// }
