<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Order Details</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminOrderDetailAndPrint.js"></script>
</head>
<body>
<div id="wrapper">
        <div style="min-height: 350px;" id="page-wrapper-balance">
            <div class="row">
                <div class="col-lg-12 textalign">
                    <h1 class="page-header">Order Details</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
			<div class="row">
                <div class="col-lg-12">
                	<div class="panel panel-default">
						<div class="panel-heading" style="background-color: #337ab7;">
			            	<h3 class="panel-title" style="color: #fff;">Order Information:</h3>
			            </div>
	                    <div class="table-responsive">
		                     <table class="table" id="orderInfos">
		                         <thead>
		                             <tr>
		                                 <th width='20%'>Order Number</th>
		                                 <th width='20%'>CreatedAt</th>
		                                 <th width='20%'>Total Price</th>
		                                 <th width='20%'>Tax / Rate</th>
		                                 <th width='20%'>Status</th>
		                             </tr>
		                         </thead>
		                         <tbody>
		                        	 <tr>
		                         		<td colspan="5"><i class="fa fa-spinner fa-spin"></i> <span class="sr-only">Loading...</span></td>
		                         	 </tr>		                         
		                         </tbody>
		                     </table>						
	               		</div>
               		</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                	<div class="panel panel-default">
						<div class="panel-heading" style="background-color: #337ab7;">
				            	<h3 class="panel-title" style="color: #fff;">Customer Information:</h3>
			            </div>
	                    <div class="table-responsive">
		                     <table class="table" id="customerInfos">
		                         <thead>
		                             <tr>
		                                 <th width='20%'>Customer Name</th>
		                                 <th width='20%'>Email</th>
		                                 <th width='20%'>Home Address</th>
		                                 <th width='20%'>Delivery Address</th>
		                                 <th width='20%'>Contact Number</th>
		                             </tr>
		                         </thead>
		                         <tbody>
		                        	 <tr>
		                         		<td colspan="5"><i class="fa fa-spinner fa-spin"></i> <span class="sr-only">Loading...</span></td>
		                         	 </tr>		                         
		                         </tbody>
		                     </table>						
	               		</div>
               		</div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                	<div class="panel panel-default">
						<div class="panel-heading" style="background-color: #337ab7;">
				            	<h3 class="panel-title" style="color: #fff;">Products:</h3>
		            	</div>
	                    <div class="table-responsive">
		                     <table class="table" id="productsInfos">
		                         <thead>
		                             <tr>
		                                 <th width='20%'>Product</th>
		                                 <th width='20%'>Description</th>
		                                 <th width='20%'>Unit Price</th>
		                                 <th width='20%'>QTY</th>
		                                 <th width='20%'>Subtotal</th>
		                             </tr>
		                         </thead>
		                         <tbody>
		                        	 <tr>
		                         		<td colspan="5"><i class="fa fa-spinner fa-spin"></i> <span class="sr-only">Loading...</span></td>
		                         	 </tr>
		                         </tbody>
		                     </table>						
	               		</div>
	               	</div>
                </div>
            </div>
        </div>
</div>

<input id="orderIDValue" type="hidden" value="${orderId}">
</body>
</html>