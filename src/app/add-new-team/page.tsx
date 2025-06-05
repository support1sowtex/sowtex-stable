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
  const [optionSelected, setSelected] = useState<Option[] | null>();
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
  interface FormDataType {
    FName: string;
    LName: string;
    email: string;
    code: string;
    mobile: string;
    password: string;
    designation: string;
   
    role: string;
    category: number[]; // or string if you reverted to string
    country: string;
    state: string;
    address: string;
    comment: string;
  }
  interface FormErrors {
  FName: string;
  LName: string;
  email: string;
  code: string;
  mobile: string;
  password: string;
  designation: string;
  role: string;
  category: number[];
  country: string;
  state: string;
  address: string;
  comment: string;
}

  const [formData, setFormData] = useState<FormDataType>({
    FName: "",
    LName: "",
    email: "",
    code: "",
    mobile: "",
    password: "",
    designation: "",
    role: "",
    category:[],
    country: "",
    state: "",
    address: "",
    comment: "",
  });

const [errors, setErrors] = useState<FormErrors>({
  FName: "",
  LName: "",
  email: "",
  code: "",
  mobile: "",
  password: "",
  designation: "",
  role: "",
  category: [],
  country: "",
  state: "",
  address: "",
  comment: "",
});

 type Option = {
  value: number;
  label: string;
};

const options: Option[] = [
  { value: 0, label: "Red" },
  { value: 1, label: "Green" },
  { value: 2, label: "Blue" },
  { value: 3, label: "Orange" },
  { value: 4, label: "Yellow" },
  { value: 5, label: "Pink" },
];

const handleChangeCategory = (selected: Option[]) => {
  setSelected(selected);

  const selectedValues: number[] = selected.map((opt) => opt.value);

  setFormData((prev) => ({
    ...prev,
    category: selectedValues,
  }));

  if (selectedValues.length > 0) {
    setErrors((prev) => ({
      ...prev,
      category: [],
    }));
  }

  console.log("Selected options:", selected);
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (name === "FName" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, FName: "" }));
    }
    if (name === "LName" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, LName: "" }));
    }
    if (name === "email" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    if (name === "code" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, code: "" }));
    }
    if (name === "mobile" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
    if (name === "password" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    if (name === "designation" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, designation: "" }));
    }
    // if (name === "category" && value.trim() !== "") {
    //   setErrors((prev) => ({ ...prev, category: "" }));
    // }
    if (name === "role" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, role: "" }));
    }
    if (name === "country" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, country: "" }));
    }
    if (name === "state" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, state: "" }));
    }
    if (name === "address" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
    if (name === "comment" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, comment: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
       FName: "",
  LName: "",
  email: "",
  code: "",
  mobile: "",
  password: "",
  designation: "",
  role: "",
  category: [],
  country: "",
  state: "",
  address: "",
  comment: "",
    };

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
    // if (
    //   !formData.category ||
    //   (Array.isArray(formData.category) && formData.category.length === 0)
    // ) {
    //   newErrors.category = "Select Category";
    // }
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

    // If any error exists, set them all at once
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Focus on the first invalid field
      const firstInvalidField = Object.keys(newErrors)[0];
      const fieldElement = document.querySelector(
        `[name="${firstInvalidField}"]`
      );
     

      return;
    }

    // No errors – proceed with submit
    setErrors(null);
    console.log(formData);
    // Submit form data
  };
  useEffect(() => {
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
              <form onSubmit={handleSubmit} >
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                          className="form-select"
                          style={{ maxWidth: "120px" }}
                          value={formData.code}
                          onChange={handleChange}
                        >
                          <option selected value="">
                            Select
                          </option>
                          {countries.map((option) => (
                            <option key={option.id} value={option.id}>
                              +{option.id}
                            </option>
                          ))}
                          {/* Other country codes... */}
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
                          onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChangeCategory}
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
                      onChange={handleChange}
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
                      <option value="">Select Country</option>
                      {countries.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                      {/* Other countries... */}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    ></textarea>
                    <div id="comment_error"></div>
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
