<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Shipping Fees</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/shippingFeesManagement.js"></script>
<!-- <script src="../plugin/treeview/bootstrap-treeview.js"></script> -->
<!-- <link href="../plugin/treeview/bootstrap-treeview.css" rel="stylesheet"> -->
<!-- <script src="../plugin/fileinput/js/fileinput.js"></script> -->
<!-- <link href="../plugin/fileinput/css/fileinput.css" rel="stylesheet">  -->
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 347px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Shipping Fees Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-2">
	                  <div class="btn-add-order">
	                      <button data-toggle="modal" data-target="#addShippingFeesModal" class="btn btn-success">Create New Shipping Fees</button>
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
							<input type="text" class="form-control" id="email" name="select_name"
								   placeholder="Item Name">
						</div>
						<!-- <div class="form-group">
							<label class="sr-only" for="name">Contact Number</label>
							<input type="text" class="form-control" id="number" name = "select_charges" 
								   placeholder="Charges">
						</div> -->
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

<div class="modal fade" id="addShippingFeesModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Add A Shipping Fees
				</h4>
			</div>
			<div class="modal-body">
					<form class="form-content-category">
						<div class="form-group">
							<label class="control-label" for="shippingFeesItemNameAdd">Item Name:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipShippingFeesItemNameAdd displayNone"></label> 
							<input type="text" class="form-control" id="shippingFeesItemNameAdd" name="" value="" />
						</div>
						<div class="form-group">
							<label class="control-label" for="shippingFeesChargesAdd">Charges:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipShippingFeesChargesAdd displayNone"></label> 
							<input type="text" class="form-control" id="shippingFeesChargesAdd" name="" value="" />
						</div>
					</form>
				</div>
			<div class="modal-footer addShippingFeesFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel
				</button>
				<button type="button" class="btn btn-primary category-btn" onclick="javascript:void(0);saveShippingFees();">Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="deleteModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content"> 
			<div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
				&times;
			   </button>
                   <h4 id="myModalLabel" contenteditable="true">Delete Confirmation</h4>
            </div>
			<div class="modal-body warning-info-text">
                  <i class="glyphicon glyphicon-question-sign"></i>  Are you sure to remove the selected item?
                  <input type="hidden" value="" id="toDeleteItemID" />
            </div>
			<div class="modal-footer deleteModalFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal">No
				</button>
				<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteShippingFees();">Yes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="editShippingFeesModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Edit A Shipping Fees
				</h4>
				<input type="hidden" value="" id="toEditShippingFees" />
			</div>
			<div class="modal-body">
					<form class="form-content-category">
						<div class="form-group">
							<label class="control-label" for="shippingFeesItemNameEdit">Item Name:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipShippingFeesItemNameEdit displayNone"></label> 
							<input type="text" class="form-control" id="shippingFeesItemNameEdit" name="" value="" />
						</div>
						<div class="form-group">
							<label class="control-label" for="shippingFeesChargesEdit">Charges:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipShippingFeesChargesEdit displayNone"></label> 
							<input type="text" class="form-control" id="shippingFeesChargesEdit" name="" value="" />
						</div>
					</form>
				</div>
			<div class="modal-footer editShippingFeesFooter">
				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel
				</button>
				<button type="button" class="btn btn-primary category-btn" onclick="javascript:void(0);saveEditShippingFees();">Save</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>


<div class="modal fade" id="loadingModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-dialog-or">
			<div class="">
				<div style="width: 0%; padding-top: 25%;" class="container">
					<div class="">
						<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i><span
							class="sr-only">Processing...</span>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
	</div>
	<!-- /.modal -->
		
	 
</div> 
</body>
</html>