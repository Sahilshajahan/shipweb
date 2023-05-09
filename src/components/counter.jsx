import React from 'react'

function Counter({title,count}) {
  // const {title,count} = props
  return (
    <div>
      <h1>{title}:{count}</h1>
    </div>
  )
}

export default Counter
