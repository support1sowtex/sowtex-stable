"use client"

import { useState } from 'react';
import Layout from "../components/Menu";
import axios from 'axios';
import Breadcrumbs from '../components/Breadcrumb';
import Head from "next/head";
import Image from 'next/image';
import Footer from '../components/Footer';

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

  const [errors, setErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.Mobile.trim()) newErrors.Mobile = 'Mobile number is required';
    else if (!/^[0-9]{10,15}$/.test(formData.Mobile)) newErrors.Mobile = 'Invalid mobile number';

    if (!formData.cname.trim()) newErrors.cname = 'Company name is required';
    if (formData.Country === 'Select') newErrors.Country = 'Select a country';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.msg.trim()) newErrors.msg = 'Message is required';
    else if (formData.msg.length < 10) newErrors.msg = 'Message too short';
    if (!formData.captcha.trim()) newErrors.captcha = 'Captcha is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submitting:', formData);
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <>
      <Layout />
      <div className="cat_fixed">
        <Breadcrumbs title="Contact US" />
        <section className="lead-login-section">
          <div className="container">
            <div className="row justify-content-center px-md-5 px-1">
              <div className="col-lg-10">
                <div className="row g-0 border-0 rounded-4 shadow-lg">

                  <div className="col-md-6 p-0 form-img order-2 order-lg-1">
                    <img
                      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                      src="http://localhost/sowtex3.0/assets/front/img/login_thumb3.png"
                      alt="Login Image"
                    />
                  </div>

                  <div
                    style={{ backgroundColor: '#f6f2f0' }}
                    className="col-md-6 form-cont pt-2 p-4 d-flex flex-column justify-content-between order-1 order-lg-2"
                  >
                    <div>
                      <h2 className="fw-bold text-dark mb-3">Log in</h2>
                      <label className="form-label mb-0" style={{ fontSize: 14 }}>Your Registered Email</label>
                      <input type="email" className="form-control py-2 rounded mb-1" placeholder="Enter Your Email" />
                      <span style={{ color: 'red', fontStyle: 'italic', fontSize: 12 }}>{errors.email}</span>

                      <label className="form-label mb-0" style={{ fontSize: 14 }}>Password</label>
                      <input type="password" className="form-control py-2 rounded mb-1" placeholder="Enter your password" />
                      <span style={{ color: 'red', fontStyle: 'italic', fontSize: 12 }}>{errors.password}</span>

                      <div className="d-flex justify-content-end mb-1">
                        <button
                          type="button"
                          className="btn btn-link p-0 small fw-semibold text-decoration-none"
                          style={{ color: '#08062c' }}
                          onClick={() => setShowForgotModal(true)}
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <button className="w-100 mb-1 login_button" onClick={handleSubmit}>Log in</button>
                      <button className="btn btn-outline-dark w-100 mb-2">New here? Sign up →</button>
                    </div>

                    <p style={{ fontSize: 12 }} className="text-center text-muted px-2">
                      By logging in, I agree to SOWTEX{' '}
                      <a
                        href="http://localhost/sowtex3.0/terms-conditions"
                        className="text-decoration-none fw-semibold"
                        style={{ color: '#08062c' }}
                      >
                        terms &amp; conditions
                      </a>{' '}
                      and{' '}
                      <a
                        href="http://localhost/sowtex3.0/privacy-policy"
                        className="text-decoration-none fw-semibold"
                        style={{ color: '#08062c' }}
                      >
                        privacy policy
                      </a>.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {showForgotModal && (
            <div className="modal d-block bg-dark bg-opacity-50">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">
                  <div className="modal-header py-1">
                    <h3 className="modal-title">Forgot Password</h3>
                    <button type="button" className="btn-close" onClick={() => setShowForgotModal(false)}></button>
                  </div>

                  <div className="modal-body">
                    <form>
                      <label className="mb-2">Enter your registered Mobile Number</label>
                      <input type="text" className="form-control py-2" placeholder="Enter Your Registered Mobile no" />
                      <small className="form-text text-muted">We'll send you an OTP on your Whatsapp.</small>
                    </form>
                    <div className="text-danger small mt-1">{/* Error placeholder */}</div>
                  </div>

                  <div className="modal-footer py-1">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForgotModal(false)}>Cancel</button>
                    <button type="button" className="btn btn-primary">Send Otp</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default RegistrationForm;
