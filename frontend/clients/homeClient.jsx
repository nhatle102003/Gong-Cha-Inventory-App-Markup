import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner.jsx'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const homeClient = () => {
  
  const [items, setItems] = useState([])
  const [load, setLoading] = useState(false)
  useEffect(() =>  {
    setLoading(true)
    axios
    .get('http://localhost:5555/items')
    .then((response) => {
        setItems(response.data.data)
      })
        
    .catch((error)=> {
        console.log(error)
    })
    setLoading(false)
  }, [])

  return (
   

    <div className='p-4'>
        <div className = "container-fluid flex">
          <div className ="MuiBox-root css-130f8nx">
            <ul className ="navbar-nav flex">
              <img src="./images/NewLogoG.png" alt-height='10'/>
            </ul>
          </div>
        </div> 
        <div className ='flex justify-between items-center'>
          <h1 className = 'text-3x1 my-8 '>Gong Cha Inventory List </h1>
          <Link to = '/items/create'>
              <MdOutlineAddBox className = 'text-sky-800 text-4x1' />
          </Link>
        </div> 
        {load ? (<Spinner/>) : (
          <div className = 'flex justify-between'>
            <div className = "grid grid-flow-col justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              {items.map((item) => (
                <div className = "px-4 py-3 w-72">
                  <span class="text-black-400 mr-3 uppercase text-xs">{item.name}</span>
                <div class="flex items-center">
                <p class="text-lg  text-black cursor-auto my-3">{item.quantity} {item.metrics}</p>
                </div>
                <div className='flex justify-left gap-x-4'>
                    <Link to={`/items/show/${item._id}`}>
                      <BsInfoCircle className = 'text-2x1 text-green-800'/>
                    </Link>
                    <Link to={`/items/edit/${item._id}`}>
                      <AiOutlineEdit className = 'text-2x1 text-yellow-600'/>
                    </Link>
                    <Link to={`/items/delete/${item._id}`}>
                      <MdOutlineDelete className = 'text-2x1 text-red-600'/>
                    </Link>
                  </div>
              </div>
              ))}
            </div>
          </div>
        )}
    </div>
    
  )
}

export default homeClient