   <div id="main">
      <div class="container-fluid">
         <section class="card top">
            <div class="card-body">
               <div class="row d-flex align-items-center">
                  <div class="col-sm">
                     <div class="page-title">
                        <h3 id="page_heading">Edit Roles</h3>
                     </div>
                  </div>
                  <div class="col-sm align-self-end text-end">
                     <div class="d-none d-sm-block"><a href=""><i class="fa fa-angle-double-left" aria-hidden="true"></i> Back</a> </div>
                     <div class="breadcrumb-box">
                        <nav aria-label="breadcrumb">
                           <ol class="breadcrumb">
                              <li class="breadcrumb-item"><a href="#"><i class="fa fa-home" aria-hidden="true"></i></a></li>
                              <li class="breadcrumb-item"><a href="#">Role Management</a></li>
                              <li class="breadcrumb-item active" aria-current="page">Role</li>
                           </ol>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <div class="onload-div">
            <img src="<?php echo base_url('/assets/admin/images/waiting-image.gif'); ?>" alt="">
         </div>
         <section>
            <div class="container-fluid border py-4">
               <div class="row">
                  <div class="col d-flex justify-content-around">
                     <div class="col-5">
                        <select id="role" class="form-select" aria-label="Default select example">
                           <option selected>Select Your Role</option>
                           <?php
                           foreach ($roles as $row) { ?>
                              <option onclick="checkSubMenu()" id="<?php echo $row['roleId']; ?>" value="<?php echo $row['roleId']; ?>"><?php echo $row['roleName']; ?></option>
                           <?php }
                           ?>
                        </select>
                        <div id="role_typeError" class="error"></div>
                     </div>
                     <div class="col-3">
                        <a href="<?php echo base_url('control-panel/add-new-role'); ?>" class="btn btn-success" id="">Add New Role</a>
                     </div>
                  </div>
               </div>
            </div>
         </section>


         <section class="mt-4">
            <div id="sowtexAdminDiv">
               <div class="container-fluid">
                  <ul>
                     <?php $tempMenu;
                     foreach ($roles2 as $key => $val) {
                        if ($tempMenu == $val['menuId']) {
                           echo "<li><input value='" . $val['subMenuId'] . "' name='submenu_checker' type='checkbox' id='sub_" . $val['subMenuId'] . "'>" . $val['subMenuName'] . "</li>"; ?>

                        <?php } else {
                           echo "</ul><ul><b>" . $val['menuName'] . "</b><li><input value='" . $val['subMenuId'] . "' name='submenu_checker' type='checkbox' id='sub_" . $val['subMenuId'] . "'>" . $val['subMenuName'] . "</li>";
                           $tempMenu = $val['menuId'];
                           continue; ?>

                     <?php }
                     } ?>
                  </ul>
                  <div id="checkbox_error" class="error"></div>
                  <button class="btn btn-success" onclick="update_menu_submenu_permissions()">Update Role</button>
               </div>
            </div>



            <div id="CustomerDiv" style="visibility: hidden;">
               <div class="container-fluid">
                  <ul>
                     <?php $tempMenu;
                     foreach ($roles1 as $key => $val) {
                        if ($tempMenu == $val['menuId']) {
                           echo "<li><input value='" . $val['subMenuId'] . "' name='submenu_checker' type='checkbox' id='sub_" . $val['subMenuId'] . "'>" . $val['subMenuName'] . "</li>"; ?>

                        <?php } else {
                           echo "</ul><ul><b>" . $val['menuName'] . "</b><li><input value='" . $val['subMenuId'] . "' name='submenu_checker' type='checkbox' id='sub_" . $val['subMenuId'] . "'>" . $val['subMenuName'] . "</li>";
                           $tempMenu = $val['menuId'];
                           continue; ?>

                     <?php }
                     } ?>
                  </ul>
                  <div id="checkbox_error" class="error"></div>
                  <button class="btn btn-success" onclick="update_menu_submenu_permissions()">Update Role</button>
               </div>
            </div>
         </section>
      </div>
   </div>


   </section>



   <script>
      $('#role').change(function() {
         $("body").addClass('waiting');
         var role = $("#role option:selected").val();
         // alert(role);return false;
         $('.container-fluid input:checkbox').attr('checked', false);
         $.ajax({
            url: base_url + "control-panel/get-subMenuId-by-roleId",
            type: "POST",
            data: {
               role: role,
               csrf_test_name: csrf_hash
            },
            success: function(response) {
               $("body").removeClass('waiting');
               $('#page_heading').text('Edit Roles');
               data = $.parseJSON(response);
               //alert(data.type);return false;
               if (data.type == "SowtexBackEnd") {
                  $("#CustomerDiv").css('visibility', 'hidden');;
                  $("#sowtexAdminDiv").css('visibility', 'visible');;
                  $.each(data.data, function(i, v) {
                     $('#sowtexAdminDiv #sub_' + v).attr('checked', true);
                     // alert(v['subMenuId']);return false;
                  });
               } else if (data.type == "Customer") {
                  $("#CustomerDiv").css('visibility', 'visible');;
                  $("#sowtexAdminDiv").css('visibility', 'hidden');;
                  $.each(data.data, function(i, v) {
                     $('#CustomerDiv  #sub_' + v).attr('checked', true);
                     // alert(v['subMenuId']);return false;
                  });
               }

            }
         });
      })

      // $('#add_role').click(function(){
      //    $('#add_role_modal').modal('show');
      // });
      // function add_new_role(){
      //    var name = $('#role_name').val();
      //    var type = $('#role_type option:selected').val();
      //    $.ajax({
      //       url: base_url + "control-panel/add-role",
      //       type: "POST",
      //       data: {
      //          name:name,
      //          type:type,
      //          csrf_test_name: csrf_hash
      //       },
      //       success: function(response) {
      //          data = $.parseJSON(response);
      //          if(data.status=="ok"){
      //             swal({
      //                title: '',
      //                text: 'Role Added Succefully !',
      //                icon: 'success'
      //             });
      //    $('#add_role_modal').modal('hide');
      //          }
      //          else{
      //             swal({
      //                title: '',
      //                text: 'Something Went Wrong !',
      //                icon: 'error'
      //             });
      //          }
      //       }
      //    });
      // }
      function update_menu_submenu_permissions() {
         var role = $('#role option:selected').val();
         if (role == "Select Your Role") {
            $('#role').focus();
            $('#role_typeError').removeClass('d-none');
            $('#role_typeError').text('Required');
            return false;
         } else {
            $('#role_typeError').addClass('d-none');
            $('#role_typeError').text("");

         }
         var submenu_checker = [];
         $("input:checkbox[name='submenu_checker']:checked").each(function() {
            submenu_checker.push($(this).attr("value"));
         });
         if (submenu_checker == "") {
            $('#checkbox_error').removeClass('d-none');
            $('#checkbox_error').text('Check at least one checkbox');
            return false;
         } else {
            $('#checkbox_error').addClass('d-none');
            $('#checkbox_error').text("");

         }
         var submenu = submenu_checker.join(", ");
         // alert(submenu);return false;


         $.ajax({
            url: base_url + "control-panel/update-role-menu-subMenu-permissions",
            type: "POST",
            data: {
               role: role,
               submenu: submenu,
               csrf_test_name: csrf_hash
            },
            success: function(response) {
               data = $.parseJSON(response);
               if (data.status == "ok") {
                  swal({
                     title: '',
                     text: 'Role Added Succefully !',
                     icon: 'success'
                  });
                  location.reload();
               } else {
                  swal({
                     title: '',
                     text: 'Something Went Wrong !',
                     icon: 'error'
                  });
               }
            }
         });
      }
   </script>
   <style>
      .onload-div {
         display: none;
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
         border-top-color: #FCB040;
         animation: spin 1s linear infinite;
         position: fixed;
         max-width: 200px;
         max-height: 200px;
      }
   </style>







   <!-- <section class="content">
      <table class="table table-hover table-bordered">
         <thead>
            <tr>
               <th style="max-width: 350px;">Role Name</th>
               <th style="max-width: 250px;">Created Date</th>
               <th>Action</th>
            </tr>
         </thead>
         <tbody>
            <tr class="">
               <td style="max-width: 350px;"></td>
               <td style="max-width: 250px;"><?php echo $row['createdDate']; ?> </td>
               <td class="D-action">
                  <a class="D-edit " title="Edit" href="<?php echo base_url('control-panel/edit-role/') . $row['roleId']; ?>"><i class="fa fa-pencil"></i></a>
                  <a class="D-delete text-danger " title="Delete"><i class="fa fa-times"></i></a>
               </td>
            </tr>

         </tbody>
      </table>
   </section> -->