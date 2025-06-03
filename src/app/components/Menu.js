import Link from "next/link";
import { useState } from "react";
import Image from 'next/image';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// console.log(baseUrl)
import Script from 'next/script';
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <link rel="icon" href="/assets/img/favicon.ico" />
      <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/assets/img/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/assets/img/favicon.ico" />
      <title>SOWTEX-Sourcing Textiles Globally </title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        referrerPolicy="no-referrer"
      />
      <link href="/assets/front/css/slick.css" rel="stylesheet" />
      <link href="/assets/front/css/slick-theme.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@glidejs/glide@3.4.1/dist/css/glide.core.min.css"
      />
      <link href="/assets/front/css/bootstrap.css" rel="stylesheet" />
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          strategy="lazyOnload"
      ></Script>

      <header className="navbar-fixed-top">
        <div className="header-top">
          <div className="mobile-menu" id="mobile_filter">
            <i className="fa fa-bars fa-3x js-menu-icon"></i>
          </div>

          <div className="logo">
         
            <Link href="/">
              <Image
                src="/assets/front/img/logo.png"
                alt="logo"
                width={120}
                height={60}
              />
            </Link>
          </div>
          <div className="nav-header">
            <nav className="navbar js-navbar">
              <ul className="menu">
                <li className="">
                  {/* <!-- <a class="hasDropdown special-cat" href="https://sowtex.com/categories">Categories <i class="fa fa-angle-down"></i></a> --> */}
                  <span
                    className="head-list hasDropdown special-cat"
                    target="_blank"
                    id="cat-head"
                    href="javascript:void(0)"
                  >
                    All Categories <i className="fa fa-angle-down"></i>
                  </span>
                  <ul className="container">
                    <div className="menu-container-overflow">
                      <h2>
                        <a
                          className="py-0"
                          href="https://sowtex.com/categories"
                        >
                          All Categories (49)
                        </a>
                      </h2>
                      <div className="all_cat_list">
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              <li>
                                <a href="https://sowtex.com/categories/Apparel-Machines">
                                  Apparel Machines{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Bags">
                                  Bags{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Bath-Linen">
                                  Bath Linen{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Beads">
                                  Beads{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Belts">
                                  Belts{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Buckles">
                                  Buckles{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Buttons">
                                  Buttons{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Denim-Fabrics">
                                  Denim Fabrics{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Designer-Portfolio">
                                  Designer Portfolio{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Dyeing-and-Processing">
                                  Dyeing and Processing{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Dyes-and-chemicals">
                                  Dyes and chemicals{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Elastics">
                                  Elastics{" "}
                                </a>
                              </li>

                              <li>
                                <a href="https://sowtex.com/categories/Embroidery-Fabrics">
                                  Embroidery Fabrics{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              {" "}
                              <li>
                                <a href="https://sowtex.com/categories/Fibre">
                                  Fibre{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Garment-Production-Furniture">
                                  Garment Production Furniture{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Guipure-Fabric">
                                  Guipure Fabric{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Handloom-Fabric">
                                  Handloom Fabric{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Hangers">
                                  Hangers{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Home-Furnishing">
                                  Home Furnishing{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Industrial-Machinery">
                                  Industrial Machinery{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Interlinings">
                                  Interlinings{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Kids-Wear">
                                  Kids Wear{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Knitted-Fabric">
                                  Knitted Fabric{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Labels">
                                  Labels{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Lace-Fabrics">
                                  Lace Fabrics{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Laces">
                                  Laces{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              {" "}
                              <li>
                                <a href="https://sowtex.com/categories/Logistics">
                                  Logistics{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Mannequins">
                                  Mannequins{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Medical-Uniforms">
                                  Medical Uniforms{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Mens-Wear">
                                  Mens Wear{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Motifs-and-Badges">
                                  Motifs and Badges{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Narrow-Fabric-and-Tapes">
                                  Narrow Fabric and Tapes{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Neck-Patches">
                                  Neck Patches{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Non-Woven-Fabric">
                                  Non Woven Fabric{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Packaging-Material">
                                  Packaging Material{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Sequins">
                                  Sequins{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Tassels">
                                  Tassels{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Testing-Equipments">
                                  Testing Equipments{" "}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              {" "}
                              <li>
                                <a href="https://sowtex.com/categories/Textile-Allied-Services">
                                  Textile Allied Services{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Textile-Machinery">
                                  Textile Machinery{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Textile-Printing">
                                  Textile Printing{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Textile-Software">
                                  Textile Software{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Textile-Wastage">
                                  Textile Wastage{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Threads">
                                  Threads{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Uniforms">
                                  Uniforms{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Womens-Wear">
                                  Womens Wear{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Woven-Fabric">
                                  Woven Fabric{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Yarns">
                                  Yarns{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/Zippers">
                                  Zippers{" "}
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/categories/latest-design">
                                  Latest Design
                                </a>
                              </li>
                              <li>
                                <a href="https://sowtex.com/certified-fabrics">
                                  Certified Fabrics
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            {/* <Image
                              src="https://sowtex.com/assets/images/stockbanner/1737016430CATEGORIES.png"
                              className="mr-auto"
                              alt="content" width={300}
  height={200}
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>

                <li>
                  <span
                    className="head-list hasDropdown special-cat"
                    id="stock-head"
                    href="javascript:void(0)"
                  >
                    Stocks <i className="fa fa-angle-down"></i>
                  </span>
                  <ul className="container">
                    <div className="menu-container-overflow .menu-container-overflow-stock">
                      <h2>
                        <a className="py-0" href="/ready-stocks">
                          Ready Stocks (21)
                        </a>
                      </h2>
                      <div className="all_cat_list">
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              <li>
                                <a href="/ready-stocks/bags">Bags</a>
                              </li>

                              <li>
                                <a href="/ready-stocks/bath-linen">
                                  Bath Linen
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/buttons">Buttons</a>
                              </li>

                              <li>
                                <a href="/ready-stocks/denim-fabrics">
                                  Denim Fabrics
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/embroidery-fabrics">
                                  Embroidery Fabrics
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/guipure-fabric">
                                  Guipure Fabric
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/home-furnishing">
                                  Home Furnishing
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              <li>
                                <a href="/ready-stocks/interlinings">
                                  Interlinings
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/kids-wear">Kids Wear</a>
                              </li>

                              <li>
                                <a href="/ready-stocks/knitted-fabric">
                                  Knitted Fabric
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/lace-fabrics">
                                  Lace Fabrics
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/laces">Laces</a>
                              </li>

                              <li>
                                <a href="/ready-stocks/medical-uniforms">
                                  Medical Uniforms
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/mens-wear">Mens Wear</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul>
                              <li>
                                <a href="/ready-stocks/narrow-fabric-and-tapes">
                                  Narrow Fabric and Tapes
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/neck-patches">
                                  Neck Patches
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/sequins">Sequins</a>
                              </li>

                              <li>
                                <a href="/ready-stocks/textile-machinery">
                                  Textile Machinery
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/womens-wear">
                                  Womens Wear
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/woven-fabric">
                                  Woven Fabric
                                </a>
                              </li>

                              <li>
                                <a href="/ready-stocks/yarns">Yarns</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            <ul></ul>
                          </div>
                        </div>
                        <div className="all_cat_list_item">
                          <div className="all_cat_list_item_content">
                            {/* <Image
                              style={{ height: "150px" }}
                              src="../assets/images/stockbanner/top1737016420Stocks.png"
                              className="mr-auto"
                              alt="banner"
                            /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>

                <li>
                  <a className="head-list" href="/featured-companies">
                    Featured Companies
                  </a>
                </li>
                <li>
                  <a
                    className="head-list"
                    href="javascript:void(0)"
                    id="live-f"
                  >
                    Live Leads
                  </a>
                </li>
                <li>
                  <a className="head-list" href="/membership-plans">
                    Membership
                  </a>
                </li>
                <li>
                  <a
                    className="head-list"
                    href="https://connect.sowtex.com/events"
                    target="__blank"
                  >
                    Events
                  </a>
                </li>

                <div className="extraMenuForMobEnq d-none">
                  <li>
                    <a href="/login" target="__blank">
                      Post Enquiry
                    </a>
                  </li>{" "}
                </div>

                <div className="extraMenuForMob d-none">
                  <hr />
                  <li>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.sowtex.sowtexAppPro"
                      target="__blank"
                      className="d-flex
                  display-inline"
                    >
                      For Better Experince{" "}
                      {/* <Image
                        className="col-3 col-sm-2"
                        src="https:sowtex.com/assets/front/img/img/google.svg"
                        alt="Play-store"
                      /> */}
                    </a>
                  </li>
                  <li>
                    <a href="/signup" target="__blank">
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us" target="__blank">
                      Help &amp; Support
                    </a>
                  </li>
                </div>
              </ul>
              <div className="live-feed-pop" id="s-feed-pop">
                <div className="live-feed-pop-area">
                  <div className="container">
                    <div className="live-feed-pop-content" id="live_feed"></div>
                  </div>
                </div>
                <div className="live-feed-pop-bg"></div>
              </div>
            </nav>
          </div>
          <div id="nav-header-right">
            <div className="header-top-right d-flex">
              <div className="search-header me-2">
                <a href="javascript:void(0)">
                  <i className="fa-solid fa-magnifying-glass fa-xl "></i>
                </a>
              </div>

              <a
                data-target="#post-enquiry-modal"
                data-toggle="modal"
                className="post-enquiry btn btn-primary position-fixed"
                style={{ bottom: "125px", right: "10px", display: "inline" }}
              >
                Enquire Now
              </a>
              <div className="admin-header">
                <div className="">
                  <ul className="d-flex Login-top">
                    <li>
                      <a
                        href="#"
                        className="btn_login d-flex align-items-center"
                        data-toggle="modal"
                        data-target="#home-login #login-model"
                      >
                        <i
                          className="fa-solid fa-user fa-md me-2"
                          style={{ color: "#ffffff" }}
                        ></i>{" "}
                        Login{" "}
                      </a>
                    </li>
                    <li className="dextop-display-none-arrow d-none">
                      <a href="#">/</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Menu;