"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Adminmenu from "../../components/adminMemu";
import Swal from 'sweetalert2/dist/sweetalert2.esm.all.js';
export default function preRegistration() {
  return (
    <>
      <Adminmenu></Adminmenu>
      <div id="main" style={{ marginLeft: "220px" }}>
        <div className="container-fluid">
          <section className="card top">
            <div className="card-body">
              <div className="row d-flex align-items-center">
                <div className="col-md-6">
                  <div className="pageTitle">Pre Registration</div>
                </div>
                <div className="col-md-6 align-self-end text-end">
                  <Link href="#" onClick={() => router.back()}>
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>{" "}
                    Back
                  </Link>
                  <br />
                  <div className="breadcrumbBox">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link href="/control-panel/dashboard">
                            <i className="fa fa-home" aria-hidden="true"></i>
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                          <Link href="/control-panel/manage-products">
                            Member Management
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Pre Registration
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="row">
            <div class="col-3">
               <h4>Pre Registration</h4>
            </div>
                           <div class="col-7">
                  <form method="post">
                     <div class="row">
                        <div class="col-6">
                           <select id="sowtexAdmin2" name="sowtexUser">
                              <option value="all">Select</option>
                                                               <option value="22">Chetna- category4@sowtex.com</option>
                                                               <option value="7447">Care- care@sowtex.com</option>
                                                               <option value="25396">Nikita- Category2@sowtex.com</option>
                                                               <option value="25511">Hemant- Head.fabrics@sowtex.com</option>
                                                               <option value="25545">Designlab- designlab@sowtex.com</option>
                                                               <option value="29238">Neginegi- neginegi@negi.com</option>
                                                               <option value="29239">Ddd- kartik@sowtex.com</option>
                                                               <option value="31674">sumit- Vp.fabrics@sowtex.com</option>
                                                               <option value="33207">Kartik- support2@sowtex.com</option>
                                                         </select>
                           <div id="comment_error" class="error">
                           </div>
                        </div>
                        <div class="col-6">
                           <input type="button" onclick="bulkAssignUser();" class="btn btn-primary" value="Bulk Assign" />
                           <input type="Submit" value="Search" class="btn btn-primary" />
                        </div>
                        <input type="hidden" name="csrf_test_name" value="1e783209782823ff2b695fdef36e4e3b" />
                     </div>
                  </form>
               </div>
               <div class="col-2"><button class="btn btn-success" onclick="window.location.href = ('upload-pre-reg-data');" id="lead_square_upld">Upload Data</button>
               </div>
                     </div>
        </div>
      </div>
    </>
  );
}
