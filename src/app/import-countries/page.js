'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Adminmenu from "../components/AdminMenu";

export default function ManageProducts() {
  const [products, setProducts] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [type, setType] = useState("country");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/import-countries?type=${type}`);
      const data = await res.json();
  
      if (res.ok && data.status === "ok") {
        console.log(data);
        setProducts(`${data.count} ${type}s imported successfully.`);
      } else {
        setProducts("No data imported.");
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setProducts("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Adminmenu />
      <div id="main" style={{ marginLeft: "220px" }}>
      <section className="card top">
         <div className="card-body">
            <div className="row d-flex align-items-center">
               <div className="col-sm">
                  <div className="page-title">Import Country, State, City</div>
               </div>
               <div className="col-sm align-self-end text-end">
                  <div className="d-none d-sm-block"><a href=""><i className="fa fa-angle-double-left" aria-hidden="true"></i> Back</a> </div>
                  <div className="breadcrumb-box">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                           <li className="breadcrumb-item"><a href="#"><i className="fa fa-home" aria-hidden="true"></i></a></li>
                           <li className="breadcrumb-item"><a href="#">Import</a></li>
                           <li className="breadcrumb-item active" aria-current="page">Data</li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      </section>
        <section className="content">
        <section className="content card">
        <div className="card-body">
        <div className="row">

        <div className="col-sm-4 col-md-4">
        <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="country">Country</option>
              <option value="state">State</option>
              <option value="city">City</option>
            </select>
        </div>
        <div className="col-sm-4 col-md-4">
        <button onClick={fetchData} disabled={loading} style={{ marginLeft: "10px" }}>
              {loading ? "Importing..." : "Import"}
            </button>
        </div>
           

           

           

            <div style={{ marginTop: "20px" }}>
              {products && <p>{products}</p>}
            </div>
          </div>
        </div>
        </section>
         
        </section>
      </div>
    </>
  );
}
