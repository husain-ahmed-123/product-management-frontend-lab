import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

function AllProductPage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/products`
      )
      setProducts(response.data)
    }

    loadProducts()
  }, [])

  return (
    <div>
      <h1>All Products</h1>

      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <h2>{product.title}</h2>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <Link to={`/products/${product._id}`}>See Details</Link>
        </div>
      ))}
    </div>
  )
}

export default AllProductPage