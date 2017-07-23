var currentPage =0;
var currentnum = 10;

$(document).ready(function() {
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Role').addClass("active");
	
	loadPageContentData();
	
	//************新增查询
	$(".select-opr").unbind('click').bind('click', function(){
		
		//var select_name = $("input[name='select_name']").val();
		var select_role = $("input[name='select_role']").val();
		var select_code = $("input[name='select_code']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_role) && select_role != ""){
			var select_roleFilter = {"RoleName": {"$regex": ".*" + select_role + ".*"}};
			filters.push(select_roleFilter);
		}
		if(jsObjNotNullOrUndefined(select_code) && select_code !=""){
			var select_codeFilter = {"RoleCode": {"$regex": ".*" + select_code + ".*"}};
			filters.push(select_codeFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {												//Please read the APIs to get how to write the valid query Expand
		};
		
		currentPage =0;
		pullDataFromCloudFunction("AppRoles","READ","",expand,listAllRolesCallback,filter,0,10);
	});
	
	//******************
});	

function loadPageContentData(){
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	pullDataFromCloudFunction("AppRoles","READ","",expand,listAllRolesCallback,"",0,10);
	//pullDataFromCloudWithToken2("AppRoles","READ","",expand,"",listAllRolesCallback,currentPage,10);
	//pullDataFromCloudFunction("Users","READ","",expand,listAllAdminUsersCallback,filter,0,10);
}



function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {};
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage =0;
		$(".previous").addClass('disabled');
	}else{
		
		//var select_name = $("input[name='select_name']").val();
		var select_role = $("input[name='select_role']").val();
		var select_code = $("input[name='select_code']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_role) && select_role != ""){
			var select_roleFilter = {"RoleName": {"$regex": ".*" + select_role + ".*"}};
			filters.push(select_roleFilter);
		}
		if(jsObjNotNullOrUndefined(select_code) && select_code !=""){
			var select_codeFilter = {"RoleCode": {"$regex": ".*" + select_code + ".*"}};
			filters.push(select_codeFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {												//Please read the APIs to get how to write the valid query Expand
		};
		
		pullDataFromCloudFunction("AppRoles","READ","",expand,listAllRolesCallback,"",currentPage,10);
	}
};

function nextAdd(){
	var expand = {};
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		
		//var select_name = $("input[name='select_name']").val();
		var select_role = $("input[name='select_role']").val();
		var select_code = $("input[name='select_code']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_role) && select_role != ""){
			var select_roleFilter = {"RoleName": {"$regex": ".*" + select_role + ".*"}};
			filters.push(select_roleFilter);
		}
		if(jsObjNotNullOrUndefined(select_code) && select_code !=""){
			var select_codeFilter = {"RoleCode": {"$regex": ".*" + select_code + ".*"}};
			filters.push(select_codeFilter);
		}
		
		var filter ={};
		if (filters.length > 0) {
			filter ={ "$and": filters };
		}
		
		var expand = {												//Please read the APIs to get how to write the valid query Expand
		};
		
		currentPage = currentPage +1;
		pullDataFromCloudFunction("AppRoles","READ","",expand,listAllRolesCallback,"",currentPage,10);
	}
}
	

function listAllRolesCallback(data){
	//alert(data.Result); // this will be what we always use in a AJAX callback.
	var allAppRoles = data.Result;
	
	currentnum = allAppRoles.length;
	
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
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='roles_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
		strBuffer.append("<th width='40%'>Role Name</th>");
		strBuffer.append("<th width='40%'>Role Code</th>");
		strBuffer.append("<th width='20%'> </th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allAppRoles) {
		var roleRow = allAppRoles[index];
		strBuffer.append("<tr rowID='"+roleRow.Id+"'>");
			strBuffer.append("<td>"+roleRow.RoleName+"</td>");
			strBuffer.append("<td>"+roleRow.RoleCode+"</td>");
			if (roleRow.RoleName=="Customer" || roleRow.RoleName=="Administrator") {
				strBuffer.append("<td></td>");
			} else {
				strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateRole(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteRole(this)'></i></td>");
			}
		strBuffer.append("</tr>");
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#roles_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 2 ] }],
		  "bAutoWidth": false 
	 });
	
	$('#roles_table_length').css({ display: "none"});
	$('#roles_table_info').parent().parent().css({ display: "none"});
	$('#roles_table_filter').css({ display: "none"});
}

function addModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"+
		"<button type='button' class='btn btn-success' onclick='javascript:void(0);saveRole();'>Save</button>";
	$(".addRoleModalFooter").html(footerHtmlStr);
}
function addModalSpinner(){
	$(".addRoleModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"+
		"<button type='button' class='btn btn-success' onclick='javascript:void(0);saveRoleEdit();'>Save</button>";
	$(".editRoleModalFooter").html(footerHtmlStr);
}
function editModalSpinner(){
	$(".editRoleModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function saveRole(){
	addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var roleObj = { "RoleName" : $('#roleNameAdd').val(),
					"RoleCode" : $('#roleCodeAdd').val()};
	if(roleInputsValidation($('#roleNameAdd'),$('#roleCodeAdd'))){
		pullDataFromCloudFunction("AppRoles","CREATE",roleObj,expand,createRoleCallback);
	} else {
		addModalSaveAndCancel();
	}
}

function updateRole(obj){
	var roleID = $(obj).parents('tr').attr("rowid");
	var roleName = $(obj).parents('tr').children('td:nth-child(1)').text();
	var roleCode = $(obj).parents('tr').children('td:nth-child(2)').text();
	$('#roleNameEdit').val(roleName);
	$('#roleCodeEdit').val(roleCode);
	$("#toEditRoleID").val(roleID);
	
	$('#editRoleModal').modal('show');
}

function saveRoleEdit(){
	editModalSpinner();
	
	var roleID = $("#toEditRoleID").val();
	var roleName = $('#roleNameEdit').val();
	var roleCode = $('#roleCodeEdit').val();
	
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var roleObj = { "RoleName" : roleName,
					"RoleCode" : roleCode};
	if(roleInputsValidation($('#roleNameEdit'),$('#roleCodeEdit'))){
		pullDataFromCloudFunction("AppRoles/"+roleID,"UPDATE",roleObj,expand,editRoleCallback);
	} else {
		editModalSaveAndCancel();
	}
}

function editRoleCallback(data){
	editModalSaveAndCancel();
	$('#editRoleModal').modal('hide');
	var expand = {
	};
	refreshTableContent();
}

function roleInputsValidation(roleNameObj, roleCodeObj){
	var validInputs = false;
	
	var roleName = roleNameObj.val();
	var roleCode = roleCodeObj.val();
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	var validateRoleName = false;
	if(roleName=='undefined' || roleName==null || roleName.length<1){
		roleNameObj.parent().removeClass("has-error").addClass("has-error");
		roleNameObj.prev().text("Role Name is required.");
		roleNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(roleName.length<5 || roleName.length>45){
			roleNameObj.parent().removeClass("has-error").addClass("has-error");
			roleNameObj.prev().text("Length is 5 - 45.");
			roleNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateRoleName = true;
		}
	}
	
	var validateRoleCode = false;
	if(roleCode=='undefined' || roleCode==null || roleCode.length<1){
		roleCodeObj.parent().removeClass("has-error").addClass("has-error");
		roleCodeObj.prev().text("Role Code is required.");
		roleCodeObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(roleCode.length<2 || roleCode.length>15){
			roleCodeObj.parent().removeClass("has-error").addClass("has-error");
			roleCodeObj.prev().text("Length is 2 - 15.");
			roleCodeObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateRoleCode = true;
		}
	}
	
	if (validateRoleName && validateRoleCode) {
		validInputs = true;
	}
	return validInputs;
}

var deleteRoleId = "";

function comfirmCheckOfDeleteRole(obj){
	var roleID = $(obj).parents('tr').attr("rowid");
	deleteRoleId = roleID;
	$("#toDeleteItemID").val(roleID);
	$('#deleteModal').modal('show');
}

function deleteRole(){
	var roleId = deleteRoleId;
	if(roleId != null && roleId != ""){
		var expand = {};
		var roleObj = {};
		pullDataFromCloudFunction("AppRoles/"+roleId,"DELETE",roleObj,expand,deleteRoleCallback);	
	}
	
}

function deleteRoleCallback(data){
	$('#deleteModal').modal('hide');
	refreshTableContent();
}

function createRoleCallback(data){
	addModalSaveAndCancel();
	$('#addRoleModal').modal('hide');
	var expand = {
	};
	refreshTableContent();
}

function refreshTableContent(){
	cancelDialog();
	currentPage = 0;
	
	var expand = {
	};
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	pullDataFromCloudFunction("AppRoles","READ","",expand,listAllRolesCallback);
	
	
}

function cancelDialog(){
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
}
