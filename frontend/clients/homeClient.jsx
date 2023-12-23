import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const homeClient = () => {
  
  const [items, setItems] = useState([])
  
  useEffect(() =>  {
    axios
    .get('http://localhost:5555/items')
    .then((response) => {
        setItems(response.data.data)})
    .catch((error)=> {
        console.log(error)
    })
  }, [])

  return (
    <div className='p-4'> 
        <div className ='flex justify-between items-center'></div> 
        <Link to = '/items/create'>
            <MdOutlineAddBox className = 'text-sky-800 text-4x1' />
        </Link>
    </div>
  )
}

export default homeClient