<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<c:import url = "includeHeader.jsp"></c:import>
	<script src="../js/login.js"></script>
</head>

<body class="login">

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In. </h3>
                    </div>
                    <div class="panel-body">
	                    <div class="form-group">
	                          <input type="text" class="form-control" placeholder="Username" id="username" value="">
	                    </div>
	                    <div class="form-group">
	                          <input type="password" class="form-control" placeholder="Password" id="password" value="">
	                    </div>
	                    <div class="loginAndErrorDiv">
	                    	<label class="errorTip displayNone">12121</label>
	                    	<a href="javascript:void(0);loginFunction();" class="btn btn-lg btn-success btn-block">Login</a>
	                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>