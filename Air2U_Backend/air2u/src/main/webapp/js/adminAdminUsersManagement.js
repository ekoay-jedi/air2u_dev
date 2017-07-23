var allUserNames = "";
var allEmailNames = "";

var currentPage =0;
var currentnum = 10;
$(document).ready(function() {
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-AdminUser').addClass("active");
	
	loadPageContentData();
	getRolesEdit();
	
	//************新增查询
	$(".select-opr").unbind('click').bind('click', function(){
		
		//var select_name = $("input[name='select_name']").val();
		var select_name = $("input[name='select_name']").val();
		var select_name2 = select_name.substr(0, 1).toUpperCase() + select_name.substr(1, select_name.length - 1);
		
		var select_email = $("input[name='select_email']").val();
		var select_email2 = select_email.substr(0, 1).toUpperCase() + select_email.substr(1, select_email.length - 1);
		
		var select_full_name = $("input[name='select_full_name']").val();
		var select_full_name2 = select_full_name.substr(0, 1).toUpperCase() + select_full_name.substr(1, select_full_name.length - 1);
		
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_name) && select_name != ""){
			// { "$in" : [ "Ordinary Joe", "John Doe" ] } 
			//var select_nameFilter = {"Username": { "$in" : [ select_name, select_name2 ] } };
			var select_nameFilter = {"Username": {"$regex": ".*" + select_name + ".*"}};
			filters.push(select_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_email) && select_email !=""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		
		if(jsObjNotNullOrUndefined(select_full_name) && select_full_name !=""){
			//var select_full_nameFilter = {"FullName": { "$in" : [ select_full_name, select_full_name2 ] } };
			var select_full_nameFilter = {"FullName": {"$regex": ".*" + select_full_name + ".*"}};
			filters.push(select_full_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		var roles = {"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
		filters.push(roles);
		
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		currentPage =0;
		pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter2,0, 10);
		
	});
	
	//******************
});	

function loadPageContentData(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};

	var filter ={"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
	
	pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter,0,10);

}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};

	var filter ={"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
	
	
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage =0;
		$(".previous").addClass('disabled');
	}else{
		var select_name = $("input[name='select_name']").val();
		var select_email = $("input[name='select_email']").val();
		var select_full_name = $("input[name='select_full_name']").val();
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_name) && select_name != ""){
			var select_nameFilter = {"Username": {"$regex": ".*" + select_name + ".*"}};
			filters.push(select_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_email) && select_email !=""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		if(jsObjNotNullOrUndefined(select_full_name) && select_full_name !=""){
			var select_full_nameFilter = {"FullName": {"$regex": ".*" + select_full_name + ".*"}};
			filters.push(select_full_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		var roles = {"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
		filters.push(roles);
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {												//Please read the APIs to get how to write the valid query Expand
		};
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		//currentPage =0;
		pullDataFromCloudFunction("Users","READ","", expand, listAllAdminUsersCallback, filter2, currentPage, 10);
		
		//pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter,currentPage,10);
	}
};

function nextAdd(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};

	var filter ={"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
	
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		currentPage = currentPage +1;
		var select_name = $("input[name='select_name']").val();
		var select_email = $("input[name='select_email']").val();
		var select_full_name = $("input[name='select_full_name']").val();
		var select_number = $("input[name='select_number']").val();
		
		var filters = new Array();
		if(jsObjNotNullOrUndefined(select_name) && select_name != ""){
			var select_nameFilter = {"Username": {"$regex": ".*" + select_name + ".*"}};
			filters.push(select_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_email) && select_email !=""){
			var select_emailFilter = {"Email": {"$regex": ".*" + select_email + ".*"}};
			filters.push(select_emailFilter);
		}
		if(jsObjNotNullOrUndefined(select_full_name) && select_full_name !=""){
			var select_full_nameFilter = {"FullName": {"$regex": ".*" + select_full_name + ".*"}};
			filters.push(select_full_nameFilter);
		}
		if(jsObjNotNullOrUndefined(select_number) && select_number !=""){
			var select_numberFilter = {"ContactNumber": {"$regex": ".*" + select_number + ".*"}};
			filters.push(select_numberFilter);
		}
		var roles = {"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
		filters.push(roles);
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var expand = {												//Please read the APIs to get how to write the valid query Expand
		};
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		//currentPage =0;
		pullDataFromCloudFunction("Users","READ","", expand, listAllAdminUsersCallback, filter2, currentPage, 10);
		
		//pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter,currentPage,10);
	}
}


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
		if(roleRow.RoleName.indexOf("Administrator")!="-1"){
			strBuffer.append("<option value='"+roleRow.Id+"'>"+roleRow.RoleName+"</option>");
		}
	}
	$('#userRoleSelect').html(strBuffer.toString());
	addModalSaveAndCancel();
}

function getRolesEdit(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("AppRoles","READ","",expand,writeDataToRoleSelectorEdit,filter);
}

function writeDataToRoleSelectorEdit(data){
	var roles = data.Result;
	var strBuffer = new StringBuffer(); 
	for ( var index in roles) {
		var roleRow = roles[index];
		if(roleRow.RoleName.indexOf("Administrator")!="-1"){
			strBuffer.append("<option value='"+roleRow.Id+"'>"+roleRow.RoleName+"</option>");
		}
	}
	$('#userRoleSelectEdit').html(strBuffer.toString());
}


function listAllAdminUsersCallback(data){
	
	allUserNames = "";
	allEmailNames = "";
	var allAdminUsers = data.Result;
	
	currentnum = allAdminUsers.length;
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
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='adminUsers_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
		strBuffer.append("<th width='15%'>User Name</th>");
		strBuffer.append("<th width='20%'>Email</th>");
		strBuffer.append("<th width='20%'>Full Name</th>");
		/*strBuffer.append("<th width='15%'>Designation</th>");*/
		strBuffer.append("<th width='15%'>Contact Number</th>");
		strBuffer.append("<th width='15%'> </th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allAdminUsers) {
		var adminUserRow = allAdminUsers[index];
		var userRoleArray = adminUserRow.AppRoles;
		var length  = userRoleArray.length;
		for (var int = 0; int < length; int++) {
			var thisUsersRole = userRoleArray[int];
			var currentRoleName = thisUsersRole.RoleName;
			if (currentRoleName.indexOf("Administrator")!="-1") {
				allEmailNames = allEmailNames+" "+adminUserRow.Email;
				allUserNames = allUserNames+" "+adminUserRow.Username
				strBuffer.append("<tr rowID='"+adminUserRow.Id+"'>");
					strBuffer.append("<td>"+adminUserRow.Username+"</td>");
					strBuffer.append("<td>"+adminUserRow.Email+"</td>");
					strBuffer.append("<td>"+adminUserRow.FullName+"</td>");
					/*strBuffer.append("<td rowRoleID='"+thisUsersRole.Id+"'>"+currentRoleName+"</td>");*/
					strBuffer.append("<td rowRoleID='"+thisUsersRole.Id+"'>"+adminUserRow.ContactNumber+"</td>");
					strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateUser(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDelete(this)'></i></td>");
				strBuffer.append("</tr>");
				
				break;
			}
		}
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#adminUsers_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 4 ] }],
		  "bAutoWidth": false 
	 });
	
	$('#adminUsers_table_length').css({ display: "none"});
	$('#adminUsers_table_info').parent().parent().css({ display: "none"});
	$('#adminUsers_table_filter').css({ display: "none"});
	
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
	addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var userObj = { "Username" : $('#userNameAdd').val().toLowerCase(),
					"Password" : $('#userPasswordAdd').val(),
					"Email" : $('#userEmailAdd').val().toLowerCase(),
					"FullName" : $('#userFullNameAdd').val(),
					"ContactNumber" : $('#userContactNumberAdd').val(),
					"AppRoles" : [$('#userRoleSelect').val()]
					};
	
	if(inputsValidation($('#userNameAdd'),$('#userPasswordAdd'),$('#userEmailAdd'),$('#userFullNameAdd'),$('#userContactNumberAdd'))){
		pullDataFromCloudFunction("Users","CREATE",userObj,expand,createUserCallback);
	} else {
		addModalSaveAndCancel();
	}
}

function updateUser(obj){
	var itemID = $(obj).parents('tr').attr("rowid");
	
	var userName = $(obj).parents('tr').children('td:nth-child(1)').text();
	//var userPassword = $(obj).parents('tr').children('td:nth-child(1)').text();
	var userEmail = $(obj).parents('tr').children('td:nth-child(2)').text();
	var userFullname = $(obj).parents('tr').children('td:nth-child(3)').text();
	var userContactNumber = $(obj).parents('tr').children('td:nth-child(4)').text();
	var userRoleName = $(obj).parents('tr').children('td:nth-child(4)').text();
	var userRoleValue = $(obj).parents('tr').children('td:nth-child(4)').attr("rowRoleID");
	
	allUserNames = allUserNames.replace(userName,"");
	allEmailNames = allEmailNames.replace(userEmail,"");
	
	$("#toEditUserID").val(itemID);

	$('#userNameEdit').val(userName);
	$('#userEmailEdit').val(userEmail);
	$("#userFullNameEdit").val(userFullname);
	$("#userContactNumberEdit").val(userContactNumber);
	//$("#userRoleSelectEdit").html("<option value='"+userRoleValue+"'>"+userRoleName+"</option>");
	$("#userRoleSelectEdit").val(userRoleValue);
	//$('#resetPwdHref').attr('href',userEmail);
	
	$('#editUserModal').modal('show');
}

function sendEmailForPWd(){};


function saveUserEdit(){
	editModalSpinner();
	
	var userName = $('#userNameEdit').val().toLowerCase();
	var userEmail = $('#userEmailEdit').val().toLowerCase();
	var userFullname = $("#userFullNameEdit").val();
	var userContactNumber = $("#userContactNumberEdit").val();
	var userRole = $("#userRoleSelectEdit").val();
	
	var expand = {
	};
	var userObj = { "Username" : $('#userNameEdit').val(),
			"Email" : $('#userEmailEdit').val(),
			"FullName" : $('#userFullNameEdit').val(),
			"ContactNumber" : $('#userContactNumberEdit').val(),
			"AppRoles" : [$('#userRoleSelectEdit').val()]
			};
	
	var userID = $("#toEditUserID").val();
	if(inputsValidationEdit($('#userNameEdit'),$('#userEmailEdit'),$('#userFullNameEdit'),$('#userContactNumberEdit'))){
		pullDataFromCloudFunction("Users/"+userID,"UPDATE",userObj,expand,editUserCallback);
	} else {
		editModalSaveAndCancel();
	}
}

function inputsValidationEdit(userNameObj, userEmailObj, userFullNameObj, userContactNumberObj){
	var validInputs = false;
	
	var userName = userNameObj.val();
	var userEmail = userEmailObj.val();
	var userFullName = userFullNameObj.val();
	var userContactNumber = userContactNumberObj.val();
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateUserName = false;
	if(userName=='undefined' || userName==null || userName.length<1){
		userNameObj.parent().removeClass("has-error").addClass("has-error");
		userNameObj.prev().text("User Name is required.");
		userNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userName.length<5 || userName.length>45){
			userNameObj.parent().removeClass("has-error").addClass("has-error");
			userNameObj.prev().text("Length is 5 - 45.");
			userNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateUserName = true;
		}
	}
	
	//validate userName is existed
	if(allUserNames.indexOf(userName)>-1){
		userNameObj.parent().removeClass("has-error").addClass("has-error");
		userNameObj.prev().text("User Name is alerady existed.");
		userNameObj.prev().addClass("displayNone").removeClass("displayNone");
		validateUserName = false;
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
			validateEmail = true;
		}
	}
	
	//validate emails is existed
	if(allEmailNames.indexOf(userEmail)>-1){
		userEmailObj.parent().removeClass("has-error").addClass("has-error");
		userEmailObj.prev().text("Email is alerady existed.");
		userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
		validateEmail = false;
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
	
	if (validateUserName && validateEmail && validateFullName && validateContactNumber) {
		validInputs = true;
	}
	return validInputs;
}

function editUserCallback(data){
	$('#editUserModal').modal('hide');
	editModalSaveAndCancel();
	refreshTableContent2();
	
	//currentPage = 0;
}

function inputsValidation(userNameObj, userPasswordObj, userEmailObj, userFullNameObj, userContactNumberObj){
	var validInputs = false;
	
	var userName = userNameObj.val();
	var userPassword = userPasswordObj.val();
	var userEmail = userEmailObj.val();
	var userFullName = userFullNameObj.val();
	var userContactNumber = userContactNumberObj.val();
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateUserName = false;
	if(userName=='undefined' || userName==null || userName.length<1){
		userNameObj.parent().removeClass("has-error").addClass("has-error");
		userNameObj.prev().text("User Name is required.");
		userNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userName.length<5 || userName.length>45){
			userNameObj.parent().removeClass("has-error").addClass("has-error");
			userNameObj.prev().text("Length is 5 - 45.");
			userNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateUserName = true;
		}
	}
	
	//validate userName is existed
	if(allUserNames.indexOf(userName)>-1){
		userNameObj.parent().removeClass("has-error").addClass("has-error");
		userNameObj.prev().text("User Name is alerady existed.");
		userNameObj.prev().addClass("displayNone").removeClass("displayNone");
		validateUserName = false;
	}
	
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
			validateEmail = true;
		}
	}
	
	//validate emails is existed
	if(allEmailNames.indexOf(userEmail)>-1){
		userEmailObj.parent().removeClass("has-error").addClass("has-error");
		userEmailObj.prev().text("Email is alerady existed.");
		userEmailObj.prev().addClass("displayNone").removeClass("displayNone");
		validateEmail = false;
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
	
	if (validateUserName && validatePassword && validateEmail && validateFullName && validateContactNumber) {
		validInputs = true;
	}
	return validInputs;
}

var deleteAdminId = "";
function comfirmCheckOfDelete(obj){
	var roleID = $(obj).parents('tr').attr("rowid");
	deleteAdminId = roleID;
	$("#toDeleteItemID").val(roleID);
	$('#deleteModal').modal('show');
}

function deleteModalYes(){
	userID = deleteAdminId;
	if(userID != null && userID != ""){
		var expand = {};
		var userID = $("#toDeleteItemID").val();
		var userObj = {};
		deleteModalSpinner();
		pullDataFromCloudFunction("Users/"+userID,"DELETE",userObj,expand,deleteRoleCallback);	
	}
}

function deleteRoleCallback(data){
	$('#deleteModal').modal('hide');
	deleteModalYesAndNo();
	refreshTableContent2();
}


function refreshTableContent2(){
	cancelDialog();
	
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
	
}

function loadPageContentData2(){
	var expand = {	
			"AppRoles" : {
	            "TargetTypeName": "AppRoles"
	        }
	};

	var filter ={"AppRoles":{"$all":["051b8090-1bf7-11e7-a729-bf03fa169eff"] } };
	
	pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter,currentPage,10);

}


function createUserCallback(data){
	addModalSaveAndCancel();
	$('#addUserModal').modal('hide');
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
	$('#addAdminUserModal').modal('hide');
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
	
	$('#userRoleSelect').html('<option><span class="sr-only">Loading Data...</span></option>');
	$('.addUserModalFooter').html("");
}

function cancelDialogEdit(){
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
}


