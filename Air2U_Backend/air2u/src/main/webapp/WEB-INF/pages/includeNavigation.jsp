        <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<script src="../js/navigation.js"></script>
        <!-- Navigation -->
         <nav class="navbar navbar-default navbar-static-top topNavigationBG" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header topMenuBG">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topmenA" href="../admin/roles">AquaPower</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right topMenuBG">
                <li class="dropdown">
                    <a class="dropdown-toggle topmenA" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                    	<li style="cursor:hand;"><a href="#" onclick='ShowProfileFunction()' ><i class="fa fa-user fa-fw"></i> User Profile</a></li>
						<li class="divider"></li>
                        <li><a href="../main/login"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar " role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav side-menu-root side-menu-hidden" id="side-menu">
                        <li>
                            <a href="../admin/roles" class="Admin-Role"> Role </a>
                        </li>
                        <li>
                            <a href="../admin/adminCustomers" class="Admin-CustomerUser"> Customer Users </a>
                        </li>
                        
                        <li>
                            <a href="../admin/adminManagers" class="Admin-ManagerUser"> Manager Users </a>
                        </li>
                        
                        <li>
                            <a href="../admin/adminUsers" class="Admin-AdminUser"> Admin Users </a>
                        </li>
                        
                        <li>
                            <a href="../admin/loyaltyPoints" class="Admin-LoyaltyPoint">Loyalty Point Management  </a>
                        </li>
                        
						<li>
                            <a href="../admin/points" class="Admin-PointRule"> Loyalty Point Rule</a>
                        </li>
                        <li>
                            <a href="../admin/category" class="Admin-Category"> Category Management </a>
                        </li> 
						<li>
                            <a href="../admin/product" class="Admin-Product"> Product Management </a>
                        </li>
						<li>
                            <a href="../admin/orders" class="Admin-Order"> Orders </a>
                        </li>
                        <li>
                            <a href="../admin/taxation" class="Admin-Taxation"> Taxation Management </a>
                        </li>
                        <li>
                            <a href="../admin/shippingFees" class="Admin-Shipping-Fees"> Shipping Fees Management </a>
                        </li>
                         <li>
                            <a href="../admin/pushNotification" class="Admin-Notification"> Notification Services </a>
                        </li>
                        <!-- <li>
                            <a href="#" class="Admin-Messaging"> Online Messaging </a>
                        </li> -->
                    </ul>
                    
                    <ul class="nav side-menu-admin side-menu-hidden" id="side-menu"> 
                        <li>
                            <a href="../admin/loyaltyPoints" class="Admin-LoyaltyPoint">Loyalty Point Management  </a>
                        </li>
                        
						<li>
                            <a href="../admin/points" class="Admin-PointRule"> Loyalty Point Rule</a>
                        </li>
                        <li>
                            <a href="../admin/category" class="Admin-Category"> Category Management </a>
                        </li> 
						<li>
                            <a href="../admin/product" class="Admin-Product"> Product Management </a>
                        </li>
						<li>
                            <a href="../admin/orders" class="Admin-Order"> Orders </a>
                        </li>
                        <li>
                            <a href="../admin/taxation" class="Admin-Taxation"> Taxation Management </a>
                        </li>
                        <li>
                            <a href="../admin/shippingFees" class="Admin-Shipping-Fees"> Shipping Fees Management </a>
                        </li>
                         <li>
                            <a href="#" class="Admin-Notification"> Notification Services </a>
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>
        
        
        <div class="modal fade" id="updateProfileModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog-or">
				<div class="modal-content">
					<div class="modal-header">
						<button onclick='javascript:void(0);cancelDialog2();' type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							Update Profile
						</h4>
					</div>
					<div class="modal-body">
						<form>
		                    <!-- <div class="form-group">
		                          <label class="control-label" for="emailEdit">Email:</label>
		                          <span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="emailEdit" value="" readonly="readonly">
		                    </div> -->
		                    
		                    <div class="form-group">
		                          <label class="control-label" for="usernameEdit">Username:</label>
		                          <span class="required-star-tip">*</span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="usernameEdit" value="" readonly="readonly">
		                    </div>
		                     
		                    <div class="form-group">
		                          <label class="control-label" for="fullNameEdit">Full Name:</label>
		                          <span class="required-star-tip"></span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="fullNameEdit" value="">
		                    </div>
		                    
		                    <div class="form-group">
		                          <label class="control-label" for="contactNumberEdit">Contact Number:</label>
		                          <span class="required-star-tip"></span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="contactNumberEdit" value="">
		                    </div>
		                    
		                    <div class="form-group">
		                          <label class="control-label" for="homeAddressEdit">Home Address:</label>
		                          <span class="required-star-tip"></span>      <label class="errorTip displayNone"></label>
		                          <input type="text" class="form-control" id="homeAddressEdit" value="">
		                    </div> 
				        </form>
					</div>
					<div class="modal-footer updateProfileModalFooter">
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>