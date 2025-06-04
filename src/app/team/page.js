"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import { useRouter } from 'next/navigation'; 

import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
const AdminMenu = dynamic(
  () => import('../components/AdminMenu'),
  { ssr: false }
);


export default function Sidebar() {
    const router = useRouter();

  const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      // TODO: Integrate with backend delete logic
      console.log("Deleting user with ID:", id);
    }
  };
  const teamData = [
    {
      id: "32554",
      empId: "IN0001004019",
      createdDate: "26-10-2024",
      fullName: "Gautam kumar Gautam kumar",
      email: "manesar@pcjsgroup.com",
      designation: "Sales Executive",
      category: "Laces",
      editUrl: "/control-panel/edit-user/32554"
    },
    {
      id: "25402",
      empId: "IN0001004014",
      createdDate: "20-05-2023",
      fullName: "negi singh",
      email: "team1@pcjs.com",
      designation: "Deputy Manager",
      category: "Laces",
      editUrl: "/control-panel/edit-user/25402"
    },
    {
      id: "429",
      empId: "IN0001004008",
      createdDate: "19-06-2018",
      fullName: "Radhika Mahajan",
      email: "merchandiser1@pcjsgroup.com",
      designation: "Designer",
      category: "Lace Fabrics",
      editUrl: "/control-panel/edit-user/429"
    },
    {
      id: "417",
      empId: "IN0001004006",
      createdDate: "16-06-2018",
      fullName: "Dheeraj",
      email: "sourcing@pcjsgroup.com",
      designation: "Deputy Manager",
      category: "Laces",
      editUrl: "/control-panel/edit-user/417"
    },
    {
      id: "124",
      empId: "IN0001004001",
      createdDate: "27-07-2022",
      fullName: "Ashok Jain",
      email: "info@pcjsgroup.com",
      designation: "Admin",
      category: "Embroidery Fabrics, Guipure Fabric, Lace Fabrics, Laces, Neck Patches",
      editUrl: "/control-panel/profile"
    },
  ];





  return (
    <>
      <div className="onload-div">
        <img
          src="https://sowtex.com/assets/admin/images/waiting-image.gif"
          alt=""
        />
      </div>
      <AdminMenu></AdminMenu>
      <div id="main" style={{ marginLeft: "220px" }}>
          <div className="container-fluid">
      <section className="card top">
        <div className="card-body">
          <div className="row d-flex align-items-center">
            <div className="col-sm">
              <div className="page-title">Manage Team</div>
            </div>
            <div className="col-sm align-self-end text-end">
              <div className="d-none d-sm-block">
                <Link href="/control-panel"><i className="fa fa-angle-double-left"></i> Back</Link>
              </div>
              <div className="breadcrumb-box">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/"><i className="fa fa-home"></i></Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="#">Team Management</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="text-end mb-2">
          <Link href="/control-panel/add-new-team" className="btn btn-dark">
            Add New User
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered table-sm">
            <thead>
              <tr>
                <th style={{ width: "4.5%" }}>Emp Id</th>
                <th style={{ width: "4.5%" }}>Created Date</th>
                <th style={{ width: "10%" }}>Full Name</th>
                <th style={{ width: "10%" }}>Email</th>
                <th style={{ width: "11%" }}>Designation</th>
                <th style={{ width: "15%" }}>Selling Category</th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((user) => (
                <tr key={user.id}>
                  <td>{user.empId}</td>
                  <td>{user.createdDate}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>{user.category}</td>
                  <td className="text-center">
                    <Link className="text-dark" title="Edit" href={user.editUrl}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <a
                      className="text-danger ms-2"
                      title="Delete"
                      onClick={() => deleteUser(user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa fa-times fa-xl" aria-hidden="true"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
      </div>
      <style jsx>{`
        .div_class {
          width: 75px;
        }

        .div_class:hover {
          background: #ccc;
        }

        .dropdown-menu {
          height: 300px;
          width: 100%;
          overflow-y: scroll;
        }
        .div_class {
          background: #0d6efd;
          color: #fff;
          height: 30px;
          padding-left: 15px;
          padding-right: 15px;
          line-height: 30px;
          width: auto;
          display: inline-block;
          position: relative;
        }
        .waiting .onload-div {
          position: fixed;
          top: 0;
          left: 0;
          background-color: #fff;
          z-index: 999999;
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .waiting .onload-circle {
          margin: 70px auto;
          width: 15vw;
          height: 15vw;
          border: 10px solid rgb(189 189 189 / 27%);
          border-radius: 50%;
          border-top-color: #fcb040;
          animation: spin 1s linear infinite;
          position: fixed;
          max-width: 200px;
          max-height: 200px;
        }
      `}</style>
    </>
  );
}