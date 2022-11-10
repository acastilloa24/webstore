import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const endpoint = 'http://localhost:8000/api'

const ShowProducts = () => {
    
    const [products, setProducts] = useState([])
    useEffect (() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
       const response = await axios.get(`${endpoint}/products`)
       
       setProducts(response.data)
       console.log(products);
    }

    const deleteProduct = async (id) => {
       await axios.delete(`${endpoint}/product/${id}`)
       getAllProducts();
    }
  return (
    <div className='container'>
        <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
        </div>
        <table className='table table-stripped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <div className="d-flex justify-content-between">
                                    <Link to={`/edit/${product.id}`} className='btn btn-warning'>
                                        Edit
                                    </Link>
                                    <button type="button" onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ShowProducts