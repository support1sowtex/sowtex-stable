"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import axios from "axios";
const MultiSelect = dynamic(() => import("../components/MultiSelect"), {
  ssr: false,
});
// import { useRouter } from 'next/navigation';
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
const AdminMenu = dynamic(() => import("../components/AdminMenu"), {
  ssr: false,
});

export default function Sidebar() {
  const router = useRouter();
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loadingStates, setLoadingStates] = useState(false);
  const [states, setStates] = useState([]);
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
  //   const options = [
  //   { value: 0, label: "Red" },
  //   { value: 1, label: "Green" },
  //   { value: 2, label: "Blue" },
  //   { value: 3, label: "Orange" },
  //   { value: 4, label: "Yellow" },
  //   { value: 5, label: "Pink" },
  // ];
    const [options, setoptions] = useState([
      
    ]);
  const [categories, setCategories] = useState([
      { value: "0", label: "All Category" },
    ]);
    const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories([{ value: "0", label: "All Category" }, ...data]);
      setoptions([ ...data]);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    FName: "",
    LName: "",
    email: "",
    colors: [],
    code: "",
    mobile: "",
    password: "",
    designation: "",
    role: "",
    category: [],
    address: "",
    comment: "",
  });
  const handleCountry = async (e) => {
    const selectedCountry = e.target.value;

    setFormData((prev) => ({
      ...prev,
      country: selectedCountry,
      state: "",
      city: "",
    }));
    setStates([]); // Reset states and cities on country change
    // setCities([]);

    if (!selectedCountry) return;

    try {
      const response = await axios.get(
        "https://sowtex.com/get-state-by-countryid-app",
        {
          params: { id: selectedCountry },
        }
      );

      setStates(response.data || []);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  type Option = {
    value: string;
    label: string;
  };



  const [optionSelected, setSelected] = useState<Option[] | null>();
  const handleChange1 = (selected: Option[]) => {
    setSelected(selected); // This updates the dropdown UI
    const selectedValues = selected.map((opt) => opt.value); // Extract only the values

    // Store selected values into formData.category
    setFormData((prev) => ({
      ...prev,
      category: selectedValues, // Save as string[]
    }));

    // Clear validation error if at least one category is selected
    if (selectedValues.length > 0) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }

    // console.log("Selected categories:", selectedValues);
  };
  const [colorOptions, setColorOptions] = useState([]);
  const loadColorOptions = async () => {
    const mockColors = ["Red", "Blue", "Green", "Black", "White"];
    setColorOptions(mockColors);
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      colors: colorOptions,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    setErrors(newErrors);
    // Validate each field individually
    if (!formData.FName || formData.FName.trim() === "") {
      newErrors.FName = "First Name is required";
    }
    if (!formData.LName || formData.LName.trim() === "") {
      newErrors.LName = "Last Name is required";
    }
    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.code || formData.code.trim() === "") {
      newErrors.code = "Select Country Code";
    }
    if (!formData.mobile || formData.mobile.trim() === "") {
      newErrors.mobile = "Mobile No Required";
    }
    if (!formData.password || formData.password.trim() === "") {
      newErrors.password = "Mobile No Required";
    }
    if (!formData.designation || formData.designation.trim() === "") {
      newErrors.designation = "Select Designation";
    }
    if (!formData.role || formData.role.trim() === "") {
      newErrors.role = "Select Role";
    }
    // console.log(optionSelected);
    if (optionSelected?.length === 0) {
      // console.log("not selected");
      newErrors.category = "Select Category";
    }
    if (!formData.country || formData.country.trim() === "") {
      newErrors.country = "Select Country";
    }

    if (!formData.state || formData.state.trim() === "") {
      newErrors.state = "Select State";
    }
    if (!formData.address || formData.address.trim() === "") {
      newErrors.address = "Address Required";
    }
    if (!formData.comment || formData.comment.trim() === "") {
      newErrors.comment = "Comment Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit  = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    console.log(formData);
     try {
          const response = await axios.post("/api/add-new-team", formData);
          console.log("Submitted successfully:", response.data);
          alert("Registration Successful!");
          // setFormData({}); // Optionally reset form
        } catch (error) {
          console.error("Signup failed:", error.response?.data);
          alert("Registration Failed: " + error.response?.data?.message);
        }
    // Submit form data
  };
  useEffect(() => {
    loadCategories();
    getCountries();
  }, []);
  const handleChangeCountry = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" && { state: "" }), // Reset state when country changes
    }));

    // Fetch states when country changes
    if (name === "country" && value) {
      try {
        setLoadingStates(true);
        const response = await fetch(`registration/get-state-by-country`);
        const data = await response.json();
        setStates(data);
        setErrors((prev) => ({ ...prev, state: "" })); // Clear state error
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    }

    // Clear other errors...
  };
  return (
    <>
      <div className="onload-div">
        <img
          src="https://sowtex.com/assets/admin/images/waiting-image.gif"
          alt=""
        />
      </div>
      <AdminMenu></AdminMenu>
      <div id="main" style={{ marginLeft: "220px" }}>
        <div className="container-fluid">
          <Head>
            <title>Add New Team</title>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
          </Head>

          <section className="card top">
            <div className="card-body" style={{ padding: "0.3rem 2rem" }}>
              <div className="row d-flex align-items-center">
                <div className="col">
                  <div className="page-title">Add New Team</div>
                </div>
                <div className="col align-self-end text-end">
                  <a href="">
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>{" "}
                    Back
                  </a>{" "}
                  <br />
                  <div className="breadcrumb-box">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="#">
                            <i className="fa fa-home" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="https://sowtex.com/control-panel/team">
                            User Management
                          </a>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Add New Team
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="content card">
            <div className="page-body d-container card-body admin-product-body">
              <form onSubmit={handleSubmit}>
                <div className="row" id="upgrade_row">
                  <div className="col-sm-6 mb-3">
                    <label>First Name*</label>
                    <input
                      type="text"
                      id="FName"
                      name="FName"
                      className={`form-control ${
                        errors.FName ? "is-invalid" : ""
                      }`}
                      value={formData.FName}
                      onChange={handleInputChange}
                    />
                    {errors.FName && (
                      <div
                        className="invalid-feedback d-block"
                        id="fname_error"
                      >
                        {errors.FName}
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      id="LName"
                      name="LName"
                      className={`form-control ${
                        errors.LName ? "is-invalid" : ""
                      }`}
                      value={formData.LName}
                      onChange={handleInputChange}
                    />
                    {errors.LName && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.LName}
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Email*</label>
                    <input
                      name="email"
                      placeholder="Email"
                      type="email"
                      id="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <div className="row">
                      <div className="col-3 reg-mob-code">
                        <label>Code*</label>
                        <select
                          name="code"
                          id="code"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          style={{ maxWidth: "120px" }}
                          value={formData.code}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>{" "}
                          {/* Remove 'selected' */}
                          {countries.map((option) => (
                            <option key={option.id} value={option.id}>
                              +{option.id}
                            </option>
                          ))}
                        </select>
                        {errors.code && (
                          <div
                            className="invalid-feedback d-block"
                            id="lname_errors"
                          >
                            {errors.code}
                          </div>
                        )}
                      </div>
                      <div className="col-9 reg-mob-code">
                        <label>Mobile*</label>
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          className={`form-control ${
                            errors.mobile ? "is-invalid" : ""
                          }`}
                          value={formData.mobile}
                          onChange={handleInputChange}
                        />
                        {errors.mobile && (
                          <div
                            className="invalid-feedback d-block"
                            id="lname_errors"
                          >
                            {errors.mobile}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Password*</label>
                    <input
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      id="password"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="last name">
                      <span>*</span> Designation
                    </label>
                    <select
                      className={`form-select ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Designation</option>
                      <option value="74">AGM Marketing </option>
                      <option value="77">Chairman </option>
                      {/* Other designations... */}
                    </select>
                    {errors.designation && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.designation}
                      </div>
                    )}
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label htmlFor="Category">
                      <span>*</span> Category
                    </label>
                    <MultiSelect
                      key="example_id"
                      options={options}
                      onChange={handleChange1}
                      value={optionSelected}
                      isSelectAll={true}
                      menuPlacement={"bottom"}
                    />
                    {errors.category && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.category}
                      </div>
                    )}
                  </div>

                  <div className="col-sm-4 mb-3">
                    <label
                      id="role-view"
                      htmlFor="role"
                      className="d-flex justify-content-between"
                    >
                      <p>*role</p>{" "}
                      <span>
                        <i
                          id=""
                          className="fa fa-eye fa-xl"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </label>
                    <select
                      className="form-select"
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role</option>
                      <option value="3">Sales Manager</option>
                      <option value="4">Sales Executive&nbsp;</option>
                      {/* Other roles... */}
                    </select>
                    <div id="role_error" className="error">
                      {errors.role}
                    </div>
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label htmlFor="country">
                      <span>*</span> Country
                    </label>
                    <select
                      className="form-select"
                      name="country"
                      id="country"
                      value={formData.country}
                      onChange={handleCountry}
                    >
                      <option value="">Select Country</option>{" "}
                      {/* Remove 'selected' */}
                      {countries.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <div id="country_error" className="error">
                      {errors.country}
                    </div>
                  </div>

                  <div className="col-sm-3 mb-3">
                    <label htmlFor="state">
                      <span>*</span> State
                    </label>
                    <select
                      className="form-select"
                      name="state"
                      id="state_drop"
                      disabled={!formData.country}
                      value={formData.state}
                      onChange={handleInputChange}
                    >
                      <option value="">Select State</option>
                      {states.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <div id="state_error" className="error">
                      {errors.state}
                    </div>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label>Address*</label>
                    <textarea
                      name="address"
                      id="address"
                      className="form-control"
                      style={{ height: "50px !important", resize: "none" }}
                      value={formData.address}
                      onChange={handleInputChange}
                    ></textarea>
                    <div id="address_error" className="error">
                      {errors.address}
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Comment</label>
                    <textarea
                      name="comment"
                      placeholder=""
                      id="comment"
                      className="form-control"
                      style={{ height: "80px !important", resize: "none" }}
                      value={formData.comment}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.comment && (
                      <div
                        className="invalid-feedback d-block"
                        id="comment_error"
                      >
                        {errors.comment}
                      </div>
                    )}
                  </div>

                  <div className="col-sm-12" style={{ textAlign: "right" }}>
                    <button type="submit" className="btn btn-blue-btn">
                      SUBMIT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      <style jsx>{`
        .div_class {
          width: 75px;
        }

        .div_class:hover {
          background: #ccc;
        }

        .dropdown-menu {
          height: 300px;
          width: 100%;
          overflow-y: scroll;
        }
        .div_class {
          background: #0d6efd;
          color: #fff;
          height: 30px;
          padding-left: 15px;
          padding-right: 15px;
          line-height: 30px;
          width: auto;
          display: inline-block;
          position: relative;
        }
        .waiting .onload-div {
          position: fixed;
          top: 0;
          left: 0;
          background-color: #fff;
          z-index: 999999;
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .waiting .onload-circle {
          margin: 70px auto;
          width: 15vw;
          height: 15vw;
          border: 10px solid rgb(189 189 189 / 27%);
          border-radius: 50%;
          border-top-color: #fcb040;
          animation: spin 1s linear infinite;
          position: fixed;
          max-width: 200px;
          max-height: 200px;
        }
      `}</style>
    </>
  );
}
