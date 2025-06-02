"use client";
import { useState } from "react";
import Menu from "../components/Menu";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../components/Breadcrumb";
import Footer from "../components/Footer";

export default function Categories() {
  const [formData, setFormData] = useState({
    subCategory: "",
    category: "0",
    location: "All Cities",
    design: "",
    certification: "All Certi",
    company: "All Companies",
    contentSearch: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleApply = () => {
    console.log("Applied Filters:", formData);
  };

  const handleReset = () => {
    setFormData({
      subCategory: "",
      category: "0",
      location: "All Cities",
      design: "",
      certification: "All Certi",
      company: "All Companies",
      contentSearch: "",
    });
  };

  const categories = [
    {
      name: "Apparel Machines",
      count: 108,
      img: "https://sowtex.com/assets/images/category/1544793742.png",
      url: "/categories/Apparel-Machines",
    },
    {
      name: "Dyes and chemicals",
      count: 21,
      img: "https://sowtex.com/assets/images/category/1625651803.png",
      url: "/categories/Dyes-and-chemicals",
    },
    {
      name: "Elastics",
      count: 114,
      img: "https://sowtex.com/assets/images/category/1531139185.png",
      url: "/categories/Elastics",
    },
    {
      name: "Embroidery Fabrics",
      count: 381,
      img: "https://sowtex.com/assets/images/category/1636375123.png",
      url: "/categories/Embroidery-Fabrics",
    },
    {
      name: "Fibre",
      count: 11,
      img: "https://sowtex.com/assets/images/category/1636375427.png",
      url: "/categories/Fibre",
    },
    {
      name: "Garment Production Furniture",
      count: 15,
      img: "https://sowtex.com/assets/images/category/1563868298.png",
      url: "/categories/Garment-Production-Furniture",
    },
    {
      name: "Guipure Fabric",
      count: 9,
      img: "https://sowtex.com/assets/images/category/1636375562.png",
      url: "/categories/Guipure-Fabric",
    },
    {
      name: "Handloom Fabric",
      count: 9,
      img: "https://sowtex.com/assets/images/category/171754560028849.jpg",
      url: "/categories/Handloom-Fabric",
    },
    {
      name: "Hangers",
      count: 322,
      img: "https://sowtex.com/assets/images/category/168721920031540.png",
      url: "/categories/Hangers",
    },
    {
      name: "Home Furnishing",
      count: 279,
      img: "https://sowtex.com/assets/images/category/1636375625.png",
      url: "/categories/Home-Furnishing",
    },
    {
      name: "Industrial Machinery",
      count: 7,
      img: "https://sowtex.com/assets/images/category/1563884165.png",
      url: "/categories/Industrial-Machinery",
    },
    {
      name: "Interlinings",
      count: 62,
      img: "https://sowtex.com/assets/images/category/1636375676.png",
      url: "/categories/Interlinings",
    },
    {
      name: "Kids Wear",
      count: 348,
      img: "https://sowtex.com/assets/images/category/1636375086.png",
      url: "/categories/Kids-Wear",
    },
    {
      name: "Knitted Fabric",
      count: 610,
      img: "https://sowtex.com/assets/images/category/1636374833.png",
      url: "/categories/Knitted-Fabric",
    },
    {
      name: "Labels",
      count: 286,
      img: "https://sowtex.com/assets/images/category/1531154681.png",
      url: "/categories/Labels",
    },
    {
      name: "Yarns",
      count: 309,
      img: "https://sowtex.com/assets/images/category/1636376273.png",
      url: "/categories/Yarns",
    },
    {
      name: "Zippers",
      count: 269,
      img: "https://sowtex.com/assets/images/category/1625651590.png",
      url: "/categories/Zippers",
    },
  ];

  return (
    <>
      <Menu></Menu>
      <div className="cat_fixed">
        <Breadcrumbs title="categories"></Breadcrumbs>
        <section id="category" className="pt-5">
          <div className="container">
            <div className="category get-featured-block">
              <div className="row" style={{ position: "relative" }}>
                <div className="col-lg-12">
                  <div className="category-banner">
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                      <Image
                        src="https://sowtex.com/assets/images/banner/catTopBanner.jpeg"
                        alt="Category Banner"
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        style={{
                          objectFit: 'cover',
                        }}
                        priority
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-3">
                  <div className="category-filter sticky-top" style={{ top: 125 }}>
                    <div className="category-filter-sidebar bg-light p-3">
                      <div className="filter">
                        <input
                          type="text"
                          id="subCategory"
                          className="form-control mb-2"
                          placeholder="Related Subcategory"
                          value={formData.subCategory}
                          onChange={handleChange}
                        />

                        <select
                          id="category"
                          className="form-control mb-2"
                          value={formData.category}
                          onChange={handleChange}
                        >
                          <option value="0" disabled>
                            All Categories
                          </option>
                          <option value="35">Apparel Machines</option>
                          <option value="29">Bags</option>
                          <option value="54">Bath Linen</option>
                          <option value="12">Beads</option>
                          <option value="10">Belts</option>
                          <option value="8">Buckles</option>
                          <option value="9">Buttons</option>
                          <option value="40">Denim Fabrics</option>
                          <option value="52">Designer Portfolio</option>
                          <option value="46">Dyeing and Processing</option>
                          <option value="43">Dyes and Chemicals</option>
                          <option value="6">Elastics</option>
                          <option value="5">Embroidery Fabrics</option>
                          <option value="51">Fibre</option>
                          <option value="49">Garment Production Furniture</option>
                          <option value="22">Guipure Fabric</option>
                          <option value="62">Handloom Fabric</option>
                          <option value="15">Hangers</option>
                          <option value="31">Home Furnishing</option>
                          <option value="53">Industrial Machinery</option>
                          <option value="18">Interlinings</option>
                          <option value="33">Kids Wear</option>
                          <option value="24">Knitted Fabric</option>
                          <option value="20">Labels</option>
                          <option value="21">Lace Fabrics</option>
                          <option value="1">Laces</option>
                          <option value="34">Logistics</option>
                          <option value="30">Mannequins</option>
                          <option value="58">Medical Uniforms</option>
                          <option value="32">Mens Wear</option>
                          <option value="2">Motifs and Badges</option>
                          <option value="3">Narrow Fabric and Tapes</option>
                          <option value="4">Neck Patches</option>
                          <option value="39">Non Woven Fabric</option>
                          <option value="16">Packaging Material</option>
                          <option value="13">Sequins</option>
                          <option value="11">Tassels</option>
                          <option value="38">Testing Equipments</option>
                          <option value="44">Textile Allied Services</option>
                          <option value="37">Textile Machinery</option>
                          <option value="47">Textile Printing</option>
                          <option value="57">Textile Software</option>
                          <option value="55">Textile Wastage</option>
                          <option value="19">Threads</option>
                          <option value="42">Uniforms</option>
                          <option value="27">Womens Wear</option>
                          <option value="23">Woven Fabric</option>
                          <option value="14">Yarns</option>
                          <option value="7">Zippers</option>
                        </select>

                        <select
                          id="location"
                          className="form-control mb-2"
                          value={formData.location}
                          onChange={handleChange}
                        >
                          <option value="All Cities">Location</option>
                        </select>

                        <select
                          id="design"
                          className="form-control mb-2"
                          value={formData.design}
                          onChange={handleChange}
                        >
                          <option value="">Design Range</option>
                          <option value="lat_desi">Latest Design</option>
                          <option value="certi_fab">Certified Fabrics</option>
                          <option value="featured">Featured</option>
                          <option value="gold">Gold</option>
                        </select>

                        <select
                          id="certification"
                          className="form-control mb-2"
                          value={formData.certification}
                          onChange={handleChange}
                        >
                          <option value="All Certi">Certification</option>
                        </select>

                        <select
                          id="company"
                          className="form-control mb-2"
                          value={formData.company}
                          onChange={handleChange}
                        >
                          <option value="All Companies">All Companies</option>
                        </select>

                        <input
                          type="text"
                          id="contentSearch"
                          placeholder="Content Based Search"
                          className="form-control mb-3"
                          value={formData.contentSearch}
                          onChange={handleChange}
                        />

                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={handleApply}
                          >
                            Apply
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleReset}
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      <div className="col mt-3">
                        <div style={{ position: 'relative', width: '100%', height: '600px' }}>
                          <Image
                            src="https://sowtex.com/assets/images/banner/categoryTBanner.jpeg"
                            alt="Category Side Banner"
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-9">
                  <div className="product-list">
                    <div className="row">
                      {categories.map((cat, index) => (
                        <div className="col-sm-6 col-md-4" key={index}>
                          <div className="product-thumb">
                            <Link href={cat.url} legacyBehavior>
                              <a>
                                <div className="image" style={{ position: 'relative', width: '100%', height: '200px' }}>
                                  <Image
                                    src={cat.img}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    style={{
                                      objectFit: 'cover',
                                    }}
                                  />
                                </div>
                              </a>
                            </Link>
                            <div className="text-center">
                              <div className="row mt-2">
                                <div className="col-12 product-location">
                                  {cat.name} ({cat.count})
                                </div>
                              </div>
                            </div>
                            <div className="text-center py-2">
                              <Link
                                href={cat.url}
                                className="btn btn-outline-warning link"
                                legacyBehavior
                              >
                                <a className="btn btn-outline-warning link">
                                  View
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}