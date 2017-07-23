var allUsersConstant;
var allUserNames;
var allEmailNames;
var role = "";

var currentPage = 0;
var currentnum = 10;

$(document).ready(function() {
	role = $("#userRoleValue").val();
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-CustomerUser').addClass("active");
	
	loadPageContentData();
	loadUserPageContentData();
	getDataByUserId();
	pushNotification();
	
	//************新增查询
	$(".select-opr").unbind('click').bind('click', function(){
		
		var select_email = $("input[name='select_email']").val();
		var select_number = $("input[name='select_number']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_email) && select_email != ""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		
		var roles = {"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
		filters.push(roles);
		
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		console.log("11"+filters);
		
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		currentPage = 0;
		pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback,filter,0,10);
	});
	
	//******************
});	

function loadPageContentData(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
	
	pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback,filter,0,10);
}



function previousAdd(){
	currentPage = currentPage -1;
	
	$('.next').removeClass('disabled');	
	
	if(currentPage < 0){
		currentPage = 0;
		$(".previous").addClass('disabled');
	}else{
		var select_email = $("input[name='select_email']").val();
		var select_number = $("input[name='select_number']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_email) && select_email != ""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		
		var roles = {"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
		filters.push(roles);
		
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		console.log("11"+filters);
		
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		//currentPage = 0;
		
		pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback,filter,currentPage,10);
	}
};

function nextAdd(){
	/*var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };*/
	
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		var select_email = $("input[name='select_email']").val();
		var select_number = $("input[name='select_number']").val();
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_email) && select_email != ""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		
		var roles = {"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
		filters.push(roles);
		
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		console.log("11"+filters);
		
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		
		currentPage = currentPage +1;
		pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback,filter,currentPage,10);
	}
}
	

function loadUserPageContentData(){
	var expand = {};
	var filter ={"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
	pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback2,filter);

};

function getRoles(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("AppRoles","READ","",expand,writeDataToRoleSelector,filter);
}

function writeDataToRoleSelector(data){
	var roles = data.Result;
	var strBuffer = new StringBuffer(); 
	for ( var index in roles) {
		var roleRow = roles[index];
		if(roleRow.RoleName=="Customer"){
			strBuffer.append("<option value='"+roleRow.Id+"'>"+roleRow.RoleName+"</option>");
		}
	}
	$('#userRoleSelect').html(strBuffer.toString());
	addModalSaveAndCancel();
};

function listAllCustomersCallback2(data){
	var allUsers = data.Result;
	allUsersConstant = allUsers;
	
}


function listAllCustomersCallback(data){
	var allUsers = data.Result;
	currentnum = allUsers.length;
	
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
	
	
	allUserNames = "";
	allEmailNames = "";
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='users_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
	strBuffer.append("<th width='13%'>Customer Name</th>");
	strBuffer.append("<th width='15%'>Customer Email</th>");
	
	strBuffer.append("<th width='15%'>Home Address</th>");
	strBuffer.append("<th width='17%'>Contact Number</th>");
	strBuffer.append("<th width='15%'>Total Ponit</th>");
	/**/
	strBuffer.append("<th width='15%'>Inroducer Id</th>");
	strBuffer.append("<th width='15%'>Introducer</th>");
	strBuffer.append("<th width='17%'>Introducer Contact</th>");
	strBuffer.append("<th width='15%'> </th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allUsers) {
		var userRow = allUsers[index];
		var userRoleArray = userRow.AppRoles;
		if(userRoleArray.length<1){
			var totalPoint = 0;
			if(userRow.CurrentPoint != null && userRow.CurrentPoint != undefined && userRow.CurrentPoint != ""){
				totalPoint = userRow.CurrentPoint;
			}
			
			var introducerEmail = "N/A";
			if(userRow.IntroducerEmail != null && userRow.IntroducerEmail != undefined && userRow.IntroducerEmail != ""){
				introducerEmail = userRow.IntroducerEmail;
			}
			var introducerName = "N/A";
			if(userRow.IntroducerName != null && userRow.IntroducerName != undefined && userRow.IntroducerName != ""){
				introducerName = userRow.IntroducerName;
			}
			
			
			var introducerContact = "N/A";
			if(userRow.IntroducerContact != null && userRow.IntroducerContact != undefined && userRow.IntroducerContact != ""){
				introducerContact = userRow.IntroducerContact;
			}
			
			var HomeAddress = "N/A";
			if(userRow.HomeAddress != null && userRow.HomeAddress != undefined && userRow.HomeAddress != ""){
				HomeAddress = userRow.HomeAddress;
			}
			
			var ContactNumber = "N/A";
			if(userRow.ContactNumber != null && userRow.ContactNumber != undefined && userRow.ContactNumber != ""){
				ContactNumber = userRow.ContactNumber;
			}
			
			var fullName = "N/A";
			if(userRow.FullName != null && userRow.FullName != undefined && userRow.FullName != ""){
				fullName = userRow.FullName;
			}else{
				fullName = userRow.Email
			}
			allUserNames = allUserNames+" "+userRow.Username;
			allEmailNames = allEmailNames+" "+userRow.Email;
			strBuffer.append("<tr rowID='"+userRow.Id+"'>");
				strBuffer.append("<td>"+fullName+"</td>");
				strBuffer.append("<td>"+userRow.Email+"</td>");
				//strBuffer.append("<td>"+userRow.Username+"</td>");
				strBuffer.append("<td>"+HomeAddress+"</td>");
				strBuffer.append("<td>"+ContactNumber+"</td>");
				strBuffer.append("<td>"+totalPoint+"</td>");
				
				strBuffer.append("<td>"+introducerEmail+"</td>");
				strBuffer.append("<td>"+introducerName+"</td>");
				strBuffer.append("<td>"+introducerContact+"</td>");
				strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateUser(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDelete(this)'></i></td>");
			strBuffer.append("</tr>");
			
		} else {
			for (var int = 0; int < userRoleArray.length; int++) {
				var thisUsersRole = userRoleArray[int];
				var currentRoleName = thisUsersRole.RoleName;
				if (currentRoleName=="Customer") {
					var totalPoint = 0;
					if(userRow.CurrentPoint != null && userRow.CurrentPoint != undefined && userRow.CurrentPoint != ""){
						totalPoint = userRow.CurrentPoint;
					}
					
					var introducerEmail = "N/A";
					if(userRow.IntroducerEmail != null && userRow.IntroducerEmail != undefined && userRow.IntroducerEmail != ""){
						introducerEmail = userRow.IntroducerEmail;
					}
					
					var introducerName = "N/A";
					if(userRow.IntroducerName != null && userRow.IntroducerName != undefined && userRow.IntroducerName != ""){
						introducerName = userRow.IntroducerName;
					}
					
					var introducerContact = "N/A";
					if(userRow.IntroducerContact != null && userRow.IntroducerContact != undefined && userRow.IntroducerContact != ""){
						introducerContact = userRow.IntroducerContact;
					}
					
					var HomeAddress = "N/A";
					if(userRow.HomeAddress != null && userRow.HomeAddress != undefined && userRow.HomeAddress != ""){
						HomeAddress = userRow.HomeAddress;
					}
					
					var ContactNumber = "N/A";
					if(userRow.ContactNumber != null && userRow.ContactNumber != undefined && userRow.ContactNumber != ""){
						ContactNumber = userRow.ContactNumber;
					}
					
					var fullName = "N/A";
					if(userRow.FullName != null && userRow.FullName != undefined && userRow.FullName != ""){
						fullName = userRow.FullName;
					}else{
						fullName = userRow.Email
					}
					
					allUserNames = allUserNames+" "+userRow.Username;
					allEmailNames = allEmailNames+" "+userRow.Email;
					strBuffer.append("<tr rowID='"+userRow.Id+"'>");
						strBuffer.append("<td>"+fullName+"</td>");
						strBuffer.append("<td>"+userRow.Email+"</td>");
						//strBuffer.append("<td>"+userRow.Username+"</td>");
						strBuffer.append("<td>"+HomeAddress+"</td>");
						strBuffer.append("<td>"+ContactNumber+"</td>");
						strBuffer.append("<td>"+totalPoint+"</td>");
						strBuffer.append("<td>"+introducerEmail+"</td>");
						strBuffer.append("<td>"+introducerName+"</td>");
						strBuffer.append("<td>"+introducerContact+"</td>");
						strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateUser(this)'></i>  " +
								"  <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDelete(this)'></i></td>");
					strBuffer.append("</tr>");
					
					break;
				}
			}
		}
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#users_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 5 ] }],
		  "bAutoWidth": false 
	 });
	
	$('#users_table_length').css({ display: "none"});
	$('#users_table_info').parent().parent().css({ display: "none"});
	$('#users_table_filter').css({ display: "none"});
	
	
	//$('#users_table_length').css({ display: "none"});
	//$('#users_table_info').parent().parent().css({ display: "none"});
}

function addModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveUser();'>Save</button>";
	$(".addUserModalFooter").html(footerHtmlStr);
}
function addModalSpinner(){
	$(".addUserModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
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
		'<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteModalYes();">Yes</button>';
	$(".deleteModalFooter").html(footerHtmlStr);
}
function deleteModalSpinner(){
	$(".deleteModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function saveUser(){
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var userObj = { "Username" : $('#userEmailAdd').val().toLowerCase(),
					"Password" : $('#userPasswordAdd').val(),
					"Email" : $('#userEmailAdd').val().toLowerCase(),
					"FullName" : $('#userFullNameAdd').val(),
					"ContactNumber" : $('#userContactNumberAdd').val(),
					"HomeAddress" : $('#userHomeAddressAdd').val(),
					"AppRoles" : [$('#userRoleSelect').val()],
					"TotalPoint": 0,
					"IntroducerEmail": $('#userIntroducerEmailAdd').val().toLowerCase(),
					"IntroducerName": $('#userIntroducerNameAdd').val(),
					"IntroducerContact" :$('#userIntroducerContact').val(),
					"State": $("#userState").val()
					};
	
	//judge userEmail is exist in database
	var email = $('#userEmailAdd').val().toLowerCase();
	var filter = {"Username":{"$eq": email } };
	pullDataFromCloudFunction("Users","READ","","",function(data){
		if(data.Count<1){
			if(inputsValidation($('#userPasswordAdd'),$('#userEmailAdd'),$('#userFullNameAdd'),$('#userContactNumberAdd'),
					$('#userHomeAddressAdd'),$('#userIntroducerEmailAdd'),$('#userIntroducerNameAdd'))){
				addModalSpinner();
				pullDataFromCloudFunction("Users","CREATE",userObj,expand,createUserCallback);
			} else {
				addModalSaveAndCancel();
			}
		} else{
			$('#userEmailAdd').parent().removeClass("has-error").addClass("has-error");
			$('#userEmailAdd').prev().text("Email is alerady existed.");
			$('#userEmailAdd').prev().addClass("displayNone").removeClass("displayNone");
			addModalSaveAndCancel();
		}
	},filter);
	
}


function updateUser(obj){
	var itemID = $(obj).parents('tr').attr("rowid");
	
	//var userName = $(obj).parents('tr').children('td:nth-child(3)').text();
	var userEmail = $(obj).parents('tr').children('td:nth-child(2)').text();
	var userFullname = $(obj).parents('tr').children('td:nth-child(1)').text();
	var userContactNumber = $(obj).parents('tr').children('td:nth-child(4)').text();
	var userHomeAddress = $(obj).parents('tr').children('td:nth-child(3)').text();
	var userTotalPointEdit = $(obj).parents('tr').children('td:nth-child(5)').text();

	var userIntroducerEmailEdit = $(obj).parents('tr').children('td:nth-child(6)').text();
	var userIntroducerNameEdit = $(obj).parents('tr').children('td:nth-child(7)').text();
	var userIntroducerContactEdit = $(obj).parents('tr').children('td:nth-child(8)').text();
	
	//remove current edited username and email from the filter list
	//allUserNames = allUserNames.replace(userName,"");
	allEmailNames = allEmailNames.replace(userEmail,"");

	$("#toEditUserID").val(itemID);

	//$('#userNameEdit').val(userName);
	$('#userEmailEdit').val(userEmail);
	$("#userFullNameEdit").val(userFullname);
	$("#userContactNumberEdit").val(userContactNumber);
	$("#userHomeAddressEdit").val(userHomeAddress);
	$('#userIntroducerEmailEdit').val(userIntroducerEmailEdit);
	$('#userIntroducerNameEdit').val(userIntroducerNameEdit);
	$('#userIntroducerContactEdit').val(userIntroducerContactEdit);
	
	
	var totalPoint = 0;
	if(userTotalPointEdit != null && userTotalPointEdit != undefined && userTotalPointEdit != ""){
		totalPoint = userTotalPointEdit;
	}
	$("#userTotalPointEdit").val(totalPoint);
	if(role!="Root"){
		$("#userTotalPointEdit").attr("readonly","readonly");
	}
	
	$('#editUserModal').modal('show');
}

function saveUserEdit(){
	editModalSpinner();
	
	//var userName = $('#userNameEdit').val();
	var userEmail = $('#userEmailEdit').val().toLowerCase();
	var userFullname = $("#userFullNameEdit").val();
	var userContactNumber = $("#userContactNumberEdit").val();
	var userHomeAddress = $("#userHomeAddressEdit").val();
	var userTotalPoint = $("#userTotalPointEdit").val();	
	var userIntroducerEmailEdit = $('#userIntroducerEmailEdit').val().toLowerCase();
	var userIntroducerNameEdit = $('#userIntroducerNameEdit').val();
	var userIntroducerContact = $('#userIntroducerContactEdit').val();
	
	var expand = {
	};
	var userObj = { "Username" : $('#userEmailEdit').val().toLowerCase(),
			"Email" : $('#userEmailEdit').val().toLowerCase(),
			"FullName" : $('#userFullNameEdit').val(),
			"ContactNumber" : $('#userContactNumberEdit').val(),
			"HomeAddress" : $('#userHomeAddressEdit').val(),
			"CurrentPoint" : $("#userTotalPointEdit").val(),
			"IntroducerEmail": $('#userIntroducerEmailEdit').val().toLowerCase(),
			"IntroducerName": $('#userIntroducerNameEdit').val(),
			"IntroducerContact" :$('#userIntroducerContactEdit').val()
			};
	
	var userID = $("#toEditUserID").val();
	if(inputsValidationEdit($('#userEmailEdit'),$('#userFullNameEdit'),$('#userContactNumberEdit'),$('#userHomeAddressEdit'),
			$('#userTotalPointEdit'),$('#userIntroducerEmailEdit'),$('#userIntroducerNameEdit'))){
		pullDataFromCloudFunction("Users/"+userID,"UPDATE",userObj,expand,editUserCallback);
	} else {
		editModalSaveAndCancel();
	}
}

function inputsValidationEdit(/*userNameObj,*/ userEmailObj, userFullNameObj, userContactNumberObj,userHomeAddressObj, userTotalPointObj, userIntroducerEmailObj, userIntroducerNameObj){
	var validInputs = false;
	
	//var userName = userNameObj.val();
	var userEmail = userEmailObj.val();
	var userFullName = userFullNameObj.val();
	var userContactNumber = userContactNumberObj.val();
	var userTotalPoint = userTotalPointObj.val();
	var userIntroducerEmail = userIntroducerEmailObj.val();
	var userIntroducerName = userIntroducerNameObj.val();
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateEmail = false;
	var userEmail = userEmailObj.val();
	if(userEmail=='undefined' || userEmail==null || userEmail.length<1){
		userEmailObj.parent().removeClass("has-error").addClass("has-error");
		userEmailObj.prev().text("User Name is required.");
		userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userEmail.length<2 || userEmail.length>100){
			userEmailObj.parent().removeClass("has-error").addClass("has-error");
			userEmailObj.prev().text("Length is 2 - 100.");
			userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateEmail = true;
		}
	}
	
	//validate email format
    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  
    if(!(isEmail.test(userEmail))){  
    	userEmailObj.parent().removeClass("has-error").addClass("has-error");
		userEmailObj.prev().text("Please input correct email format.");
		userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
		validateEmail = false;
    }
	
	var validateFullName = true;
	var userFullName = userFullNameObj.val();
	if(userFullName=='undefined' || userFullName==null || userFullName.length<1){

	}else{
		if(userFullName.length>100){
			validateFullName = false;
			userFullNameObj.parent().removeClass("has-error").addClass("has-error");
			userFullNameObj.prev().text("Max length is 100.");
			userFullNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateContactNumber = true;
	var userContactNumber = userContactNumberObj.val();
	if(userContactNumber=='undefined' || userContactNumber==null || userContactNumber.length<1){

	}else{
		if(userContactNumber.length>30){
			validateContactNumber = false;
			userContactNumberObj.parent().removeClass("has-error").addClass("has-error");
			userContactNumberObj.prev().text("Max length is 30.");
			userContactNumberObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateHomeAddress = true;
	var userHomeAddress = userHomeAddressObj.val();
	if(userHomeAddress=='undefined' || userHomeAddress==null || userHomeAddress.length<1){

	}else{
		if(userHomeAddress.length>200){
			validateHomeAddress = false;
			userHomeAddressObj.parent().removeClass("has-error").addClass("has-error");
			userHomeAddressObj.prev().text("Max length is 30.");
			userHomeAddressObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateTotalPoint = true;
	var userTotalPoint = userTotalPointObj.val();
	if(userTotalPoint== undefined || userTotalPoint==null){

	}else{
		if(userTotalPoint<0){
			validateTotalPoint = false;
			userTotalPointObj.parent().removeClass("has-error").addClass("has-error");
			userTotalPointObj.prev().text("Value cannot less than 0.");
			userTotalPointObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateIntroducerEmail = true;
	var userIntroducerEmail = userIntroducerEmailObj.val();
	if(userIntroducerEmail=='undefined' || userIntroducerEmail==null || userIntroducerEmail.length<1 || userIntroducerEmail=='N/A' || userIntroducerEmail=='n/a' ){

	}else{
		if(userIntroducerEmail.length<2 || userIntroducerEmail.length>100){
			userIntroducerEmailObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerEmailObj.prev().text("Length is 2 - 100.");
			userIntroducerEmailObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerEmail = false;
		}else{
			
		}
		
		//validate IntroducerEmail  format
	    if(!(isEmail.test(userIntroducerEmail))){  
	    	userIntroducerEmailObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerEmailObj.prev().text("Please input correct email format.");
			userIntroducerEmailObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerEmail = false;
	    }

	}
	
	
	
	var validateIntroducerName = true;
	var userIntroducerName = userIntroducerNameObj.val();
	if(userIntroducerName=='undefined' || userIntroducerName==null || userIntroducerName.length<1  || userIntroducerName=='N/A'){

	}else{
		if(userIntroducerName.length<2 || userIntroducerName.length>100){
			userIntroducerNameObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerNameObj.prev().text("Length is 2 - 100.");
			userIntroducerNameObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerName = false;
		}else{
			
		}
	}
	
	if (/*validateUserName &&*/ validateEmail && validateFullName && validateContactNumber && validateHomeAddress && validateTotalPoint && validateIntroducerEmail && validateIntroducerName) {
		validInputs = true;
	}
	return validInputs;
}

function editUserCallback(data){
	$('#editUserModal').modal('hide');
	editModalSaveAndCancel();
	refreshTableContent2();
}

function inputsValidation(userPasswordObj, userEmailObj, userFullNameObj, userContactNumberObj, userHomeAddressObj,
		userIntroducerEmailObj, userIntroducerNameObj){
	var validInputs = false;
	
	//var userName = userNameObj.val();
	var userPassword = userPasswordObj.val();
	var userEmail = userEmailObj.val();
	var userFullName = userFullNameObj.val();
	var userContactNumber = userContactNumberObj.val();
	var userIntroducerEmail = userIntroducerEmailObj.val();
	var userIntroducerName = userIntroducerNameObj.val();
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	
	
	var validatePassword = false;
	if(userPassword=='undefined' || userPassword==null || userPassword.length<1){
		userPasswordObj.parent().removeClass("has-error").addClass("has-error");
		userPasswordObj.prev().text("Password is required.");
		userPasswordObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userPassword.length<2 || userPassword.length>15){
			userPasswordObj.parent().removeClass("has-error").addClass("has-error");
			userPasswordObj.prev().text("Length is 2 - 15.");
			userPasswordObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validatePassword = true;
		}
	}
	
	var validateEmail = false;
	var userEmail = userEmailObj.val();
	if(userEmail=='undefined' || userEmail==null || userEmail.length<1){
		userEmailObj.parent().removeClass("has-error").addClass("has-error");
		userEmailObj.prev().text("Email is required.");
		userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userEmail.length<2 || userEmail.length>100){
			userEmailObj.parent().removeClass("has-error").addClass("has-error");
			userEmailObj.prev().text("Length is 2 - 100.");
			userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			//validate email format
		    var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  
		    if(!(isEmail.test(userEmail))){  
		    	userEmailObj.parent().removeClass("has-error").addClass("has-error");
				userEmailObj.prev().text("Please input correct email format.");
				userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
				validateEmail = false;
		    }else{
		    	//validate emails is existed
				if(allEmailNames.indexOf(userEmail)>-1){
					userEmailObj.parent().removeClass("has-error").addClass("has-error");
					userEmailObj.prev().text("Email is alerady existed.");
					userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
					validateEmail = false;
				}else{
					validateEmail = true;
				}
		    }
		}
	}
	
	
	var validateFullName = true;
	var userFullName = userFullNameObj.val();
	if(userFullName=='undefined' || userFullName==null || userFullName.length<1){

	}else{
		if(userFullName.length>100){
			validateFullName = false;
			userFullNameObj.parent().removeClass("has-error").addClass("has-error");
			userFullNameObj.prev().text("Max length is 100.");
			userFullNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateContactNumber = true;
	var userContactNumber = userContactNumberObj.val();
	if(userContactNumber=='undefined' || userContactNumber==null || userContactNumber.length<1){

	}else{
		if(userContactNumber.length>8){
			validateContactNumber = false;
			userContactNumberObj.parent().removeClass("has-error").addClass("has-error");
			userContactNumberObj.prev().text("Max length is 8.");
			userContactNumberObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateHomeAddress = true;
	var userHomeAddress = userHomeAddressObj.val();
	if(userHomeAddress=='undefined' || userHomeAddress==null || userHomeAddress.length<1){

	}else{
		if(userHomeAddress.length>200){
			validateHomeAddress = false;
			userHomeAddressObj.parent().removeClass("has-error").addClass("has-error");
			userHomeAddressObj.prev().text("Max length is 200.");
			userHomeAddressObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			
		}
	}
	
	var validateIntroducerEmail = true;
	var userIntroducerEmail = userIntroducerEmailObj.val();
	if(userIntroducerEmail=='undefined' || userIntroducerEmail==null || userIntroducerEmail.length<1){

	}else{
		if(userIntroducerEmail.length<2 || userIntroducerEmail.length>100){
			userIntroducerEmailObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerEmailObj.prev().text("Length is 2 - 100.");
			userIntroducerEmailObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerEmail = false;
		}
		//validate IntroducerEmail format
	    if(!(isEmail.test(userIntroducerEmail))){  
	    	userIntroducerEmailObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerEmailObj.prev().text("Please input correct email format.");
			userIntroducerEmailObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerEmail = false;
	    }
		
	}
	
	
	var validateIntroducerName = true;
	var userIntroducerName = userIntroducerNameObj.val();
	if(userIntroducerName=='undefined' || userIntroducerName==null || userIntroducerName.length<1){

	}else{
		if(userIntroducerName.length<2 || userIntroducerName.length>100){
			userIntroducerNameObj.parent().removeClass("has-error").addClass("has-error");
			userIntroducerNameObj.prev().text("Length is 2 - 100.");
			userIntroducerNameObj.prev().addClass("displayNone").removeClass("displayNone");
			validateIntroducerEmail = false;
		}
	}
	
//	var imageFormatCheck = true;
//	var imageName = userImageObj.val();
//	if (!(imageName.endWith(".png") || imageName.endWith(".PNG")
//			|| imageName.endWith(".jpg") || imageName.endWith(".JPG")
//			|| imageName.endWith(".jpeg") || imageName.endWith(".JPEG"))) {
//		userImageObj.parent().removeClass("has-error").addClass("has-error");
//		userImageObj.prev().text("Avatar image need to be png/jpg.");
//		userImageObj.prev().addClass("displayNone").removeClass("displayNone");
//		imageFormatCheck = false;
//	}
	
	if (validatePassword && validateEmail && validateFullName && validateContactNumber && validateHomeAddress
			&& validateIntroducerEmail && validateIntroducerName) {
		validInputs = true;
	} else{
		validInputs = false;
	}
	return validInputs;
}

function comfirmCheckOfDelete(obj){
	var roleID = $(obj).parents('tr').attr("rowid");
	$("#toDeleteItemID").val(roleID);
	$('#deleteModal').modal('show');
}

function deleteModalYes(){
	var expand = {};
	var userID = $("#toDeleteItemID").val();
	var res = judgeCurCustomerHasOrder(userID);
	if(res){
		if(userID != null && userID != ""){
			var userObj = {};
			deleteModalSpinner();
			pullDataFromCloudFunction("Users/"+userID,"DELETE",userObj,expand,deleteRoleCallback);	
		}
	} else{
		
		//this custome has orders
		$('#forbiddenDeleteModal').modal('show');
		
		
	}
}

function deleteRoleCallback(data){
	$('#deleteModal').modal('hide');
	deleteModalYesAndNo();
	refreshTableContent2();
}

function createUserCallback(data){
	addModalSaveAndCancel();
	$('#addUserModal').modal('hide');
	var expand = {
	};
	refreshTableContent();
}

function refreshTableContent2(){
	cancelDialog();
	//currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
}

function loadPageContentData2(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};
	var filter ={"AppRoles":{"$all":["6eef4710-1b78-11e7-9db6-6f96120ca80c"] } };
	
	pullDataFromCloudFunction("Users","READ","",expand,listAllCustomersCallback,filter,currentPage,10);

}


function refreshTableContent(){
	cancelDialog();
	currentPage = 0;
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
}

function cancelDialog(){
	$('#addUserModal').modal('hide');
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
	
	$('#userRoleSelect').html('<option><span class="sr-only">Loading Data...</span></option>');
	$('.addUserModalFooter').html("");
}

function cancelDialogEdit(){
	$('#editUserModal').modal('hide');
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
}

function generateReport(){
	var allUsersArray = allUsersConstant;
	var users = JSON.stringify(allUsersArray);
	$.ajax({
		 type:"post",
		 url:"../report/gen_report",
		 data:users,
	     dataType: "json",
		 contentType:"application/json",
		 success:function(data){
			 window.open("/air2u/files/customer_list_report.xls");  
		 },
		 error: function(){
			 window.open("/air2u/files/customer_list_report.xls");  
		 }
		 });
}

function judgeCurCustomerHasOrder(userID){
	var retVal = true;
	if(allExistedOrderUserIds.indexOf(userID) > 0){
		retVal= false;
	}
	return retVal;
}

function getDataByUserId() {
	var expand = {	
			"OrderCustomer" : {
	            "TargetTypeName": "Users",
	            "Fields" : {
					"Id" : 1
				}
	        }
	};
				
	pullDataFromCloudWithToken("Order", "READ", "", expand, "","",getAllUserIds);

}
var allExistedOrderUserIds = "";

//get all customerUSerId from order if this user has orders
function getAllUserIds(data) {
	allExistedOrderUserIds = "";
	var allOrders = data.Result;
	for ( var index in allOrders) {
		var orderRow = allOrders[index];
		var orderCustomer = orderRow.OrderCustomer;
		if(orderCustomer!=null){
			allExistedOrderUserIds = allExistedOrderUserIds+" "+orderCustomer.Id;
			}
		}
}
