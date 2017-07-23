<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Roles</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminRolesManagement.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 347px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Roles Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-2">
	                  <div class="btn-add-order  ">
	                      <button data-toggle="modal" data-target="#addRoleModal" class="btn btn-save btn-add btn-apply btn-success">Create A New Role</button>
	                  </div> 
                </div>
            </div>
            
            <div class="row">
            	<div class="col-md-12">
            		<form class="form-inline form-style" role="form">
						<div class="form-group">
							<label class="sr-only" for="name">Role Name</label>
							<input type="text" class="form-control" id="email" name="select_role"
								   placeholder="Role name">
						</div>
						<div class="form-group">
							<label class="sr-only" for="name">Role Code</label>
							<input type="text" class="form-control" id="number" name = "select_code" 
								   placeholder="Role code">
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

<div class="modal fade" id="addRoleModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Add A Role
				</h4>
			</div>
			<div class="modal-body">
				<form>
					<div class="form-group">
                          <label class="control-label" for="roleNameAdd">Role Name:</label><span class="required-star-tip">*</span>      <label class="errorTip errorTipRoleNameAdd displayNone"></label>
                          <input type="text" class="form-control" id="roleNameAdd" value="">
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="roleCodeAdd">Role Code:</label><span class="required-star-tip">*</span>      <label class="errorTip errorTipRoleCodeAdd displayNone"></label>
                          <input type="text" class="form-control" id="roleCodeAdd" value="">
                    </div>
		        </form>
			</div>
			<div class="modal-footer addRoleModalFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel
				</button>
				<button type="button" class="btn btn-primary" onclick="javascript:void(0);saveRole();">Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="editRoleModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Edit A Role
				</h4>
				<input type="hidden" value="" id="toEditRoleID" />
			</div>
			<div class="modal-body">
				<form>
					<div class="form-group">
                          <label class="control-label" for="roleNameEdit">Role Name:</label><span class="required-star-tip">*</span>      <label class="errorTip errorTipRoleNameEdit displayNone"></label>
                          <input type="text" class="form-control" id="roleNameEdit" value="">
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="roleCodeEdit">Role Code:</label><span class="required-star-tip">*</span>      <label class="errorTip errorTipRoleCodeEdit displayNone"></label>
                          <input type="text" class="form-control" id="roleCodeEdit" value="">
                    </div>
		        </form>
			</div>
			<div class="modal-footer editRoleModalFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel
				</button>
				<button type="button" class="btn btn-primary" onclick="javascript:void(0);saveRoleEdit();">Save</button>
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
				<h4 class="modal-title" id="myModalLabel">
					Are you sure to remove the selected item?
				</h4>
				<input type="hidden" value="" id="toDeleteItemID" />
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">No
				</button>
				<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteRole();">Yes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

</body>
</html>