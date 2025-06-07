"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Offcanvas,
  Modal,
  Button,
  Form,
  Card,
} from "react-bootstrap";

const LoginModal = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Login successful
      alert("Login successful!");
      handleClose();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const AppNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  return (
    <>
      <Navbar expand="lg" className="bg-light">
        <Container>
          <Navbar.Brand as={Link} href="/" className="d-flex align-items-center">
            <Image
              src="https://sowtex.com/assets/front/img/logo.png"
              alt="Logo"
              width={140}
              height={40}
              priority
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} href="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} href="/about-us">
                  About
                </Nav.Link>
                <NavDropdown title="Services" id="services-dropdown">
                  <NavDropdown.Item as={Link} href="/services/design">
                    Design
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/services/dev">
                    Development
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href="/services/seo">
                    SEO
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} href="/contact">
                    Contact
                  </NavDropdown.Item>
                </NavDropdown>
                <Button
                  variant="outline-primary"
                  className="ms-3"
                  onClick={handleLoginShow}
                >
                  Login
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Use LoginModal here */}
      <LoginModal show={showLogin} handleClose={handleLoginClose} />
    </>
  );
};

const ImageCarousel = () => {
  const images = [
    "/assets/images/home/slide.png",
    "/assets/images/home/slide2.png",
    "/assets/images/home/slider3.jpg",
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      style={{ width: "100%", height: "400px" }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div style={{ position: "relative", width: "100%", height: "400px" }}>
            <img
              src={src}
             
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const DummyComments = () => {
  const comments = [
    { name: "John Doe", text: "This is an amazing platform. Loved the experience!" },
    { name: "Jane Smith", text: "Great service and smooth interface." },
    { name: "Mike Johnson", text: "Very helpful for my business needs. Recommended!" },
  ];

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center">User Comments</h3>
      <div className="row">
        {comments.map((comment, idx) => (
          <div key={idx} className="col-md-4 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{comment.name}</Card.Title>
                <Card.Text>{comment.text}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

const Footer = () => (
  <footer className="bg-dark text-light mt-5 py-4">
    <Container>
      <div className="row">
        <div className="col-md-4 mb-3">
          <h5>Company</h5>
          <ul className="list-unstyled">
            <li>
              <Link href="/about" className="text-light text-decoration-none">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-light text-decoration-none">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-light text-decoration-none">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5>Services</h5>
          <ul className="list-unstyled">
            <li>
              <Link href="/services/design" className="text-light text-decoration-none">
                Design
              </Link>
            </li>
            <li>
              <Link href="/services/dev" className="text-light text-decoration-none">
                Development
              </Link>
            </li>
            <li>
              <Link href="/services/seo" className="text-light text-decoration-none">
                SEO
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h5>Support</h5>
          <ul className="list-unstyled">
            <li>
              <Link href="/faq" className="text-light text-decoration-none">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-light text-decoration-none">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-light text-decoration-none">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-3">
        <small>© {new Date().getFullYear()} MyApp. All rights reserved.</small>
      </div>
    </Container>
  </footer>
);

export default function HomePage() {
  return (
    <>
      <AppNavbar />
      <ImageCarousel />
      <DummyComments />
      <Footer />
    </>
  );
}
