import React, {useEffect, useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


const showItemsClient = () => {
  const [product, setItem] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    
    console.log("useEffect called")
    const fetchData = async () => {
      const result = await axios
      .get(`http://localhost:5555/items/${id}`)
      .catch((error)=> {
        console.log(error)
      })
      .finally(setLoading(false))
    if(result){
      setItem(result.data.item)
    }else{
      alert("Something went wrong")
    }
    }
    fetchData()
  }, [])

  return (
    <div className = 'p-4'>
      <BackButton />
      <h1 className = "text-3x1">Show Item</h1>
      {loading ? (
        <Spinner/>
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Id</span>
          <span>{product._id}</span>
        </div>
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Name</span>
          <span>{product.name}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Quantity</span>
          <span>{product.quantity}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Metric</span>
          <span>{product.metrics}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Entry Date</span>
          <span>{new Date(product.createdAt).toString()}</span>
        </div>  
        <div className = "my-4">
          <span className="text-xl mr-4 text-gray-500">Updated Date</span>
          <span>{new Date(product.updatedAt).toString()}</span>
        </div> 
      </div>
      )}
    </div>
  )
}

export default showItemsClient