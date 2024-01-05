import React from 'react'

const Spinner = () => {
  return (
    <div  className = "animate-spin h-5 w-5 mr-3 ..." >
        <div style = {{height: 20, width: 20, borderRadius: 500, borderWidth: 5, borderTopColor: 'gray'}}></div>
    </div>
  )
}

export default Spinner