<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Push Notification</title>
<c:import url="includeHeader.jsp"></c:import>
<script src="../js/adminPushNotification.js"></script>
</head>
<body>
<div id="wrapper">
	<c:import url="includeNavigation.jsp"></c:import>
        <div style="min-height: 347px; min-width: 1400px !important;" id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Push Notification</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row paddingTop20">
            </div>
            <!-- /.row -->
            <div class="row">
				<div class="col-lg-12">
                    <div class="panel panel-default" style="min-width: 1150px !important; overflow:auto;">
                        
                        <!-- /.panel-heading -->
                        <div class="panel-body tableDiv">
                            <div class="form-group">
							    <label for="name">Message:</label>
							    <textarea class="form-control" id="pushMessageBody" rows="6" placeholder="Please input message here..."></textarea>
							  </div>
							  <div class="row">
				                <div class="col-md-2 col-md-offset-10">
					                  <div class="btn-add-order  pull-right">
					                      <button class="btn btn-save btn-add btn-apply btn-success" onclick="pushNotification()">Push Notification</button>
					                  </div> 
				                </div>
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