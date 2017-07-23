<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Orders</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminOrdersManagement.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 350px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Order Management</h1>
                     <input type="hidden" name="currentPointRule" id="currentPointRule"/>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
           <!--  <div class="row">
                <div class="col-md-10">
                	<div class="row">
                		<div class="col-md-2">
                			View Date From:
                		</div>
                		<div class="col-md-3">
		                    <div class="form-group control-group">
										<div class="input-group input-medium date form_datetime startDateOrderFilter"
											data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
											<input type="text" name="startDateOrderFilterLink"
												class="form-control at-date" placeholder="" readonly=""
												id="startDateOrderFilterLink"> <span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
										</div>
		                    </div>                		
                		</div>
                	</div>
                	<div class="row">
                		<div class="col-md-2">
                			View Date To:
                		</div>
                		<div class="col-md-3">
		                    <div class="form-group control-group">
										<div class="input-group input-medium date form_datetime endDateOrderFilter"
											data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
											<input type="text" name="endDateOrderFilterLink"
												class="form-control at-date" placeholder="" readonly=""
												id="endDateOrderFilterLink"> <span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
										</div>
		                    </div>                		
                		</div>
                	</div>
                	<div class="row">
                		<div class="col-md-2">
                			Order Status:
                		</div>
                		<div class="col-md-3">
		                    <div class="form-group">
		                          <select class="form-control" id="orderFilterSelect">
		                         	<option value="-1"><span class="sr-only">Please Select A Status</span></option>
	 								<option value="0"><span class="sr-only">Unpaid</span></option>
									<option value="1"><span class="sr-only">Paid</span></option>
									<option value="2"><span class="sr-only">Canceled</span></option>
		                          </select>
		                    </div>                  		
                		</div>
                	</div>
	                  <div class="filterOrdersButtonDiv">
	                      <button class="btn btn-default" disabled="disabled" onclick="javascript:void(0);filterOrders();">Apply & Refresh</button>
	                  </div> 
                </div>
               
            </div> -->
			            
            <div class="row paddingTop20">
            </div>
            
            <div class="row">
           	     <div class="col-md-2">
	                  <div class="btn-add-order">
	                      <button data-toggle="modal"  data-target="#addModal" class="btn btn-save btn-add btn-apply btn-success" onclick="javascript:void(0);">Create A New Order</button>
	                  </div> 
                </div>
            </div>
            <div class="row paddingTop20">
            </div>
                     <div class="row">
            	<form class="form-inline form-style" role="form">
					<div class="form-group">
						<label class="" for="name">View Date From:</label>
	                    <div class="form-group control-group">
							<div class="input-group input-medium date form_datetime startDateOrderFilter"
								data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
								<input type="text" name="startDateOrderFilterLink"
									class="form-control at-date" placeholder="" readonly=""
									id="startDateOrderFilterLink"> 
									<span class=" input-group-addon" style="width: 40px;"  class="cleartime1" >
									<i class="fa fa-times" style="display: -webkit-box;margin-right: -40px !important;cursor: pointer;"></i></span>
									<span class="input-group-addon my-input-group-addon" style="padding-left: 15px;"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
							</div>
	                    </div>                		
					</div>
					<div class="form-group">
						<label class="" for="name">View Date To:</label>
	                    <div class="form-group control-group">
							<div class="input-group input-medium date form_datetime endDateOrderFilter"
								data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
								<input type="text" name="endDateOrderFilterLink"
									class="form-control at-date" placeholder="" readonly=""
									id="endDateOrderFilterLink">
								<span class=" input-group-addon" style="width: 40px;"  class="cleartime1" >
									<i class="fa fa-times" style="display: -webkit-box;margin-right: -40px !important;cursor: pointer;"></i></span>	
								 <span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
							</div>
	                    </div>                		
					</div>
					<div class="form-group">
						<label class="" for="name">Order Status</label>
						 <select class="form-control" id="orderFilterSelect">
                         	<option value="-1"><span class="sr-only">Please Select A Status</span></option>
								<option value="0"><span class="sr-only">Unpaid</span></option>
							<option value="1"><span class="sr-only">Paid</span></option>
							<option value="2"><span class="sr-only">Canceled</span></option>
                          </select>
					</div>
				</form>
            </div>
            <div class="row">
	           	<div class="col-md-12">
	           		<form class="form-inline form-style" role="form">
					    <div class="form-group">
							<label class="" for="name"><span style="color:red;">Or</span>  View Date At:</label>
		                    <div class="form-group control-group">
								<div class="input-group input-medium date form_datetime startDateOrderFilter2"
									data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
									<input type="text" name="startDateOrderFilterLink2"
										class="form-control at-date" placeholder="" readonly=""
										id="startDateOrderFilterLink2"> 
									<span class="input-group-addon" style="width: 40px;"  class="cleartime1" >
									<i class="fa fa-times" style="display: -webkit-box;margin-right: -40px !important;cursor: pointer;"></i></span>	
									<span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
								</div>
		                    </div>                		
						</div>
						
						<div class="form-group">
							<label class="sr-only" for="name">Order Number</label>
							<input type="text" class="form-control" id="name" name="select_ordernumber"
								   placeholder="Order Number">
						</div>
						<!-- <div class="form-group">
							<label class="sr-only" for="name">Customer Name</label>
							<input type="text" class="form-control" id="email" name="select_csname"
								   placeholder="Customer Name">
						</div> -->
						<div class="form-group">
							<label class="sr-only" for="name">Order Point</label>
							<input type="text" class="form-control" id="email" name="select_point"
								   placeholder="Order Point">
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
					Add A Order
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
                    
                   	<div class="row" style="border: 1px; border-color: #449d44; border-bottom-style: double;border-style: dashed;margin-left: 0px;margin-right: 0px;margin-top: 5px;padding-top: 5px;">
                   		<div class="col-sm-6">
                   			<div class="form-group">
		                          <label class="control-label" for="productsSelect">Product:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <select class="form-control" id="productsSelect">
									<option><span class="sr-only">Loading Data...</span></option>
			                      </select>
		                    </div>
                   		</div>
                   		
                   		<div class="col-sm-6">
	                   		<div class="form-group">
		                          <label class="control-label" for="productNum">Num:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="number" class="form-control" id="productNum" value="1">
		                    </div>
                   		</div>
                   		<div class="col-sm-6">
	                   		<div class="form-group">
		                          <label class="control-label" for="productPrice">Product Air pt:</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="productPv" value="" readonly="readonly">
		                    </div>
	                    
                   		</div>
                   		<div class="col-sm-6">
	                   		<div class="form-group">
		                          <label class="control-label" for="productPrice">Product CV(RM):</label>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="productCv" value="" readonly="readonly">
		                    </div>
                   		</div>
                   		
                   	</div>
                   	
                   	<div class="go-on-add-product"></div>
                    
                    <div class="row" style="margin-top: 10px; text-align: right;">
                    	<div class="col-sm-12" >
                    		<a class="btn btn-success btn-goon-add-product">Add Product</a>
                    	</div>
                    	
                    </div>
                    <input type="hidden" name="operationNum" value="1"/>
                   	<div class="form-group">
                          <label class="control-label" for="shippingFees">Shipping Fees:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <select class="form-control" id="shippingFees">
							<option><span class="sr-only">Loading Data...</span></option>
	                      </select>
                    </div>
                    
                    <input type="hidden" id="taxRateStatus" value=""/>
                    <input type="hidden" id="taxRateValue" value=""/>
                    
                    <div class="form-group">
                          <label class="control-label" for="orderStatusSelect">Order Status:</label>
                          <select class="form-control" id="orderStatusSelect" disabled="disabled">
							<option value="0"><span class="sr-only">Unpaid</span></option>
							<option value="1"><span class="sr-only">Paid</span></option>
							<option value="2"><span class="sr-only">Canceled</span></option>
                          </select>
                    </div>   
                    
                    <div class="form-group">
                          <label class="control-label" for="productPrice">Remark:</label>      <label class="errorTip displayNone"></label>
                   		  <textarea rows="" class="form-control" cols="" id="remark" placeholder="Please enter remark..."></textarea>
                    </div>
		                    
		        </form>
			</div>
			<div class="modal-footer addModalFooter">
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
					<div class="form-group">
                          <label class="control-label" for="userNameEdit">User Name:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userNameEdit" value="">
                    </div>
                    <!--
                    <div class="form-group">
                          <label class="control-label" for="userPasswordEdit">Password:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="password" class="form-control" id="userPasswordEdit" value="">
                    </div> -->
                    <div class="form-group">
                          <label class="control-label" for="userEmailEdit">Email:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userEmailEdit" value="">
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="userFullNameEdit">Full Name:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userFullNameEdit" value="">
                    </div>
                    <div class="form-group">
                          <label class="control-label" for="userContactNumberEdit">Contact Number:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userContactNumberEdit" value="">
                    </div>   
                    <div class="form-group">
                          <label class="control-label" for="userHomeAddressEdit">Home Address:</label>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="userHomeAddressEdit" value="">
                    </div>   
		        </form>
			</div>
			<div class="modal-footer editUserModalFooter">
				<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Cancel</button>
		    	<button type='button' class='btn btn-success' onclick='javascript:void(0);saveUserEdit();'>Save</button>
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

<div class="modal fade" id="editStatusModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick='javascript:void(0);cancelDialog();' type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					Edit Order Status
				</h4>
			</div>
			<div class="modal-body">
				<form>
                    <div class="form-group">
                          <label class="control-label" for="productPrice">Order Number:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="hidden" class="form-control" id="orderId" value="" readonly="readonly">
                          <input type="text" class="form-control" id="orderNumberEdit" value="" readonly="readonly">
                    </div>
                    
                    <div class="form-group">
                          <label class="control-label" for="orderStatusSelect">Order Status:</label>
                          <select class="form-control" id="orderStatusSelectEdit">
							<option value="0" selected>Unpaid</option>
							<option value="1">Paid</option>
							<option value="2">Canceled</option>
                          </select>
                    </div>   
		        </form>
			</div>
			<div class="modal-footer editModalFooter">
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


</body>
</html>