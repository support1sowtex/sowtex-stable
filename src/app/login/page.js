"use client";
console.log("login page");
import { useState } from "react";
import Cookies from "js-cookie";
console.log("login page");
import Menu from "../components/Menu";
// import Footer from "../../components/Footer";
// import Breadcrumb from "@/components/Breadcrumb";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const style = ``;
  const handleLogin = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: `Hello, ${data.username.fName
          }!`,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        // router.push('/dashboard');
        // alert("Login Successful");
        // Optionally redirect or reload
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError("Something went wrong");
    }
  };

  return (
    <>
      <Menu></Menu>
      <div className="cat_fixed">
        {/* <Breadcrumb title="Login"></Breadcrumb> */}
        <section id="category" className="pt-5">
          <div className="container">
            <div
              className="modal-dialog modal-dialog-centered login-modal"
              role="document"
              id="login-model-enquiry"
            >
              <div className="modal-content">
                <div className="login-modal-body">
                  <div className="modal-row">
                    <h3 className="model-title">Log In</h3>
                  </div>

                  {loginError && (
                    <span
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        fontSize: "12px",
                      }}
                    >
                      {loginError}
                    </span>
                  )}

                  <div className="modal-row">
                    <input
                      type="text"
                      placeholder="Registered Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                    />
                  </div>
                  {emailError && (
                    <span
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        fontSize: "12px",
                      }}
                    >
                      {emailError}
                    </span>
                  )}

                  <div className="modal-row mb-0 position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />
                    <span
                      id="toggleButton"
                      className="fa fa-fw fa-eye field-icon toggle-password position-absolute"
                      style={{ cursor: "pointer", right: "10px" }}
                      onClick={() => setShowPassword(!showPassword)}
                    ></span>
                  </div>
                  {passwordError && (
                    <span
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        fontSize: "12px",
                      }}
                    >
                      {passwordError}
                    </span>
                  )}

                  <div className="modal-row px-2">
                    <a
                      href="https://sowtex.com/forgot-password"
                      className="forgot"
                      style={{ fontSize: "12px" }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="modal-row px-3">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <a
                    href="https://sowtex.com/signup"
                    style={{ marginTop: "10px" }}
                  >
                    <button className="btn btn-primary" type="button">
                      New User Sign up
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <Footer></Footer> */}
      {/* Scoped Styles */}
      <style jsx>{`
        .login-modal-body {
          padding: 15px;
        }

        .model-title {
          font-size: 22px;
          font-weight: 700;
          color: #ff7a00;
          font-family: "Playfair Display", serif;
          margin-bottom: 0px;
        }

        .modal-row {
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-row-unset {
          display: block;
        }

        .modal-row label {
          margin-bottom: 10px;
        }

        .modal-row input[type="text"],
        .modal-row input[type="password"] {
          width: 100%;
          border: #c6c6c6 1px solid;
          height: 40px;
          padding: 10px;
          color: #000;
          font-size: 16px;
          background: #fff;
          border-radius: 4px;
          outline: none;
        }

        .modal-row a {
          text-decoration: none;
          color: #000;
          font-size: 14px;
        }

        .modal-row a:hover {
          color: #ff7a00;
        }

        .modal-row .btn {
          font-size: 16px;
          line-height: 24px;
          padding: 10px 28px 10px 28px;
          background-color: #060054;
          color: #fff;
          cursor: pointer;
          text-align: center;
          display: inline-block;
          font-family: "Poppins", sans-serif;
          border: none;
          font-weight: 700;
          text-align: center;
          position: relative;
          transition: all 0.4s ease-in-out;
          border-radius: 5px;
          overflow: hidden;
          z-index: 1;
        }

        .modal-row .btn::before {
          content: "";
          width: 21px;
          height: calc(100% - 14px);
          position: absolute;
          top: 50%;
          left: -14px;
          transform: translate(0%, -50%);
          transition: all 0.4s ease-in-out;
          border-radius: 6px;
          z-index: -1;
          background-color: #ff7a00;
        }

        .modal-row .btn::after {
          content: "";
          width: 21px;
          height: calc(100% - 14px);
          left: unset;
          position: absolute;
          background-color: #ff7a00;
          top: 50%;
          right: -14px;
          transform: translate(0%, -50%);
          transition: all 0.4s ease-in-out;
          border-radius: 6px;
          z-index: -1;
        }

        .modal-row .btn:hover::before {
          width: 50%;
          height: 5px;
          top: 0;
          left: 0;
        }

        .modal-row .btn:hover::after {
          width: 50%;
          height: 5px;
          top: 100%;
          right: 0;
        }

        @media (min-width: 1200px) {
          .modal-row a {
            font-size: 16px;
          }
        }
        .video-image {
          position: relative;
          padding-bottom: 53.25%;
          margin-bottom: 20px;
          padding-top: 25px;
          height: 0;
        }

        .video-image img {
          z-index: 1;
          position: absolute;
          cursor: pointer;
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
        }

        .video-image iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .modal-content {
          width: 90%;
          max-width: 500px;
          margin: 0 auto;
          border-radius: 10px;
          box-shadow: 0 4px 44px rgba(0, 0, 0, 0.15);
        }

        .toggle-password {
          position: absolute;
          right: 6%;
          cursor: pointer;
          top: 47%;
        }
      `}</style>
    </>
  );
}