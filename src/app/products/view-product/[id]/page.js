'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminMenu from "../../../components/AdminMenu";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Script from 'next/script';
export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // <- useRouter here

  useEffect(() => {
   if (typeof window !== 'undefined' && window.$) {
      $('.xzoom, .xzoom-gallery').xzoom({ tint: '#333', Xoffset: 15 });
    }
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?id=3');
        const data = await res.json();

        if (res.ok && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleView = (productId) => {
    router.push(`/products/${productId}`);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <>
    <AdminMenu></AdminMenu>
   
    

    </>
   
  );
}