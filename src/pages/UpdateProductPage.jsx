import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

function UpdateProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'electronics',
    price: '',
    quantity: '',
  })

  const { id } = useParams()
  const navigate = useNavigate()

  // Load the current product so the form starts filled with its values
  useEffect(() => {
    async function loadProduct() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/products/${id}`
      )
      const { title, description, category, price, quantity } = response.data

      // Keep only the fields the form needs (not _id, __v, timestamps)
      setFormData({ title, description, category, price, quantity })
    }

    loadProduct()
  }, [id])

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    await axios.put(
      `${import.meta.env.VITE_BACKEND_SERVER_URL}/products/${id}`,
      formData
    )

    navigate(`/products/${id}`)
  }

  return (
    <div>
      <h1>Update Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={500}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="electronics">Electronics</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            min="0.1"
            step="any"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <button>Save Changes</button>
      </form>
    </div>
  )
}

export default UpdateProductPage