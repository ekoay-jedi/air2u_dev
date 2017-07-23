<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Loyalty Points Management</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminLoyaltyPointManagement.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 350px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Loyalty Point Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
           	<div class="row">
           		<div class="col-sm-12">
           			<div class="alert alert-info alert-dismissable">
			            <!-- <button type="button" class="close" data-dismiss="alert"
			                    aria-hidden="true">
			                &times;
			            </button> -->
			            
			            <button   class="btn btn-warning pull-right allocation-point" >Allocate by month</button>
			           	The time of every month's allocation for Loyalty Point is : the first day of every month.<br/>
			           	Please click the right button.
			           	
			        </div>
           		</div>
           	</div>
            <div class="row">
                <div class="col-md-2" style="margin-right: -50px;">
	                  <div class="">
	                  	  <button class="btn btn-save btn-add btn-apply btn-success" onclick="javascript:void(0);generateReport();">Generate Report</button>
	                  </div> 
                </div>
                <div class="col-md-3"> 
                     <div class="" style="right: 15px;">
                         <button data-toggle="modal" data-target="#addModal" class="btn btn-save btn-add btn-apply btn-success">Create New Allocation</button>
                     </div> 
                </div>
            </div>
            
            <div class="row">
            	<div class="col-md-12">
            		<form class="form-inline form-style" role="form">
						<!-- <div class="form-group">
							<label class="sr-only" for="name">Email</label>
							<input type="text" class="form-control" id="email" name="select_email"
								   placeholder="User email">
						</div> -->
						<div class="form-group">
							<label class="sr-only" for="name">Email</label>
							<input type="text" class="form-control" id="number" name = "select_desc" 
								   placeholder="Point allocation desc">
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

<div class="modal fade" id="addModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick='javascript:void(0);cancelDialog();' type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Add New Allocation
				</h4>
			</div>
			<div class="modal-body">
				<form>
                    <!-- <div class="form-group">
                          <label class="control-label" for="customersSelect">Customer:</label>
                          <span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <select class="form-control" id="customersSelect">
							<option><span class="sr-only">Loading Data...</span></option>
	                      </select>
                    </div> -->
                    <div class="form-group">
						<label class="cn-select-type">Customer User:</label>
						 <span class="required-star-tip">*</span>  <span style='color:red;' id='query-tip' ></span>    <label class="errorTip displayNone"></label>
						<div class="input-group">
							<input type="text" class="form-control" class="userName" id="userName"  placeholder="Please search user...">
							<input type="hidden" name="customersSelect" id="customersSelect"/>
							<span class="input-group-addon search-cs" style="padding: 0px 0px 0px 0px">
								<button aria-expanded="false" type="button"
									class="btn btn-default dropdown-toggle btn-select-user" id="select-user-when-click"
									data-toggle="dropdown" data-hover="dropdown"
									data-delay="1000" data-close-others="true">
									<i class="fa fa-search"></i>
								</button>
								<ul class="dropdown-menu customer-user-list" role="menu" style="width: 100%;">
								</ul>
							</span>
						</div>
						<span class="validate-tip-service-type"></span>
					</div>
                    <div class="form-group">
                          <label class="control-label" for="pointAllocationDescAdd">Point Allocation Description:</label>      <label class="errorTip displayNone"></label>
                         <textarea rows="" cols="" class="form-control" id="pointAllocationDescAdd"></textarea>
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="totalAmountAdd">Total Amount:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="totalAmountAdd" value="">
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="totalPointAdd">Total Point:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="totalPointAdd" value="">
                    </div>
                    <div class="row">
                    	<div class="col-md-4">
                    		 <div class="form-group">
		                          <label class="control-label" for="currentMthAdd">Current Mth:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="currentMthAdd" value="">
		                    </div>
                    	</div>
                    	<div class="col-md-4">
                    		 <div class="form-group">
		                          <label class="control-label" for="currentMth2Add">Current Mth+1:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="currentMth2Add" value="">
		                    </div>
                    	</div>
                    	<div class="col-md-4">
                    		 <div class="form-group">
		                          <label class="control-label" for="currentMth3Add">Current Mth+2:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="currentMth3Add" value="">
		                    </div>
                    	</div>
                    </div>
                    <div class="row">
	                    <div class="col-md-4">
                    		 <div class="form-group">
		                          <label class="control-label" for="currentMth4Add">Current Mth+3:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="currentMth4Add" value="">
		                    </div>
                    	</div>
                    	 <div class="col-md-4">
                    		 <div class="form-group">
		                          <label class="control-label" for="currentMth4Add">Current Mth+4:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="currentMth5Add" value="">
		                    </div>
                    	</div>
                    	 <div class="col-md-4">
                    	</div>
                    	
                    	
                    	
                    </div>
                    <div class="row">
                    	<div class="col-md-12">
                    		<label class="errorTip displayNone validSum"></label>
                    	</div>
                    </div>
		        </form>
			</div>
			<div class="modal-footer addModalFooter">
				<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>
		    	<button type='button' class='btn btn-primary' onclick='javascript:void(0);savePoint();'>Save</button>
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
					Show Point Allocation Details
				</h4>
			</div>
			<div class="modal-body">
					<div class="row">
	                    <div class="col-md-12">
	                    	<div class="form-group">
		                        <input type="hidden" name="orderNumber" id="orderNumber">
		                         <label class="control-label" for="userNameEdit">Customer Email:</label>     <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="agentId" value="" disabled="disabled">
		                   </div>
	                    </div>
	                    <!-- <div class="col-md-6">
		                    <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Customer Name:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="agentName" value="" disabled="disabled">
		                   </div>
	                    </div> -->
	                </div>
                   
                   <div class="form-group">
                         <label class="control-label" for="userNameEdit">Point Allocation Desc:</label>      <label class="errorTip displayNone"></label>
                         <textarea rows="" cols="" class="form-control" id="pointAllocationDescEdit" disabled="disabled"></textarea>
                   </div>
                   
                   <div class="row">
	                    <div class="col-md-6">
	                    	<div class="form-group">
		                         <label class="control-label" for="userNameEdit">Amount($):</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="amountEdit" value="" disabled="disabled">
		                   </div>
	                    </div>
	                    <div class="col-md-6">
	                    	<div class="form-group">
		                         <label class="control-label" for="userNameEdit">Total Point Allocated:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="totalPointEdit" value="" disabled="disabled">
		                   </div>
	                    </div>
	                </div>
                   
                   <div class="row">
	                    <div class="col-md-4">
		                    <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Current Mth:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="currentMth" value="" disabled="disabled">
		                   </div>
	                   </div>
	                   <div class="col-md-4">
		                    <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Current Mth2:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="currentMth2" value="" disabled="disabled">
		                   </div>
	                   </div>
	                   <div class="col-md-4">
		                   <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Current Mth3:</label>     <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="currentMth3" value="" disabled="disabled">
		                   </div>
	                   </div>
	               </div>
					
                   <div class="row">
	                    <div class="col-md-4">
	                      <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Current Mth4:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="currentMth4" value="" disabled="disabled">
		                   </div>
	                    </div>
	                    <div class="col-md-4">
	                      <div class="form-group">
		                         <label class="control-label" for="userNameEdit">Current Mth5:</label>      <label class="errorTip displayNone"></label>
		                         <input type="text" class="form-control" id="currentMth5" value="" disabled="disabled">
		                   </div>
	                    </div>
	                    <div class="col-md-4">
	                    </div>
	               </div>
                   
			</div>
			<div class="modal-footer editUserModalFooter">
				<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Close</button>
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