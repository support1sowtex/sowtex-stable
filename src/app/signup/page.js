// // components/SignupForm.js
"use client";
// // components/SignupForm.js
import Layout from "../components/Menu";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumb";
import axios from "axios";
import Image from 'next/image';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Link as MuiLink,
} from "@mui/material";

const SignupForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [countryInput, setCountryInput] = useState("+91");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(
    "https://sowtex.com/assets/img/flags/in.png"
  );
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
  });

  // console.log(formData.fName)

  const handleCountry = async (e) => {
    const selectedCountry = e.target.value;
  
    setFormData((prev) => ({ ...prev, country: selectedCountry, state: "", city: "" }));
    setStates([]); // Reset states and cities on country change
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
  
    setFormData((prev) => ({ ...prev, state: selectedState, city: "" }));
    setCities([]); // Reset cities on state change
  
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
  const handlePhoneCode= async(e)=>{
     const selectedCity = e.target.value;
    setFormData((prev) => ({ ...prev, code: selectedCity }));
    console.log(selectedCity);

  }
  
  const handleCity  = (e) => {
    const selectedCity = e.target.value;
    setFormData((prev) => ({ ...prev, city: selectedCity }));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(formData);return false
  const [errors, setErrors] = useState({});
  const getCountries = async () => {
    try {
      const configurationObject = {
        method: "get",
        url: `https://sowtex.com/get-all-countries`,
      };
      const response = await axios(configurationObject);
      setCountries(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch("https://sowtex.com/get-all-countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading countries:", err));
  }, []);
  const baseUrl = "http://localhost/sowtex3.0/";

  const phoneCode = [
    { value: "91", label: "+91" },
    { value: "880", label: "+880" },
    { value: "93", label: "+93" },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    // Validate each field individually
    if (!formData.fName || formData.fName.trim() === "") {
      newErrors.fName = "First Name is required";
    }
  
    if (!formData.lName || formData.lName.trim() === "") {
      newErrors.lName = "Last Name is required";
    }
  
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
  
    if (!formData.code || formData.code.trim() === "") {
      newErrors.code = "Code is required";
    }
  
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone No is required";
    }
     if (!formData.CName || formData.CName.trim() === "") {
      newErrors.CName = "Company Name is required";
    }
  
    if (!formData.natOfBus || formData.natOfBus.trim() === "" || formData.natOfBus === "Select") {
      newErrors.natOfBus = "Nature of Business is required";
    }
  
    if (!formData.degination || formData.degination.trim() === "" || formData.degination === "Select") {
      newErrors.degination = "Designation is required";
    }
  
    if (!formData.country || formData.country.trim() === "" || formData.country === "Select") {
      newErrors.country = "Country is required";
    }
  
    if (!formData.state || formData.state.trim() === "" || formData.state === "Select") {
      newErrors.state = "State is required";
    }
  
    if (!formData.password || formData.password.trim() === "") {
      newErrors.password = "Password is required";
    }
  
    if (!formData.password_confirm || formData.password_confirm.trim() === "") {
      newErrors.password_confirm = "Confirm Password is required";
    }
  
    // If any error exists, set them all at once
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
  
      // Focus on the first invalid field
      const firstInvalidField = Object.keys(newErrors)[0];
      const fieldElement = document.querySelector(`[name="${firstInvalidField}"]`);
      if (fieldElement) fieldElement.focus();
  
      return;
    }
  
    // No errors – proceed with submit
    setErrors({});
  
    try {
      const response = await axios.post("/api/add-new-team", formData);
      console.log("Submitted successfully:", response.data);
      alert("Registration Successful!");
      // setFormData({}); // Optionally reset form
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      alert("Registration Failed: " + error.response?.data?.message);
    }
  };
  
  return (
    <>
      <Layout></Layout>
      <Breadcrumbs />
      <section id="register">
        <div className="container">
          <div className="register container">
            <div className="row g-2">
              <div className="col-sm-4">
                <Image
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
                  <div
                    className="alert alert-danger d-none"
                    role="alert"
                    id="email_exist_div"
                  >
                    Email Already Registered
                  </div>
                  <form >
                    <div className="row">
                      <div className="col-sm-6 mb-2">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fName"
                          placeholder="Enter First Name"
                          onChange={handleInputChange}
                        />
                        {errors.fName && (
                          <div
                            className="invalid-feedback d-block"
                            id="fname_error"
                          >
                            {errors.fName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lName"
                          placeholder="Enter Last Name"
                          onChange={handleInputChange}
                        />
                        {errors.lName && (
                          <div
                            className="invalid-feedback d-block"
                            id="lname_error"
                          >
                            {errors.lName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Email ID</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Enter Email Address"
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error"
                          >
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Phone Number</label>
                        <div className="input-group">
                          
                            <select
                            name="phonecode"
                            id="phonecode"
                            className="form-select"
                            defaultValue="Select"
                            onChange={handlePhoneCode}  >
                            <option value="Select" disabled>
                              Select
                            </option>
                            {countries.map((option) => (
                              <option key={option.id} value={option.id}>
                               +{option.phonecode}
                              </option>
                            ))}
                          </select>
                           <input
                            type="number"
                            className="ms-2 form-control"
                            name="phoneNumber"
                            placeholder="Enter Mobile Number"
                            onChange={handleInputChange}
                          />

                            {errors.code && (
                              <div
                                className="invalid-feedback d-block"
                                id="code_error"
                              >
                                {errors.code}
                              </div>
                            )}
                          
                         
                          {errors.phoneNumber && (
                            <div
                              className="invalid-feedback d-block"
                              id="phoneNumber_error"
                            >
                              {errors.phoneNumber}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12">
                         <label>Company Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="CName"
                          placeholder="Enter Company Name"
                          onChange={handleInputChange}
                        />
                        {errors.CName && (
                          <div
                            className="invalid-feedback d-block"
                            id="CName_error"
                          >
                            {errors.CName}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group mb-1">
                          <label htmlFor="natOfBus">
                            Select Nature of Business
                          </label>
                          <select
                            name="natOfBus"
                            className="form-select"
                            id="natOfBus" onChange={handleInputChange}
                          >
                            <option value="Select" >
                              Select
                            </option>
                            <option value="79">Brand </option>
                            <option value="81">Buyer </option>
                            <option value="2">Buying Agent </option>
                            <option value="80">Buying House </option>
                            <option value="4">Exporter </option>
                            <option value="3">Importer </option>
                            <option value="47">Job worker </option>
                            <option value="1">Manufacturer </option>
                            <option value="5">Merchant Trader </option>
                            <option value="7">Others </option>
                            <option value="6">Processor </option>
                            <option value="48">Retailer </option>
                            <option value="82">Service Provider </option>
                            <option value="46">Trader </option>
                          </select>
                          {errors.natOfBus && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error"
                          >
                            {errors.natOfBus}
                          </div>
                        )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group mb-1">
                          <label htmlFor="degination">Select Designation</label>
                          <select
                            name="degination"
                            className="form-select"
                            id="designation"
                            onChange={handleInputChange}
                          >
                            <option value="">Select</option>
                            <option value="74">AGM Marketing </option>
                            <option value="77">Chairman </option>
                            <option value="8">Chief Executive Officer </option>
                            <option value="9">Chief Financial Officer </option>
                            <option value="78">Deputy Manager </option>
                            <option value="20">Designer </option>
                            <option value="62">Director </option>
                            <option value="61">Division manager </option>
                            <option value="73">General Manager </option>
                            <option value="18">Manager </option>
                            <option value="16">Managing Director </option>
                            <option value="22">Merchandiser </option>
                            <option value="10">Officer </option>
                            <option value="26">operational Head </option>
                            <option value="15">Owner </option>
                            <option value="17">Partner </option>
                            <option value="76">President </option>
                            <option value="60">Proprietor </option>
                            <option value="19">Sales Executive </option>
                            <option value="24">Sales Manager </option>
                            <option value="21">Sourcing Manager </option>
                            <option value="23">Sr Merchandiser </option>
                            <option value="75">VICE PRESIDENT </option>
                          </select>
                          {errors.degination && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.degination}
                          </div>
                        )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group mb-1">
                          <label htmlFor="selCountires">select Countries</label>
                          <select
                            name="country"
                            id="country"
                            className="form-select"
                            defaultValue="Select"
                            onChange={handleCountry}
                          >
                            <option value="Select" disabled>
                              Select
                            </option>
                            {countries.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                          {errors.country && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.country}
                          </div>
                        )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group mb-1">
                          <label htmlFor="selStates">select States</label>
                          <select
                            name="state"
                            id="selectState"
                            className="form-select"
                            defaultValue="Select"
                            onChange={handleStates}
                            
                          >
                            <option value="Select">
                              Select
                            </option>
                            {states.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                          {errors.state && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.state}
                          </div>
                        )}
                        </div>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Select City</label>
                        <select
                          className="form-select"
                          name="city"
                          onChange={handleCity}
                        >
                          <option value="">Select</option>
                          {cities.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        {errors.city && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.city}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>ZipCode</label>
                        <input
                          type="number"
                          className="form-control"
                          name="zipcode"
                          placeholder="Enter ZipCode"
                          onChange={handleInputChange}
                        />
                         {errors.zipcode && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.zipcode}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Enter Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter Password"
                          onChange={handleInputChange}
                        />
                         {errors.password && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6 mb-2">
                        <label>Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password_confirm"
                          placeholder="Confirm Password"
                          onChange={handleInputChange}
                        />
                         {errors.password_confirm && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
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
                            value="Free"
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label">
                            Trial Membership
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="memType"
                            value="Paid"
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label">
                            Paid Membership
                          </label>
                        </div>
                        {errors.memType && (
                          <div
                            className="invalid-feedback d-block"
                            id="email_error">
                            {errors.memType}
                          </div>
                        )}
                      </div>
                      <div className="col-sm-12 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="agree"
                            defaultChecked
                            required
                            onChange={handleInputChange}
                          />
                          <p
                            className="modal-footer px-0 pt-0 justify-content-start"
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                              color: "#000000ba",
                            }}
                          >
                            By logging in, I agree to SOWTEX
                            <a
                              href="https://sowtex.com/terms-conditions"
                              className="mx-1"
                            >
                              terms of use
                            </a>{" "}
                            and
                            <a
                              href="https://sowtex.com/privacy-policy"
                              className="mx-1"
                            >
                              privacy policy
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <button
                        onClick={handleSubmit}
                          type="submit"
                          className="btn btn-primary px-4 py-2"
                        >
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
      `}</style>
    </>
  );
};
// const SignupForm = () => {
//   return <div>Signup Form</div>;
// };
export default SignupForm;