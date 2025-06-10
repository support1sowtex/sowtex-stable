'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminMenu from "../../../components/AdminMenu";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Script from 'next/script';
import Image from 'next/image';
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div id="main" style={{ marginLeft: "220px" }}>
    <div className="container">
      <section className="card top">
         <div className="card-body">
            <div className="row d-flex align-items-center">
               <div className="col-sm">
                  <div className="page-title">Product Details</div>
               </div>
               <div className="col-sm align-self-end text-end">
                  <div className="d-none d-sm-block"><a href=""><i className="fa fa-angle-double-left" aria-hidden="true"></i> Back</a> </div>
                  <div className="breadcrumb-box">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><a href="#"><i className="fa fa-home" aria-hidden="true"></i></a></li>
                           <li className="breadcrumb-item"><a href="#">Product</a></li>
                           <li className="breadcrumb-item active" aria-current="page">Product Details</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="content card">
         <div className="card-body">
            <div className="row" id="product-detail">
               <div className="col-sm-4">
                               
                  <section id="default" className="padding-top0">
                     <div className="row">
                     <Zoom>
                     <img
                        alt="That Wanaka Tree, New Zealand by Laura Smetsers"
                        src="https://sowtex.com/assets/images/Product/S38SD003141283.jpeg"
                        width="500"
                     />
                   </Zoom>
                     </div>
                  </section>
               </div>
               <div className="col-sm-5">
  <div className="row mb-3">
    <div className="col-sm-7">
      <strong>Article Number</strong> 7021
    </div>
    <div className="col-sm-5 text-left">
      <strong>Visibility:</strong> Public
    </div>
  </div>

  <h1 className="p-0">
    Product Code: <span>S38SD00314</span>
  </h1>

  <p className="text-muted">
    <small>Published on: 2025-05-07</small>
  </p>

  <div className="row">
    <div className="col-sm-8 m-0">
      <div className="d-flex">
        <div style={{ width: "100px", float: "left" }}>
          <strong>Category</strong>
        </div>
        <div>: Denim-Fabrics</div>
      </div>

      <div className="d-flex">
        <div style={{ width: "100px" }}>
          <strong>Sub Category</strong>
        </div>
        <div>: Denim with Spandex</div>
      </div>

      <div className="d-flex">
        <div style={{ width: "100px" }}>
          <strong>Color Finish</strong>
        </div>
        <div>: Others</div>
      </div>

      <div className="d-flex">
        <div style={{ width: "100px" }}>
          <strong>Size</strong>
        </div>
        <div>: 56&nbsp;&quot;</div>
      </div>
    </div>
  </div>
</div>

               <div className="col-sm-3">
                  <div className="category-brief bg-light py-3">
                     <div className="category-image px-2">
                        <img src="https://sowtex.com/assets/images/logos/173376900087036.jpg" alt="" className="img-fluid w-100 img-thumbnail" />
                     </div>
                        <div className="d-flex">
                           <div style={{width: '120px'}}><strong>Location</strong></div>
                           <div>: Gujarat, India                           </div>
                        </div>
                        <div className="d-flex">
                           <div style={{width: '120px'}}><strong>Year of Estb.:</strong></div>
                           <div>: 1970                            </div>
                        </div>
                        <div className="d-flex">
                           <div style={{width: '120px'}}><strong>No. of Employees</strong></div>
                           <div>: 11-25                           </div>
                        </div>
                        <div className="d-flex">
                           <div style={{width: '120px'}}><strong>Membership Plan</strong></div>
                           <div>: Trial                           </div>
                        </div>
                  </div>
                  <div><a target="__blank" className="mt-2 btn btn-warning" href="https://sowtex.com/future-textile-manufacturing-company/denim-fabrics/denim-with-spandex-/product-detail/S38SD00314">
                        View Product</a></div>
               </div>
            </div>
            <div className="mt-5 text-center">
               <a className="btn btn-primary" href="https://sowtex.com/control-panel/edit-product-admin/23200"> <i className="fa fa-pencil" aria-hidden="true"></i> Edit</a>
            </div>
         </div>
      </section>
   </div>

    </div>

   
    

    </>
   
  );
}