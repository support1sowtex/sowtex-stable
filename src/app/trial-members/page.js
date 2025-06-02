
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminMenu from "../components/AdminMenu";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    total: 0
  });
  const router = useRouter();

  const fetchProducts = async (page = 1, limit = pagination.limit) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/trial-members?page=${page}&limit=${limit}`);
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      
      if (data.status !== "ok") {
        throw new Error(data.message || "Invalid response format");
      }

      setProducts(data.users || []);
      setPagination({
        currentPage: page,
        totalPages: data.pagination?.totalPages || 1,
        limit: limit,
        total: data.pagination?.total || data.users?.length || 0
      });

    } catch (err) {
      console.error("Fetch error:", err);
      alert(`Error loading data: ${err.message}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    // Update state and fetch with new limit
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      currentPage: 1
    }));
    fetchProducts(1, newLimit);
  };

  const handleView = (productId) => {
    router.push(`/products/${productId}`);
  };

  const copyUser = (userId) => {
    // Implement copy functionality
    console.log("Copy user", userId);
  };

  const openPinModal = (userId, action) => {
    // Implement modal opening
    console.log(`${action} user`, userId);
  };

  const softdelete = (userId) => {
    // Implement soft delete
    console.log("Soft delete user", userId);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <AdminMenu></AdminMenu>

      <div id="main" style={{ marginLeft: "220px" }}>
        <div className="container">
          <section className="card top">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-sm">
                  <div className="page-title">Trial Members</div>
                </div>
                <div className="col-sm align-self-end text-end">
                  <div className="d-none d-sm-block">
                    <a href="">
                      <i className="fa fa-angle-double-left" aria-hidden="true"></i> Back
                    </a>
                  </div>
                  <div className="breadcrumb-box">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <a href="#">
                            <i className="fa fa-home" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Member Management</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                          Trial Members
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="content card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <select 
                    className="form-select" 
                    value={pagination.limit}
                    onChange={handleLimitChange}
                    style={{width: '80px'}}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div>
                  <span className="me-2">
                    Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{' '}
                    {Math.min(pagination.currentPage * pagination.limit, pagination.total)} of{' '}
                    {pagination.total} entries
                  </span>
                </div>
              </div>

              <table className="table table-striped table-bordered nowrap">
                <thead>
                  <tr>
                    <th scope="col" width="100">Sno.</th>
                    <th scope="col" width="100">Cust. Id</th>
                    <th scope="col" width="100">Date</th>
                    <th scope="col" width="100">Name</th>
                    <th scope="col" width="200">Company Name</th>
                    <th scope="col" width="200">Email</th>
                    <th scope="col" width="200">Sell Category</th>
                    <th scope="col" width="100">Stage</th>
                    <th scope="col" width="100">Rating</th>
                    <th scope="col" width="200">Designation</th>
                    <th scope="col" width="200">Location</th>
                    <th scope="col" width="200">Membership Plans</th>
                    <th scope="col" width="100" className="action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((user, index) => (
                    <tr key={user.orgId || index}>
                      <th>{index + 1}</th>
                      <th scope="row">
                        <a href="javascript:void(0)" onClick={() => openPinModal(user.orgId, "edit")}>
                          {user.customerId || `IN00${user.orgId}`}
                        </a>
                      </th>
                      <td>{new Date().toLocaleDateString("en-GB")}</td>
                      <td>{`${user.fName} ${user.lName}`}</td>
                      <td>{user.companyName || user.orgName}</td>
                      <td>{user.email}</td>
                      <td>Woven Fabric</td>
                      <td>Trial Registration</td>
                      <td>0</td>
                      <td>{user.degination || "N/A"}</td>
                      <td>{`${user.city || ""}, ${user.state || ""}, ${user.country || ""}`}</td>
                      <td>Trial</td>
                      <td className="action">
                        <div className="d-flex">
                          <button onClick={() => copyUser(user.orgId)}>
                            <i className="fa-regular fa-copy" aria-hidden="true"></i>
                          </button>
                          <a className="D-edit ng-star-inserted text-dark" style={{ margin: "0 3px" }} 
                            href="#" onClick={() => openPinModal(user.orgId, "edit")}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </a>
                          <a className="D-active ng-star-inserted text-info" style={{ margin: "0 3px" }} 
                            href="#" onClick={() => openPinModal(user.orgId, "view")}>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </a>
                          <div className="d-flex" style={{ margin: "0 3px" }}>
                            <a href="#!" id={`fa_phone1_${user.orgId}`} onClick={() => softdelete(user.orgId)} className="text-danger">
                              <i id={`fa_phone_${user.orgId}`} className="fa fa-times" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                  <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>
                      First
                    </button>
                  </li>
                  <li className={`page-item ${pagination.currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage - 1)}>
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }

                    return (
                      <li key={pageNum} className={`page-item ${pagination.currentPage === pageNum ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                          {pageNum}
                        </button>
                      </li>
                    );
                  })}

                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.currentPage + 1)}>
                      Next
                    </button>
                  </li>
                  <li className={`page-item ${pagination.currentPage === pagination.totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(pagination.totalPages)}>
                      Last
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}