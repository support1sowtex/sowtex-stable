"use client"
import { useState } from 'react';
import Layout from "../components/Menu";
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumb';
import HomeCarousel from "../components/Carousel";
import Head from "next/head";
import Image from 'next/image';
import Footer from '../components/Footer';
// import HomePageSlideshow from '../components/HomePageSlideshow';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    Mobile: '',
    cname: '',
    Country: 'Select',
    city: '',
    msg: '',
    captcha: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    number: '',
    cname: '',
    Country_drop: '',
    city: '',
    msg: '',
    captch2: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      number: '',
      cname: '',
      Country_drop: '',
      city: '',
      msg: '',
      captch2: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Mobile validation
    if (!formData.Mobile.trim()) {
      newErrors.number = 'Mobile number is required';
      isValid = false;
    } else if (!/^[0-9]{10,15}$/.test(formData.Mobile)) {
      newErrors.number = 'Please enter a valid mobile number (10-15 digits)';
      isValid = false;
    }

    // Company name validation
    if (!formData.cname.trim()) {
      newErrors.cname = 'Company name is required';
      isValid = false;
    }

    // Country validation
    if (formData.Country === 'Select') {
      newErrors.Country_drop = 'Please select a country';
      isValid = false;
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    // Message validation
    if (!formData.msg.trim()) {
      newErrors.msg = 'Message is required';
      isValid = false;
    } else if (formData.msg.length < 10) {
      newErrors.msg = 'Message must be at least 10 characters';
      isValid = false;
    }

    // Captcha validation
    if (!formData.captcha.trim()) {
      newErrors.captch2 = 'Captcha is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form is valid, submitting:', formData);
      // Add form submission logic here (e.g., API call)
      // Example:
      // axios.post('/api/contact', formData)
      //   .then(response => {
      //     console.log('Form submitted successfully', response);
      //   })
      //   .catch(error => {
      //     console.error('Error submitting form', error);
      //   });
    } else {
      console.log('Form validation failed');
    }
  };

  const reloadCaptcha = () => {
    // Add captcha reload logic
    console.log('Reload captcha');
    // In a real implementation, you would fetch a new captcha image
  };

  return (
    <>
      <Layout />
      <div className="cat_fixed">
        <Breadcrumbs title="Contact US"></Breadcrumbs>
        <section id="contact">
          <div className="container">
            <div className="container my-5">
              <div className="row row-eq-height">
                <div className="col-sm-6">
                  {/* Contact info boxes remain the same */}
                  <div className="row p-2 mb-3" style={{ border: '1px solid #dfd6d6' }}>
                    <div className="col-3">
                      <div className="text-center">
                        <img 
                          src="https://sowtex.com/assets/images/sowtex/placeholder.png" 
                          alt="General contact" 
                          className="img-fluid"
                        />
                        <p className="text-center fw-bolder">General</p>
                      </div>
                    </div>
                    <div className="col-9 d-flex align-center">
                      <div>
                        <strong>Corporate Office:</strong><br />
                        <p>571 Udyog Vihar Phase V, Gurugram Haryana 122016, India</p>
                        <p><strong>Phone:</strong><br /></p>
                        <div className="row">
                          <div className="col-md-5 p-0 ps-2">+91 7042349948 (India)</div>
                          <div className="col-md-7 p-0 ps-2">+880 1726595200 (Bangladesh)</div>
                        </div>
                        <p><strong>Email:</strong> info@sowtex.com</p>
                        <p><strong>India | Bangladesh | UAE</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="row p-2 mb-3" style={{ border: '1px solid #dfd6d6' }}>
                    <div className="col-3">
                      <div className="text-center">
                        <img 
                          src="https://sowtex.com/assets/images/sowtex/telephone-call.png" 
                          alt="Sales contact" 
                          className="img-fluid"
                        />
                        <p className="text-center fw-bolder">Sales</p>
                      </div>
                    </div>
                    <div className="col-9 mt-3 d-flex flex-column justify-content-center mb-5">
                      <p><strong>Phone:</strong> +91 9873272191</p>
                      <p><strong>Email:</strong> category2@sowtex.com</p>
                    </div>
                  </div>

                  <div className="row p-2 mb-3" style={{ border: '1px solid #dfd6d6' }}>
                    <div className="col-3">
                      <div className="text-center">
                        <img 
                          src="https://sowtex.com/assets/images/sowtex/user.png" 
                          alt="Support contact" 
                          className="img-fluid"
                        />
                        <p className="text-center fw-bolder">Support</p>
                      </div>
                    </div>
                    <div className="col-9 mt-3 d-flex flex-column justify-content-center mb-5">
                      <p><strong>Phone:</strong> +91 9643201856 (India)</p>
                      <p><strong>Email:</strong> mayank.a@sowtex.com</p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <h1>Contact Us</h1>
                  <p className="mb-3">Please fill in your details and query.</p>

                  <form onSubmit={handleSubmit}>
                    <input type="hidden" name="csrf_test_name" value="6480240b6bb1436e473507b2ddc09a77" />
                    
                    <div className="mb-2">
                      <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        name="name"
                        id="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    
                    <div className="mb-2">
                      <input
                        type="email"
                        autoComplete="off"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        id="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    
                    <div className="mb-2">
                      <input
                        type="text"
                        className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                        name="Mobile"
                        id="number"
                        placeholder="Enter Mobile Number"
                        value={formData.Mobile}
                        onChange={handleChange}
                      />
                      {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                    </div>
                    
                    <div className="mb-2">
                      <input
                        type="text"
                        className={`form-control ${errors.cname ? 'is-invalid' : ''}`}
                        name="cname"
                        id="cname"
                        placeholder="Enter Company Name"
                        value={formData.cname}
                        onChange={handleChange}
                      />
                      {errors.cname && <div className="invalid-feedback">{errors.cname}</div>}
                    </div>
                    
                    <div className="row row-eq-height">
                      <div className="col-sm-6">
                        <div className="mb-2">
                          <select
                            name="Country"
                            id="Country_drop"
                            className={`form-select ${errors.Country_drop ? 'is-invalid' : ''}`}
                            required
                            value={formData.Country}
                            onChange={handleChange}
                          >
                            <option value="Select">Select Country</option>
                            <option value="101">India</option>
                            <option value="2">Albania</option>
                            {/* Add all other country options here */}
                            <option value="246">Zimbabwe</option>
                          </select>
                          {errors.Country_drop && <div className="invalid-feedback">{errors.Country_drop}</div>}
                        </div>
                      </div>
                      
                      <div className="col-sm-6">
                        <div className="mb-2">
                          <input
                            type="text"
                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                            name="city"
                            id="city"
                            placeholder="Enter City"
                            value={formData.city}
                            onChange={handleChange}
                          />
                          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <textarea
                        placeholder="Comment"
                        className={`form-control ${errors.msg ? 'is-invalid' : ''}`}
                        name="msg"
                        id="msg"
                        style={{ height: '150px' }}
                        value={formData.msg}
                        onChange={handleChange}
                      ></textarea>
                      {errors.msg && <div className="invalid-feedback">{errors.msg}</div>}
                    </div>
                    
                    <div className="col-sm-12 mb-2">
                      <div className="font-input">
                        <div className="mb-2">
                          <input
                            type="text"
                            id="captch2"
                            name="captcha"
                            className={`form-control ${errors.captch2 ? 'is-invalid' : ''}`}
                            maxLength={50}
                            autoComplete="off"
                            placeholder="Enter Captcha"
                            required
                            style={{ width: '100%' }}
                            value={formData.captcha}
                            onChange={handleChange}
                          />
                          {errors.captch2 && <div className="invalid-feedback">{errors.captch2}</div>}
                          <div className="mt-2" id="loading1"></div>
                        </div>
                        
                        <div className="form-field">
                          <img 
                            src="https://sowtex.com/assets/images/captcha/202a1a.jpeg" 
                            id="capt" 
                            className="me-3" 
                            style={{ opacity: 1, filter: 'grayscale(1%)' }} 
                            alt="Captcha" 
                          />
                          <button type="button" onClick={reloadCaptcha} className="btn">
                            <i className="fa-solid fa-rotate"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <button type="submit" className="btn-login btn-login-primary" id="submit_btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegistrationForm;