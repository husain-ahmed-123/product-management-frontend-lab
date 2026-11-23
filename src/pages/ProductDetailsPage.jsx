import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'

function ProductDetailsPage() {
  const [product, setProduct] = useState(null)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProduct() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/products/${id}`
      )
      setProduct(response.data)
    }

    loadProduct()
  }, [id])

  async function handleDelete() {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/products/${id}`
    )
    navigate('/products')
  }

  return (
    <div>
      <h1>Product Details</h1>

      {product ? (
        <>
          <h2>{product.title}</h2>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>

          <Link to={`/products/${product._id}/edit`}>Edit Product</Link>
          <br />
          <br />
          <button onClick={handleDelete}>Delete Product</button>
        </>
      ) : null}
    </div>
  )
}

export default ProductDetailsPage