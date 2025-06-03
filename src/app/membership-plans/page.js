"use client";
import { useState } from "react";
import Layout from "../components/Menu";
import axios from "axios";
import Link from "next/link";
import Image from 'next/image';
import Breadcrumb from "../components/Breadcrumb";
// import Breadcrumbs from "../../components/BreadCrumb";

export default function MembershipPlans() {
  return (
    <>
    
     
      <div className="cat_fixed">
   
   <div className="mt-3 px-4">   
    <Breadcrumb></Breadcrumb></div>
      <Layout></Layout>
      <section id="membership">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-1"></div>
            <div className="col-md-12 col-lg-12">
              <div
                className="new-registration-plan-table table-responsive"
                style={{ paddingBottom: "15px;" }}
              >
                <div className="table-responsive">
                  <table
                    className="table table-bordered text-center"
                    style={{ minWidth: "900px" }}
                    width="100%"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <thead>
                      <tr>
                        <th style={{ border: 0 }} width="200"></th>
                        <th
                          style={{
                            minWidth: "140px",
                            padding: "0 0 7px",
                            position: "relative",
                            top: "8px",
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                          }}
                        >
                          <Image
                            src="/assets/img/memb_start.png"
                            width="140"
                            alt="Quarterly Plan"
                          />
                        </th>
                        <th
                          style={{
                            minWidth: "140px",
                            padding: "0 0 7px",
                            position: "relative",
                            top: "8px",
                            borderLeft: 0,
                            borderRight: 0,
                            borderBottom: 0,
                          }}
                        >
                          <Image
                            src="/assets/img/Membership_Plan_Banners.png"
                            width="140"
                            alt="Annual Plan"
                          />
                        </th>
                        <th
                          colSpan="2"
                          style={{
                            padding: "0 0 7px",
                            top: "8px",
                            position: "relative",
                            border: "0",
                          }}
                        >
                          <Image
                            src="/assets/img/professional_banner.png"
                            width="140"
                            alt="Professional Plan"
                          />
                        </th>
                        <th
                          colSpan="2"
                          style={{
                            padding: "0 0 7px",
                            top: "8px",
                            position: "relative",
                            border: "0",
                          }}
                        >
                          <Image
                            src="/assets/img/enterpirse.png"
                            width="140"
                            alt="Enterprise Plan"
                          />
                        </th>
                      </tr>
                      <tr>
                        <th style={{ padding: "8px", background: "#e3e3e3" }}>
                          User Facilities
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#8ddbf4",
                            color: "#fff",
                          }}
                        >
                          <h6>Quarter</h6>
                          <p>Single User</p>
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#417ed7",
                            color: "#fff",
                          }}
                        >
                          <h6>Annually</h6>
                          <p>N</p>
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#ff9b36",
                            color: "#fff",
                          }}
                        >
                          <h6>Quarter</h6>
                          <p>(N)</p>
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#6c6d6c",
                            color: "#fff",
                          }}
                        >
                          <h6>Annually</h6>
                          <p>(N)</p>
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#7cce40",
                            color: "#fff",
                          }}
                        >
                          <h6>Quarter</h6>
                          <p>(Y)</p>
                        </th>
                        <th
                          style={{
                            padding: "8px",
                            background: "#e2b126",
                            color: "#fff",
                          }}
                        >
                          <h6>Annually</h6>
                          <p>(Y)</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody style={{ background: "#eee" }}>
                      {/* Reusable Row */}
                      {[
                        [
                          "No of users",
                          "Single User",
                          "Single User",
                          "Multiple Users (1+3)",
                          "Multiple Users (1+3)",
                          "Multiple Users (1+7)",
                          "Multiple Users (1+8)",
                        ],
                        [
                          "Prime Category Listing",
                          "1",
                          "1",
                          "3",
                          "3",
                          "5",
                          "7",
                        ],
                        [
                          "Enquiry Management",
                          "check",
                          "check",
                          "check",
                          "check",
                          "check",
                          "check",
                        ],
                        [
                          "Leads Management (Prime Category)",
                          "5 Leads",
                          "100 Leads",
                          "50 Leads",
                          "Unlimited",
                          "100 Leads",
                          "5 Leads",
                        ],
                        [
                          "Product Showcase",
                          "30",
                          "150",
                          "300 x 3PC",
                          "Unlimited",
                          "300 x 5PC",
                          "Unlimited",
                        ],
                        [
                          "Stock Showcase",
                          "30",
                          "150",
                          "300 x 3PC",
                          "Unlimited",
                          "300 x 5PC",
                          "Unlimited",
                        ],
                        [
                          "E-Catalogue Library",
                          "Restricted",
                          "Single",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                        ],
                        [
                          "Excess Capacity",
                          "Restricted",
                          "Single",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                        ],
                        [
                          "Vendors Linking",
                          "Restricted",
                          "Single",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                          "Multiple",
                        ],
                        [
                          "Custom CRM",
                          "cross",
                          "cross",
                          "check",
                          "check",
                          "check",
                          "check",
                        ],
                        [
                          "Custom Training Programme",
                          "cross",
                          "cross",
                          "1 per Qtr",
                          "1 per Qtr",
                          "1 per Qtr",
                          "1 per Qtr",
                        ],
                        [
                          "Virtual Sourcing Manager",
                          "cross",
                          "cross",
                          "cross",
                          "check",
                          "check",
                          "check",
                        ],
                        [
                          "Curated Buyer Connections",
                          "cross",
                          "cross",
                          "cross",
                          "check",
                          "check",
                          "check",
                        ],
                        [
                          "Sustainability Rating",
                          "cross",
                          "cross",
                          "check",
                          "check",
                          "check",
                          "check",
                        ],
                        [
                          "Smart Sourcing Connections",
                          "cross",
                          "cross",
                          "cross",
                          "cross",
                          "check",
                          "check",
                        ],
                        [
                          "Price",
                          "₹ 8000 + GST / US$ 100",
                          "₹ 24000 + GST / US$ 300",
                          "₹ 24000 + GST / US$ 300",
                          "₹ 60000 + GST / US$ 750",
                          "₹ 60000 + GST / US$ 750",
                          "₹ 40000 + GST / US$ 500",
                        ],
                      ].map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td
                              key={j}
                              className={j === 0 ? "fw-semibold" : ""}
                            >
                              {cell === "check" ? (
                                <i className="fa fa-check-circle text-success"></i>
                              ) : cell === "cross" ? (
                                <i className="fa fa-times-circle text-danger"></i>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                    <tbody>
                      <tr>
                        <td style={{ border: 0 }}></td>
                        {[
                          { color: "#417ed7", value: "starter" },
                          { color: "#4CAF50", value: "individual" },
                          { color: "#ff9b36", value: "individualMonthly" },
                          { color: "#6c6d6c", value: "individualAnnually" },
                          { color: "#7cce40", value: "businessMonthly" },
                          { color: "#e2b126", value: "businessAnnually" },
                        ].map((plan, idx) => (
                          <td
                            key={idx}
                            style={{
                              background: plan.color,
                              color: "#fff",
                              lineHeight: "14px",
                            }}
                          >
                            <label className="radio-inline text-dark">
                              <input
                                type="radio"
                                name="ChoosePlan"
                                value={plan.value}
                              />{" "}
                              Choose Plan
                            </label>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-warning btn-lg"
                  onclick="pay_now();"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    
    </>
  );
}
