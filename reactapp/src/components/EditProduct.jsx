import React from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

const endpoint = 'http://localhost:8000/api/product/'

const EditProduct = () => {

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async(e) => {
        e.preventDefault();
        await axios.put(`${endpoint}${id}`, {
            description: description,
            price: price,
            stock: stock
        })
        navigate('/')
    }

    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`${endpoint}${id}`)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setStock(response.data.stock)
        }
        getProductById()
    },[])

  return (
    <div>
      <h3>Edit Product</h3>
      <form onSubmit={update}>
        <div className='mb-3'>
          <label>Description</label>
          <input 
            value={description}
            type="text"
            className='form-control'
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Price</label>
          <input 
            value={price}
            type="number"
            className='form-control'
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label>Stock</label>
          <input 
            value={stock}
            type="number"
            className='form-control'
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <button type="submit" className='btn btn-primary'>Store</button>
      </form>
    </div>
  )
}

export default EditProduct