var allLoyaltyPointConstant;
var ip = "";
var browerType = "";
var operateSystem = "";
var userId = "";

var currentPage = 0;
var currentnum = 10;

$(document).ready(function() {
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-LoyaltyPoint').addClass("active");
	validateIsNeedAllocate();
	loadPageContentData();
	
	loadPageContentData2();
	
	getCustomersList();
	
	$.get("http://ipinfo.io", function(response) {
			ip = response.ip;
		}, "jsonp");
	 browerType = getBrower();
	 operateSystem = getOsVersion();
	 userId = $('#userIDValue').val();
	 
	$('#select-user-when-click').bind('click',searchUserResult);
		
	//************新增查询
	$(".select-opr").unbind('click').bind('click', function(){
		
		var select_email = $("input[name='select_email']").val();
		var select_desc = $("input[name='select_desc']").val();
		var select_full_name = $("input[name='select_full_name']").val();
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();

		if(jsObjNotNullOrUndefined(select_desc) && select_desc !=""){
			var select_descFilter = {"PointAllocationDesc": {"$regex": ".*" + select_desc + ".*"}};
			filters.push(select_descFilter);
		}
		
		var roles = {"OrderType":{"$eq":1 } };
		filters.push(roles);
		
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
			};
		currentPage = 0;
		pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter2,0,10);
	});
		
		//******************
});	

function loadPageContentData(){
	var expand = {	
		"OrderCustomer" : {
            "TargetTypeName": "Users"
        }
	};
	var filter ={"OrderType":{"$eq":1} };
	
	pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter,0,10);
}

function loadPageContentData2(){
	var expand = {	
		"OrderCustomer" : {
            "TargetTypeName": "Users"
        }
	};
	var filter ={"OrderType":{"$eq":1} };
	
	pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback2,filter);
}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
		};
	var filter ={"OrderType":{"$eq":1} };
		
	
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage = 0;
		$(".previous").addClass('disabled');
	}else{
		var select_email = $("input[name='select_email']").val();
		var select_desc = $("input[name='select_desc']").val();
		var select_full_name = $("input[name='select_full_name']").val();
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();

		if(jsObjNotNullOrUndefined(select_desc) && select_desc !=""){
			var select_descFilter = {"PointAllocationDesc": {"$regex": ".*" + select_desc + ".*"}};
			filters.push(select_descFilter);
		}
		
		var roles = {"OrderType":{"$eq":1 } };
		filters.push(roles);
		
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
			};
		//currentPage = 0;
		pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter2,currentPage,10);
		
		//pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter,currentPage,10);
		//pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter,currentPage,10);
	}
};

function nextAdd(){
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users"
	        }
		};
	var filter ={"OrderType":{"$eq":1} };
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		var select_email = $("input[name='select_email']").val();
		var select_desc = $("input[name='select_desc']").val();
		var select_full_name = $("input[name='select_full_name']").val();
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();

		if(jsObjNotNullOrUndefined(select_desc) && select_desc !=""){
			var select_descFilter = {"PointAllocationDesc": {"$regex": ".*" + select_desc + ".*"}};
			filters.push(select_descFilter);
		}
		
		var roles = {"OrderType":{"$eq":1 } };
		filters.push(roles);
		
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {	
				"OrderCustomer" : {
		            "TargetTypeName": "Users"
		        }
			};
		
		currentPage = currentPage +1;
		pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter2,currentPage,10);
		//pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter,currentPage,10);
		//pullDataFromCloudFunction("Order","READ","",expand,listAllOutsideOrderPointCallback,filter,currentPage,10);
	}
}
	

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


function listAllOutsideOrderPointCallback(data){
	var allPoints = data.Result;
	//allLoyaltyPointConstant = allPoints;
	
	currentnum = allPoints.length;
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
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover dataTable no-footer dtr-inline' id='points_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
	strBuffer.append("<th width='15%'>Customer Email</th>");
	/*strBuffer.append("<th width='20%'>Customer Full Name</th>");*/
	strBuffer.append("<th width='20%'>Point Allocation Desc</th>");
	strBuffer.append("<th width='15%'>Amount($)</th>");
	strBuffer.append("<th width='15%'>Total Point Allocated</th>");
	strBuffer.append("<th width='15%'>Date Created</th>");
	strBuffer.append("<th width='15%'>Operation</th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	
	for ( var index in allPoints) {
		var pointRow = allPoints[index];
		if (pointRow.OrderType==1) {
			strBuffer.append("<tr rowID='"+pointRow.Id+"'>");
			var customerInfos = pointRow.OrderCustomer;
			if(jsObjNotNullOrUndefined(customerInfos)){
				var email = "N/A";
				if(customerInfos.Email != null && customerInfos.Email != undefined && customerInfos.Email != ''){
					email = customerInfos.Email;
				}
				strBuffer.append("<td>"+email+"</td>");
				
				/*var fullName = "N/A";
				if(customerInfos.FullName != null && customerInfos.FullName != undefined && customerInfos.FullName != ''){
					fullName = customerInfos.FullName;
				}
				strBuffer.append("<td>"+fullName+"</td>");*/
			}else{
				strBuffer.append("<td>N/A</td>");
				/*strBuffer.append("<td>N/A</td>");*/
			}
			
			var pointAllocationDesc = "N/A";
			if(pointRow.PointAllocationDesc != null && pointRow.PointAllocationDesc != undefined && pointRow.PointAllocationDesc != ''){
				pointAllocationDesc = pointRow.PointAllocationDesc;
			}
			strBuffer.append("<td>"+pointAllocationDesc+"</td>");
			
			var totalPrice = "N/A";
			if(pointRow.totalPrice != null && pointRow.totalPrice != undefined && pointRow.totalPrice != ''){
				totalPrice = pointRow.totalPrice;
			}
			strBuffer.append("<td>"+totalPrice+"</td>");
			
			var Point = "N/A";
			if(pointRow.Point != null && pointRow.Point != undefined && pointRow.Point != ''){
				Point = pointRow.Point;
			}
			strBuffer.append("<td>"+Point+"</td>");
			strBuffer.append("<td>"+formatDate(pointRow.CreatedAt)+"</td>");
			strBuffer.append("<td style='color: #5cb85c;'><i class='fa fa-info-circle cursorPointer' onclick='showPointMth(this)'></i></td>");
			strBuffer.append("</tr>");
		}
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#points_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 2 ] }],
		  "bAutoWidth": false 
	 });
	$('#points_table_length').css({ display: "none"});
	$('#points_table_info').parent().parent().css({ display: "none"});
	$('#points_table_filter').css({ display: "none"});
	
}


function listAllOutsideOrderPointCallback2(data){
	var allPoints = data.Result;
	allLoyaltyPointConstant = allPoints;
	
	
}

function showPointMth(obj){
	var itemID = $(obj).parents('tr').attr("rowid");
	console.log("id:"+itemID);
	
	var customerEmail = $(obj).parents('tr').children('td:nth-child(1)').text();
	//var customerName = $(obj).parents('tr').children('td:nth-child(2)').text();
	
	var pointAllocationDescEdit = $(obj).parents('tr').children('td:nth-child(2)').text();
	var amountEdit = $(obj).parents('tr').children('td:nth-child(3)').text();
	var totalPointEdit = $(obj).parents('tr').children('td:nth-child(4)').text();
	
	var expand = {	
			"OrderNumber" : {
	            "TargetTypeName": "Order"
	        }
	};
	var filter ={};
	pullDataFromCloudFunction("PointMonth","READ","",expand,listOrderProductsCallback,filter);
	$('#editUserModal').modal('show');
	
	$('#orderNumber').val("");
	$("#orderNumber").val(itemID);
	$('#agentId').val(customerEmail);
	//$('#agentName').val(customerName);
	
	$('#pointAllocationDescEdit').val(pointAllocationDescEdit);
	$('#amountEdit').val(amountEdit);
	$('#totalPointEdit').val(totalPointEdit);
}

function listOrderProductsCallback(data){
	
	var userPointMths = data.Result;
	//console.log(userPointMth);
	
	
	for ( var index in userPointMths) {
		var userPointMth = userPointMths[index];
		console.log("222"+userPointMth);
		if(userPointMth.OrderNumber[0] != null && userPointMth.OrderNumber[0] != undefined && userPointMth.OrderNumber[0] != ''){
			if(userPointMth.OrderNumber[0].Id != null && userPointMth.OrderNumber[0].Id != undefined 
					&& userPointMth.OrderNumber[0].Id != ''){
				console.log("111"+(userPointMth.OrderNumber[0].Id == $("#orderNumber").val()));
				if(userPointMth.OrderNumber[0].Id == $("#orderNumber").val()){
					$('#currentMth').val(userPointMth.CurrentMth);
					$('#currentMth2').val(userPointMth.CurrentMth2);
					$('#currentMth3').val(userPointMth.CurrentMth3);
					$('#currentMth4').val(userPointMth.CurrentMth4);
					$('#currentMth5').val(userPointMth.CurrentMth5);
					
					return;
				}
			}
		}
		
	}
	
}

function getCustomersList(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={};
	pullDataFromCloudFunction("Users","READ","",expand,writeDataToCustomersSelectorEdit,filter);
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


function timeFormat(datetime){
	var rtnDatetime = "";
	if (jsObjNotNullOrUndefined(datetime)) {
		rtnDatetime = datetime.replace("T", " ");
		rtnDatetime = rtnDatetime.substring(0,19);
	}
	return rtnDatetime;
}

function formatDate(time){
	var date2 = new Date(time);
	var localeString = date2.toLocaleString();
	return localeString;
	
     //var newTime = time.split(".")[0];
     //return newTime.replace("T", " ");
}


/**
 * Edit default Loyalty Point Rule begin
 */
function edit2DefaultRules(){
	$('#editDefaultRules').addClass("hidden");
	$('#saveDefaultRules').removeClass("hidden");
	$('#cancelDefaultRules').removeClass("hidden");
	$('#defaultRulesName').removeAttr("disabled");
	$('#defaultRulesCV').removeAttr("disabled");
	$('#defaultRulesPV').removeAttr("disabled");
}


function cancel2DefaultRules(){
	var ruleNameObj = $('#defaultRulesName');
	var ruleCVObj = $('#defaultRulesCV'); 
	var rulePVObj = $('#defaultRulesPV');
	removeErrorTip(ruleNameObj, ruleCVObj, rulePVObj)
	$('#cancelDefaultRules').addClass("hidden");
	$('#saveDefaultRules').addClass("hidden");
	
	ruleNameObj.val($('#oldDefaultRulesName').val()).attr("disabled", true);
	ruleCVObj.val($('#oldDefaultRulesCV').val()).attr("disabled", true);
	rulePVObj.val($('#oldDefaultRulesPV').val()).attr("disabled", true);
	$('#editDefaultRules').removeClass("hidden");
	
}

function save2DefaultRules(){
	var saveBtn = $('#saveDefaultRules');
	var cancelBtn = $('#cancelDefaultRules');
	var spinnerDiv = $('.savedefaultRuleSpinner');
	
	saveBtn.addClass("hidden");
	cancelBtn.addClass("hidden");
	spinnerDiv.removeClass("hidden");
	
	var ruleID = $('#defaultRuleID').val();
	var ruleNameObj = $('#defaultRulesName');
	var ruleCVObj = $('#defaultRulesCV');
	var rulePVObj = $('#defaultRulesPV');
	var userObj = { "RuleName" : ruleNameObj.val(),
						  "cv" : ruleCVObj.val(),
						  "pv" : rulePVObj.val()
				  };
	var expand = {												
				 };
	
	
	
	if (ruleID=='undefined' || ruleID==null || ruleID==''){
		if (inputsValidation2DefaultRules(ruleNameObj, ruleCVObj, rulePVObj)){
			//pullDataFromCloudFunction("PointRule","CREATE",userObj,expand,editDefaultRuleCallback);
			pullDataFromCloudWithToken("PointRule", "CREATE", userObj, "", "","", editDefaultRuleCallback);
		}else{
			saveBtn.removeClass("hidden");
			cancelBtn.removeClass("hidden");
			spinnerDiv.addClass("hidden");
		}
	} else {
		if (inputsValidation2DefaultRules(ruleNameObj, ruleCVObj, rulePVObj)){
			pullDataFromCloudWithToken("PointRule/" + ruleID, "UPDATE", userObj, "", "", "", editDefaultRuleCallback);
		//	pullDataFromCloudFunction("PointRule/" + ruleID,"UPDATE",updateFields,expand,selectUseRuleCallback2,filter);
		}else{
			saveBtn.removeClass("hidden");
			cancelBtn.removeClass("hidden");
			spinnerDiv.addClass("hidden");
		}
	}
	 
}

function editDefaultRuleCallback(data){
	
	$('#defaultRulesName').attr("disabled", true);
	$('#defaultRulesCV').attr("disabled", true);
	$('#defaultRulesPV').attr("disabled", true);
	$('.savedefaultRuleSpinner').addClass("hidden");
	$('#editDefaultRules').removeClass("hidden");
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
	
}

function inputsValidation2DefaultRules(ruleNameObj, ruleCVObj, rulePVObj){
	var validInputs = false;
	
	//remove Error Tip 
	removeErrorTip(ruleNameObj, ruleCVObj, rulePVObj)
	//$(".errorTip").addClass("displayNone");
	//$(".form-group").removeClass("has-error");
	
	var validateRuleName = false;
	var ruleName = ruleNameObj.val();
	if(ruleName=='undefined' || ruleName==null || ruleName.length<1){
		ruleNameObj.parent().parent().removeClass("has-error").addClass("has-error");
		ruleNameObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
		ruleNameObj.parent().parent()
							.next().addClass("displayNone").removeClass("displayNone")
							.children(":first").text("Rule Name is required.");
		//ruleNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(ruleName.length<5 || ruleName.length>45){
			ruleNameObj.parent().parent().removeClass("has-error").addClass("has-error");
			ruleNameObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint");//.text("Rule Name is required.");
			ruleNameObj.parent().parent()
								.next().addClass("displayNone").removeClass("displayNone")
								.children(":first").text("Length is 5 - 45.");
		}else{
			validateRuleName = true;
		}
	}
	
	var validateRuleCV = false;
	var ruleCV = ruleCVObj.val();
	if (ruleCV=='undefined' || ruleCV=='' || ruleCV==null) {
		ruleCVObj.parent().parent().removeClass("has-error").addClass("has-error");
		ruleCVObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
		ruleCVObj.parent().parent()
						  .next().addClass("displayNone").removeClass("displayNone")
						  .children(":first").text("Rule CV is required.");
	} else {
		if (!($.isNumeric(ruleCV))) {
			ruleCVObj.parent().parent().removeClass("has-error").addClass("has-error");
			ruleCVObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
			ruleCVObj.parent().parent()
							  .next().addClass("displayNone").removeClass("displayNone")
							  .children(":first").text("Rule CV should be Numeric.");
		} else {
			validateRuleCV = true;
		}
	}
	
	var validateRulePV = false;
	var rulePV = rulePVObj.val();
	if (rulePV=='undefined' || rulePV=='' || rulePV==null) {
		rulePVObj.parent().parent().removeClass("has-error").addClass("has-error");
		rulePVObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
		rulePVObj.parent().parent()
						  .next().addClass("displayNone").removeClass("displayNone")
						  .children(":first").text("Rule PV is required."); 
	} else {
		if (!($.isNumeric(rulePV))) {
			rulePVObj.parent().parent().removeClass("has-error").addClass("has-error");
			rulePVObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
			rulePVObj.parent().parent()
							  .next().addClass("displayNone").removeClass("displayNone")
							  .children(":first").text("Rule PV should be Numeric.");
		} else {
			validateRulePV = true;
		}
	}
	
	if (validateRuleName && validateRuleCV && validateRulePV) {
		validInputs = true;
	}
	return validInputs;
}

// remove default error tip
function removeErrorTip(ruleNameObj, ruleCVObj, rulePVObj){
	ruleNameObj.parent().parent().removeClass("has-error")
	 							 .siblings().removeClass("errorTip4RulePoint");
	ruleNameObj.parent().parent().next().addClass("displayNone");

	ruleCVObj.parent().parent().removeClass("has-error")
	  						   .siblings().removeClass("errorTip4RulePoint");
	ruleCVObj.parent().parent().next().addClass("displayNone");
	
	rulePVObj.parent().parent().removeClass("has-error")
	  						   .siblings().removeClass("errorTip4RulePoint");
	rulePVObj.parent().parent().next().addClass("displayNone");
	}
	
/**
 * Edit default Loyalty Point Rule end
 */


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
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);savePoint();'>Save</button>";
	$(".addModalFooter").html(footerHtmlStr);
}
function addModalSpinner(){
	$(".addModalFooter").html("<i class='fa fa-spinner fa-spin fa-x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveUserEdit();'>Save</button>";
	$(".editUserModalFooter").html(footerHtmlStr);
}

function cancelDialogEdit(){
	$('#editUserModal').modal('hide');
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
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

function savePoint(){
	addModalSpinner();
	var orderId = getNewGUID();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var orderObj = {
					"Id" : orderId,
					"OrderNumber": orderId,
					"OrderCustomer" :  $('#customersSelect').val(),
					"PointAllocationDesc" : $('#pointAllocationDescAdd').val(),
					"totalPrice" : $('#totalAmountAdd').val(),
					"Point" : $('#totalPointAdd').val(),
					"OrderType": 1,
					"Status": 10,
					"OrderCustomer": $('#customersSelect').val()
					};
	
	var currentMth = $('#currentMthAdd').val();
	var currentMth2 = $('#currentMth2Add').val();
	var currentMth3 = $('#currentMth3Add').val();
	var currentMth4 = $('#currentMth4Add').val();
	var currentMth5 = $('#currentMth5Add').val();
	
	if (currentMth2==undefined || currentMth2==null || currentMth2==''){
		currentMth2 = 0;
	}
	if (currentMth3==undefined || currentMth3==null || currentMth3==''){
		currentMth3 = 0;
	}
	if (currentMth4==undefined || currentMth4==null || currentMth4==''){
		currentMth4 = 0;
	}
	if (currentMth5==undefined || currentMth5==null || currentMth5==''){
		currentMth5 = 0;
	}
	var recordId = getNewGUID();
	
	console.log("new:"+orderId)
	var pointMthObj = {
			"Id": recordId,
			"OrderId" :  orderId,
			"OrderNumber": [orderId],
			"CustomerId" :  $('#customersSelect').val(),
			"CurrentMth" : currentMth,
			"CurrentMth2" : currentMth2,
			"CurrentMth3" : currentMth3,
			"CurrentMth4" : currentMth4,
			"CurrentMth5" : currentMth5,
			"Status" : 0
			};
	
	var modifyLogObj = {
			"Id": getGUID(),
			"CreateUserId" :  userId,
			"OperateType" : "CreateLoyaltyPointAllocation",
			"DateTime" : getCurrentDateTime(),
			"OperateSystem" : operateSystem,
			"Browser" : browerType,
			"Ip":ip,
			"RecordId":recordId
	}
	
	
	if(inputsValidation($('#customersSelect'),$('#pointAllocationDescAdd'),$('#totalAmountAdd'), $('#totalPointAdd'),$('#currentMthAdd'),
			$('#currentMth2Add'),$('#currentMth3Add'),$('#currentMth4Add'),$('#currentMth5Add'))){
		if(inputsToalPointAndMthSum($('#totalPointAdd'),$('#currentMthAdd'),$('#currentMth2Add'),
				$('#currentMth3Add'),$('#currentMth4Add'),$('#currentMth5Add'))){
			pullDataFromCloudFunction("Order","CREATE",orderObj,expand,createCallback);
			
			pullDataFromCloudFunction("PointMonth","CREATE",pointMthObj,expand,createCallback);
			
			pullDataFromCloudFunction("ModifyLog","CREATE",modifyLogObj,"",function callBack(data){
				console.log(data.Result);
			});
			$('#pointAllocationDescAdd').val("");
		}else{
			addModalSaveAndCancel();
			$('#pointAllocationDescAdd').val("");
		}
	} else {
		addModalSaveAndCancel();
		$('#pointAllocationDescAdd').val("");
	}
}

function inputsValidation(customersSelectObj, pointAllocationDescAddObj, totalAmountObj, totalPointObj, currentMthAddObj,
		currentMthAdd2Obj, currentMthAdd3Obj, currentMthAdd4Obj, currentMth5AddObj){
	var validInputs = false;
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateCustomersSelect = false;
	var customerSelect = customersSelectObj.val();
	if(customerSelect=='undefined' || customerSelect==null || customerSelect.length<1){
		customersSelectObj.parent().removeClass("has-error").addClass("has-error");
		customersSelectObj.prev().text("Customer Name is required.");
		customersSelectObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		validateCustomersSelect = true;
	}
	
	var validatePointAllocationDesc = true;
	var pointAllocationDesc = pointAllocationDescAddObj.val();
	if(pointAllocationDesc=='undefined' || pointAllocationDesc==null || pointAllocationDesc.length<1){

	}else{
		if(pointAllocationDesc.length>100){
			validatePointAllocationDesc = false;
			pointAllocationDescAddObj.parent().removeClass("has-error").addClass("has-error");
			pointAllocationDescAddObj.prev().text("Max length is 100.");
			pointAllocationDescAddObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var reg = /^\d+(?=\.{0,1}\d+$|$)/;
	
	var validateTotalAmount = false;
	var totalAmount = totalAmountObj.val();
	if (totalAmount=='undefined' || totalAmount=='' || totalAmount==null) {
		totalAmountObj.parent().removeClass("has-error").addClass("has-error");
		totalAmountObj.prev().text("Total amount is required.");
		totalAmountObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(totalAmount))) {
			totalAmountObj.parent().removeClass("has-error").addClass("has-error");
			totalAmountObj.prev().text("Total amount should be Numeric.");
			totalAmountObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			validateTotalAmount = true;
			/*if(!reg.test(totalAmount)){
				totalAmountObj.parent().removeClass("has-error").addClass("has-error");
				totalAmountObj.prev().text("Total amount cannot less than 0.");
				totalAmountObj.prev().addClass("displayNone").removeClass("displayNone");
				validateTotalAmount = false;
			}else{
				validateTotalAmount = true;
			}*/
			
		}
	}
	
	var validateTotalPoint = false;
	var totalPoint = totalPointObj.val();
	if (totalPoint =='undefined' || totalPoint=='' || totalPoint==null) {
		totalPointObj.parent().removeClass("has-error").addClass("has-error");
		totalPointObj.prev().text("Total point is required.");
		totalPointObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(totalPoint))) {
			totalPointObj.parent().removeClass("has-error").addClass("has-error");
			totalPointObj.prev().text("Total point should be Numeric.");
			totalPointObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			/*if(!reg.test(totalPoint)){
				totalPointObj.parent().removeClass("has-error").addClass("has-error");
				totalPointObj.prev().text("Total point cannot less than 0.");
				totalPointObj.prev().addClass("displayNone").removeClass("displayNone");
				validateTotalPoint = false;
			}else{
				validateTotalPoint = true;
			}*/
			validateTotalPoint = true;
		}
	}

	
	var validateCurrentMth = false;
	var currentMth = currentMthAddObj.val();
	if (currentMth==undefined || currentMth=='' || currentMth==null) {
		currentMthAddObj.parent().removeClass("has-error").addClass("has-error");
		//currentMthAddObj.prev().text("CurrentMth is required.");
		currentMthAddObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(currentMth))) {
			currentMthAddObj.parent().removeClass("has-error").addClass("has-error");
			//currentMthAddObj.prev().text("CurrentMth should be Numeric.");
			currentMthAddObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			
			/*if(!reg.test(currentMth)){
				currentMthAddObj.parent().removeClass("has-error").addClass("has-error");
				currentMthAddObj.prev().text("CurrentMth cannot less than 0.");
				currentMthAddObj.prev().addClass("displayNone").removeClass("displayNone");
				validateCurrentMth = false;
			}else{
				validateCurrentMth = true;
			}*/
			validateCurrentMth = true;
		}
	}

	var validateCurrentMth2 = false;
	var currentMth2 = currentMthAdd2Obj.val();
	if (currentMth2== undefined || currentMth2=='' || currentMth2==null) {
		validateCurrentMth2 = true;
	} else {
		if (!($.isNumeric(currentMth2))) {
			currentMthAdd2Obj.parent().removeClass("has-error").addClass("has-error");
			//currentMthAdd2Obj.prev().text("CurrentMth2 should be Numeric.");
			currentMthAdd2Obj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			/*if(!reg.test(currentMth2)){
				currentMthAdd2Obj.parent().removeClass("has-error").addClass("has-error");
				currentMthAdd2Obj.prev().text("CurrentMth2 cannot less than 0.");
				currentMthAdd2Obj.prev().addClass("displayNone").removeClass("displayNone");
				validateCurrentMth2 = false;
			}else{
				validateCurrentMth2 = true;
			}*/
			
			validateCurrentMth2 = true;
		}
	}
	
	var validateCurrentMth3 = false;
	var currentMth3 = currentMthAdd3Obj.val();
	if (currentMth3==undefined || currentMth3=='' || currentMth3==null) {
		validateCurrentMth3 = true;
	} else {
		if (!($.isNumeric(currentMth3))) {
			currentMthAdd3Obj.parent().removeClass("has-error").addClass("has-error");
			//currentMthAdd3Obj.prev().text("CurrentMth3 should be Numeric.");
			currentMthAdd3Obj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			/*if(!reg.test(currentMth3)){
				currentMthAdd3Obj.parent().removeClass("has-error").addClass("has-error");
				currentMthAdd3Obj.prev().text("CurrentMth3 cannot less than 0.");
				currentMthAdd3Obj.prev().addClass("displayNone").removeClass("displayNone");
				validateCurrentMth3 = false;
			}else{
				validateCurrentMth3 = true;
			}*/
			validateCurrentMth3 = true;
		}
	}
	
	var validateCurrentMth4 = false;
	var currentMth4 = currentMthAdd4Obj.val();
	if (currentMth4==undefined || currentMth4=='' || currentMth4==null) {
		validateCurrentMth4 = true;
	} else {
		if (!($.isNumeric(currentMth4))) {
			currentMthAdd4Obj.parent().removeClass("has-error").addClass("has-error");
			//currentMthAdd4Obj.prev().text("CurrentMth4 should be Numeric.");
			currentMthAdd4Obj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			/*validateCurrentMth4 = true;
			if(!reg.test(currentMth4)){
				currentMthAdd4Obj.parent().removeClass("has-error").addClass("has-error");
				currentMthAdd4Obj.prev().text("CurrentMth4 cannot less than 0.");
				currentMthAdd4Obj.prev().addClass("displayNone").removeClass("displayNone");
				validateCurrentMth4 = false;
			}else{
				validateCurrentMth4 = true;
			}*/
			
			validateCurrentMth4 = true;
		}
	}
	
	var validateCurrentMth5 = false;
	var currentMth5 = currentMth5AddObj.val();
	if (currentMth5==undefined || currentMth5=='' || currentMth5==null) {
		validateCurrentMth5 = true;
	} else {
		if (!($.isNumeric(currentMth5))) {
			currentMth5AddObj.parent().removeClass("has-error").addClass("has-error");
			//currentMthAdd4Obj.prev().text("CurrentMth4 should be Numeric.");
			currentMth5AddObj.prev().addClass("displayNone").removeClass("displayNone");
		} else {
			/*validateCurrentMth5 = true;
			if(!reg.test(currentMth5)){
				currentMth5AddObj.parent().removeClass("has-error").addClass("has-error");
				currentMth5AddObj.prev().text("CurrentMth5 cannot less than 0.");
				currentMth5AddObj.prev().addClass("displayNone").removeClass("displayNone");
				validateCurrentMth5 = false;
			}else{
				validateCurrentMth5 = true;
			}*/
			validateCurrentMth5 = true;
		}
	}
	
	if (validateCustomersSelect && validatePointAllocationDesc && validateTotalAmount && validateTotalPoint && validateCurrentMth
			&& validateCurrentMth2 && validateCurrentMth3 && validateCurrentMth4 && validateCurrentMth5) {
		validInputs = true;
	}
	return validInputs;
}

function inputsToalPointAndMthSum(totalPointObj, currentMthAddObj, currentMthAdd2Obj, currentMthAdd3Obj,
		currentMthAdd4Obj , currentMth5AddObj){
	var totalPoint = totalPointObj.val();
	var currentMth = currentMthAddObj.val();
	var currentMth2 = currentMthAdd2Obj.val();
	var currentMth3 = currentMthAdd3Obj.val();
	var currentMth4 = currentMthAdd4Obj.val();
	var currentMth5 = currentMth5AddObj.val();
	
	if (currentMth2==undefined || currentMth2==null || currentMth2==''){
		currentMth2 = 0;
	}
	if (currentMth3==undefined || currentMth3==null || currentMth3==''){
		currentMth3 = 0;
	}
	if (currentMth4==undefined || currentMth4==null || currentMth4=='' ){
		currentMth4 = 0;
	}
	if (currentMth5==undefined || currentMth5==null || currentMth5=='' ){
		currentMth5 = 0;
	}
	
	var sumCurrentMth =parseInt(currentMth) + parseInt(currentMth2) + parseInt(currentMth3) + parseInt(currentMth4)
	 		+ parseInt(currentMth5);
	var validResult = false;
	if(totalPoint == sumCurrentMth){
		validResult = true;
	}else{
		$('.validSum').removeClass("has-error").addClass("has-error");
		$('.validSum').text("Total point is not equal with the sum of the current month.");
		$('.validSum').addClass("displayNone").removeClass("displayNone");
	}
	return validResult;
}

function createCallback(data){
	addModalSaveAndCancel();
	$('#addModal').modal('hide');
	var expand = {
	};
	refreshTableContent();
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
}

function generateReport(){
	var allLoyaltyPointArray = allLoyaltyPointConstant;
	var allLoyaltyPoint = JSON.stringify(allLoyaltyPointArray);
	$.ajax({
		 type:"post",
		 url:"../report/gen_report_loyalty_point",
		 data:allLoyaltyPoint,
	     dataType: "json",
		 contentType:"application/json",
		 success:function(data){
			 window.open("/air2u/files/loyalty_point_report.xls");  
		 },
		 error: function(){
			 window.open("/air2u/files/loyalty_point_report.xls");  
		 }
		 });
}


//------------------------------
function selectAllMonthAllocation(){
	var expand = {	        
	};
	var filter ={};
	pullDataFromCloudFunction("PointMthAllocation","READ","",expand,listAllMonthAllocationCallback,filter);
};

var isSendPoint = "false";
var pointMonthId = null;

function listAllMonthAllocationCallback(data){
	var allMonthAllocation = data.Result;
	for (var index in allMonthAllocation) {
		var monthAllocationRecord = allMonthAllocation[index];
		//---------------------------------------- -替换5 -----------------
		
		if(monthAllocationRecord.month == currentMonth){
			pointMonthId = monthAllocationRecord.id;
			isSendPoint = monthAllocationRecord.value;
			
			if(isSendPoint == "true"){
				allocationPointByMth();
				return;
			}else{
				$('.allocation-point').addClass('disabled');
			}
		}
	}
}

function allocationPointByMth(){
	//alert("积分按月分配开始分配");
	var expand = {	
			"OrderNumber" : {
	            "TargetTypeName": "Order"
	        }
	};
	var filter ={};
	pullDataFromCloudFunction("PointMonth","READ","",expand,listOrderPointCallback,filter);
};

function listOrderPointCallback(data){
	var userPointMths = data.Result;
	for ( var index in userPointMths) {
		var userPointMth = userPointMths[index];
		
		var pointMthId = userPointMth.id;
		var userId = userPointMth.CustomerId;
		var needAllocatedPoint = 0;
		
		var mth1 = false;
		var mth2 = false;
		var mth3 = false;
		var mth4 = false;
		var mth5 = false;
		
		if(userPointMth.OrderNumber != null && userPointMth.OrderNumber != undefined && userPointMth.OrderNumber != ''){
			if(userPointMth.OrderNumber.OrderNumber != null && userPointMth.OrderNumber.OrderNumber != undefined 
					&& userPointMth.OrderNumber.OrderNumber != ''){
				
				if(userPointMth.CurrentMth5 != null && userPointMth.CurrentMth5 != undefined && userPointMth.CurrentMth5 != ''){
					needAllocatedPoint = userPointMth.CurrentMth5;
					mth1 = true;
					
				}else if(userPointMth.CurrentMth4 != null && userPointMth.CurrentMth4 != undefined && userPointMth.CurrentMth4 != ''){
					needAllocatedPoint = userPointMth.CurrentMth4;
					mth2 = true;
					
				}else if(userPointMth.CurrentMth3 != null && userPointMth.CurrentMth3 != undefined && userPointMth.CurrentMth3 != ''){
					needAllocatedPoint = userPointMth.CurrentMth3;
					mth3 = true;
					
				}else if(userPointMth.CurrentMth2 != null && userPointMth.CurrentMth2 != undefined && userPointMth.CurrentMth2 != ''){
					needAllocatedPoint = userPointMth.CurrentMth2;
					mth4 = true;
					
				}else if(userPointMth.CurrentMth != null && userPointMth.CurrentMth != undefined && userPointMth.CurrentMth != ''){
					needAllocatedPoint = userPointMth.CurrentMth;
					mth5 = true;
				}else{
					
				}
			}
		}
		
		var userCurrentPoint = 0;
		
		if(userId != null && userId != undefined && userId != ''){
			var expand = {};
			var filter ={};
		     
			pullDataFromCloudFunction("Users/"+userId,"READ","",expand,function(data){
				var userDetails = data.Result;
				userCurrentPoint = userDetails.CurrentPoint;
				
				var expand = {};
				var userObj = { "CurrentPoint" : parseInt(userCurrentPoint) + parseInt(needAllocatedPoint)
						};
				
				var userID = userId;
				pullDataFromCloudFunction("Users/"+userID,"UPDATE",userObj,expand,function(data){
					console.log("userId:"+userId+"分配积分："+needAllocatedPoint);
				});
				
				//------------------
				
				var expand2 = {};
				var mth2Obj = null;
				if(mth1){
					mth2Obj = { "CurrentMth" : 0 };
				}else if(mth1 == false && mth2){
					mth2Obj = { "CurrentMth2" : 0 };
				}else if(!mth1 && !mth2 && mth3){
					mth2Obj = { "CurrentMth3" : 0 };
				}else if(!mth1 && !mth2 && !mth3 && mth4){
					mth2Obj = { "CurrentMth4" : 0 };
				}else if(!mth1 && !mth2 && !mth3 && !mth4 && mth5){
					mth2Obj = { "CurrentMth5" : 0 };
				}
				
				pullDataFromCloudFunction("PointMonth/"+pointMthId,"UPDATE",mth2Obj,expand2,function(data){
				});
				
				
			},filter);
		}
	}
	
	//送完积分后更新这个月的状态
	if(pointMonthId != null && pointMonthId != undefined && pointMonthId !=''){
		var expand = {};
		var pointObj = { "value" : "false" };
		
		pullDataFromCloudFunction("PointMthAllocation/"+pointMonthId,"UPDATE",pointObj,expand,function(data){
		});
		
	}
}

var currentMonth;
var currentDay;

//判断当前日期是否需要去分配积分
function  validateIsNeedAllocate(){
	$('.allocation-point').removeClass('disabled');
	$('.allocation-point').unbind('click');
	currentMonth = getCurMonth();
	currentDay = getCurDay();
	if(currentDay != null && currentDay == 1){
		$('.allocation-point').unbind('click').bind('click',selectAllMonthAllocation);
	} else{
		setAllocationBtnDisabled();
	}
}

function setAllocationBtnDisabled(){
	$('.allocation-point').addClass('disabled');
}