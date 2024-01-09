import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const deleteItemsClient = () => {
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleDeleteBook = () => {
    setLoading(true)
    axios
    .delete(`http://localhost:5555/items/${id}`)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      alert('Encountered an error. Please check console')
      console.log(error)
    })
  
  }

  return (
    <div className = 'p-4'>
      <BackButton />
      {loading ? <Spinner /> : ''}
      <div className = 'flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className = 'text-2xl'> Comfirming delete this item...</h3>
        <button
          className = 'p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes
        </button>
      </div>
    </div>
  )
}

export default deleteItemsClient