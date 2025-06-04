'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Head from 'next/head';
import "@fortawesome/fontawesome-free/css/all.min.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Adminmenu from "../components/AdminMenu";
import Link from 'next/link';
export default function DashboardPage() {
  const router = useRouter();
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const checkTokenAndFetchData = async () => {
      setLoading(true);
      const token = Cookies.get('token');
      
      if (!token) {
        console.log('No token found');
        // router.push('/login');
        return;
      }

      try {
        // Validate token
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          console.log('Token expired');
          Cookies.remove('token');
          router.push('/login');
          return;
        }
        
        console.log('Token is valid');
        setIsValidToken(true);

        // Fetch dashboard data
        const response = await fetch('/api/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        console.error('Error:', err.message);
        setError(err.message);
        Cookies.remove('token');
        // router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkTokenAndFetchData();
  }, [router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isValidToken) {
    return null;
  }
   const statsData = [
    { title: 'New Enquiries', value: '48', color: 'bg-c-blue' },
    { title: 'Open Enquiry', value: '44', color: 'bg-c-yellow' },
    { title: 'Unattended Enq', value: '43', color: 'bg-c-green' },
    { title: 'Enquiry Value', value: '45378699', color: 'bg-c-green' },
    { title: 'Award Values', value: '234900', color: 'bg-c-pink' }
  ];

  // Data for the sidebar stats
  const sidebarStats = [
    { title: 'Awarded', value: '1', color: 'bg-c-blue' },
    { title: 'Stocks', value: '80', color: 'bg-c-pink', height: '96px' },
    { title: 'Products', value: '206', color: 'bg-c-green' },
    { title: 'No of Users', value: '64', color: 'bg-c-yellow', height: '96px' }
  ];

  // Recent enquiries data
  const recentEnquiries = [
    {
      enqNo: 'S01E006589',
      date: '23-05-2025',
      company: 'Boutique International Private Limited',
      location: 'Noida, Uttar Pradesh, India',
      category: 'Woven Fabric',
      subCategory: 'Yarn Dyed Fabrics',
      minQuantity: '30000 Meter',
      owner: 'hemant thakur',
      type: 'To All',
      responses: '5',
      status: 'Open',
      link: 'https://sowtex.com/control-panel/view-enquiry/19287'
    },
    // Add more enquiry data objects as needed
  ];

  return (
    <>
    <Head>
   
      </Head>
       <link
          rel="stylesheet"
          href="https://sowtex.com/assets/admin/css/style.css"
          integrity="sha512-..."
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      <div className="onload-div">
        <img
          src="https://sowtex.com/assets/admin/images/waiting-image.gif"
          alt=""
        />
      </div>
      <Adminmenu></Adminmenu>
      <div id="main" style={{ marginLeft: "220px" }}>
        
          
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : dashboardData ? (
            <div className="container-fluid">
            <section className="counts">
              <div className="row text-center">
                {statsData.map((stat, index) => (
                  <div key={index} className="Box-width col-md-6">
                    <div className={`${stat.color} text-white mb-2`}>
                      <div className="DaysBadge">15 Days</div>
                      <div className="card-body">
                        <div className="dash-record">
                          <h5 className="card-title">{stat.title}</h5>
                          <p className="card-text">{stat.value}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="row mt-3">
              <div className="col-sm-3 col-md-2 order-first order-md-last">
                <section className="counts">
                  <div className="row text-center px-lg-1 px-2">
                    {sidebarStats.map((stat, index) => (
                      <div key={index} className="col-sm-12 col-6">
                        <div 
                          className={`${stat.color} text-white mb-2`} 
                          style={{ height: stat.height || 'auto' }}
                        >
                          <div className="card-body">
                            <div className={stat.height ? 'dash-record' : 'p-2 dash-record'}>
                              <h5 className="card-title">{stat.title}</h5>
                              <p className="card-text">{stat.value}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="col-sm-9 col-md-10 order-last order-md-first">
                <section className="content mt-3">
                  <div className="card">
                    <div className="card-header">Recent Enquiries</div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table id="example" className="table table-bordered nowrap">
                          <thead>
                            <tr>
                              <th scope="col">Enq No.</th>
                              <th scope="col">Date</th>
                              <th scope="col">Company Name</th>
                              <th scope="col">Location</th>
                              <th scope="col">Category</th>
                              <th scope="col">Sub Category</th>
                              <th scope="col">Min Quantity</th>
                              <th scope="col">Enquiry Owner</th>
                              <th scope="col">Enquiry Type</th>
                              <th scope="col">Responses</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentEnquiries.map((enquiry, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <Link href={enquiry.link} target="_blank">
                                    {enquiry.enqNo}
                                  </Link>
                                </th>
                                <td>{enquiry.date}</td>
                                <td>{enquiry.company}</td>
                                <td>{enquiry.location}</td>
                                <td>{enquiry.category}</td>
                                <td>{enquiry.subCategory}</td>
                                <td>{enquiry.minQuantity}</td>
                                <td>{enquiry.owner}</td>
                                <td>{enquiry.type}</td>
                                <td>{enquiry.responses}</td>
                                <td>{enquiry.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-3">
                        <Link 
                          href="https://sowtex.com/control-panel/manage" 
                          className="btn btn-outline-dark"
                        >
                          View All
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          ) : (
            <p>No data available</p>
          )}
      
      </div>
      <style jsx>{`
  .Box-width {
    width: 20%;
    height: auto;
  }
    #main .row{
    padding-right: 10px;
    padding-left: 10px;}
`}</style>
    </>
  );
}