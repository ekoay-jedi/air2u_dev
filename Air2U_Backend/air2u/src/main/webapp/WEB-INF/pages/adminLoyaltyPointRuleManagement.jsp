<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Admin Loyalty Point Rules</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminLoyaltyPointRuleManagement.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 350px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Loyalty Point Rule Management</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
			<div class="row">
                <div class="col-md-10">
                	<input id="defaultRuleID" type="hidden" value="">
                	<div class="row">
                		<div class="col-md-2">
                			<label>Rule Name:</label><span class="required-star-tip">*</span>
                		</div>
                		<div class="col-md-3 ">
		                    <div class="form-group">
		                    	<input type="hidden" id="oldDefaultRulesName" value="">
		                        <input type="text" id="defaultRulesName" class="form-control" disabled>
		                    </div>                  		
                		</div>
                		 <div class="col-md-7 errorTip4RulePoint displayNone">
		                         <span></span>
                		</div>
                	</div>
                	<div class="row">
                		<div class="col-md-2">
                			<label>CV(RM):</label><span class="required-star-tip">*</span>
                		</div>
                		<div class="col-md-3">
		                    <div class="form-group">
		                    	<input type="hidden" id="oldDefaultRulesCV" value="">
		                       <input type="text" id="defaultRulesCV" class="form-control" disabled>
		                    </div>                  		
                		</div>
                		<div class="col-md-7 errorTip4RulePoint displayNone">
		                         <span></span>
                		</div>
                	</div>
                	<div class="row">
                		<div class="col-md-2">
                			<label>Air pt:</label><span class="required-star-tip">*</span>
                		</div>
                		<div class="col-md-3">
		                    <div class="form-group">
		                    	<input type="hidden" id="oldDefaultRulesPV" value="">
		                        <input type="text" id="defaultRulesPV" class="form-control" disabled>
		                    </div>                  		
                		</div>
                		<div class="col-md-7 errorTip4RulePoint displayNone">
		                         <span></span>
                		</div>
                	</div>
                	<div class="row">
                		 
                		<div class="col-md-3 col-md-offset-2">
		                    <div class="form-group">
		                        <button id="editDefaultRules" class="btn btn-primary" onclick="javascript:void(0);edit2DefaultRules();">Edit</button>
		                        <button id="saveDefaultRules" class="btn btn-primary hidden" onclick="javascript:void(0);save2DefaultRules();">Save</button>
		                        <button id="cancelDefaultRules" class="btn btn-default cancel-btn hidden" onclick="javascript:void(0);cancel2DefaultRules();">Cancel</button>
		                    	<div class="savedefaultRuleSpinner hidden">
									<i class='fa fa-spinner fa-spin fa-2x fa-fw'></i><span class='sr-only'>Processing...</span>
								</div>
		                    </div>                  		
                		</div>
                	</div>
	                   
                </div>
                
            </div>
			<div class="row">
				<div class="col-md-2">
	                  <div class="btn-add-order">
	                      <button data-toggle="modal" data-target="#addModal" class="btn btn-save btn-add btn-apply btn-success">Create A New Point Rule</button>
	                  </div> 
                </div>
			</div>
			<!-- /.row -->
<!--             <div class="row"> -->
<!--                 <div class="col-md-2 col-md-offset-10"> -->
<!-- 	                  <div class="btn-add-order  pull-right"> -->
<!-- 	                      <button data-toggle="modal" data-target="#addModal" class="btn btn-save btn-add btn-apply btn-default btn-orange">Create A New Point Rule</button> -->
<!-- 	                  </div>  -->
<!--                 </div> -->
<!--             </div> -->
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
					Add A Point Rule
				</h4>
			</div>
			<div class="modal-body">
				<form>
					<div class="form-group">
                          <label class="control-label" for="ruleNameAdd">Rule Name:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
                          <input type="text" class="form-control" id="ruleNameAdd" value="">
                    </div>
                    
                    <div class="row">
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="ruleCVAdd">CV(RM ):</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="ruleCVAdd" value="">
		                    </div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
		                          <label class="control-label" for="rulePVAdd">Air pt:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="rulePVAdd" value="">
		                    </div>
						</div>
					</div>
					
                    <div class="row">
						<div class="col-sm-6">
							 <div class="form-group control-group">
		                          <label class="control-label" for="userFullNameAdd">Start Date:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
										<div class="input-group input-medium date form_datetime startDatePointRule"
											data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
											<input type="text" name="startDatePointRuleAdd"
												class="form-control at-date" placeholder="" readonly=""
												id="startDatePointRuleAdd"> <span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
										</div>
		                    </div>
						</div>
						<div class="col-sm-6">
							 <div class="form-group">
		                          <label class="control-label" for="endDatePointRuleAdd">End Date:</label><span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <div class="input-group input-medium date form_datetime endDatePointRule"
											data-date="" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
											<input type="text" name="endDatePointRuleAdd"
												class="form-control at-date" placeholder="" readonly=""
												id="endDatePointRuleAdd"> <span class="input-group-addon my-input-group-addon"><i class="fa fa-calendar" style="cursor: pointer;"></i></span>
							      </div>
		                    </div>   
						</div>
					</div>
                   
		        </form>
			</div>
			<div class="modal-footer addModalFooter">
				<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>
		    	<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveItem();'>Save</button>
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