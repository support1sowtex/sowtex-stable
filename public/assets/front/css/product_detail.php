<script type="text/javascript" src="<?php echo base_url(); ?>assets/front/js/xzoom.min.js"></script>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/front/css/xzoom.css" media="all" />
<script src="<?php echo base_url(); ?>assets/front/js/foundation.min.js"></script>
<script src="<?php echo base_url(); ?>assets/front/js/setup.js"></script>
<div class="bg-light cat_fixed">
   <div class="container py-2">
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><a href="<?php echo base_url();?>">Home</a></li>
            <li class="breadcrumb-item"><a href="<?php echo base_url();?>categories">Categories</a></li>
            <li class="breadcrumb-item active" aria-current="page">
               <a href="http://localhost/sowtex3.0/categories/Bags">Bags</a>
            </li>
            <li class="breadcrumb-item" aria-current="page">Total Product (<span id="showing_product">
                  380</span>)
            </li>
         </ol>
      </nav>
   </div>
</div>
<section class="product-detail">
   <div class="container">
      <div class="divider"></div>
      <div class="product-detail">
         <div class="row">
            <div class="col-sm-6 col-md-4">
               <section id="default" class="padding-top0">
                  <div class="row">
                     <div class="large-5 column">
                        <div class="xzoom-container">
                           <img class="xzoom" id="xzoom-default" src="<?php echo base_url('assets/images/Product/') . $image[0];  ?>" xoriginal="<?php echo base_url('assets/images/Product/') . $image[0];  ?>" />
                           <div class="xzoom-thumbs">
                              <a href="<?php echo base_url('assets/images/Product/') . $image[0];  ?>"><img class="xzoom-gallery" width="80" src="<?php echo base_url('assets/images/Product/') . $image[0];  ?>" xpreview="<?php echo base_url('assets/images/Product/') . $image[0];  ?>"></a>
                              <?php
                              for ($i = 1; $i < count($image); $i++) { ?>
                                 <a href="<?php echo base_url('assets/images/Product/') . $image[$i];  ?>"><img class="xzoom-gallery" width="80" src="<?php echo base_url('assets/images/Product/') . $image[$i];  ?>" xpreview="<?php echo base_url('assets/images/Product/') . $image[$i];  ?>"></a>
                              <?php }
                              ?>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-ms-12 flex-box-footer">
                              <ul>
                                 <li><a href="https://www.facebook.com/Sowtex" target="_blank">

                                 <i class="fa-brands fa-facebook"></i></a></li>
                                 <li><a href="https://www.linkedin.com/company/sowtex-network/" target="_blank"><i class="fa-brands fa-linkedin"></i></a></li>
                                 <li class="whatsapp"><a href="https://api.whatsapp.com/send?phone=+919999807989" target="_blank"><i class="fa-brands fa-whatsapp"></i></a></li>
                                 <li><a href="https://twitter.com/search?q=SowtexNetworks" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
                                
                              </ul>

                           </div>
                        </div>
                     </div>
                     <div class="large-7 column"></div>
                  </div>
               </section>
            </div>
            <div class="col-sm-6 col-md-5">
               <div class="product-brief">
                  <h1 class="pro-desc" class="pro-desc">Product Code : <?php echo $unique_id; ?> <span class="text-success"><i class="fa fa-check" aria-hidden="true"></i> Assured</span></h1>
                  <ul class="feature">
                     <li><strong>Stock Article Number</strong> <?php echo $art_no; ?></li>
                     <li><strong>Category</strong> <?php echo $cat_name; ?></li>
                     <li><strong>Sub Category</strong><?php echo $sub_cat_name; ?></li>
                     <li><strong>Color/Finish</strong>
                        <?php foreach ($color as $key => $value) {
                           $a .= $value['color'] . ", ";
                        };
                        echo rtrim($a, ", ");
                        $a = ''; ?>
                     </li>
                     <li><strong>Size</strong><?php echo $sizes; ?> </li>
                     <li><strong>Location </strong><?php echo $location; ?></li>
                     <li><strong>Content </strong><?php echo $content; ?></li>
                  </ul>
                  <div class="mt-3">
                     <div class="subtitle">Description:</div>
                     <p><?php echo $description; ?></p>
                  </div>
                  <div class="mt-3">
                     <div class="row">
                        <div class="col-sm-9">
                           <div class="subtitle">Minimum Order Quantity:</div>
                           <p><?php echo $moq; ?></p>
                        </div>

                     </div>

                  </div>
                  <div class="mt-3 d-flex justify-content-between">
                     <?php if ($this->session->userdata('user_id') == '') { ?>
                        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modal-login">Enquiry</button>
                     <?php } else { ?>
                        <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#modal-enquiry">Enquiry</button>
                     <?php } ?>


                     <?php
                     if ($this->session->userdata('user_id') == '') { ?>
                        <button class="btn btn-warning" type="button" data-bs-target="#modal-login">Shortlist</button>
                     <?php  } else if ($shortlistedProdStatus < 1) { ?>
                        <button class="btn btn-dark" onclick="shorlist_product('<?php echo  $id; ?>','<?php echo $this->session->userdata('user_id'); ?>')">
                           Shortlist</button>
                     <?php } else if ($shortlistedProdStatus > 0) { ?>
                        <button class="btn btn-dark" onclick="unshorlist_product('<?php echo  $id; ?>','<?php echo $this->session->userdata('user_id'); ?>')">
                           UnShortlist</button>
                     <?php }
                     ?>


                  </div>
               </div>
            </div>
            <div class="col-sm-6 col-md-3">
               <div class="category-brief">
                  <div class="category-image">
                     <img src="<?php echo base_url('assets/images/Company/') . $org['logo']; ?>" alt="" class="img-fluid" style="height:70px; width:auto">
                  </div>

                  <?php
                  if ($this->session->userdata('user_id') == '') { ?>
                     <div class="my-3 text-center border p-2">
                        <p class="mb-2"> <strong>To View Details </strong> </p>
                        <button class="btn btn-warning" type="button" style="margin-right:15px;" data-bs-toggle="modal" data-bs-target="#modal-login">Login</button>
                        <a href="<?php echo base_url('registration'); ?>">
                           <button class="btn btn-dark" type="button">Join Now</button>
                        </a>
                     </div>

                  <?php

                  } else {
                     echo '<br><b>' . $org['orgName'] . '</b>';
                  }
                  ?>
                  <ul class="feature">
                     <li><strong>Location</strong><?php echo $location; ?></li>
                     <li><strong>Year of Establishment</strong><?php echo $org['est_year']; ?></li>
                     <li><strong>Total no. of Employees</strong><?php echo $org['total_emp']; ?></li>
                     <li><strong>Supplier</strong><?php echo $org['supplier']; ?></li>
                  </ul>
                  <div class="mt-3 d-flex justify-content-between">
                     <?php
                     if ($this->session->userdata("user_id") == '') { ?>
                        <button class="btn btn btn-dark " data-bs-toggle="modal" data-bs-target="#modal-login">Shortlist Company</button>

                     <?php  } else if ($shortlistedOrgStatus > 0) { ?>
                        <button class="btn btn-dark" onclick="unshorlist_company(<?php echo $org['orgId']; ?>,'<?php echo $this->session->userdata('user_id'); ?>')">UnShortlist Company</button>
                     <?php } else { ?>
                        <button class="btn btn-dark" onclick="shorlist_company(<?php echo $org['orgId']; ?>,'<?php echo $this->session->userdata('user_id'); ?>')">Shortlist Company</button>
                     <?php }
                     ?>
                     <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
                        <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                           <div class="toast-header">
                              <img src="..." class="rounded me-2" alt="...">
                              <strong class="me-auto">Bootstrap</strong>
                              <small>11 mins ago</small>
                              <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                           </div>
                           <div class="toast-body">
                              Product Shortlist
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
<section id="related-product">
   <div class="container border-top">
      <div class="section-title">Similar Products</div>
      <div class="related-product">
         <div class="row" id="similar_div">



         </div>
      </div>
</section>
<script>
   var user_id = "<?php echo $this->session->userdata('user_id'); ?>";
   var toastTrigger = document.getElementById('liveToastBtn')
   var toastLiveExample = document.getElementById('liveToast')
   if (toastTrigger) {
      toastTrigger.addEventListener('click', function() {
         shortlistProduct();
         var toast = new bootstrap.Toast(toastLiveExample)

         toast.show()
      })
   }
</script>
</body>

</html>
<!-- Modal -->

<!-- Modal -->
<div class="modal fade" id="modal-enquiry" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-loginLabel" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title">Enquiry</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">

            <div class="row">
               <div class="mb-3 col-sm-6">
                  <label for="recipient-name" class="col-form-label">Product Code:</label>
                  <input type="text" class="form-control" id="product_code" value="<?php echo $unique_id; ?>" readonly>
               </div>
               <div class="mb-3 col-sm-6">
                  <label for="recipient-name" class="col-form-label">Minimum Quantity:</label>
                  <input type="text" class="form-control" id="min_qua" value="<?php echo $min_quantity; ?>">
               </div>
               <div class="mb-3 col-sm-6">
                  <label for="recipient-name" class="col-form-label">Response Time:</label>
                  <select class="form-control" id="responceTime">
                     <option selected value="select">Select</option>
                     <option value="Immediate">Immediate</option>
                     <option value="1 Day">1 Day</option>
                     <option value="3 Days">3 Day</option>
                     <option value="7 Days">7 Day</option>
                  </select>
               </div>
               <div class="mb-3 col-sm-6">
                  <label for="recipient-name" class="col-form-label">Quoted Price:</label>
                  <input type="text" class="form-control" id="quot_price">
                  <input type="hidden" name="categoryId" value="<?php echo $category_id; ?>" id="categoryId">
                  <input type="hidden" name="sub_category_id" value="<?php echo $sub_category_id; ?>" id="sub_category_id">
                  <input type="hidden" name="orgId" value="<?php echo $org['orgId']; ?>" id="orgId">
                  <input type="hidden" name="prod_id" value="<?php echo $id; ?>" id="prod_id">
                  <input type="hidden" name="city_id" value="<?php echo $org['cityId']; ?>" id="city_id">
                  <input type="hidden" name="state_id" value="<?php echo $org['stateId']; ?>" id="state_id">
                  <input type="hidden" name="ctry_id" value="<?php echo $org['countryId']; ?>" id="ctry_id">
               </div>
               <div class="mb-3 col-12">
                  <label for="message-text" class="col-form-label">Requirements:</label>
                  <textarea class="form-control" style="height:150px;" id="requirement" placeholder="Things like Color, Size, Shape, Content, Specification, lead time etc."></textarea>
               </div>
            </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-primary" onclick="submitEnquiry('<?php echo $unique_id; ?>','<?php echo $min_quantity; ?>');">Send</button>
         </div>
      </div>
   </div>
</div>


<script>

</script>