import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import "@fortawesome/fontawesome-free/css/all.min.css";


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import menuItems from "./MenuArray";
import Image from 'next/image';
export default function AdminMenu() {
  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("220px");

  const [isOpen, setIsOpen] = useState(true);
  const [newIcon, setNewIcon] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const openNav = () => {
    setSidebarWidth("220px");
    const mainEl = document.getElementById("main");
    if (mainEl) {
      mainEl.style.marginLeft = "220px";
    }
    setIsOpen(true);
  };

  const closeNav = () => {
    setSidebarWidth("0");

    const mainEl = document.getElementById("main");
    if (mainEl) {
      mainEl.style.marginLeft = "0px";
    }
    setIsOpen(false);
  };

  return (
    <>
      <link
        href="https://sowtex.com/assets/admin/css/style.css"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        integrity="sha512-..."
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      <header>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="h-top">
          <div className="container-fluid">
            <div className="row pb-2">
              <div className="col-md-2">
                <a href="https://sowtex.com/">
                  <Image
                    src="https://sowtex.com/assets/admin/images/logo-sowtex.png"
                    alt=""
                    className="img-fluid logo"
                    style={{ height: "58px" }}
                  />
                </a>
                <div className="d-inline-block d-md-none">
                  {!isOpen && (
                    <i
                      className="fa fa-bars fa-2x openbtn"
                      onClick={openNav}
                      aria-hidden="true"
                      style={{ marginLeft: "230px" }}
                    ></i>
                  )}

                  {isOpen && (
                    <i
                      className="fa fa-times fa-2x closebtn"
                      onClick={closeNav}
                      aria-hidden="true"
                      style={{ marginLeft: "230px" }}
                    ></i>
                  )}
                </div>
              </div>

              <div className="col-md-7 col-sm-5 d-flex align-items-center">
                <div className="d-none d-md-inline-block">
                  {!isOpen && (
                    <i
                      className="fa fa-bars fa-2x openbtn"
                      onClick={openNav}
                      aria-hidden="true"
                      style={{ marginLeft: "220px" }}
                    ></i>
                  )}
                  {isOpen && (
                    <i
                      className="fa fa-bars fa-2x closebtn"
                      onClick={closeNav}
                      aria-hidden="true"
                    ></i>
                  )}
                </div>
                {/* <button
                  className="btn btn-warning d-md-none rounded-pill d-sm-block d-none"
                  id="hea-search"
                >
                  <i className="fas fa-search" aria-hidden="true"></i> Search
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="sidebar" style={{ width: sidebarWidth }} id="mySidebar">
        <a href="https://sowtex.com/">
          <Image
            src="https://sowtex.com/assets/admin/images/logo.png"
            alt="Logo"
            style={{ height: 50, width: "auto" }}
          />
        </a>
        <nav className="animated bounceInDown">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.title}
                className="sub-menu"
                style={{ width: "100%" }}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(item.title);
                  }}
                >
                  <div>{item.title}</div>
                  <FaPlus className="right" />
                </a>
                <ul
                  style={{
                    display: openSections[item.title] ? "block" : "none",
                  }}
                >
                  {item.subItems.map((sub) => (
                    <li key={sub.label}>
                      <a
                        href={sub.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
