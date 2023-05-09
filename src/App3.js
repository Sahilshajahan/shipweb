 
 import React from 'react'
import Class3 from './components/class3'
 import { useState } from 'react'
 function App() {
    const [ state,setState] = useState(false)
   return (
     <div className="App">
       <h1 onClick={()=>setState(!state)}> hello class 3</h1>

       {state ? <Class3/>: null}
     </div>
   );
 }
 
 export default App
 