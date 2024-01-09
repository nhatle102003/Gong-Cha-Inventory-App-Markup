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
        <div class = "container-fluid flex">
          <div class="MuiBox-root css-130f8nx">
            <ul class="navbar-nav flex">
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
        {load ? ( <Spinner/> ) : (
          <table className = " w-full border-seperate border-spacing-2"> 
          <thead>
            <tr>
                <th className = 'border border-slate-600 rounded-md'>No.</th>
                <th className = 'border border-slate-600 rounded-md'>Item</th>
                <th className = 'border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
                <th className = 'border border-slate-600 rounded-md max-md:hidden'>Metric</th>
                <th className = 'border border-slate-600 rounded-md'>Options</th>

            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key = {item.id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index+1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {item.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {item.quantity}
                </td>
                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                  {item.metrics}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className='flex justify-center gap-x-4'>
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
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      )}
        
    </div>
    
  )
}

export default homeClient