import Link from "next/link";
import { useState } from "react";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// console.log(baseUrl)
import Script from 'next/script';
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <link rel="icon" href="/assets/img/favicon.ico" />
      <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" href="/assets/img/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" href="/assets/img/favicon.ico" />
      <title>SOWTEX-Sourcing Textiles Globally </title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        referrerPolicy="no-referrer"
      />
      <link href="/assets/front/css/slick.css" rel="stylesheet" />
      <link href="/assets/front/css/slick-theme.css" rel="stylesheet" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@glidejs/glide@3.4.1/dist/css/glide.core.min.css"
      />
      <link href="/assets/front/css/bootstrap.css" rel="stylesheet" />
      <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
          strategy="lazyOnload"
      ></Script>

     
    </>
  );
};

export default Menu;