<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<c:import url = "includeHeader.jsp"></c:import>
	<script language="javascript">
		function showResetModal(){
		$('#resetModal').modal('show');
		}
		$('#calendar').fullCalendar({ 
				header: {
		        //left: 'prev,next today myCustomButton',
		        //center: 'agendaDay',
		        //right: 'month,agendaWeek,agendaDay'
		    },
		    weekends: false,
			dayClick: function(date, jsEvent, view) {
		
		        //alert('Clicked on: ' + date.format());
		
		        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
		
		        //alert('Current view: ' + view.name);
				
				$('#myModal').modal('show');
		
		        // change the day's background color just for fun
		        //$(this).css('background-color', 'red');
		
		    },
			eventClick: function(calEvent, jsEvent, view) {
		
		        //alert('Clicked on: ' + date.format());
		
		        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
		
		        //alert('Current view: ' + view.name);
				
				$('#myModal').modal('show');
		
		        // change the day's background color just for fun
		        //$(this).css('background-color', 'red');
		
		    },
			events: [
			  {
				title: 'Lunch Menu Created',
				start: '2016-01-12'
			  },
			  {
				title: 'Theme is Mexican',
				start: '2016-01-12'
			  },
			  {
				title: 'Lunch Menu Created',
				start: '2016-01-27'
			  },
			  {
				title: 'Theme is Chinese',
				start: '2016-01-27'
			  },
			  {
				title: 'Lunch Menu Created',
				start: '2016-02-10'
			  },
			  {
				title: 'Theme is Japanese',
				start: '2016-02-10'
			  }
			]
		}); 

	</script>
</head>

<body>

		<c:import url = "includeNavigation.jsp"></c:import>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Lunch Program Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">90</div>
                                    <div>Orders Yesterday</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-support fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">2</div>
                                    <div>Wasted Yesterday</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-tasks fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">435</div>
                                    <div>Orders Last Week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
				<div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-support fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge">20</div>
                                    <div>Wasted Last Week</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>				
            </div>
			
			<div class="row">
				<div id="calendar" style="width:80%;"></div>
			</div>
			
            <!-- /.row -->
            <div class="row">
                <!-- /.col-lg-8 -->
                <div class="col-lg-4">
                    <!-- /.panel -->
                    <!-- /.panel -->
                    <!-- /.panel .chat-panel -->
                </div>
                <!-- /.col-lg-4 -->
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
							<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                                <div class="modal-dialog" style="width:950px; max-height:850px;">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 class="modal-title" id="myModalLabel">Please create the menu for this day.</h4>
                                        </div>
                                        <div class="modal-body">
											<div class="panel-body">
												<!-- Nav tabs -->
												<ul class="nav nav-pills">
													<li class="active"><a href="#theme-pills" data-toggle="tab" aria-expanded="false">Theme</a>
													</li>
													<li class=""><a href="#dish-pills" data-toggle="tab" aria-expanded="true">Dishes</a>
													</li>
												</ul>

												<!-- Tab panes -->
												<div class="tab-content">
													<div class="tab-pane fade active in" id="theme-pills">
														<div class="panel panel-default">
															<div class="panel-heading">
																Set Theme:
															</div>
															<!-- /.panel-heading -->
															<div class="panel-body">
																<div class="table-responsive">
																	<table class="table table-striped table-bordered table-hover">
																		<thead>
																			<tr>
																				<th>Theme Name</th>
																				<th>Photo</th>
																				<th>Description</th>
																				<th></th>
																				<th></th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td><input class="form-control"></td>
																				<td><input type="file"></td>	
																				<td><input class="form-control"></td>
																				<td><a><p class="fa fa-align-justify"> Save </p></a></td>	
																				<td><a><p class="fa fa-times"> Cancel </p></a></td>	
																			</tr>															
																		</tbody>
																	</table>
																</div>
																<!-- /.table-responsive -->
															</div>
															<div class="panel-heading">
																Current Theme:
															</div>
															<div class="panel-body">
																<div class="table-responsive">
																	<table class="table table-striped table-bordered table-hover">
																		<thead>
																			<tr>
																				<th>Theme Name</th>
																				<th>Photo</th>
																				<th>Description</th>
																				<th></th>
																				<th></th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>Mexican</td>
																				<td><img src="../img/M.jpg"></img></td>	
																				<td><input class="form-control"></td>
																				<td><a><p class="fa fa-align-justify"> Edit </p></a></td>	
																				<td><a><p class="fa fa-times"> Delete </p></a></td>
																			</tr>															
																		</tbody>
																	</table>
																</div>
																<!-- /.table-responsive -->
															</div>
															<!-- /.panel-body -->
														</div>
													</div>
													<div class="tab-pane fade" id="dish-pills">
															<div class="panel panel-default">
																<div class="panel-heading">
																	Add dish:
																</div>
																<!-- /.panel-heading -->
																<div class="panel-body">
																	<!-- Nav tabs -->
																	<ul class="nav nav-tabs">
																		<li class="active"><a href="#home" data-toggle="tab" aria-expanded="true">Normal</a>
																		</li>
																		<li class=""><a href="#profile" data-toggle="tab" aria-expanded="false">From Template</a>
																		</li>
																	</ul>

																	<!-- Tab panes -->
																	<div class="tab-content">
																		<div class="tab-pane fade active in" id="home">
																			<div class="table-responsive">
																				<table class="table table-striped table-bordered table-hover">
																					<thead>
																						<tr>
																							<th>Name</th>
																							<th>Category</th>
																							<th>Price</th>
																							<th>Photo</th>
																							<th>Vendor Name</th>
																							<th></th>
																							<th></th>
																						</tr>
																					</thead>
																					<tbody>
																						<tr>
																							<td><input class="form-control"></td>
																							<td>
																								<select class="form-control">
																									<option>Appetizers</option>
																									<option>Seafood</option>
																									<option>Meat</option>
																									<option>Vegetarian</option>
																									<option>Dessert</option>
																								</select>
																							</td>
																							<td><input class="form-control"></td>
																							<td><input type="file"></td>	
																							<td>
																								<select class="form-control">
																									<option>Spring Creek</option>
																									<option>Taco Bell</option>
																								</select>
																							</td>																							
																							<td><a><p class="fa fa-align-justify"> Save </p></a></td>	
																							<td><a><p class="fa fa-times"> Cancel </p></a></td>	
																						</tr>															
																					</tbody>
																				</table>
																			</div>
																		</div>
																		<div class="tab-pane fade" id="profile">
																			<h4>Please select a template you'd like to</h4>
																			<select class="form-control">
																									<option>template 0001</option>
																									<option>template 0002</option>
																									<option>template 0003</option>
																									<option>template 0004</option>
																									<option>template 0005</option>
																			</select>
																		</div>
																	</div>
																</div>
																<div class="panel-body">

																	<!-- /.table-responsive -->
																</div>
																<!-- /.panel-body -->
															</div>
															<div class="panel panel-default">
																<div class="panel-heading">
																	Dished:
																</div>
																<!-- /.panel-heading -->
																<div class="panel-body">
																	<div class="table-responsive">
																		<table class="table table-striped table-bordered table-hover">
																			<thead>
																				<tr>
																					<th>#</th>
																					<th>Name</th>
																					<th>Category</th>
																					<th>Price</th>
																					<th>Photo</th>
																					<th>Vendor Name</th>
																					<th></th>
																					<th></th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>1</td>
																					<td>Chicken Salad</td>
																					<td>Appetizers</td>
																					<td>$2</td>
																					<td><img src="../img/Chicken Salad.jpg" height="100px" width="100px"></img></td>	
																					<td>Taco Bell</td>																					
																					<td><a><p class="fa fa-align-justify"> Edit </p></a></td>	
																					<td><a><p class="fa fa-times"> Delete </p></a></td>	
																				</tr>
																				<tr>
																					<td>2</td>
																					<td>Special Beef</td>
																					<td>Appetizers</td>
																					<td>$3</td>
																					<td><img src="../img/Special Beef.jpg" height="100px" width="100px"></img></td>	
																					<td>Taco Bell</td>
																					<td><a><p class="fa fa-align-justify"> Edit </p></a></td>	
																					<td><a><p class="fa fa-times"> Delete </p></a></td>	
																				</tr>																
																			</tbody>
																		</table>
																	</div>
																	<!-- /.table-responsive -->
																</div>
																</div>
																<!-- /.panel-body -->
															</div>
														</div>
														<div class="modal-footer">
															<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
															<button type="button" class="btn btn-success">Save</button>
															<button type="button" class="btn btn-success">Save and Create as Template</button>
														</div>
													</div>
												</div>
											</div>
										
										
										
										
										
										
										
										
										
							

                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
							<div class="modal fade" id="resetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                                <div class="modal-dialog" style=" max-height:850px;">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                            <h4 class="modal-title" id="myModalLabel">Rest Password</h4>
                                        </div>
                                        <div class="modal-body">
											<div class="table-responsive">
												<table class="table table-striped table-bordered table-hover">
													<tbody>
														<tr>
															<td>New Password</td>
															<td><input class="form-control" type="password" ></td>
														</tr>
														<tr>
															<td>Confirm The New Password</td>
															<td><input class="form-control" type="password" ></td>
														</tr>																													
													</tbody>
												</table>
											</div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn btn-success">Save</button>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>

</body>
</html>