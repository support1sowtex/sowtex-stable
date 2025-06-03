"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Breadcrumbs from "../components/Breadcrumb";
import "swiper/css/pagination";
import Layout from "../components/Menu";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Image from 'next/image';

export default function TeamSlider() {
  const teamMembers = [
    {
      name: "Sonil Jain",
      title: "Co-Founder | CEO",
      image: "https://sowtex.com/assets/images/sowtex/Sonil.jpg",
    },
    {
      name: "Ekta Jain",
      title: "Co-Founder | Creative Head",
      image: "https://sowtex.com/assets/images/sowtex/Ekta.png",
    },
    {
      name: "Satish Chandra",
      title: "Regional Head",
      image: "https://sowtex.com/assets/images/sowtex/Satish.png",
    },
    {
      name: "Nikita Singh",
      title: "Sr Category Manager",
      image: "https://sowtex.com/assets/images/sowtex/Nikita.png",
    },
    {
      name: "Isha",
      title: "Category Manager",
      image: "https://sowtex.com/assets/images/sowtex/Isha.png",
    },
  ];

  return (
    <>
      <Menu></Menu>
      <div className="cat_fixed">
      <Breadcrumbs title="About Us"></Breadcrumbs>
      <div className="container">
        <div className="about">
          <div className="row row-eq-height">
            <div className="col-md-12">
              <div
                style={{ border: "1px solid #e2dada" }}
                className="row  g-0 "
              >
                <div className="col-12 col-md-3 me-lg-3  px-lg-2 px-5 py-lg-3 ">
                  <Image
                    style={{ height: "200px", width: "100%" }}
                    src="https://sowtex.com/assets/images/sowtex/vision.jpeg "
                  />
                </div>
                <div className="col-md-8">
                  <div className="my-2 m-0">
                    <h1 className="w-100 text-lg-start text-center">Vision</h1>
                  </div>
                  <p className="pe-3 px-2" style={{ fontSize: "14px" }}>
                    By 2030, Sowtex envisions becoming the linchpin of India’s
                    Textile evolution, seamlessly integrating advanced digital
                    technologies with traditional textile practices to transform
                    India into a global textile powerhouse. Our goal is to drive
                    efficiency, elevate global competitiveness, and foster
                    sustainable growth by leveraging cutting-edge technology and
                    forging strategic partnerships. We aspire to enhance India’s
                    position as a self-reliant textile leader, contributing
                    significantly to the nation's vision of a $350 billion
                    textile industry and $100 billion in global exports.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-2 ">
              <div style={{ border: "1px solid #e2dada" }} className="row  g-0">
                <div className="col-md-3 me-lg-3  px-lg-2 px-5 px-2  py-lg-3 ">
                  <Image
                    style={{ height: "200px", width: "100%" }}
                    src="https://sowtex.com/assets/images/sowtex/MISSION_2.jpeg "
                  />
                </div>
                <div className="col-md-8">
                  <div className="m-0 my-2">
                    <h1 className="w-100 text-lg-start text-center">Mission</h1>
                  </div>

                  <p className="pe-3 px-2" style={{ fontSize: "14px" }}>
                    Our mission is to revolutionize the textile industry through
                    a digital-first approach that eliminates inefficiencies,
                    amplifies international connections, and fosters sustainable
                    development. We are committed to driving innovation through
                    BI and AI solutions, expanding global trade opportunities,
                    and creating a robust ecosystem that supports India’s
                    textile goals. By advancing technology, promoting
                    high-quality standards, and nurturing talent, Sowtex aims to
                    bolster India’s global textile leadership and support its
                    ambition of a thriving, self-sufficient textile sector by
                    2030.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section-title mt-0">Core Values</div>

            <div className="row d-flex justify-content-center text-center about-section-icon">
              <div className="col-4 col-md-4 col-lg-2">
                <Image src="https://sowtex.com/assets/images/sowtex/Speed_Innovation.png" />
                <p>Speed &amp; Innovation</p>
              </div>
              <div className="col-4 col-md-4 col-lg-2">
                <Image src="https://sowtex.com/assets/images/sowtex/Customer Centric Solutions.png" />
                <p>Customer Centric Solutions</p>
              </div>
              <div className="col-4 col-md-4 col-lg-2">
                <Image src="https://sowtex.com/assets/images/sowtex/Focus on Deals _ Business Growth.png " />
                <p>Focus on Deals &amp; Business Growth</p>
              </div>
              <div className="col-4 col-md-4 col-lg-2">
                <Image src="https://sowtex.com/assets/images/sowtex/Empowered Businesses.png" />
                <p>Empowered Businesses</p>
              </div>
              <div className="col-4 col-md-4 col-lg-2">
                <Image src="https://sowtex.com/assets/images/sowtex/Industry Collaboration.png " />
                <p>Industry Collaboration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Meet Our Team</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="profile-card text-center p-3">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="img-fluid rounded-circle mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h5 className="mb-1">{member.name}</h5>
                <p className="text-muted">{member.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      </div>
      <Footer></Footer>
    </>
  );
}
