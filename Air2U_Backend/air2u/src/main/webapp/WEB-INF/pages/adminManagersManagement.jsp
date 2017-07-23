<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Manager Users</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminManagersManagement.js"></script>
</head>
<body> 
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 800px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Managers Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
             <!-- /.row -->
            <div class="row">
                <div class="col-md-2">
	                  <div class="btn-add-order">
	                      <button data-toggle="modal" data-target="#addManagerModal" class="btn btn-success btn-save btn-add btn-apply btn-add-manager" 
	                      onclick="javascript:void(0);getRoles();">Create A New Manager User</button>
	                  </div> 
	                  <input type="hidden" name="hid_userName" />
                </div>
            </div>
            
             <div class="row">
            	<div class="col-md-12">
            		<form class="form-inline form-style" role="form">
						<div class="form-group">
							<label class="sr-only" for="name">User Name</label>
							<input type="text" class="form-control" id="email" name="select_name"
								   placeholder="User name">
						</div>
						<div class="form-group">
							<label class="sr-only" for="name">Email</label>
							<input type="text" class="form-control" id="number" name = "select_email" 
								   placeholder="Email">
						</div>
						<div class="form-group">
							<label class="sr-only" for="name">Full Name</label>
							<input type="text" class="form-control" id="number" name = "select_full_name" 
								   placeholder="Full name">
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

<div class="modal fade" id="addManagerModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Add A Manager User
				</h4>
			</div>
			<div class="modal-body">
				<form>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userNameAdd">User Name:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userNameAdd" value="">
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
		                          <label class="control-label" for="userEmailAdd">Email:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userEmailAdd" value="">
		                    </div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userFullNameAdd">Full Name:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userFullNameAdd" value="">
		                    </div>
						</div>
					</div>
					
					<div class="row">
						<div class="col-sm-6">
							 <div class="form-group">
		                          <label class="control-label" for="userContactNumberAdd">Contact Number:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userContactNumberAdd" value="">
		                    </div>   
						</div>
						<div class="col-sm-6">
							<div class="form-group">
		                        <label class="control-label" for="userRoleSelect">Selects</label>
		                        <select class="form-control" id="userRoleSelect">
									<option><span class="sr-only">Loading Data...</span></option>
		                        </select>
		                    </div>  
						</div>
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
					Edit A Manager User
				</h4>
				<input type="hidden" value="" id="toEditUserID" />
			</div>
			<div class="modal-body">
				<form>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userNameEdit">User Name:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userNameEdit" value="" readonly="readonly">
		                    </div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
		                       <label class="control-label" for="userContactNumberEdit">Role:</label>  
		                       <input type="text" id="userRoleSelectEdit" class="form-control" readonly="readonly"/>
		                    </div>  
						</div>
					</div>
					
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="userEmailEdit">Email:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="userEmailEdit" value="">
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

</body>
</html>