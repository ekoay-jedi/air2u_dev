<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Air2U</title>
    

 	
<div class="modal fade" id="informationAlertModal" style="z-index:2000;" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog-or">
		<div class="modal-content">
			<div class="modal-body">
				<h2 class="modal-title">
					<p class="fa fa-warning alertWarnningColor"></p>
				</h2>
				<h5>
					Something is wrong with the server/Network, please refresh the page and try again. Please contact the administrator if need.
				</h5>
				<a data-toggle="collapse" href="#problemDetail">
					View Details
				</a>
				<div id="problemDetail" class="panel-collapse collapse">
					<div class="panel-body errorMessageInAlertModal">
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal" aria-hidden="true">OK</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>