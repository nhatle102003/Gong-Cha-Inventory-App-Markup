import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const editItemsClient = () => {
  const [name, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [metrics, setMetric] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    setLoading(true)
    axios
    .get(`http://localhost:5555/items/${id}`)
    .then( (response) => {
      setItemName(response.data.item.name)
      setQuantity(response.data.item.quantity)
      setMetric(response.data.item.metrics)
    })
    .catch((error) => {
      alert('Encountered an error. Please check console')
      console.log(error)
    })
    .finally(setLoading(false))
  }, [])

  const handleEditItem = () => {
    setLoading(true)
    const data = {
      name,
      quantity,
      metrics
    }
    axios
    .put(`http://localhost:5555/items/${id}`, data)
    .then(() => {
      navigate('/'),
      setLoading(false)
    })
    .catch((error)=> {
      console.log(error)
      alert("An error occured. Please check the developer log")
    })
    console.log(data)
  }
  
  return (
    <div className = 'p-4'>
      <BackButton />
      <h1 className = 'text-3xl my-4'>Edit Item</h1>
      {loading ? <Spinner/> : ''}
      <div className = 'flex flex-col border 2 border-sky-400 rounded-xl w-[600px] p4 mx-auto' >
        <div className = "my-4" >
          <lable className = "text-xl mr-4 text-gray-500">Name</lable>
          <input
            type = 'text'
            value={name}
            onChange={(e) => setItemName(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className = 'flex flex-col border 2 border-sky-400 rounded-xl w-[600px] p4 mx-auto' >
        <div className = "my-4" >
          <lable className = "text-xl mr-4 text-gray-500">Quantity</lable>
          <input
            type = 'text'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <div className = 'flex flex-col border 2 border-sky-400 rounded-xl w-[600px] p4 mx-auto' >
        <div className = "my-4" >
          <lable className = "text-xl mr-4 text-gray-500">Metric</lable>
          <input
            type = 'text'
            value={metrics}
            onChange={(e) => setMetric(e.target.value)}
            className = 'border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
      </div>
      <button className = 'p-2 bg-sky-300 m-8' onClick ={handleEditItem}>Save</button>
    </div>
    
  )
}

export default editItemsClient