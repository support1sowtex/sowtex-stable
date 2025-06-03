"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminMenu from "../components/AdminMenu";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
    total: 0,
  });

  const router = useRouter();

  const fetchProducts = useCallback(async (page = 1, limit = pagination.limit) => {
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
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalPages: data.pagination?.totalPages || 1,
        limit: limit,
        total: data.pagination?.total || data.users?.length || 0,
      }));
    } catch (err) {
      console.error("Fetch error:", err);
      alert(`Error loading data: ${err.message}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      currentPage: 1,
    }));
    fetchProducts(1, newLimit);
  };

  const handleView = (productId) => {
    router.push(`/products/${productId}`);
  };

  const copyUser = (userId) => {
    console.log("Copy user", userId);
  };

  const openPinModal = (userId, action) => {
    console.log(`${action} user`, userId);
  };

  const softdelete = (userId) => {
    console.log("Soft delete user", userId);
  };

  return (
    <>
      <AdminMenu />

      <div id="main" style={{ marginLeft: "220px" }}>
        <div className="container-fluid">
          <section className="card top">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-sm">
                  <div className="page-title">Trial Members</div>
                </div>
                <div className="col-sm text-end">
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <span className="me-2">Show</span>
                  <select
                    className="form-select form-select-sm"
                    value={pagination.limit}
                    onChange={handleLimitChange}
                    style={{ width: "80px" }}
                    disabled={loading}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                  </select>
                  <span className="ms-2">entries</span>
                </div>
                <div className="text-muted">
                  {loading
                    ? "Loading..."
                    : `Showing ${(pagination.currentPage - 1) * pagination.limit + 1} to 
                      ${Math.min(pagination.currentPage * pagination.limit, pagination.total)} of 
                      ${pagination.total} entries`}
                </div>
              </div>

              <div className="table-responsive">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading products...</p>
                  </div>
                ) : (
                  <>
                    <table className="table table-hover table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th width="50">#</th>
                          <th width="100">Cust. ID</th>
                          <th width="90">Date</th>
                          <th width="120">Name</th>
                          <th>Company</th>
                          <th>Email</th>
                          <th width="120">Category</th>
                          <th width="100">Stage</th>
                          <th width="80">Rating</th>
                          <th width="120">Designation</th>
                          <th width="150">Location</th>
                          <th width="120">Plan</th>
                          <th width="120" className="text-center">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length > 0 ? (
                          products.map((user, index) => (
                            <tr key={user.orgId || index} className="align-middle">
                              <td className="text-center">{index + 1}</td>
                              <td>
                                <a
                                  href="#"
                                  onClick={() => openPinModal(user.orgId, "edit")}
                                  className="text-primary"
                                >
                                  {user.customerId || `IN00${user.orgId}`}
                                </a>
                              </td>
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
                              <td className="text-center">
                                <div className="d-flex justify-content-center">
                                  <button
                                    onClick={() => copyUser(user.orgId)}
                                    className="btn btn-sm btn-outline-secondary mx-1"
                                  >
                                    <i className="fa-regular fa-copy"></i>
                                  </button>
                                  <button
                                    onClick={() => openPinModal(user.orgId, "edit")}
                                    className="btn btn-sm btn-outline-primary mx-1"
                                  >
                                    <i className="fa fa-pencil"></i>
                                  </button>
                                  <button
                                    onClick={() => openPinModal(user.orgId, "view")}
                                    className="btn btn-sm btn-outline-info mx-1"
                                  >
                                    <i className="fa fa-eye"></i>
                                  </button>
                                  <button
                                    onClick={() => softdelete(user.orgId)}
                                    className="btn btn-sm btn-outline-danger mx-1"
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="13" className="text-center py-4">
                              No products found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    <nav aria-label="Page navigation" className="mt-3">
                      <ul className="pagination justify-content-end">
                        <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(1)}
                            disabled={loading}
                          >
                            First
                          </button>
                        </li>
                        <li className={`page-item ${pagination.currentPage === 1 ? "disabled" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={loading}
                          >
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
                            <li
                              key={pageNum}
                              className={`page-item ${
                                pagination.currentPage === pageNum ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(pageNum)}
                                disabled={loading}
                              >
                                {pageNum}
                              </button>
                            </li>
                          );
                        })}

                        <li
                          className={`page-item ${
                            pagination.currentPage === pagination.totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={loading}
                          >
                            Next
                          </button>
                        </li>
                        <li
                          className={`page-item ${
                            pagination.currentPage === pagination.totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={loading}
                          >
                            Last
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
