<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Category</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/categoryManagement.js"></script>
<script src="../plugin/treeview/bootstrap-treeview.js"></script>
<link href="../plugin/treeview/bootstrap-treeview.css" rel="stylesheet">
<script src="../plugin/fileinput/js/fileinput.js"></script>
<link href="../plugin/fileinput/css/fileinput.css" rel="stylesheet"> 
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 347px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Category Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-md-2">
	                  <div class="">
	                  	  <a class="btn btn-success" onclick="javascript:void(0);openAddCategory();" href="#addCategoryModal" >Create New Category</a>
	                  </div> 
                </div>
            </div>
            <div class="row">
            	<div class="col-md-12">
            		<form class="form-inline form-style" role="form">
						<!-- <div class="form-group">
							<label class="sr-only" for="name">Category</label>
							<select class="form-control" id="select_category">
								<option><span class="sr-only">Category</span></option>
                            </select>
						</div> -->
						<div class="form-group">
							<label class="sr-only" for="name">Category</label>
							<input type="text" class="form-control" id="email" name="select_category"
								   placeholder="Category">
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
<div class="modal fade" id="addCategoryModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Add A Category
				</h4>
			</div>
			<div class="modal-body">
					<form class="form-content-category" style="margin: 0px 20px 200px 20px !important;">
						<div class="form-group">
							<label class="control-label" for="categoryAdd">Category	Name:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipCategoryAdd displayNone"></label> 
							<input type="text" class="form-control" id="categoryAdd" name="" value="" />
						</div>
						<div class="form-group">
							<label class="control-label" for="parentCategoryAdd">Parent Category:</label> 
							<label class="errorTip errorTipParentCategoryAdd displayNone"></label>
							<select class="form-control" id="parentCategoryAdd">
									<option><span class="sr-only">Loading Data...</span></option>
                            </select>
						</div>
						<!-- <div class="form-group" id = "addImgInput">
							<label class="control-label" for="categoryImageAdd">Category Image:</label> 
							<input type="file" class="file" id="categoryImageAdd" />
						</div> -->
						<div class="form-group">
							<div class="col-md-12" id="addProductImgsInput">
								<label class='control-label' for='categoryImageAdd'>Category Image:
								</label>
								<div class='row ' style='padding-top:20px;'>
									<div class='upload-group upload-opr'>
										<div class='upload-style'>
											<span class='upload-text'></span>
											<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>
										</div>
									</div>
									
									<div class="show-image">
										<i class="fa fa-close ic opc close-img"></i>
										<img id="show" src="">
									</div>
									
								</div>
							</div>
						</div>

					</form>
				</div>
			<div class="modal-footer addCategoryModalFooter">
			<button type='button' class='btn btn-default' data-dismiss='modal'
			 onclick='javascript:void(0);cancelDialog();'>Cancel</button>
			<button type='button' class='btn btn-primary save-category'>Save</button>
<!-- 				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel -->
<!-- 				</button> -->
<!-- 				<button type="button" class="btn btn-default btn-orange category-btn" onclick="javascript:void(0);saveCategory();">Save</button> -->
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="editCategoryModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
				<button onclick="javascript:void(0);cancelDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title" id="myModalLabel">
					Edit A Category
				</h4>
			</div>
			<div class="modal-body">
					<form class="form-content-category">
						<div class="form-group">
							<label class="control-label" for="categoryEdit">Category Name:</label><span class="required-star-tip">*</span> 
							<label class="errorTip errorTipCategoryEdit displayNone"></label> 
							<input type="text" class="form-control" id="categoryEdit" name="" value="" />
						</div>
						<div class="form-group">
							<label class="control-label" for="parentCategoryEdit">Parent Category:</label> 
							<label class="errorTip errorTipParentCategoryEdit displayNone"></label>
							<input type="hidden" class="form-control" id="categoryOldPidEdit" value=""/>
							<select class="form-control" id="parentCategoryEdit">
									<option><span class="sr-only">Loading Data...</span></option>
                            </select>
						</div>
						<!-- <div id = "editImgInput" class="form-group">
							<label class="control-label" for="categoryImageEdit">Category Image:</label> 
							<input id="categoryImageEdit" name="" type="file" multiple=true class="file-loading">
							<input type="file" class="file" id="categoryImageEdit" />
						</div> -->
						<div class="form-group form-group-product">
							<div class="col-md-12" id="editProductImgsInput">
								<label class='control-label' for='productImagesAdd'>Category Images </label>
								<div class='row' style='padding-top:20px;'>
									<div class='upload-group2'  onmouseover='test_mouseover();' onmouseout='test_moverout();'>
										<div class='upload-style2'>
											<span class='upload-text'></span>
											<input class='upload-file' type='file' accept='image/jpeg, image/png' id='upload1'>
										</div>
									</div>
									
									<div class="show-image2">
										<i class="fa fa-close ic opc close-img"></i>
										<img id="show2" src="">
									</div>
									
								</div>
							</div>
							
						</div>
						
						<div class="form-group" style="margin-top: 210px;">
							<div class="alert alert-warning alert-dismissable">
						            When the delete button is clicked, the image will be permanently deleted！
						     </div>
						</div>

					</form>
				</div>
			<div class="modal-footer editCategoryModalFooter">
<!-- 				<button type="button" class="btn btn-default" data-dismiss="modal" onclick="javascript:void(0);cancelDialog();">Cancel -->
<!-- 				</button> -->
<!-- 				<button type="button" class="btn btn-default btn-orange category-btn" onclick="javascript:void(0);saveCategoryEdit();">Save</button> -->
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="deleteIsLastCategoryModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">No
				</button>
				<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteCategory();">Yes</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<div class="modal fade" id="deleteNotLastCategoryModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-header">
                   <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
				&times;
			   </button>
                   <h4 id="myModalLabel" contenteditable="true">Delete Warning</h4>
            </div>
			<div class="modal-body warning-info-text">
                  <i class="glyphicon glyphicon-exclamation-sign"></i>  This category includes other categories, it can't be DELETED!
                  <input type="hidden" value="" id="toDeleteItemID" />
            </div>
			<div class="modal-footer">
<!-- 				<button type="button" class="btn btn-default" data-dismiss="modal">No -->
<!-- 				</button> -->
				<button type="button" class="btn btn-primary" onclick="javascript:void(0);closeNotLastCategoryModal();">Close</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- <div class="modal fade" id="categoryTreeModalAdd" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> -->
<!-- 	<div class="modal-dialog-tree"> -->
<!-- 		<div class="modal-content"> -->
<!-- 			<div class="modal-header"> -->
<!-- 				<button onclick="javascript:void(0);cancelTreeDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true"> -->
<!-- 					&times; -->
<!-- 				</button> -->
<!-- 				<h4 class="modal-title" id="myModalLabel"> -->
<!-- 					Select Parent Category -->
<!-- 				</h4>  -->
<!-- 			</div> -->
<!-- 			<div class="modal-body"> -->
<!-- 				<div id="treeviewAdd"></div> -->
<!-- 			</div> -->
<!-- 			<div class="modal-footer"> -->
<!-- 				<button type="button" class="btn btn-default btn-orange" data-dismiss="modal" onclick="javascript:void(0);cancelTreeDialog();">Yes -->
<!-- 				</button> -->
<!-- <!-- 				<button type="button" class="btn btn-primary" onclick="javascript:void(0);cancelDialog();">OK</button> --> -->
<!-- 			</div> -->
<!-- 		</div>/.modal-content -->
<!-- 	</div>/.modal -->
<!-- </div> -->
<!-- <div class="modal fade" id="categoryTreeModalEdit" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> -->
<!-- 	<div class="modal-dialog-tree"> -->
<!-- 		<div class="modal-content"> -->
<!-- 			<div class="modal-header"> -->
<!-- 				<button onclick="javascript:void(0);cancelTreeDialog();" type="button" class="close" data-dismiss="modal" aria-hidden="true"> -->
<!-- 					&times; -->
<!-- 				</button> -->
<!-- 				<h4 class="modal-title" id="myModalLabel"> -->
<!-- 					Select Parent Category -->
<!-- 				</h4>  -->
<!-- 			</div> -->
<!-- 			<div class="modal-body"> -->
<!-- 				<div id="treeviewEdit"></div> -->
<!-- 			</div> -->
<!-- 			<div class="modal-footer"> -->
<!-- 				<button type="button" class="btn btn-default btn-orange" data-dismiss="modal" onclick="javascript:void(0);cancelTreeDialog();">Yes -->
<!-- 				</button> -->
<!-- <!-- 				<button type="button" class="btn btn-primary" onclick="javascript:void(0);cancelDialog();">OK</button> --> -->
<!-- 			</div> -->
<!-- 		</div>/.modal-content -->
<!-- 	</div>/.modal -->
<!-- </div> -->
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

<div class="modal fade" id="forbiddenDeleteModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					&times;
				</button>
				<h4 class="modal-title">
					The Category already has related products or orders,<br/> you cannot delete or modify the category!
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