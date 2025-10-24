import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess } from '../utils.js';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check if user is logged in and fetch products
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("loggedInUser");

    if (!token) {
      notifyError("Please login first");
      navigate("/login");
      return;
    }

    setLoggedInUser(name);
    getProducts(token);
  }, []);

  // Fetch products from backend
  const getProducts = async (token) => {
    try {
      const url = "http://localhost:8080/products";
      const res = await fetch(url, {
        method: "GET",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await res.json();
      setProducts(result); // store products in state
    } catch (error) {
      console.error("Error fetching products:", error);
      notifyError("Failed to fetch products");
    }
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    notifySuccess("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {loggedInUser}</h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold mb-6"
      >
        Logout
      </button>

      <h2 className="text-2xl font-semibold mb-4">Products:</h2>
      {products.length > 0 ? (
        <ul className="space-y-2">
          {products.map((product, index) => (
            <li key={index} className="bg-gray-800 px-4 py-2 rounded-lg">
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default Home;
