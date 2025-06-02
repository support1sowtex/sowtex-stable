"use client";
import { useState } from "react";
import Footer  from "../components/Footer";
import Menu from '../components/Menu';
export default function ContactSection() {
    const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile: "",
    designation: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("designation", formData.designation);
    data.append("message", formData.message);
    if (formData.file) {
      data.append("file", formData.file);
    }
  
    try {
      const res = await fetch("/api/work-with-us", {
        method: "POST",
        body: data, // no need for headers here
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Something went wrong!");
      }
  
      const responseData = await res.json();
      alert("Form submitted successfully!");
      console.log("Server response:", responseData);
      // Optionally reset form
      setFormData({
        full_name: "",
        email: "",
        mobile: "",
        designation: "",
        message: "",
        file: null,
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message || "Something went wrong!");
    }
  };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Form submission logic goes here
//     console.log("Form Data Submitted:", formData);
//     alert("Thank you! We'll get back to you soon.");
//   };

  return (
    <>
    <Menu></Menu>
     <section id="contact" className="work-with-us-section">
      <div className="container">
        <div className="contact">
          <div className="row row-eq-height">
            <div className="col-sm-6">
              <div className="sub-heading">Why Work with Us?</div>
              <p>
                As we work towards becoming the market leader in e-com business
                segment, we’re always on the lookout for talented and passionate
                professionals to join our ever-expanding team.
              </p>
              <p className="mb-5">
                At SOWTEX, we believe that a good team creates a great service,
                and this thought is the driving force behind our work culture.
                Employees come first, respect is mandatory, passion and
                innovation are key, and the result is that you can’t help but
                love your job! A career at SOWTEX offers you growth, success and
                recognition. We value Creativity, Commitment, Confidence and
                Loyalty and look for these qualities when recruiting.
              </p>
              <div className="sub-heading">Who are we looking for?</div>
              <p>
                We’re looking for people with passion, a distinct point-of-view
                and drive to take on the challenge of creating a successful
                brand and business. If you believe you have the ability to look
                at the bigger picture and yet find joy in the finest of details,
                plan things thoroughly and yet flex rapidly to execute them to
                perfection, we’d be happy to have you on the Board.
              </p>
            </div>

            <div className="col-sm-6 mb-4">
              <div className="sub-heading">
                Just Drop By Your Resume And Details. You Will Be Hearing From
                Us Soon.
              </div>
              <form className="mt-3" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Email ID</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label>Designation for Apply</label>
                  <input
                    type="text"
                    className="form-control"
                    id="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="Enter Designation"
                  />
                </div>
                <div className="mb-2">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ height: "150px" }}
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label>Upload Your Resume</label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary" id="submit_btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
   
  );
}