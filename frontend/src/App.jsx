import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../clients/homeClient.jsx'
import DeleteItems from '../clients/deleteItemsClient.jsx'
import ShowItems from '../clients/showItemsClient.jsx'
import CreateItems from '../clients/createItemsClient.jsx'
import EditItems from '../clients/editItemsClient.jsx'

const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>} ></Route>
      <Route path = '/items/create' element = {<CreateItems/>}></Route>
      <Route path = '/items/delete/:id' element = {<DeleteItems/>}></Route>
      <Route path = '/items/edit/:id' element = {<EditItems/>}></Route>
      <Route path = '/items/show/:id' element = {<ShowItems/>}></Route>
    </Routes>
  )
}

export default App