// pages/index.js
"use client";

// import Layout from "@/app/components/Menu";
import Layout from './components/Menu';

import "./globals.css";
// import main from "./styles/main.module.css";
//  import styles from "./styles/style.module.css";
// import Carousel from "@/app/components/Carousel";

import Image from 'next/image';
// import Footer from '../components/Footer';
// import Breadcrumbs from '@/app/components/Breadcrumb';



// import HomePageSlideshow from '../components/HomePageSlideshow';
function HomePage() {
  return (
    <>
      <Layout />
    hi
    </>
  );
}
const footerStyles = {
  footerContainer: {
    padding: '0px 7px',
    color: '#333',
    textAlign: 'left',
  },
  footerHeading: {
    fontSize: '1.2em',
    marginBottom: '15px',
  },
  footerLogo: {
    width: 'auto',
    height: '3em',
    verticalAlign: 'middle',
  },
  footerAbout: {
    // add properties if needed
  },
  footerDescription: {
    fontSize: '1rem',
    color: '#666',
    textAlign: 'justify',
  },
  footerLinksContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
    lineHeight: 1.6,
    textAlign: 'left',
  },
  footerLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  appStoreIcon: {
    width: '100%',
    maxWidth: '150px',
    borderRadius: '10px',
  },
  appDownload: {
    marginTop: '10px',
    textAlign: 'left',
  },
  // Responsive styles would typically be handled with media queries via CSS or styled-components
};

export default HomePage;
