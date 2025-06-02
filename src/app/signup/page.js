"use client";
import Layout from "../components/Menu";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
// import Breadcrumbs from "../../components/Breadcrumb";
import axios from "axios";

export default function SignupForm() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    fName: "",
    CName: "",
    lName: "",
    email: "",
    code: "",
    phoneNumber: "",
    companyName: "",
    natOfBus: "",
    degination: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    password: "",
    password_confirm: "",
    membership: "",
    memType: "",
    agree: false
  });

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://sowtex.com/get-all-countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleCountry = async (e) => {
    const selectedCountry = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      country: selectedCountry, 
      state: "", 
      city: "" 
    }));
    setStates([]);
    setCities([]);

    if (!selectedCountry) return;

    try {
      const response = await axios.get("https://sowtex.com/get-state-by-countryid-app", {
        params: { id: selectedCountry },
      });
      setStates(response.data || []);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  const handleStates = async (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      state: selectedState, 
      city: "" 
    }));
    setCities([]);

    if (!selectedState) return;

    try {
      const response = await axios.get("https://sowtex.com/get-city-app", {
        params: { id: selectedState },
      });
      setCities(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const handlePhoneCode = (e) => {
    const selectedCode = e.target.value;
    setFormData(prev => ({ ...prev, code: selectedCode }));
  };

  const handleCity = (e) => {
    const selectedCity = e.target.value;
    setFormData(prev => ({ ...prev, city: selectedCity }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'fName', 'lName', 'email', 'code', 'phoneNumber', 
      'CName', 'natOfBus', 'degination', 'country', 
      'state', 'password', 'password_confirm', 'memType'
    ];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password confirmation
    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Passwords do not match";
    }

    // Terms agreement
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/signup", formData);
      console.log("Submitted successfully:", response.data);
      alert("Registration Successful!");
      // Optionally reset form here
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      alert("Registration Failed: " + (error.response?.data?.message || "Please try again"));
    }
  };

  return (
    <>
      <Layout />
      {/* <Breadcrumbs /> */}
      <section id="register">
        <div className="container">
          <div className="register container">
            <div className="row g-2">
              <div className="col-sm-4">
                <img
                  src="https://sowtex.com/assets/images/sowtex/registration_chnage_new.png"
                  alt="Register"
                  style={{ minHeight: "619px" }}
                  className="img-fluid w-100"
                />
              </div>
              <div className="col-sm-8">
                <div className="register-form">
                  <p style={{ fontSize: "20px", color: "#FCB040" }}>
                    Create your account and boost your business
                  </p>
                  <hr />
                  <div className="alert alert-danger d-none" role="alert" id="email_exist_div">
                    Email Already Registered
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6 mb-2">
                        <label>First Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.fName ? 'is-invalid' : ''}`}
                          name="fName"
                          placeholder="Enter First Name"
                          value={formData.fName}
                          onChange={handleInputChange}
                        />
                        {errors.fName && (
                          <div className="invalid-feedback d-block">
                            {errors.fName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.lName ? 'is-invalid' : ''}`}
                          name="lName"
                          placeholder="Enter Last Name"
                          value={formData.lName}
                          onChange={handleInputChange}
                        />
                        {errors.lName && (
                          <div className="invalid-feedback d-block">
                            {errors.lName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Email ID</label>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          name="email"
                          placeholder="Enter Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <div className="invalid-feedback d-block">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Phone Number</label>
                        <div className="input-group">
                          <select
                            name="code"
                            className={`form-select ${errors.code ? 'is-invalid' : ''}`}
                            value={formData.code}
                            onChange={handlePhoneCode}
                          >
                            <option value="">Select Code</option>
                            {countries.map(country => (
                              <option key={country.id} value={country.phonecode}>
                                +{country.phonecode}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            className={`form-control ms-2 ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            name="phoneNumber"
                            placeholder="Enter Mobile Number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                        {errors.code && (
                          <div className="invalid-feedback d-block">
                            {errors.code}
                          </div>
                        )}
                        {errors.phoneNumber && (
                          <div className="invalid-feedback d-block">
                            {errors.phoneNumber}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 mb-2">
                        <label>Company Name</label>
                        <input
                          type="text"
                          className={`form-control ${errors.CName ? 'is-invalid' : ''}`}
                          name="CName"
                          placeholder="Enter Company Name"
                          value={formData.CName}
                          onChange={handleInputChange}
                        />
                        {errors.CName && (
                          <div className="invalid-feedback d-block">
                            {errors.CName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <label>Nature of Business</label>
                          <select
                            name="natOfBus"
                            className={`form-select ${errors.natOfBus ? 'is-invalid' : ''}`}
                            value={formData.natOfBus}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="79">Brand</option>
                            <option value="81">Buyer</option>
                            <option value="2">Buying Agent</option>
                            <option value="80">Buying House</option>
                            <option value="4">Exporter</option>
                            <option value="3">Importer</option>
                            <option value="47">Job worker</option>
                            <option value="1">Manufacturer</option>
                            <option value="5">Merchant Trader</option>
                            <option value="7">Others</option>
                            <option value="6">Processor</option>
                            <option value="48">Retailer</option>
                            <option value="82">Service Provider</option>
                            <option value="46">Trader</option>
                          </select>
                          {errors.natOfBus && (
                            <div className="invalid-feedback d-block">
                              {errors.natOfBus}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <label>Designation</label>
                          <select
                            name="degination"
                            className={`form-select ${errors.degination ? 'is-invalid' : ''}`}
                            value={formData.degination}
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="74">AGM Marketing</option>
                            <option value="77">Chairman</option>
                            <option value="8">Chief Executive Officer</option>
                            <option value="9">Chief Financial Officer</option>
                            <option value="78">Deputy Manager</option>
                            <option value="20">Designer</option>
                            <option value="62">Director</option>
                            <option value="61">Division manager</option>
                            <option value="73">General Manager</option>
                            <option value="18">Manager</option>
                            <option value="16">Managing Director</option>
                            <option value="22">Merchandiser</option>
                            <option value="10">Officer</option>
                            <option value="26">operational Head</option>
                            <option value="15">Owner</option>
                            <option value="17">Partner</option>
                            <option value="76">President</option>
                            <option value="60">Proprietor</option>
                            <option value="19">Sales Executive</option>
                            <option value="24">Sales Manager</option>
                            <option value="21">Sourcing Manager</option>
                            <option value="23">Sr Merchandiser</option>
                            <option value="75">VICE PRESIDENT</option>
                          </select>
                          {errors.degination && (
                            <div className="invalid-feedback d-block">
                              {errors.degination}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <label>Country</label>
                          <select
                            name="country"
                            className={`form-select ${errors.country ? 'is-invalid' : ''}`}
                            value={formData.country}
                            onChange={handleCountry}
                          >
                            <option value="">Select</option>
                            {countries.map(country => (
                              <option key={country.id} value={country.id}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                            <div className="invalid-feedback d-block">
                              {errors.country}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <label>State</label>
                          <select
                            name="state"
                            className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                            value={formData.state}
                            onChange={handleStates}
                          >
                            <option value="">Select</option>
                            {states.map(state => (
                              <option key={state.id} value={state.id}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                            <div className="invalid-feedback d-block">
                              {errors.state}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="form-group">
                          <label>City</label>
                          <select
                            name="city"
                            className={`form-select ${errors.city ? 'is-invalid' : ''}`}
                            value={formData.city}
                            onChange={handleCity}
                          >
                            <option value="">Select</option>
                            {cities.map(city => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                          {errors.city && (
                            <div className="invalid-feedback d-block">
                              {errors.city}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>ZipCode</label>
                        <input
                          type="number"
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          name="zipCode"
                          placeholder="Enter ZipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                        {errors.zipCode && (
                          <div className="invalid-feedback d-block">
                            {errors.zipCode}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          name="password"
                          placeholder="Enter Password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback d-block">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className={`form-control ${errors.password_confirm ? 'is-invalid' : ''}`}
                          name="password_confirm"
                          placeholder="Confirm Password"
                          value={formData.password_confirm}
                          onChange={handleInputChange}
                        />
                        {errors.password_confirm && (
                          <div className="invalid-feedback d-block">
                            {errors.password_confirm}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 mb-2">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="memType"
                            id="freeMembership"
                            value="Free"
                            checked={formData.memType === "Free"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="freeMembership">
                            Trial Membership
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="memType"
                            id="paidMembership"
                            value="Paid"
                            checked={formData.memType === "Paid"}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="paidMembership">
                            Paid Membership
                          </label>
                        </div>
                        {errors.memType && (
                          <div className="invalid-feedback d-block">
                            {errors.memType}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 mb-2">
                        <div className="form-check">
                          <input
                            className={`form-check-input ${errors.agree ? 'is-invalid' : ''}`}
                            type="checkbox"
                            name="agree"
                            id="agreeTerms"
                            checked={formData.agree}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="agreeTerms">
                            By logging in, I agree to SOWTEX{' '}
                            <a href="https://sowtex.com/terms-conditions" className="mx-1">
                              terms of use
                            </a>{' '}
                            and{' '}
                            <a href="https://sowtex.com/privacy-policy" className="mx-1">
                              privacy policy
                            </a>
                          </label>
                        </div>
                        {errors.agree && (
                          <div className="invalid-feedback d-block">
                            {errors.agree}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary px-4 py-2">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        label.error {
          background: none;
          padding-left: 0px;
          margin-left: 0px;
          font-size: 10px;
          margin-bottom: 10px;
        }
        #register {
          margin-top: 65px !important;
        }
        .register-form .form-check {
          padding-left: 20px;
        }
        .form-check-inline-flex {
          display: flex;
          flex-wrap: wrap;
        }
        .is-invalid {
          border-color: #dc3545;
        }
        .invalid-feedback {
          color: #dc3545;
          font-size: 0.875em;
        }
      `}</style>
    </>
  );
}