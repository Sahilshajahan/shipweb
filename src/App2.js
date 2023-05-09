import { useState } from "react";
// import Counter from "./components/counter";
import Employee from "./components/employee";
function App() {
    const [count,setCount] =useState(0)

    const addcount=()=> {
      setCount(count+1) 
      console.log(count);
    }
    //  let obj = {
    //     title:'1st counter',
    //     count
    //  }
    let emp = [{name: 'sahil',age:23},
    {name: 'sahi',age:24},
    {name: 'hiba',age:30}]
    return ( 
      <div className='App'>
      <button onClick={addcount}>ADD</button>
      {/* < Counter {...obj}/>
      < Counter title = '2nd Counter'count={count}/> */}
    {
        emp.map((obj,index)=>{
            return (
                // <Employee key={index} name={obj.name} age={obj.age} />
                <Employee key={index} {...obj} />
            )

        })
    }
    </div>
    );
}

export default App;        