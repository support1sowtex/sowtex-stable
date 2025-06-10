'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminMenu from "../../components/AdminMenu";
import Image from 'next/image';
import "bootstrap/dist/css/bootstrap.min.css";
export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // <- useRouter here

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        if (res.ok && Array.isArray(data.productsWithCategory)) {
          setProducts(data.productsWithCategory);
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
    <section class="content">
    <div className="row" id="prod_div">
    
      <h1>Manage Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
          {products.map((product) => (
            <div className="col-sm-6 col-md-3" key={product._id}>
              <div class="product-thumb">
                     <div class="product-image">
                        <img src={product.image[0]} alt="" class="img-fluid w-100" />
                     </div>
                     <div class="product-summary mt-1">
                        <div class="row">
                           <div class="col">
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Date</strong><span>:</span> </div>
                                 <div class="productDetail">{product.createdDate.substring(0, 10)}</div>
                              </div>

                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Sub Category</strong><span>:</span> </div>
                                 <div class="productDetail">{product.subCategoryName}</div>
                              </div>
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Company Name</strong><span>:</span></div>
                                 <div class="productDetail">Team Sowtex</div>
                              </div>
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Location</strong><span>:</span> </div>
                                 <div class="productDetail">India</div>
                              </div>
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Listing</strong><span>:</span> </div>
                                 <div class="productDetail">Public</div>
                              </div>
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Views</strong><span>:</span> </div>
                                 <div class="productDetail">{Math.floor(1000 + Math.random() * 9000)}</div>
                              </div>
                              <div class="row mx-0">
                                 <div class="detailHeading"><strong>Article No</strong><span>:</span> </div>
                                 <div class="productDetail">{product._id}</div>
                              </div>


                           </div>

                        </div>
                        <div class="col d-flex justify-content-between">
                           <div class="col-3 mx-0 addQrCodeContainer">
                              QRCode <input type="checkbox" onclick="addQrCode('23175')" id="qu_23175" />
                           </div>
                           <div class="button col-9">
                              <a href={"view-product/"+product._id} class="btn btn-outline-success" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i> View Details</a>
                           </div>
                        </div>
                     </div>

                                                            </div>
              </div>
          ))}
        </>
      )}
   
      </div>
      </section>
    

    </div>
    </>
   
  );
}