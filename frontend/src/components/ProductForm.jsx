"use client"

import { useState } from "react"
import { X } from "lucide-react"

function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: product?.id || 0,
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    image: product?.image || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock" ? Number.parseFloat(value) || 0 : value,
    })
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0"
    if (formData.stock < 0 || !Number.isInteger(formData.stock)) newErrors.stock = "Stock must be a non-negative integer"
    if (formData.image && !/^https?:\/\/\S+\.\S+$/.test(formData.image)) newErrors.image = "Please enter a valid image URL"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-orange-300 p-5 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onCancel} className="text-white hover:bg-white/20 p-2 rounded-full">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {[
            { id: "name", label: "Product Name", type: "text", placeholder: "e.g., Sourdough Bread" },
            { id: "price", label: "Price ($)", type: "number", step: "0.01", min: "0", placeholder: "0.00" },
            { id: "stock", label: "Stock Quantity", type: "number", step: "1", min: "0", placeholder: "0" },
            { id: "image", label: "Image URL", type: "text", placeholder: "https://example.com/image.jpg" },
          ].map((field) => (
            <div key={field.id} className="space-y-1">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                {...field}
                name={field.id}
                value={formData[field.id]}
                onChange={handleChange}
                className={`w-full rounded-xl border p-3 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:outline-none text-sm ${
                  errors[field.id] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.id] && <p className="text-xs text-red-500">{errors[field.id]}</p>}
            </div>
          ))}

          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-xl border p-3 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:outline-none text-sm ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Bread">Bread</option>
              <option value="Pastry">Pastry</option>
              <option value="Cake">Cake</option>
              <option value="Cookie">Cookie</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2 text-sm border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
