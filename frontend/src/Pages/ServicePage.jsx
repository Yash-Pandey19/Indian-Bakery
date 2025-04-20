import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cake, Home, Loader2, Plus, Search } from 'lucide-react';
import ProductForm from "../components/ProductForm";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import axios from "axios";

function ServicePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/listproducts`);
      if (Array.isArray(response.data)) setProducts(response.data);
      else if (Array.isArray(response.data.products)) setProducts(response.data.products);
      else setProducts([]);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("Failed to fetch products.", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addproduct`, product);
      setProducts([...products, response.data]);
      setShowAddForm(false);
      showToast("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      showToast("Failed to add product.", "error");
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateproduct/${updatedProduct.id}`, updatedProduct);
      setProducts(products.map((p) => (p.id === response.data.id ? response.data : p)));
      setEditingProduct(null);
      showToast("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast("Failed to update product.", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deleteProduct) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteproduct/${deleteProduct.id}`);
      setProducts(products.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
      showToast("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("Failed to delete product.", "error");
    }
  };

  const filteredProducts = products.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    return name.includes(searchQuery.toLowerCase()) || category.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-indigo-600 to-teal-400 py-4 px-6 text-white shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Cake className="h-6 w-6" />
            <h1 className="font-serif text-2xl font-bold">Sweet Dreams Bakery</h1>
          </div>
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20">
              <Home className="h-4 w-4" /> Back to Home
            </button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl py-10 px-6">
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold text-indigo-700">Manage Inventory</h1>
          <p className="mt-2 text-teal-700">Effortlessly manage your bakery's delicious products.</p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No products found.</div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-2xl font-semibold text-indigo-700">{product.name}</h3>
                        <p className="text-teal-700">{product.category}</p>
                      </div>
                      <div className="text-xl font-bold text-indigo-600">₹{product.price}</div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${product.stock < 10 ? "bg-red-100 text-red-700" : product.stock < 20 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        Stock: {product.stock}
                      </span>
                      <div className="flex gap-2">
                        <button className="px-4 py-1 text-indigo-600 border border-indigo-300 rounded-full hover:bg-indigo-50" onClick={() => setEditingProduct(product)}>Edit</button>
                        <button className="px-4 py-1 text-red-500 border border-red-300 rounded-full hover:bg-red-50" onClick={() => setDeleteProduct(product)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {toast && (
          <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white ${toast.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {toast.message}
          </div>
        )}

        {(showAddForm || editingProduct) && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? updateProduct : addProduct}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        {deleteProduct && (
          <DeleteConfirmDialog
            productName={deleteProduct.name}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteProduct(null)}
          />
        )}
      </main>

      <footer className="bg-indigo-900 py-4 px-6 text-center text-gray-300">
        <p>© 2025 Sweet Dreams Bakery. Crafted with love and code.</p>
      </footer>
    </div>
  );
}

export default ServicePage;
