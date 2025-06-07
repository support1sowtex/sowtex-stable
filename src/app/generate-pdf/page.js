'use client';
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import SeoRoutesPdf from '../components/StockPdfDocument';
import routesData from '../seoRoutes.json';

const SeoRoutes = () => {
  // ... existing state and logic ...

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">SEO Routes Analysis</h1>
        <PDFDownloadLink 
          document={<SeoRoutesPdf data={routesData} />} 
          fileName="seo-routes-report.pdf"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
      
      {/* ... rest of your existing component ... */}
    </div>
  );
};

export default SeoRoutes;