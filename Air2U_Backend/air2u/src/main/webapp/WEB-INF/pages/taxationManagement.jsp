<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Taxation</title>
<c:import url="includeHeader.jsp"></c:import>
 
<script src="../js/taxationManagement.js"></script>
</head>
<body>
	<div id="wrapper">
		<c:import url="includeNavigation.jsp"></c:import>
		<div style="min-height: 347px; " id="page-wrapper">
			<div class="row">
				<div class="col-lg-12">
					<h1 class="page-header">Taxation Management</h1>
				</div>
				<!-- /.col-lg-12 -->
			</div>
			<!-- /.row -->

			<div class="row col-lg-12">
				<form role="form">
					<div class="panel panel-default">
    						<div class="panel-body">
					
								<div class="row">
									<div class="col-md-5">
										<div class="col-md-4">
											<div class="form-group" style="width: 100%">
												<label class="control-label" for="notification1">Tax Status</label>
									            <div class="switch" data-on-label="SI" data-off-label="NO">
												    <input type="checkbox" id="taxStatus" name='"taxStatus"' onclick='gettaxstatus();' checked />
												</div>
											</div>
										</div>
										<div class="col-md-8">
											<div class="form-group">
												<label for="taxRate">Tax Rate:</label>
												<div class="input-group">
													<input type="hidden" id="taxRateID" value=""> 
													<input type="text" id="taxRate" class="form-control input-tax" disabled> 
													<span class="input-group-addon">%</span>
													
												</div>
											</div> 
										</div>
									</div>
							</div>
						 </div>
					    <div class="panel-footer">
					    	<div class="row">
								<div class="col-sm-9 col-offset-3">
									<div class="errorTip-tax displayNone"></div>
									<button id="editTaxRate"class="btn btn-success" type="button">Edit</button>
									<button id="saveTaxRate" class="btn btn-success hidden" type="button">Save</button>
									<button id="cancelTaxRate" class="btn btn-default hidden cancel-btn"  type="button" >Cancel</button>
									<div class="saveSpinner hidden">
										<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>
									</div>
								</div>
							</div>
					    </div>
					</div>
					
					
				</form>
				<!-- 				<form style="" class="form-horizontal"> -->
<!-- 					<div class="form-group" id="div1"> -->
<!-- 						<label class="col-md-1 control-label" for="inputError"> -->
<!-- 							Tax Rate: </label> -->
<!-- 						<div class="col-md-2"> -->
<!-- 							<input type="text" placeholder="" class="form-control" id="ipt1"> -->
<!-- 						</div> -->
<!-- 						<button type="button" class="btn btn-success">Save</button> -->
<!-- 						<button style="margin-left: 12px" type="button" -->
<!-- 							class="btn btn-success">Cancel</button> -->
<!-- 					</div> -->
<!-- 				</form> -->


				<!-- 				<div class="col-md-2 col-sm-offset-8"> -->
				<!-- 					<div class="pull-right"> -->
				<!-- 						<a class="btn btn-success" -->
				<!-- 							onclick="javascript:void(0);openAddProduct();" -->
				<!-- 							href="#addProductModal">Create New Product</a> -->
				<!-- 							                  	  <button type="button" class="btn btn-primary" onclick="javascript:void(0);saveCategory();">Save</button> -->
				<!-- 							                      <button type="button" onclick="javascript:void(0);addCategoryPage();" class="btn btn-success">Create New Category</button> -->
				<!-- 							                  	  <button data-toggle="modal" data-target="#addCategoryModal" class="btn btn-primary">Create New Category</button> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
				<!-- 				<div class="col-md-2"> -->
				<!-- 					<div class="btn-add-order" style="position: absolute; right: 15px;"> -->
				<!-- 						<a class="btn btn-success" -->
				<!-- 							onclick="javascript:void(0);openAddCategory();" -->
				<!-- 							href="#addCategoryModal">Create New Category</a> -->
				<!-- 					</div> -->
				<!-- 				</div> -->
			</div>
			 
		</div>
	</div>

</body>
</html>