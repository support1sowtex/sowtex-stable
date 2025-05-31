// pages/index.js
"use client";
import Layout from '@/app/components/Menu';


// import "@blobals";
// import main from "./styles/main.module.css";
//  import styles from "./styles/style.module.css";
// import HomeCarousel from "@/app/components/Carousel";

import Image from 'next/image';
// import Footer from '../components/Footer';




// import HomePageSlideshow from '../components/HomePageSlideshow';
function HomePage() {
  return (
    <>
      <Layout />
     
      {/* <HomeCarousel  /> */}
      <section className="source-global-item section-padding" style={{display:'flex',textAlign:'center',justifyContent:'center' }}>
        <div className="w-1073 d-flex source-global-wrapper center-text">
          <div className="all-heading text-center">
            <h1>Source Global Suppliers</h1>
            
            <p>The B2B platform to widen your supplier network</p>
          </div>
        </div>
      </section>
      <div className="container-fluid" style={{display:'flex',textAlign:'center',justifyContent:'space-around',width:'60%' }}>
          <div className="source-global-box ">
            <div className="source-global-box-img">
              <img
                src="https://sowtex.com/assets/front/img/Source Global Suppliers/Design _ Products.png"
                alt="Design & Products"
              />
            </div>
            <div className="source-global-box-content">
              <p>
                Design & Products<br />
                <span className="counter" data-target="16874" >
                  16874+
                </span>
              </p>
            </div>
          </div>
          <div className="source-global-box">
            <div className="source-global-box-img">
              <img
                src="https://sowtex.com/assets/front/img/Source Global Suppliers/Ready Stocks.png"
                alt="Ready Stocks"
              />
            </div>
            <div className="source-global-box-content">
              <p>
                Ready
                <br /> Stocks
                <span className="counter" data-target="817">
                  817+
                </span>
              </p>
            </div>
          </div>
          <div className="source-global-box">
            <div className="source-global-box-img">
              <img
                src="https://sowtex.com/assets/front/img/Source Global Suppliers/Reviews _ Ratings.png"
                alt="Vendor Portfolios"
              />
            </div>
            <div className="source-global-box-content">
              <p>
                Vendor
                <br /> Portfolios
                <span className="counter" data-target="27555">
                  27555+
                </span>
              </p>
            </div>
          </div>
          <div className="source-global-box">
            <div className="source-global-box-img">
              <img
                src="https://sowtex.com/assets/front/img/Source Global Suppliers/Vendor Portfolios.png"
                alt="Reviews & Ratings"
              />
            </div>
            <div className="source-global-box-content">
              <p>
                Reviews &<br /> Ratings
                <span className="counter" data-target="550">
                  550+
                </span>
              </p>
            </div>
          </div>
        </div>
      <section className="know-more-item section-padding">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-6">
              <div className="know-more-content">
                <h4>SOWTEX as Business Growth Platform</h4>
                <p>
                  <strong>Sowtex Network</strong> is a global{" "}
                  <strong>B2B Sourcing Platform</strong> for Fashion and Textile
                  materials, enabling Buyers and Suppliers to source{" "}
                  <strong>Sustainable Materials</strong>, designs and vendors
                  across the value chain. We support business deals through
                  faster matchmaking of <strong>Focused Opportunities</strong>,
                  further aiding deal closures using a{" "}
                  <strong>Secured Gateway</strong> application.
                  <br />
                  As a team, we support both manufacturers as business growth
                  partners and buyers with faster sourcing solutions,
                  eliminating supply chain complexities. We are developing
                  cutting-edge solutions for traditional supply chain problems
                  through{" "}
                  <strong>
                    Business Intelligence (BI) and Artificial Intelligence (AI)
                  </strong>
                  . Our team is passionate, dynamic, and solution-oriented, with
                  a mix of young and experienced professionals backed by
                  industry expertise and driven entrepreneurs. Together, we have
                  built strong industry collaborations and are on a mission to
                  transform the conventional sourcing landscape, making it
                  future-ready.
                </p>
                <div className="know-more-content-link text-center">
                  <a
                    href="https://sowtex.com/about-us"
                    className="btn btn-primary btn-img px-3 py-2 mb-3"
                  >
                    Know More{" "}
                    <img
                      src="https://sowtex.com/assets/img/btn-arrow.png"
                      alt="button"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 m-0">
              <div className="know-more-content-icon m-0">
                <h3>Our Core Values</h3>
                <div className="flr">
                  <div className="container flr-sm">
                    <div className="flx flx-4">
                      <div className="list-column d-flex p-0">
                        <img
                          src="https://sowtex.com/assets/front/img/Speed%20%20Innovation.png"
                          alt="icon"
                        />
                        <p>Speed & Innovation</p>
                      </div>
                    </div>
                    <div className="flx flx-4">
                      <div className="list-column d-flex p-0">
                        <img
                          src="https://sowtex.com/assets/front/img/Customer Centric Solutions_1.png"
                          alt="icon"
                        />
                        <p>Customer Centric Solutions</p>
                      </div>
                    </div>
                    <div className="flx flx-4">
                      <div className="list-column d-flex p-0">
                        <img
                          src="https://sowtex.com/assets/front/img/Focus on Deals Business Growth.png"
                          alt="icon"
                        />
                        <p>Focus on Deals & Business Growth</p>
                      </div>
                    </div>
                    <div className="flx flx-4">
                      <div className="list-column d-flex p-0">
                        <img
                          src="https://sowtex.com/assets/front/img/Empowered Businesses_1.png"
                          alt="icon"
                        />
                        <p>Empowered Businesses</p>
                      </div>
                    </div>
                    <div className="flx flx-4">
                      <div className="list-column d-flex p-0">
                        <img
                          src="https://sowtex.com/assets/front/img/Industry Collaboration_1.png"
                          alt="icon"
                        />
                        <p>Industry Collaboration</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      <section className="what-we-Offer section-padding">
            <div className="w-1073 d-flex source-global-wrapper">
                <div className="all-heading text-center">
                    <h2>What We Offer?</h2>
                </div>
                 <div className="source-global-box">
                    <div className="source-global-box-img">
                        <img src="https://sowtex.com/assets/front/img/Focused Lead Generation.png" alt="icon" width={50} height={50}/>
                    </div>
                    <div className="source-global-box-content">
                        <p>Focused Lead Generation</p>
                    </div>
                </div>
               <div className="source-global-box">
                    <div className="source-global-box-img">
                        <img src="https://sowtex.com/assets/front/img/Vendor Portfolios.png" alt="icon"  width={50} height={50}/>
                    </div>
                    <div className="source-global-box-content">
                        <p>Vendor Portfolios</p>
                    </div>
                </div>
                <div className="source-global-box">
                    <div className="source-global-box-img">
                        <img src="https://sowtex.com/assets/front/img/Customised sourcing solutions.png" alt="icon"  width={50} height={50}/>
                    </div>
                    <div className="source-global-box-content">
                        <p>Customised Sourcing Solutions</p>
                    </div>
                </div>
                <div className="source-global-box">
                    <div className="source-global-box-img">
                        <img src="https://sowtex.com/assets/front/img/Ready Stock.png" alt="icon" width={50} height={50}/>
                    </div>
                    <div className="source-global-box-content">
                        <p>Ready Stock</p>
                    </div>
                </div>
                <div className="source-global-box">
                    <div className="source-global-box-img">
                        <img src="https://sowtex.com/assets/front/img/Secure Deals.png" alt="icon"  width={50} height={50}/>
                    </div>
                    <div className="source-global-box-content">
                        <p>Secure Deals</p>
                    </div>
                </div> 
            </div>
      </section>
      <div style={{width:'60%' }} className="container-fluid" >
      {/* <HomePageSlideshow /> */}
      </div>
      {/* <Footer/> */}
        <br></br>
    </>
  );
}
const footerStyles = {
  footerContainer: {
    padding: '0px 7px',
    color: '#333',
    textAlign: 'left',
  },
  footerHeading: {
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  footerLogo: {
    width: 'auto',
    height: '3em',
    verticalAlign: 'middle',
  },
  footerAbout: {
    // add properties if needed
  },
  footerDescription: {
    fontSize: '1rem',
    color: '#666',
    textAlign: 'justify',
  },
  footerLinksContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    lineHeight: 1.6,
    textAlign: 'left',
  },
  footerLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  appStoreIcon: {
    width: '100%',
    maxWidth: '150px',
    borderRadius: '10px',
  },
  appDownload: {
    marginTop: '10px',
    textAlign: 'left',
  },
  // Responsive styles would typically be handled with media queries via CSS or styled-components
};

export default HomePage;