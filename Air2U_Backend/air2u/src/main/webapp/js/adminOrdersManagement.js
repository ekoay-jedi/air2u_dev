var count = 0;
var ip = "";
var browerType = "";
var operateSystem = "";
var userId = "";

var currentPage = 0;
var currentnum = 10;

$(document).ready(function() {
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Order').addClass("active");
	userId = $('#userIDValue').val();
	
	$('.endDateOrderFilter').datetimepicker({
    	linkField:"endDateOrderFilterLink",
    	format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		showMeridian: 1,
        pickerPosition:"bottom-left"
    });
	
	$('.startDateOrderFilter2').datetimepicker({
    	linkField:"startDateOrderFilterLink2",
    	format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		showMeridian: 1,
        pickerPosition:"bottom-left"
    });
	
	$('.startDateOrderFilter').datetimepicker({
    	linkField:"startDateOrderFilterLink",
    	format: 'yyyy-mm-dd',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		showMeridian: 1,
        pickerPosition:"bottom-left"
    });
	
	$("#startDateOrderFilterLink").val("");
	$("#endDateOrderFilterLink").val("");
	$("#orderFilterSelect").val("-1");
	
    $(window).scroll(function(){
    	$('.datetimepicker').css('display','none');
    });
    
    $.get("http://ipinfo.io", function(response) {
		ip = response.ip;
	}, "jsonp");
	 browerType = getBrower();
	 operateSystem = getOsVersion();
    
    
	loadPageContentData();
	
	//getCustomersList();
	getProductsList();
	getShippingFeesList();
	getCurrentTaxRate();
	getCurrentPointRule();
	
	$("#productsSelect").change(function(){
		var expand = {};
		var filter ={};
		var productId = $('#productsSelect').val();
		pullDataFromCloudFunction("Product/"+productId,"READ","",expand,writeDataToProductDetailsSelectorEdit,filter);
		
	});
	
	addModalSaveAndCancel();
	
	$(".btn-goon-add-product").bind('click',function(){
		var operationNum = $("input[name='operationNum']").val();
		operationNum = parseInt(operationNum)+1;
		$("input[name='operationNum']").val(operationNum);
		
		var str = "<div class='row' style='border: 1px; border-color: #449d44; border-bottom-style: double;border-style: dashed;margin-left: 0px;margin-right: 0px;margin-top: 5px;padding-top: 5px;'>" +
					"<div class='col-sm-6'>" +
						"<div class='form-group'>" +
							"<label class='control-label' for='productsSelect'>Product:</label><span class='required-star-tip'>*</span>" +
								"<select class='form-control' id='productsSelect"+operationNum+"'>" +
								"<option><span class='sr-only'>Loading Data...</span></option>" +
								"</select>" +
						"</div>" +
					"</div>" +
					"<div class='col-sm-6'>" +
						"<div class='form-group'>" +
							"<label class='control-label' for='productNum'>Num:</label><label class='errorTip displayNone'></label>" +
							"<input type='number' class='form-control' id='productNum"+operationNum+"' value='1'>" +
						"</div>" +
					"</div>" +
					"<div class='col-sm-6'>" +
						"<div class='form-group'>" +
							"<label class='control-label' for='productPrice'>Product Air pt:</label>" +
							" <input type='text' class='form-control' id='productPv"+operationNum+"' readonly='readonly'>" +
						"</div>" +
					"</div>" +
					"<div class='col-sm-6'>" +
						"<div class='form-group'>" +
							"<label class='control-label' for='productPrice'>Product CV(RM):</label>" +
							"<input type='text' class='form-control' id='productCv"+operationNum+"' readonly='readonly'>" +
						"</div>" +
					"</div>" +
				"</div>";
		
		$(".go-on-add-product").append(str);
		
		var expand = {};
		var filter ={};
		pullDataFromCloudFunction("Product","READ","",expand,function(data){
			var products = data.Result;
			var strBuffer = new StringBuffer(); 
			strBuffer.append("<option>Select Product...</option>");
			for (var index in products) {
				var productRow = products[index];
				strBuffer.append("<option value='"+productRow.Id+"'>"+productRow.ProductName+"</option>");
			}
			$('#productsSelect'+operationNum).html(strBuffer.toString());
		},filter);
		
		$("#productsSelect"+operationNum).change(function(){
			var expand = {};
			var filter ={};
			var productId = $("#productsSelect"+operationNum).val();
			pullDataFromCloudFunction("Product/"+productId,"READ","",expand,function (data){
				var product = data.Result;
				$('#productPv'+operationNum).val(product.pvPrice);
				$('#productCv'+operationNum).val(product.cvPrice);
			},filter);
			
		});
	});
	
	//*************************搜索
	$('#select-user-when-click').bind('click',searchUserResult);
	
	$(".select-opr").unbind('click').bind('click', function(){
		var filterStartDate = $("#startDateOrderFilterLink").val();
		var filterEndDate = $("#endDateOrderFilterLink").val();
		var filterStatus = $("#orderFilterSelect").val();
		
		var filterDateAt= $("#startDateOrderFilterLink2").val();
	
		//alert(StringToDatesubOne(filterDateAt));
		var select_ordernumber = $("input[name='select_ordernumber']").val();
		//var select_csname = $("input[name='select_csname']").val();
		var select_point = $("input[name='select_point']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(filterStartDate)&&filterStartDate!= ""){
			var startDateFilter = {"CreatedAt": {"$gte": StringToDate(filterStartDate)}};
			filters.push(startDateFilter);
		}
		if(jsObjNotNullOrUndefined(filterEndDate)&&filterEndDate!= ""){
			var endDateFilter = {"CreatedAt": {"$lte": StringToDate(filterEndDate)}};
			filters.push(endDateFilter);
		}
		
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var startDateFilter2 = {"CreatedAt": {"$gte": StringToDatesubOne2(filterDateAt)}};
			filters.push(startDateFilter2);
		}
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var endDateFilter2 = {"CreatedAt": {"$lte": StringToDatesubOne(filterDateAt)}};
			filters.push(endDateFilter2);
		}
		
		if(jsObjNotNullOrUndefined(filterStatus)&&filterStatus!="-1"){
			var statusFilter = {"Status": filterStatus};
			filters.push(statusFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_ordernumber) && select_ordernumber != ""){
			var select_ordernumberFilter = {"OrderNumber": {"$regex": ".*" + select_ordernumber + ".*"}};
			filters.push(select_ordernumberFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_point) && select_point !=""){
			var select_pointFilter = {"totalPV": {"$eq": select_point }};
			filters.push(select_pointFilter);
		}
		
		var typeFilter = {"OrderType": {"$eq": 0 }};
		filters.push(typeFilter);
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
		};

		currentPage =0;
		pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
				"", listAllOrdersCallback,0, 10);
	});
	


});	


window.onload=function(){
    document.body.onclick=function(ev){
    	//$(".customer-user-list").hide();
    }
};

function searchUserResult(){
	$('#query-tip').html("Waiting for query, please wait");
	
	var customerUser = $('#userName').val();

	var filters = new Array();
	if(jsObjNotNullOrUndefined(customerUser) && customerUser !=""){
		var select_emailFilter = {"Email": {"$regex": ".*" + customerUser + ".*"}};
		filters.push(select_emailFilter);
	}
	
	var filter ={};
	if (filters.length > 0) {
		filter ={ "$and": filters };
	}
	
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	
	var strBuffer = new StringBuffer();
	$(".customer-user-list").html("");
	pullDataFromCloudFunction("Users","READ","",expand,
	function(data){
		
	    allUsers = data.Result;
	    for (var index in allUsers) {
			var userRow = allUsers[index];
			var userRoleArray = userRow.AppRoles;
			
			if(userRoleArray.length<1){
				if(customerUser != null && customerUser != undefined && customerUser !=""){
					if(customerUser == userRow.Username){
						$(".customer-user-list").append(""+
								"<li class='li-cs'>"+"<div class='product-type-option' id = '"+userRow.Id+
								"' onmouseover='addBGClolr(this)' onmouseout='removeBGColor(this)' onclick ='setChoosedValueToStateInput(this)' style='padding-left: 10px;'>"+
								userRow.Username+"</div>"+"</li>").append("<li class='divider'></li>");
					}
				}else{
					$(".customer-user-list").append(""+
						"<li class='li-cs'>"+"<div class='product-type-option' id = '"+userRow.Id+
						"' onmouseover='addBGClolr(this)' onmouseout='removeBGColor(this)' onclick ='setChoosedValueToStateInput(this)' style='padding-left: 10px;'>"+
						userRow.Username+"</div>"+"</li>").append("<li class='divider'></li>");
				}
			} else {
				for (var int = 0; int < userRoleArray.length; int++) {
					var thisUsersRole = userRoleArray[int];
					var currentRoleName = thisUsersRole.RoleName;
					if (currentRoleName=="Customer") {
						if(customerUser != null && customerUser != undefined && customerUser !=""){
							$(".customer-user-list").append(""+
									"<li class='li-cs'>"+"<div class='product-type-option' id = '"+userRow.Id+
									"' onmouseover='addBGClolr(this)' onmouseout='removeBGColor(this)' onclick ='setChoosedValueToStateInput(this)' style='padding-left: 10px;'>"+
									userRow.Username+"</div>"+"</li>").append("<li class='divider'></li>");
						}else{
							$(".customer-user-list").append(""+
									"<li class='li-cs'>"+"<div class='product-type-option' id = '"+userRow.Id+
									"' onmouseover='addBGClolr(this)' onmouseout='removeBGColor(this)' onclick ='setChoosedValueToStateInput(this)' style='padding-left: 10px;'>"+
									userRow.Username+"</div>"+"</li>").append("<li class='divider'></li>");
						}
						
					}
				}
			}
		}
	},filter);
	
	$(".customer-user-list").show();
};


function setChoosedValueToStateInput(obj1){
    var choosedValue = $(obj1).text();
    var guid = $(obj1).attr("id");
    
    $("input[name='customersSelect']").val(guid);
    $("#userName").val(choosedValue);
    
    $(".customer-user-list").hide();
    
    $(".customer-user-list").html("");
    
    $('#query-tip').html("");
};	

//add bgcolor to choosed option when mouse over here
function addBGClolr(obj){
	$(obj).addClass("high-light");
};

//remove bgcolor from choosed mouse out here
function removeBGColor(obj){
	$(obj).removeClass("high-light");
};


function getCustomersList(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={};
	pullDataFromCloudFunction("Users","READ","",expand,writeDataToCustomersSelectorEdit,filter);
}

function getProductsList(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("Product","READ","",expand,writeDataToProductsSelectorEdit,filter);
}

function getShippingFeesList(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("ShippingFee","READ","",expand,writeDataToShippingFeeSelectorEdit,filter);
}

function getCurrentTaxRate(){
	var fieldsReturn = {
		 "Id" : 1,
		 "TaxRate" : 1,
		 "TaxStatus": 1
	}
	pullDataFromCloudWithToken("TaxRate", "READ", "", "", "",fieldsReturn, showTaxRate);	
}
var taxrate;
function showTaxRate(data) {
	var dataResult = data.Result;
	
	taxrate = dataResult[0]
	if (dataResult[0].TaxRate != null && dataResult[0].TaxRate != undefined && dataResult[0].TaxRate != ""){
		$('#taxRateValue').val(dataResult[0].TaxRate);
	}
	
	if(dataResult[0].TaxStatus != null && dataResult[0].TaxStatus != undefined ){
		$('#taxRateStatus').val(dataResult[0].TaxStatus);
	}
}

function writeDataToCustomersSelectorEdit(data){
	var allUsers = data.Result;
	var strBuffer = new StringBuffer(); 
	for (var index in allUsers) {
		var userRow = allUsers[index];
		var userRoleArray = userRow.AppRoles;
		if(userRoleArray.length<1){
			strBuffer.append("<option value='"+userRow.Id+"'>"+userRow.Username+"</option>");
		} else {
			for (var int = 0; int < userRoleArray.length; int++) {
				var thisUsersRole = userRoleArray[int];
				var currentRoleName = thisUsersRole.RoleName;
				if (currentRoleName=="Customer") {
					strBuffer.append("<option value='"+userRow.Id+"'>"+userRow.Username+"</option>");
					break;
				}
			}
		}
	}
	$('#customersSelect').html(strBuffer.toString());
}


function writeDataToProductsSelectorEdit(data){
	var products = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option>Select Product...</option>");
	for (var index in products) {
		var productRow = products[index];
		strBuffer.append("<option value='"+productRow.Id+"'>"+productRow.ProductName+"</option>");
	}
	$('#productsSelect').html(strBuffer.toString());
}

function writeDataToShippingFeeSelectorEdit(data){
	var shippingFees = data.Result;
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<option>Select Shipping Fee...</option>");
	for (var index in shippingFees) {
		var shippingFee = shippingFees[index];
		strBuffer.append("<option id='"+shippingFee.Charges+"' value='"+shippingFee.ItemName+"'>"+shippingFee.ItemName+'------'+shippingFee.Charges+"</option>");
	}
	$('#shippingFees').html(strBuffer.toString());
}

function writeDataToProductDetailsSelectorEdit(data){
	var product = data.Result;
	$('#productPv').val(product.pvPrice);
	$('#productCv').val(product.cvPrice);
}

function filterOrders(){
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	$(".filterOrdersButtonDiv").html('<button class="btn btn-default" disabled="disabled" onclick="javascript:void(0);">Apply & Refresh</button>');
	
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
	};
	
	var filterStartDate = $("#startDateOrderFilterLink").val();
	var filterEndDate = $("#endDateOrderFilterLink").val();
	var filterStatus = $("#orderFilterSelect").val();
	
	var filters = new Array();
	
	if(jsObjNotNullOrUndefined(filterStartDate)&&filterStartDate!= ""){
		var startDateFilter = {"CreatedAt": {"$gt": StringToDate(filterStartDate)}};
		filters.push(startDateFilter);
	}
	if(jsObjNotNullOrUndefined(filterEndDate)&&filterEndDate!= ""){
		var endDateFilter = {"CreatedAt": {"$lt": StringToDate(filterEndDate)}};
		filters.push(endDateFilter);
	}
	if(jsObjNotNullOrUndefined(filterStatus)&&filterStatus!="-1"){
		var statusFilter = {"Status": parseInt(filterStatus)};
		filters.push(statusFilter);
	}
	
	/*var typeFilter = {"OrderType": parseInt(0)};
	filters.push(typeFilter);*/
	
	var filter ={};
	if (filters.length > 0) {
		filter ={ "$and": filters };
	}
	console.log();
	pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
			"", listAllOrdersCallback,0, 10);
	//pullDataFromCloudFunction("Order","READ","",expand,listAllOrdersCallback,filter,0, 10);
}

var count = 0;
function loadPageContentData(){
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
	};
	var filter ={"OrderType":0 };
	
	//pullDataFromCloudFunction("Order","READ","",expand,listAllOrdersCallback,filter,0, 10);
	pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
			"", listAllOrdersCallback,0, 10);
}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
	};
	var filter ={"OrderType":{"$eq": 0 } };
	
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage =0;
		$(".previous").addClass('disabled');
	}else{
		var filterStartDate = $("#startDateOrderFilterLink").val();
		var filterEndDate = $("#endDateOrderFilterLink").val();
		var filterStatus = $("#orderFilterSelect").val();
		
		var filterDateAt= $("#startDateOrderFilterLink2").val();
	
		//alert(StringToDatesubOne(filterDateAt));
		var select_ordernumber = $("input[name='select_ordernumber']").val();
		//var select_csname = $("input[name='select_csname']").val();
		var select_point = $("input[name='select_point']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(filterStartDate)&&filterStartDate!= ""){
			var startDateFilter = {"CreatedAt": {"$gte": StringToDate(filterStartDate)}};
			filters.push(startDateFilter);
		}
		if(jsObjNotNullOrUndefined(filterEndDate)&&filterEndDate!= ""){
			var endDateFilter = {"CreatedAt": {"$lte": StringToDate(filterEndDate)}};
			filters.push(endDateFilter);
		}
		
		
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var startDateFilter2 = {"CreatedAt": {"$gte": StringToDatesubOne2(filterDateAt)}};
			filters.push(startDateFilter2);
		}
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var endDateFilter2 = {"CreatedAt": {"$lte": StringToDatesubOne(filterDateAt)}};
			filters.push(endDateFilter2);
		}
		
		if(jsObjNotNullOrUndefined(filterStatus)&&filterStatus!="-1"){
			var statusFilter = {"Status": filterStatus};
			filters.push(statusFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_ordernumber) && select_ordernumber != ""){
			var select_ordernumberFilter = {"OrderNumber": {"$regex": ".*" + select_ordernumber + ".*"}};
			filters.push(select_ordernumberFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_point) && select_point !=""){
			var select_pointFilter = {"totalPV": {"$eq": select_point }};
			filters.push(select_pointFilter);
		}
		
		var typeFilter = {"OrderType": {"$eq": 0 }};
		filters.push(typeFilter);
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
		};

		//currentPage =0;
	/*	pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
				"", listAllOrdersCallback,0, 10);*/
		
		pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
				"", listAllOrdersCallback,currentPage, 10);
		
	}
};

function nextAdd(){
	var expand = {	
		"OrderCustomer" : {
            "TargetTypeName": "Users"
        }
	};
	//var filter ={"OrderType":{"$not":1} };
	var filter ={"OrderType":{"$eq": 0 } };
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		var filterStartDate = $("#startDateOrderFilterLink").val();
		var filterEndDate = $("#endDateOrderFilterLink").val();
		var filterStatus = $("#orderFilterSelect").val();
		
		var filterDateAt= $("#startDateOrderFilterLink2").val();
	
		//alert(StringToDatesubOne(filterDateAt));
		var select_ordernumber = $("input[name='select_ordernumber']").val();
		//var select_csname = $("input[name='select_csname']").val();
		var select_point = $("input[name='select_point']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(filterStartDate)&&filterStartDate!= ""){
			var startDateFilter = {"CreatedAt": {"$gte": StringToDate(filterStartDate)}};
			filters.push(startDateFilter);
		}
		if(jsObjNotNullOrUndefined(filterEndDate)&&filterEndDate!= ""){
			var endDateFilter = {"CreatedAt": {"$lte": StringToDate(filterEndDate)}};
			filters.push(endDateFilter);
		}
		
		
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var startDateFilter2 = {"CreatedAt": {"$gte": StringToDatesubOne2(filterDateAt)}};
			filters.push(startDateFilter2);
		}
		if(jsObjNotNullOrUndefined(filterDateAt)&&filterDateAt!= ""){
			var endDateFilter2 = {"CreatedAt": {"$lte": StringToDatesubOne(filterDateAt)}};
			filters.push(endDateFilter2);
		}
		
		if(jsObjNotNullOrUndefined(filterStatus)&&filterStatus!="-1"){
			var statusFilter = {"Status": filterStatus};
			filters.push(statusFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_ordernumber) && select_ordernumber != ""){
			var select_ordernumberFilter = {"OrderNumber": {"$regex": ".*" + select_ordernumber + ".*"}};
			filters.push(select_ordernumberFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_point) && select_point !=""){
			var select_pointFilter = {"totalPV": {"$eq": select_point }};
			filters.push(select_pointFilter);
		}
		
		var typeFilter = {"OrderType": {"$eq": 0 }};
		filters.push(typeFilter);
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
		};

		//currentPage =0;
	/*	pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
				"", listAllOrdersCallback,0, 10);*/
		currentPage = currentPage +1;
		pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
				"", listAllOrdersCallback,currentPage, 10);
	}
}
	

//Rules Name, CV, PV, Start Date, End Date
function listAllOrdersCallback(data){
	count = data.count;
	var allOrders = data.Result;
	
	currentnum = allOrders.length;
	
	var sumCount = JSON.stringify(data.Count);
	var currentCount = currentnum;
	if(currentnum > 10){
		currentnum = 10;
	}
	
	if(currentCount == 0 && sumCount == 0){
		$('.pager-fenye-tip').html("No data available.");
	}else if(currentCount == 0 && sumCount !=0){
		$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", 0 of " + sumCount +" items.");
	}else{
		if(parseInt(currentPage + 1) == 1){
			$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", 1 - "+  currentCount + " of " + sumCount +" items.");
		}else{
			$('.pager-fenye-tip').html("Page: "+ convertData(currentPage + 1) +", " +
					(parseInt(currentPage)*10 +1) + " - "+  parseInt((parseInt(currentPage)*10) + currentCount) + " of " + sumCount +" items.");
		}
	}
	
	
	
	$('.fenye-list').html("<li><a href='#' class='previous' onclick='previousAdd();'>Previous</a></li>" +
						  "<li><a href='#' class='next' onclick='nextAdd();'>Next</a></li>");
	
	
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='pointRule_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
		strBuffer.append("<th width='20%'>Order Number</th>");
		strBuffer.append("<th width='20%'>Customer Name</th>");
		strBuffer.append("<th width='15%'>Order Status</th>");
		strBuffer.append("<th width='10%'>Order Point</th>");
		strBuffer.append("<th width='15%'>Create Date</th>");
		strBuffer.append("<th width='20%'></th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	
	var orderStatus = new LinkedMap();
	orderStatus.put("0","Unpaid");
	orderStatus.put("1","Paid");
	orderStatus.put("2","Canceled");
	
	for ( var index in allOrders) {
		
		var orderRow = allOrders[index];
		
		//if (orderRow.OrderType != 1) {
			var orderCreateDate = formatDate(orderRow.CreatedAt);
			var orderPoint = 0;
			if(orderRow.Point != null && orderRow.Point != undefined && orderRow.Point != ""){
				orderPoint =  orderRow.Point;
			}
			strBuffer.append("<tr rowID='"+orderRow.Id+"'>");
			strBuffer.append("<td>"+orderRow.OrderNumber+"</td>");
			
			var userName = "";
			var customerId = orderRow.OrderCustomer.Id ;
			var currentPoint = orderRow.OrderCustomer.CurrentPoint;
			if(currentPoint==null || currentPoint=="" || currentPoint=="undefined"){
				currentPoint = 0;
			}
			if(orderRow.OrderCustomer != null && orderRow.OrderCustomer != undefined && orderRow.OrderCustomer != ''){
				console.log(orderRow.OrderCustomer.Id +","+ orderRow.OrderCustomer.Email);
				if(orderRow.OrderCustomer.Email == null || orderRow.OrderCustomer.Email == undefined || orderRow.OrderCustomer.Email== ""){
					userName =  "N/A";
				}else{
					userName = orderRow.OrderCustomer.Email;
				}
			}
			var orderProductIds =  orderRow.OrderProductOrder;
			
			strBuffer.append("<td>"+userName+"</td>");
			strBuffer.append("<td>"+orderStatus.get(""+orderRow.Status)+"</td>");
			strBuffer.append("<td>"+orderPoint+"</td>");
			strBuffer.append("<td>"+orderCreateDate+"</td>");

			strBuffer.append("<td><i class='fa fa-file-text-o cursorPointer invoiceCustomer' data-toggle='popover' data-placement='bottom' " +
					"data-content='Invoice Customer' onclick='generateInvocie(this);'></i> " +
								"&nbsp;<i class='fa fa-pencil cursorPointer' title='Edit' onclick='updateOrderStatus(this)' customerId="+customerId+" orderPoint="+orderPoint+" currentPoint="+currentPoint+"></i>" +
										"&nbsp;&nbsp;&nbsp;<i class='glyphicon glyphicon-envelope cursorPointer' orderProductIds="+orderProductIds+" orderId="+orderRow.Id+" onclick='downloadPDFAndSendEmail(this)'></i>" +
										"&nbsp;&nbsp;&nbsp;<a href='../admin/orderDetail?orderId="+encodeURIComponent(orderRow.Id)+"' target='_blank'><i class='fa fa-print cursorPointer'></i></a>" +
										"</td>");
//			if (roleRow.RoleName=="Customer" || roleRow.RoleName=="Administrator") {
//				strBuffer.append("<td></td>");
//			} else {
//				strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateRole(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteRole(this)'></i></td>");
//			}
			strBuffer.append("</tr>");

		//}
		
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#pointRule_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [0 ] }],
		  "bAutoWidth": false 
	 });
	
	$('#pointRule_table_length').css({ display: "none"});
	$('#pointRule_table_info').parent().parent().css({ display: "none"});
	$('#pointRule_table_filter').css({ display: "none"});
	/*
	$('#category_table').DataTable({
		responsive : true,
		"autoWidth": false,
		"aoColumnDefs" : [ {
			"bSortable" : false,
			"aTargets" : [ 3 ]
		} ],
		"bAutoWidth": false 
	});*/
	
	$(".filterOrdersButtonDiv").html('<button class="btn btn-save btn-add btn-apply btn-primary" onclick="javascript:void(0);filterOrders();">Apply & Refresh</button>');
	$(".invoiceCustomer").popover({html:true,trigger:'click'}).each(function(){
		$(this).find('.popover-content').html('<button type="button" class="btn btn-default">Invoice Customer</button>');
	});
}
var custId = "";
var point = "";
var currtPoint = "";
function updateOrderStatus(obj){
	var itemID = $(obj).parents('tr').attr("rowid");
	
	var orderNumber = $(obj).parents('tr').children('td:nth-child(1)').text();
	var orderStatus = $(obj).parents('tr').children('td:nth-child(3)').text();
	var customerId = $(obj).attr("customerId");
	var orderPoint = $(obj).attr("orderPoint");
	var currentPoint = $(obj).attr("currentPoint");
	custId = customerId;
	point = orderPoint;
	currtPoint = currentPoint;

	$('#orderId').val(itemID);
	$("#orderNumberEdit").val(orderNumber);
	
	var strBuffer = new StringBuffer(); 
	if(orderStatus == "Unpaid"){
		strBuffer.append("<option value='0' selected>Unpaid</option>" +
				  "<option value='1'>Paid</option>" +
				  "<option value='2'>Canceled</option>");
	}else if(orderStatus == "Paid"){
		strBuffer.append("<option value='0'>Unpaid</option>" +
				  "<option value='1' selected>Paid</option>" +
				  "<option value='2'>Canceled</option>");
	}else{
		strBuffer.append("<option value='0'>Unpaid</option>" +
				  "<option value='1'>Paid</option>" +
				  "<option value='2' selected>Canceled</option>");
	}
	
	$('#orderStatusSelectEdit').html(strBuffer.toString());
	
	$('#editStatusModal').modal('show');
	addModalSaveAndCancelForOrderStatus();
}


function generateInvocie(obj){
	var itemID = $(obj).parents('tr').attr("rowid");
	
	var orderNumber = $(obj).parents('tr').children('td:nth-child(1)').text();
	var orderStatus = $(obj).parents('tr').children('td:nth-child(3)').text();

	$('#orderId').val(itemID);
	
	var users = JSON.stringify(null);
	$.ajax({
		 type:"post",
		 url:"../admin/generate_invoice",
		 data:users,
	     dataType: "json",
		 contentType:"application/json",
		 success:function(data){
			 window.open("/air2u/invoice/invoice.pdf");  
		 },
		 error: function(){
			 window.open("/air2u/invoice/invoice.pdf");  
		 }
		 });
	
};

function getAllCustomerSelector(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={};
	pullDataFromCloudFunction("Users","READ","",expand,writeDataCustomerSelector,filter);
}

function writeDataCustomerSelector(data){
	var users = data.Result;
	var strBuffer = new StringBuffer(); 
	for ( var index in users) {
		var userRow = users[index];
		var userRoleArray = userRow.AppRoles;
		for (var int = 0; int < userRoleArray.length; int++) {
			var thisUsersRole = userRoleArray[int];
			var currentRoleName = thisUsersRole.RoleName;
			if (currentRoleName=="Customer") {
				strBuffer.append("<option value='"+userRow.Id+"'>"+userRow.Username+" ---- "+userRow.FullName+" ---- "+userRow.ContactNumber+"</option>");
				break;
			}
		}
	}
	$('#customersSelect').html(strBuffer.toString());
	
}




var pointRowSelected = "";
function selectUseRule(obj){
	pointRowSelected = $(obj).attr("rowid");
	$(obj).parent('td').html("<i class='fa fa-spinner fa-spin'></i>");
	
	var expand = {};
	var filter ={"$and" : [ { "Id" : {"$ne":pointRowSelected} }, { "IsSelected" : true} ]};
	
	var updateFields = {
		    "IsSelected": false
		};
	
	pullDataFromCloudFunction("PointRule","UPDATE",updateFields,expand,selectUseRuleCallback,filter);
}

function selectUseRuleCallback(data){
	var expand = {};
	var filter ={ "Id" : pointRowSelected};
	
	var updateFields = {
		    "IsSelected": true
		};
	
	pullDataFromCloudFunction("PointRule","UPDATE",updateFields,expand,selectUseRuleCallback2,filter);
}

function selectUseRuleCallback2(data){
	loadPageContentData();
}

function addModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveOrder();'>Save</button>";
	$(".addModalFooter").html(footerHtmlStr);
}

function addModalSaveAndCancelForOrderStatus(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveOrderStatus();'>Save</button>";
	$(".editModalFooter").html(footerHtmlStr);
}

function addModalSpinner(){
	$(".addModalFooter").html("<i class='fa fa-spinner fa-spin fa-x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveUserEdit();'>Save</button>";
	$(".editUserModalFooter").html(footerHtmlStr);
}
function editModalSpinner(){
	$(".editUserModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function deleteModalYesAndNo(){
	var footerHtmlStr = '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>'+
		'<button type="button" class="btn btn-success" onclick="javascript:void(0);deleteModalYes();">Yes</button>';
	$(".deleteModalFooter").html(footerHtmlStr);
}
function deleteModalSpinner(){
	$(".deleteModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function saveItem(){
	//addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var userObj = { "RuleName" : $('#ruleNameAdd').val(),
					"cv" : $('#ruleCVAdd').val(),
					"pv" : $('#rulePVAdd').val(),
					"StartDate" : $('#startDatePointRuleAdd').val(),
					"EndDate" : $('#endDatePointRuleAdd').val()
					};
	
	if(inputsValidation($('#ruleNameAdd'),$('#ruleCVAdd'),$('#rulePVAdd'),$('#startDatePointRuleAdd'),$('#endDatePointRuleAdd'))){
		addModalSpinner();
		pullDataFromCloudFunction("PointRule","CREATE",userObj,expand,createCallback);
	} else {
		addModalSaveAndCancel();
	}
}

function saveOrder(){
	addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	
	var shipperFeeDesc = $('#shippingFees').val();
	var shipperFeeCharge = $('#shippingFees option:selected').attr("id");
	var taxRateStatus = $('#taxRateStatus').val();
	var taxRateValue = $('#taxRateValue').val();
	var customer_id = $('#customersSelect').val();
	
	if(inputsOrdersValidation($('#productsSelect'),$('#customersSelect'),$('#productNum'),$('#productPv'),$('#productCv'),
			$('#shippingFees'))){
		//----------------------------------------
		var totalPrice = 0;
		if($('#productPv').val() != 'undefined' && $('#productPv').val() != null && $('#productPv').val() != ''){
			if(taxRateStatus == '1'){
				if(taxRateValue != 'undefined' && taxRateValue != null && taxRateValue != ''){
					totalPrice = ((parseFloat(taxRateValue)+1) * parseFloat($('#productCv').val())) * parseInt($('#productNum').val()) + parseFloat(shipperFeeCharge);
				}else{
					totalPrice = parseFloat($('#productCv').val()) * parseInt($('#productNum').val()) + parseFloat(shipperFeeCharge);
				}
			}else{
				totalPrice = parseFloat($('#productCv').val()) * parseInt($('#productNum').val()) + parseFloat(shipperFeeCharge);
			}
		}
		var pointRule = $('#currentPointRule').val();
		var pointReturn = 0; 
		
		if($('#productCv').val() != 'undefined' && $('#productCv').val() != null && $('#productCv').val != ''){
			pointReturn = pointRule * $('#productCv').val();
		}
		
		var operationNum = $("input[name='operationNum']").val();
		

		var productOrderNumber = getNewGUID();
		var oderNumber = getNewGUID()+1;
		var productOrderObj = {
				"Id":productOrderNumber,
//				"OrderNumber" : getNewGUID(),
				"OrderNumber" :oderNumber,
				"EarnedPV:":pointRule * $('#productPv').val(),
				"OrderQTY": $('#productNum').val(),
				"Product" : $('#productsSelect').val()
		};
		pullDataFromCloudFunction("ProductOrder","CREATE",productOrderObj,expand,function(data){});
		
		var productIdArr = [];
		productIdArr.push(productOrderNumber);
		
		for(var index=2; index <=operationNum;index++){
			
			/*if(inputsOrdersValidation($('#productsSelect'+operationNum),$('#customersSelect'),$('#productNum'+operationNum),
					$('#productPv'+operationNum),$('#productCv'+operationNum),$('#shippingFees'))){*/
				
				if($('#productPv'+operationNum).val() != 'undefined' && $('#productPv'+operationNum).val() != null && $('#productPv'+operationNum).val() != ''){
					if(taxRateStatus == '1'){
						if(taxRateValue != 'undefined' && taxRateValue != null && taxRateValue != ''){
							totalPrice = totalPrice + ((parseFloat(taxRateValue)+1) * parseFloat($('#productPv'+operationNum).val())) * parseInt($('#productNum'+operationNum).val()) + parseFloat(shipperFeeCharge);
						}else{
							totalPrice = totalPrice + parseFloat($('#productPv'+operationNum).val()) * parseInt($('#productNum'+operationNum).val()) + parseFloat(shipperFeeCharge);
						}
					}else{
						totalPrice = totalPrice + parseFloat($('#productPv'+operationNum).val()) * parseInt($('#productNum'+operationNum).val()) + parseFloat(shipperFeeCharge);
					}
				}
				
				if($('#productPv'+operationNum).val() != 'undefined' && $('#productPv'+operationNum).val() != null && $('#productPv'+operationNum).val != ''){
					pointReturn = pointReturn + pointRule * $('#productPv'+operationNum).val();
				}
				
				
				var productOrderNum = getNewGUID();
				var productOrderObj = {
						"Id":productOrderNum,
						"OrderNumber" : productOrderNum,
						"EarnedPV:":pointRule * $('#productPv'+operationNum).val(),
						"OrderQTY": $('#productNum'+operationNum).val(),
						"Product" : $('#productsSelect'+operationNum).val()
				};
				pullDataFromCloudFunction("ProductOrder","CREATE",productOrderObj,expand,function(data){});
				
				var modifyLogObj = {
						"Id": getGUID(),
						"CreateUserId" :  userId,
						"OperateType" : "CreateOrder",
						"DateTime" : getCurrentDateTime(),
						"OperateSystem" : operateSystem,
						"Browser" : browerType,
						"Ip":ip,
						"RecordId":productOrderNum
				}


			pullDataFromCloudFunction("ModifyLog","CREATE",modifyLogObj,"",function callBack(data){
							console.log(data.Result);
						});
				
				productIdArr.push(productOrderNum);
				
			//}
			
		}

		var OrderCustomerArr = [];
		OrderCustomerArr.push($('#customersSelect').val());
		console.log("---OrderCustomerArr"+OrderCustomerArr);
		console.log("$('#customersSelect').val():"+$('#customersSelect').val());
		
		var orderObj = { /*"Id" : getGUID(32,16),*/
						"Id":oderNumber,
						"OrderProductOrder": productIdArr,
						"OrderCustomer" : $('#customersSelect').val(),
						"OrderNumber" : getNewGUID(),
						"Status" : $('#orderStatusSelect').val(),
						"totalPrice" : totalPrice,
						"totalPV": parseFloat(pointReturn),
						"OrderType": 0,
						'Point': pointReturn,
						"ShippingItem" : shipperFeeDesc,
						"Remark": $("#remark").val()
						};
		
		//----------------------------------------
		console.log("totalPrice:",totalPrice);
		pullDataFromCloudFunction("Order","CREATE",orderObj,expand,createCallback);
		
		
		var strBuffer = new StringBuffer(); 
		strBuffer.append("<option>Select Product...</option>");
		$('#productsSelect').html(strBuffer.toString());
	} else {
		addModalSaveAndCancel();
	}
	
}

function saveOrderStatus(){
	addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	
	var orderObj = { 
					"OrderNumber" : $('#orderNumberEdit').val(),
					"Status" : $('#orderStatusSelectEdit').val(),
					"Point":0
					};
	
	var modifyLogObj = {
			"Id": getGUID(),
			"ModifyUserId" :  userId,
			"OperateType" : "UpateOrder",
			"DateTime" : getCurrentDateTime(),
			"OperateSystem" : operateSystem,
			"Browser" : browerType,
			"Ip":ip,
			"RecordId":$('#orderNumberEdit').val()
	}


	pullDataFromCloudFunction("ModifyLog","CREATE",modifyLogObj,"",function callBack(data){
				console.log(data.Result);
			});
	
	pullDataFromCloudFunction("Order/"+$('#orderId').val(),"UPDATE",orderObj,expand,editOrderStatusCallback);
	
	//update customers' total point
	var currentPointFinal = parseInt(currtPoint) + parseInt(point);
	console.log("currtPoint:",currtPoint);
	console.log("point:",point);
	var expand = {
	};
	var userObj = { 
			"CurrentPoint":parseInt(currentPointFinal)
			};
	
	var userID = custId;
	pullDataFromCloudFunction("Users/"+userID,"UPDATE",userObj,expand,function(data){
		console.log(data.Result);
	});
	
}

function editOrderStatusCallback(data){
	$('#editStatusModal').modal('hide');
	addModalSaveAndCancelForOrderStatus();
	refreshTableContent2();
}


function refreshTableContent2(){
	cancelDialog();
	//currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
	
}

function loadPageContentData2(){
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
	};
	var filter ={"OrderType":0 };
	
	//pullDataFromCloudFunction("Order","READ","",expand,listAllOrdersCallback,filter,0, 10);
	pullDataFromCloudWithToken2("Order", "READ", "", expand, filter,
			"", listAllOrdersCallback,currentPage, 10);
}


function inputsValidation(ruleNameObj, ruleCVObj, rulePVObj, startDatePointRuleObj, endDatePointRuleObj){
	var validInputs = false;
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateRuleName = false;
	var ruleName = ruleNameObj.val();
	if(ruleName=='undefined' || ruleName==null || ruleName.length<1){
		ruleNameObj.parent().removeClass("has-error").addClass("has-error");
		ruleNameObj.prev().text("Rule Name is required.");
		ruleNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(ruleName.length<5 || ruleName.length>45){
			ruleNameObj.parent().removeClass("has-error").addClass("has-error");
			ruleNameObj.prev().text("Length is 5 - 45.");
			ruleNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateRuleName = true;
		}
	}
	
	var validateRuleCV = false;
	var ruleCV = ruleCVObj.val();
	if (ruleCV=='undefined' || ruleCV=='' || ruleCV==null) {
		ruleCVObj.parent().removeClass("has-error").addClass("has-error");
		ruleCVObj.prev().text("Rule CV is required.");
		ruleCVObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(ruleCV))) {
			ruleCVObj.parent().removeClass("has-error").addClass("has-error");
			ruleCVObj.prev().text("Rule CV should be Numeric.");
			ruleCVObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validateRuleCV = true;
		}
	}
	
	var validateRulePV = false;
	var rulePV = rulePVObj.val();
	if (rulePV=='undefined' || rulePV=='' || rulePV==null) {
		rulePVObj.parent().removeClass("has-error").addClass("has-error");
		rulePVObj.prev().text("Rule PV is required.");
		rulePVObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(rulePV))) {
			rulePVObj.parent().removeClass("has-error").addClass("has-error");
			rulePVObj.prev().text("Rule PV should be Numeric.");
			rulePVObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validateRulePV = true;
		}
	}

	var validateRuleStartDate = false;
	var ruleStartDate = startDatePointRuleObj.val();
	if (ruleStartDate=='undefined' || ruleStartDate=='' || ruleStartDate==null) {
		startDatePointRuleObj.parent().parent().removeClass("has-error").addClass("has-error");
		startDatePointRuleObj.parent().prev().text("Rule Start Date is required.");
		startDatePointRuleObj.parent().prev().addClass("displayNone").removeClass("displayNone");
	} else {
		validateRuleStartDate = true;
	}
	
	var validateRuleEndDate = false;
	var ruleEndDate = endDatePointRuleObj.val();
	if (ruleEndDate=='undefined' || ruleEndDate=='' || ruleEndDate==null) {
		endDatePointRuleObj.parent().parent().removeClass("has-error").addClass("has-error");
		endDatePointRuleObj.parent().prev().text("Rule Start Date is required.");
		endDatePointRuleObj.parent().prev().addClass("displayNone").removeClass("displayNone");
	} else {
		validateRuleEndDate = true;
	}
	
	
	
	if (validateRuleName && validateRuleCV && validateRulePV && validateRuleStartDate && validateRuleEndDate) {
		validInputs = true;
	}
	return validInputs;
}

function inputsOrdersValidation(productsSelectObj, customersSelectObj, productNumObj, productPriceObj, productCvObj, shippingFeesObj){
	var validInputs = false;
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateCustomersSelect = false;
	var customerSelect = customersSelectObj.val();
	
	if (customerSelect=='undefined' || customerSelect=='' || customerSelect== null || customerSelect == "Select Customer...") {
		customersSelectObj.parent().removeClass("has-error").addClass("has-error");
		customersSelectObj.parent().prev().text("Customer is not existed.");
		customersSelectObj.parent().prev().addClass("displayNone").removeClass("displayNone");
	} else {
		validateCustomersSelect = true;
	}
	
	var validateProductSelect = false;
	var productSelect = productsSelectObj.val();
	if(productSelect=='undefined' || productSelect==null || productSelect == '' || productSelect == "Select Product..."){
		productsSelectObj.parent().removeClass("has-error").addClass("has-error");
		productsSelectObj.prev().text("Product is required.");
		productsSelectObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		validateProductSelect = true;
	}
	
	/*var validateProductPrice = false;
	var productPrice = productPriceObj.val();
	if (productPrice=='undefined' || productPrice=='' || productPrice == null) {
		productPriceObj.parent().removeClass("has-error").addClass("has-error");
		productPriceObj.prev().text("Product price is required.");
		productPriceObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(productPrice))) {
			productPriceObj.parent().removeClass("has-error").addClass("has-error");
			productPriceObj.prev().text("Product price should be Numeric.");
			productPriceObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validateProductPrice = true;
		}
	}
	
	*/
	var validateProductNum = false;
	var productNum = productNumObj.val();
	if (productNum=='undefined' || productNum=='' || productNum ==null) {
		productNumObj.parent().removeClass("has-error").addClass("has-error");
		productNumObj.prev().text("Product num is required.");
		productNumObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(productNum))) {
			productNumObj.parent().removeClass("has-error").addClass("has-error");
			productNumObj.prev().text("Product num should be Numeric.");
			productNumObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			if(parseInt(productNum)<1){
				productNumObj.parent().removeClass("has-error").addClass("has-error");
				productNumObj.prev().text("Product num should be more than 0.");
				productNumObj.prev().addClass("displayNone").removeClass("displayNone");
			}else{
				validateProductNum = true;
			}
		}
	}
	/*var validateProductCv = false;
	var cv = productCvObj.val();
	if (cv=='undefined' || cv=='' || cv == null) {
		productCvObj.parent().removeClass("has-error").addClass("has-error");
		productCvObj.prev().text("Product Cv is required.");
		productCvObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(cv))) {
			productCvObj.parent().removeClass("has-error").addClass("has-error");
			productCvObj.prev().text("Product Cv should be Numeric.");
			productCvObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validateProductCv = true;
		}
	}*/
	
	
	var validateShippingFees = false;
	var shippingFees = shippingFeesObj.val();
	console.log(shippingFees);
	if(shippingFees=='undefined' || shippingFees ==null || shippingFees == '' || shippingFees == "Select Shipping Fee..."){
		shippingFeesObj.parent().removeClass("has-error").addClass("has-error");
		shippingFeesObj.prev().text("Shipping Fee is required.");
		shippingFeesObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		validateShippingFees = true;
	}
	
	if (validateProductSelect && validateCustomersSelect && validateProductNum && validateShippingFees) {
		validInputs = true;
	}
	return validInputs;
}

function getCurrentPointRule(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("PointRule","READ","",expand, queryCurrentPointRuleCallback,filter);	
}

function queryCurrentPointRuleCallback(data){
	var allPointRules = data.Result;
	var cvVal = 0;
	var pvVal = 0;
	for (var index in allPointRules) {
		var ruleRow = allPointRules[index];
		var isSelected = ruleRow.IsSelected;
		if (jsObjNotNullOrUndefined(isSelected) && isSelected) {
			cvVal = ruleRow.cv;
			pvVal = ruleRow.pv;
		}
	}
	
	var pointRate = 0;
	if(cvVal != 'undefined' && cvVal !=null && cvVal != '' && cvVal !=0 &&
			pvVal != 'undefined' && pvVal !=null && pvVal != '' && pvVal !=0){
		pointRate = pvVal / cvVal;
		
	}
	$('#currentPointRule').val(pointRate.toFixed(3));
	//console.log("currentPointRule:"+pointRate.toFixed(3));
	
}

function createCallback(data){
	addModalSaveAndCancel();
	$('#addModal').modal('hide');
	var expand = {
	};
	refreshTableContent();
	
	$(".go-on-add-product").html("");
}

function refreshTableContent(){
	cancelDialog();
	currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
	
}

function cancelDialog(){
	$('#addModal').modal('hide');
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
	//$("#startDatePointRuleAdd").val();
	//$("#endDatePointRuleAdd").val();
	
	addModalSaveAndCancel();
	
	$(".go-on-add-product").html("");
}

function formatDate(time){
	var date2 = new Date(time);
	var localeString = date2.toLocaleString();
	return localeString;
	
     //var newTime = time.split(".")[0];
     //return newTime.replace("T", " ");
}

var orderProductIdsArr = [];

function downloadPDFAndSendEmail(obj){
	orderProductIdsArr = [];
	orderProductIdsArr = $(obj).attr('orderProductIds');
	var orderId = $(obj).attr('orderId');
	var email = $(obj).parents('tr').children('td:nth-child(2)').text();
	generateAndDownloadInvoice(orderId,orderProductIdsArr);
	
//	window.location.href="mailto:"+email+"?subject=Order Detail";   
}


function generateAndDownloadInvoice(orderId){
	var expand = {	
             "OrderCustomer": {
                 "TargetTypeName": "Order"
             }
	       
	};
	var filter ={};
	pullDataFromCloudFunction("Order/"+orderId,"READ","",expand,listOrderDetailsCallback,filter);
	
}
var order = "";
var orderProductOrderArray = [];
var productLength;
var shipItemCharge = "";
var shipItem;
function listOrderDetailsCallback(data){
	count = 0;
	orderProductOrderArray = [];
	order = ""
    order = data.Result;
    shipItem = order.ShippingItem;

    
    var filters = new Array();
	var shipItemName = {"ItemName": {"$regex": ".*" + shipItem + ".*"}};
	filters.push(shipItemName);
	var filter ={};
	if (filters.length > 0) {
		filter ={ "$and": filters };
	}
	
	var expand = {	
	};
	
	pullDataFromCloudFunction("ShippingFee","READ","",expand,function(data){
		if(data.Result!=null && data.Count>0){
			shipItemCharge = data.Result[0].Charges;
		}else{
			shipItemCharge = 0;
		}
		
		orderProductIdsArr = orderProductIdsArr.split(",");
		productLength = orderProductIdsArr.length;
		for(var i =0;i<orderProductIdsArr.length;i++){
			var expand = {	
		            "Product": {
		                "TargetTypeName": "Product"
		            }
			       
			};
			var filter ={};
			if(orderProductIdsArr[i]!=null){
				pullDataFromCloudFunction("ProductOrder/"+orderProductIdsArr[i],"READ","",expand,listOrderDetailsCallback2,filter);
			}
			
		}
		
	},filter,0,50);
	
}

var count = 0;
function listOrderDetailsCallback2(data){
	count++;
	var productAndOrderProductinfo = data.Result;
//	console.log("productAndOrderProductinfo:"+JSON.stringify(productAndOrderProductinfo));
	orderProductOrderArray.push(productAndOrderProductinfo);
	console.log("count:",count);
	console.log("productLength:",productLength);
	if(count == productLength ){
		console.log("shipItemCharge:",shipItemCharge);
		//order,
		var totalInfo = JSON.stringify(order)+"%@%"+JSON.stringify(orderProductOrderArray)+"%@%"+JSON.stringify(taxrate)+"%@%"+shipItemCharge;
		console.log("order&orderProductOrderArray:"+JSON.stringify(totalInfo));
			$.ajax({
				 type:"post",
				 url:"../report/gen_invocie_pdf",
				 data:totalInfo,
			     dataType: "json",
				 contentType:"application/json",
				 success:function(data){
					 window.open("/air2u/files/invoice.pdf");  
				 },
				 error: function(){
					 window.open("/air2u/files/invoice.pdf");  
				 }
				 });
	}
}


function removeRepeated(arr){
	var new_arr=[];
	for(var i=0;i<arr.length;i++) {
		   var items = arr[i];
		   if($.inArray(items,new_arr)==-1){
			   new_arr.push(items);
		   }
		}
	 return new_arr;
}

