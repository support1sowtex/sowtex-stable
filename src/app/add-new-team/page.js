"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dynamic from "next/dynamic";
import Image from "next/image";
// import { useRouter } from 'next/navigation';
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
const AdminMenu = dynamic(() => import("../components/AdminMenu"), {
  ssr: false,
});

export default function Sidebar() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    FName: "",
    LName: "",
    email: "",
    code: "",
    mobile: "",
    password: "",
    designation: "",
    soft_skill_list: [],
    role: "",
    country: "",
    state: "",
    address: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    FName: "",
    LName: "",
    email: "",
    code: "",
    mobile: "",
    password: "",
    designation: "",
    role: "",
    country: "",
    state: "",
    address: "",
  });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  // Clear error when user starts typing
  if (name === 'FName' && value.trim() !== '') {
    setErrors(prev => ({ ...prev, FName: '' }));
  }
  if (name === 'LName' && value.trim() !== '') {
    setErrors(prev => ({ ...prev, LName: '' }));
  }
  if (name === 'email' && value.trim() !== '') {
    setErrors(prev => ({ ...prev, email: '' }));
  }
};

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setFormData((prev) => ({
      ...prev,
      soft_skill_list: selectedOptions,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = {};

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
  console.log(formData);
  // Submit form data
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
    className={`form-control ${errors.FName ? 'is-invalid' : ''}`}
    value={formData.FName}
    onChange={handleChange}
  />
  {errors.FName && (
    <div className="invalid-feedback d-block" id="fname_error">
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
                      className="form-control"
                      value={formData.LName}
                      onChange={handleChange}
                    />
                    {errors.lName && (
                      <div
                        className="invalid-feedback d-block"
                        id="lname_errors"
                      >
                        {errors.lName}
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
                      className="form-control"
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
                    <label>Mobile*</label>
                    <div className="row">
                      <div className="col-3 reg-mob-code">
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
                          <option value="91">+91</option>
                          <option value="93"> +93 </option>
                          {/* Other country codes... */}
                        </select>
                        <div id="code_error" className="error">
                          {errors.code}
                        </div>
                      </div>
                      <div className="col-9 reg-mob-code">
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          className="form-control"
                          value={formData.mobile}
                          onChange={handleChange}
                        />
                        <div id="mobile_error" className="error">
                          {errors.mobile}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label>Password*</label>
                    <input
                      minLength="8"
                      name="password"
                      placeholder="Enter Password"
                      type="password"
                      id="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div id="password_error" className="error">
                      {errors.password}
                    </div>
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="last name">
                      <span>*</span> Designation
                    </label>
                    <select
                      className="form-select"
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
                    <div id="designation_error" className="error">
                      {errors.designation}
                    </div>
                  </div>

                  <div className="col-sm-2 mb-3">
                    <label htmlFor="Category">
                      <span>*</span> Category
                    </label>
                    <br />
                    <select
                      name="soft_skill_list"
                      className="form-select"
                      id="soft_skill_list"
                      multiple
                      value={formData.soft_skill_list}
                      onChange={handleMultiSelectChange}
                      style={{ height: "auto" }}
                    >
                      <option value="5">Embroidery-Fabrics</option>
                      <option value="22">Guipure-Fabric</option>
                      <option value="21">Lace-Fabrics</option>
                      <option value="1">Laces</option>
                      <option value="4">Neck-Patches</option>
                    </select>
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
                      onChange={handleChange}
                    >
                      <option value="">Select Country</option>
                      <option value="101">India</option>
                      <option value="2">Albania</option>
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
