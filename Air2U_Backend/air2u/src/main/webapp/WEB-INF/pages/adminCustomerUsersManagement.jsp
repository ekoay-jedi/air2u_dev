<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Customer Users</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminCustomerUsersManagement.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 347px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Customer Users Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            
            
            <div class="row">
                 <div class="col-md-2 ">
	                  <div class="">
	                  	  <button class="btn btn-save btn-add btn-apply btn-success" onclick="javascript:void(0);generateReport();">Generate Report</button>
<!-- 	                  	  <button type="button" class="btn btn-primary" onclick="javascript:void(0);saveCategory();">Save</button> -->
<!-- 	                      <button type="button" onclick="javascript:void(0);addCategoryPage();" class="btn btn-success">Create New Category</button> -->
<!-- 	                  	  <button data-toggle="modal" data-target="#addCategoryModal" class="btn btn-primary">Create New Category</button> -->
	                  </div> 
                </div>
                <div class="col-md-3"> 
                     <div class="btn-add-order" style="right: 15px;">
                         <button data-toggle="modal" data-target="#addUserModal" class="btn btn-save btn-add btn-apply btn-success" onclick="javascript:void(0);getRoles();">Create A New Customer</button>
                     </div> 
                </div>
            </div>
            
           <div class="row">
            	<div class="col-md-12">
            		<form class="form-inline form-style" role="form">
						<!-- <div class="form-group">
							<label class="sr-only" for="name">Customer Name</label>
							<input type="text" class="form-control" id="name" name="select_name"
								   placeholder="Customer name">
						</div> -->
						<div class="form-group">
							<label class="sr-only" for="name">Customer Email</label>
							<input type="text" class="form-control" id="email" name="select_email"
								   placeholder="Customer email">
						</div>
						<div class="form-group">
							<label class="sr-only" for="name">Contact Number</label>
							<input type="text" class="form-control" id="number" name = "select_number" 
								   placeholder="Contact number">
						</div>
						<button type="button"  class="btn btn-primary select-opr">Apply</button>
					</form>
            	</div>
            </div>
            
            <div class="row paddingTop20">
            </div>
            <!-- /.row -->
            <div class="row">
				<div class="col-lg-12">
                    <div class="panel panel-default" style="min-width: 1350px !important;overflow:auto;">
                        
                        <!-- /.panel-heading -->
                        <div class="panel-body tableDiv">
                            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
							<span class="sr-only">Loading...</span>
                        </div>
                        
                        <div class="row">
                        	<div class="col-sm-5">
                        		<div class="pager-fenye-tip" style="padding-left:20px;">
                        		
                        		</div>
                        	</div>
                        	<div class="col-sm-6">
                        		<ul class="pager fenye-list">
								</ul>
                        	</div>
                        </div>
                        
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>                 
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->

            <!-- /.row -->

            <!-- /.row -->

            <!-- /.row -->
        </div>
</div>

<div class="modal fade" id="addUserModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Add A Customer User
				</h4>
			</div>
			<div class="modal-body">
				<form>
                     <div class="row">
                    	<div class="col-sm-6">
	                    	 <div class="form-group">
		                          <label class="control-label" for="userEmailAdd">User Email:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userEmailAdd" value="">
		                    </div>
                    	</div>
                    	<div class="col-sm-6">
                    		<div class="form-group">
		                          <label class="control-label" for="userPasswordAdd">Password:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="password" class="form-control" id="userPasswordAdd" value="">
		                    </div>
                    	</div>
                    </div>
                    
                    <div class="row">
                    	<div class="col-sm-6">
	                    	 <div class="form-group">
		                          <label class="control-label" for="userFullNameAdd">Full Name:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userFullNameAdd" value="">
		                    </div>
                    	</div>
                    	<div class="col-sm-6">
                    		 <div class="form-group">
		                          <label class="control-label" for="userContactNumberAdd">Contact Number:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userContactNumberAdd" value="">
		                    </div>   
                    	</div>
                    </div>
                    
                    <div class="form-group">
                          <label class="control-label" for="userHomeAddressAdd">Home Address:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userHomeAddressAdd" value="">
                    </div>
                    
                    <div class="row">
                    	<div class="col-sm-6">
	                    	<div class="form-group">
		                          <label class="control-label" for="userIntroducerEmailAdd">Introducer Email:</label> <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userIntroducerEmailAdd" value="">
		                    </div>
                    	</div>
                    	<div class="col-sm-6">
                    		  <div class="form-group">
		                          <label class="control-label" for="userIntroducerNameAdd">Introducer Name:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userIntroducerNameAdd" value="">
		                    </div> 
                    	</div>
                    </div>
                    
                   
                    <div class="form-group">
                          <label class="control-label" for="userContactNumberAdd">Introducer Contact:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userIntroducerContact" value="">
                    </div>   
                    
                    <!-- 
                    <div class="form-group">
                          <label class="control-label" for="userContactNumberAdd">Avatar:</label>      <label class="errorTip displayNone"></label>
                          <input type="file" id="userAvatarAdd" value="">
                    </div> -->  
                    <div class="form-group">
                         <label class="control-label" for="userRoleSelect">Selects</label>
                         <select class="form-control" id="userRoleSelect">
							<option><span class="sr-only">Loading Data...</span></option>
                         </select>
                    </div>   
                    <div class="form-group">
                          <label class="control-label" for="userContactNumberAdd">State:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userState" value="">
                    </div>                  
		        </form>
			</div>
			<div class="modal-footer addUserModalFooter">
			
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="editUserModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Edit A Customer
				</h4>
				<input type="hidden" value="" id="toEditUserID" />
			</div>
			<div class="modal-body">
				<form>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userNameEdit">User Email:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userEmailEdit" value="" readonly="readonly">
		                    </div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userFullNameEdit">Full Name:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userFullNameEdit" value="">
		                    </div>
						</div>
					</div>
					<div class="form-group">
                          <label class="control-label" for="userContactNumberEdit">Contact Number:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userContactNumberEdit" value="">
                    </div>   
                    <div class="form-group">
                          <label class="control-label" for="userHomeAddressEdit">Home Address:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userHomeAddressEdit" value="">
                    </div>  
                    
					<div class="row">
						<div class="col-sm-6">
							 <div class="form-group">
		                          <label class="control-label" for="userIntroducerEmailEdit">Introducer Email:</label> <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userIntroducerEmailEdit" value="">
		                    </div>
						</div>
						<div class="col-sm-6">
							 <div class="form-group">
		                          <label class="control-label" for="userIntroducerNameEdit">Introducer Name:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userIntroducerNameEdit" value="">
		                    </div>
						</div>
					</div>
					
                    <div class="form-group">
                          <label class="control-label" for="userContactNumberAdd">Introducer Contact:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userIntroducerContactEdit" value="">
                    </div>   
                    <div class="form-group">
                          <label class="control-label" for="userTotalPointEdit">Total Point:</label>      <label class="errorTip displayNone"></label>
                          <input type="number" class="form-control" id="userTotalPointEdit" value="">
                    </div> 
                    
		        </form>
			</div>
			<div class="modal-footer editUserModalFooter">
				<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Cancel</button>
		    	<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveUserEdit();'>Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="deleteModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Are you sure you want to delete the selected item?
				</h4>
				<input type="hidden" value="" id="toDeleteItemID" />
			</div>
			<div class="modal-footer deleteModalFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal">No
				</button>
				<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteModalYes();">Yes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="forbiddenDeleteModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					The customer user already has history record,<br/> you cannot delete the user!
				</h4>
				<input type="hidden" value="" id="toDeleteItemID" />
			</div>
			<div class="modal-footer deleteModalFooter">
				<button type="button" class="btn btn-primary" data-dismiss="modal">OK
				</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


</body>
</html>