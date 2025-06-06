"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Adminmenu from "../components/AdminMenu";
import Swal from 'sweetalert2';
export default function CategoriesForm() {
  const [formData, setFormData] = useState({
    type: "",
    cat_name: "",
    cat_pref: "",
    cat_image: null,
    cat_stock_image: null,
    cat: "",
    sub_cat_name: "",
    sub_cat_pref: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 35, name: "Apparel-Machines" },
    { id: 29, name: "Bags" },
    { id: 54, name: "Bath-Linen" },
    { id: 12, name: "Beads" },
    { id: 10, name: "Belts" },
    { id: 8, name: "Buckles" },
    { id: 9, name: "Buttons" },
    { id: 40, name: "Denim-Fabrics" },
    { id: 52, name: "Designer-Portfolio" },
    { id: 46, name: "Dyeing-and-Processing" },
    { id: 43, name: "Dyes-and-chemicals" },
    { id: 6, name: "Elastics" },
    { id: 5, name: "Embroidery-Fabrics" },
    { id: 51, name: "Fibre" },
    { id: 49, name: "Garment-Production-Furniture" },
    { id: 22, name: "Guipure-Fabric" },
    { id: 62, name: "Handloom-Fabric" },
    { id: 15, name: "Hangers" },
    { id: 31, name: "Home-Furnishing" },
    { id: 53, name: "Industrial-Machinery" },
    { id: 18, name: "Interlinings" },
    { id: 33, name: "Kids-Wear" },
    { id: 24, name: "Knitted-Fabric" },
    { id: 20, name: "Labels" },
    { id: 21, name: "Lace-Fabrics" },
    { id: 1, name: "Laces" },
    { id: 34, name: "Logistics" },
    { id: 30, name: "Mannequins" },
    { id: 58, name: "Medical-Uniforms" },
    { id: 32, name: "Mens-Wear" },
    { id: 2, name: "Motifs-and-Badges" },
    { id: 3, name: "Narrow-Fabric-and-Tapes" },
    { id: 4, name: "Neck-Patches" },
    { id: 39, name: "Non-Woven-Fabric" },
    { id: 16, name: "Packaging-Material" },
    { id: 13, name: "Sequins" },
    { id: 11, name: "Tassels" },
    { id: 38, name: "Testing-Equipments" },
    { id: 44, name: "Textile-Allied-Services" },
    { id: 37, name: "Textile-Machinery" },
    { id: 47, name: "Textile-Printing" },
    { id: 57, name: "Textile-Software" },
    { id: 55, name: "Textile-Wastage" },
    { id: 19, name: "Threads" },
    { id: 42, name: "Uniforms" },
    { id: 27, name: "Womens-Wear" },
    { id: 23, name: "Woven-Fabric" },
    { id: 14, name: "Yarns" },
    { id: 7, name: "Zippers" },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.type) {
      newErrors.type = "Please select a type";
    }

    if (formData.type === "cat") {
      if (!formData.cat_name) newErrors.cat_name = "Name is required";
      if (!formData.cat_pref) newErrors.cat_pref = "Prefix is required";
      if (!formData.cat_image)
        newErrors.cat_image = "Category image is required";
      if (!formData.cat_stock_image)
        newErrors.cat_stock_image = "Stock image is required";
    } else if (formData.type === "sub_cat") {
      if (!formData.cat) newErrors.cat = "Category is required";
      if (!formData.sub_cat_name)
        newErrors.sub_cat_name = "Sub category name is required";
      if (!formData.sub_cat_pref) newErrors.sub_cat_pref = "Prefix is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add all form data to FormData object
      for (const key in formData) {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      }

      const response = await fetch("/api/add-category", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      // alert("Category added successfully!");
      // Reset form
      // setFormData({
      //   type: "",
      //   cat_name: "",
      //   cat_pref: "",
      //   cat_image: null,
      //   cat_stock_image: null,
      //   cat: "",
      //   sub_cat_name: "",
      //   sub_cat_pref: "",
      // });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Adminmenu></Adminmenu>
      <div id="main" style={{ marginLeft: "220px" }}>
      <div className="container-fluid">
      <section className="card top">
          <div className="card-body">
           
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <div className="pageTitle">Add Product</div>
              </div>
              <div className="col-md-6 align-self-end text-end">
                <Link href="#" onClick={() => router.back()}>
                  <i className="fa fa-angle-double-left" aria-hidden="true"></i>{" "}
                  Back
                </Link>
                <br />
                <div className="breadcrumbBox">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/control-panel/dashboard">
                          <i className="fa fa-home" aria-hidden="true"></i>
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href="/control-panel/manage-products">
                          Product
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Add Product
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
        
          
          </div>
        </section>
        <section className="content card">
        <div className="col-sm-8">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-3">
                <label>Type</label>
              </div>
              <div className="col-sm-9 mb-3">
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="cat">Category</option>
                  <option value="sub_cat">Sub Category</option>
                </select>
                {errors.type && (
                  <div className={error}>{errors.type}</div>
                )}
              </div>
            </div>

            {/* Category Fields - shown when type is 'cat' */}
            {formData.type === "cat" && (
              <>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Name</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="cat_name"
                      id="cat_name"
                      value={formData.cat_name}
                      onChange={handleChange}
                    />
                    {errors.cat_name && (
                      <div className="error">{errors.cat_name}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label>Prefix</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="cat_pref"
                      id="cat_pref"
                      value={formData.cat_pref}
                      onChange={handleChange}
                    />
                    {errors.cat_pref && (
                      <div className="error">{errors.cat_pref}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label>Category Image</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="file"
                      className="form-control"
                      name="cat_image"
                      id="cat_image"
                      onChange={handleChange}
                    />
                    {errors.cat_image && (
                      <div className="error">{errors.cat_image}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label>Stock Image</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="file"
                      className="form-control"
                      name="cat_stock_image"
                      id="cat_stock_image"
                      onChange={handleChange}
                    />
                    {errors.cat_stock_image && (
                      <div className="error">
                        {errors.cat_stock_image}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Sub Category Fields - shown when type is 'sub_cat' */}
            {formData.type === "sub_cat" && (
              <>
                <div className="row">
                  <div className="col-sm-3">
                    <label>Category Name</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <select
                      name="cat"
                      id="cat"
                      className="form-select"
                      value={formData.cat}
                      onChange={handleChange}
                    >
                      <option value="">All Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.cat && (
                      <div className={error}>{errors.cat}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label>Sub Category Name</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="sub_cat_name"
                      id="sub_cat_name"
                      value={formData.sub_cat_name}
                      onChange={handleChange}
                    />
                    {errors.sub_cat_name && (
                      <div className={error}>{errors.sub_cat_name}</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3">
                    <label>Prefix</label>
                  </div>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="sub_cat_pref"
                      id="sub_cat_pref"
                      value={formData.sub_cat_pref}
                      onChange={handleChange}
                    />
                    {errors.sub_cat_pref && (
                      <div className={error}>{errors.sub_cat_pref}</div>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="row">
              <div className="col-sm-3">&nbsp;</div>
              <div className="col-sm-9">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-3"></div>
          </section>
       
      </div>
      </div>
    
      <style jsx>{`
      .error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-control, .form-select {
  margin-bottom: 0.5rem;
}

.btn-primary {
  margin-top: 1rem;
}`}</style>
    </>
  );
}
