import React, { Component    } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
    return (
        <footer>
 <footer>
      {/* Enquiry & Registration Modals */}
      <div id="myDiv" className="p-2 opacity-0 d-none" style={{ zIndex: 30000 }}>
        <div className="row w-100 h-100">
          <div className="col-12 sw-body mt-lg-1">
            <div className="font-div">
              <i className="fa-solid fa-check fa-2xl"></i>
            </div>
          </div>
          <div className="sw-title col-12 mt-lg-3">
            <h1>Enquiry Posted</h1>
          </div>
          <div className="sw-text col-12 mt-lg-3">
            <p>We have received your enquiry! Our team will get back to you soon.</p>
          </div>
        </div>
      </div>

      <div id="regDiv" className="p-2 opacity-0 d-none" style={{ zIndex: 30000 }}>
        <div className="row w-100 h-100">
          <div className="col-12 sw-body mt-lg-1">
            <div className="font-div">
              <i className="fa-solid fa-check fa-2xl"></i>
            </div>
          </div>
          <div className="sw-title col-12 mt-lg-3">
            <h1>Registration successful</h1>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-link-section">
        <div className="footer-container container-fluid">
          <div className="row">
            {/* Logo & About */}
            <div className="col-12 col-lg-6 footer-about">
              <div className="text-container">
                <img
                  src="https://sowtex.com/assets/front/img/footer-logo.svg"
                  alt="Sowtex Logo"
                  className="footer-logo"
                />
                <div className="footer-top-right">
                  <p className="read-less ms-0 pt-1">
                    SOWTEX, a tech-powered B2B platform for Fashion & Textile sourcing, connects Buyers and Sellers securely...
                  </p>
                </div>
              </div>
            </div>

            {/* Links + App */}
            <div className="col-12 col-lg-6">
              <div className="row footer-links-container">
                {/* Quick Links */}
                <div className="block-footer d-flex col-12 col-md-9">
                  {/* Column 1 */}
                  <div className="col-4 col-md-4 footer-links-column ps-3">
                    <h1 className="mb-2 mt-2 fw-bold" style={{ fontSize: '18px', color: '#110c5a' }}>
                      Quick Links
                    </h1>
                    <ul className="footer-links">
                      <li><a href="https://sowtex.com/about-us">About Us</a></li>
                      <li><a href="https://sowtex.com/featured-companies">Get Featured</a></li>
                      <li><a href="https://sowtex.com/contact-us">Contact Us</a></li>
                      <li><a href="https://sowtex.com/get-support">Get Support</a></li>
                      <li><a href="https://sowtex.com/complains-suggestions">Feedback & Complaints</a></li>
                      <li><a href="https://sowtex.com/articles">Articles</a></li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="col-4 col-md-4 footer-links-column ps-4">
                    <h1 className="mb-2 mt-2 fw-bold" style={{ fontSize: '18px', color: '#110c5a' }}>Knowledge</h1>
                    <ul className="footer-links">
                      <li><a href="https://sowtex.com/faq">FAQs</a></li>
                      <li><a href="https://blog.sowtex.com/" target="_blank" rel="noopener noreferrer">Blog</a></li>
                      <li><a href="https://sowtex.com/training">Training Videos</a></li>
                      <li><a href="https://sowtex.com/what-we-offer">What We Offer</a></li>
                      <li><a href="https://sowtex.com/gallaries">Gallaries</a></li>
                      <li><a href="https://connect.sowtex.com/">Connect</a></li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="col-4 col-md-4 footer-links-column ps-4">
                    <h1 className="mb-2 mt-2 fw-bold" style={{ fontSize: '18px', color: '#110c5a' }}>More</h1>
                    <ul className="footer-links">
                      <li><a href="https://sowtex.com/work-with-us">Work With Us</a></li>
                      <li><a href="https://sowtex.com/press-area">Exhibitions & Events</a></li>
                      <li><a href="https://sowtex.com/privacy-policy">Privacy Policy</a></li>
                      <li><a href="https://sowtex.com/terms-conditions">Terms of Service</a></li>
                      <li><a href="https://sowtex.com/sitemap">Sitemap</a></li>
                      <li><a href="https://designlab.sowtex.com/">Design Lab</a></li>
                    </ul>
                  </div>
                </div>

                {/* App Download */}
                <div className="col-12 col-md-3 app-download-row">
                  <div>
                    <h4 className="text-nowrap mt-lg-0 mt-2 mb-0 fw-bolder" style={{ fontSize: '32px', color: '#110c5a' }}>Download</h4>
                    <hr className="my-1" style={{ width: '170px' }} />
                    <ul className="footer-links">
                      <li className="w-100 d-flex mb-2">
                        <h4 className="fw-bold text-nowrap" style={{
                          fontSize: '15px',
                          color: '#110c5a',
                          borderBottom: '3px solid #ff7a00',
                          height: '26px'
                        }}>
                          SOWTEX APP
                        </h4>
                      </li>
                      <li>
                        <a href="https://play.google.com/store/apps/details?id=com.sowtex.sowtexAppPro" target="_blank" rel="noopener noreferrer">
                          <img src="https://sowtex.com/assets/images/sowtex/play.png" alt="Download on Google Play" className="app-store-icon" />
                        </a>
                      </li>
                      <li>
                        <a className="w-100" href="https://sowtex.com/signup">
                          <button className="w-100 mt-2 btn_login py-lg-2 py-3 border-0 login-modal-button" style={{ color: 'white', fontSize: '14px' }}>
                            <i className="fa-solid fa-user fa-md me-2" style={{ color: 'white' }}></i>Sign up
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="footer-social-media-links">
        <div className="container">
          <div className="row">
            <div className="col-ms-12 col-md-4 flex-box-footer">
              <ul>
                <li><a href="https://www.facebook.com/Sowtex" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/fb.png" alt="Facebook" /></a></li>
                <li><a href="https://www.linkedin.com/company/sowtex-network/" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/linkedin.png" alt="Linkedin" /></a></li>
                <li><a href="https://in.pinterest.com/sowtexnetworkpvtltd/" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/pinetrest.png" alt="Pinterest" /></a></li>
                <li><a href="https://twitter.com/SowtexNetwork" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/Twitter.png" alt="Twitter" /></a></li>
                <li><a href="https://www.instagram.com/sowtex.network/?hl=en" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/Instagram.png" alt="Instagram" /></a></li>
                <li><a href="https://www.youtube.com/channel/UCvMxAbQ37UYVjBZU7ifLPgg?view_as=subscriber" target="_blank"><img className="footerIcons" src="https://sowtex.com/assets/img/Youtube.png" alt="YouTube" /></a></li>
              </ul>
            </div>
            <div className="col-sm-12 col-md-8 text-center quick-res-msg">
              <h5>
                For <b>quick engagement</b> with Team <span><h4 className="d-inline fw-bold">SOWTEX</h4></span> please reach out<br />
                <b>to <i className="fa-solid fa-phone fa-lg me-1" style={{ color: '#ff7a00' }}></i>+91 92668 44558</b>
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copy-right">
        <p>Copyright © 2024 | All Rights Reserved by SOWTEX Network</p>
      </div>

      {/* Style block (you can move this to a CSS module if needed) */}
      <style jsx>{`
        .footer-container {
          padding: 0 7px;
          color: #333;
          text-align: left;
        }
        .footer-logo {
          height: 3em;
          vertical-align: middle;
        }
        .footer-links {
          list-style: none;
          padding: 0;
        }
       
        .app-store-icon {
          width: 100%;
          max-width: 150px;
          border-radius: 10px;
        }
        .footer-copy-right {
          text-align: center;
          padding: 1rem;
          font-size: 14px;
          color: #444;
        }
        @media (max-width: 768px) {
          .footer-links-column {
            width: 100%;
          }
          .app-store-icon {
            width: 30vw;
          }
        }
      `}</style>
    </footer>
</footer>
    )
}
export default Footer;




