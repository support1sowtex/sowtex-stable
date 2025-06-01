"use client";
import { useState, useEffect } from "react";
import AdminMenu from "../components/AdminMenu";

import "../globals.css";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setError(null); // Reset error

    const res = await fetch("/api/product", {
      method: "POST",
      credentials: "include", // Ensures cookies are sent
    });

    const data = await res.json();
    if (res.ok) {
      setProducts(data.products);
    } else {
      setError(data.message);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
  }, []);

  return (
    <>
    <AdminMenu/>
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold">Product List</h2>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-2 rounded mt-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
 
    </>

  );
}