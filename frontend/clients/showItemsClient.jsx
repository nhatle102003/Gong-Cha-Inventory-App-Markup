import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'


const showItemsClient = () => {
  const [item, setItem] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios
    .get(`http://localhost:5555/items/${id}`)
    .then((response) => {
        setItem(response.data)}
        )
    .catch((error)=> {
        console.log(error)
    })
  }, [])
 

  return (
    <div className = 'p-4'>
      <BackButton />
      <h1 className = "text-3x1">Show Item</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{item.item && item.item._id}</span>
        </div>
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Name</span>
          <span>{item.item && item.item.name}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Quantity</span>
          <span>{item.item && item.item.quantity}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Metric</span>
          <span>{item.item && item.item.metrics}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Entry Date</span>
          <span>{new Date( item.item && item.item.createdAt).toString()}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Updated Date</span>
          <span>{new Date(item.item && item.item.updatedAt).toString()}</span>
        </div> 
      </div>
    </div>
  )
}

export default showItemsClient