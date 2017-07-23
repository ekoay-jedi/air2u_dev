var currentPage =0;
var currentnum = 10;

$(document).ready(function() {
	//set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-PointRule').addClass("active");
	
	$('.startDatePointRule').datetimepicker({
    	linkField:"startDatePointRuleAdd",
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
	
	$('.endDatePointRule').datetimepicker({
    	linkField:"endDatePointRuleAdd",
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
	
    $(".modal").scroll(function(){
    	$('.datetimepicker').css('display','none');
    });
    
	loadPageContentData();
});	

function loadPageContentData(){
	var expand = {};
	var filter ={};
	pullDataFromCloudFunction("PointRule","READ","",expand,listAllPointRulesCallback,filter,0, 10);
	//pullDataFromCloudWithToken2("PointRule", "READ", "", expand, "", "", listAllPointRulesCallback,0, 10);
}

function previousAdd(){
	currentPage = currentPage -1;
	
	var expand = {};
	var filter = {};
	
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		$(".previous").addClass('disabled');
	}else{
		pullDataFromCloudWithToken2("PointRule", "READ", "", expand, "", "", listAllPointRulesCallback,currentPage, 10);
	}
};

function nextAdd(){
	var expand = {};
	var filter = {};
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage =0;
		}
		currentPage = currentPage +1;
		pullDataFromCloudWithToken2("PointRule", "READ", "", expand, "", "", listAllPointRulesCallback,currentPage, 10);
	}
}
	

//Rules Name, CV, PV, Start Date, End Date
function listAllPointRulesCallback(data){
	var allPointRules = data.Result;
	
	currentnum = allPointRules.length;
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
	
	
	
	/*$('.pager-fenye-tip').html("Current page num is the <span style='color:red;'>"+ convertData(currentPage+1) +"</span>, " +
			"current count is  <span style='color:red;'>"+ currentCount + "</span>, total count is  <span style='color:red;'>" + sumCount +"</span>");
	*/
	$('.fenye-list').html("<li><a href='#' class='previous' onclick='previousAdd();'>Previous</a></li>" +
						  "<li><a href='#' class='next' onclick='nextAdd();'>Next</a></li>");
	
	
	var strBuffer = new StringBuffer(); 
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='pointRule_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
		strBuffer.append("<th width='15%'>Rules Name</th>");
		strBuffer.append("<th width='20%'>CV(RM)</th>");
		strBuffer.append("<th width='20%'>Air pt</th>");
		strBuffer.append("<th width='15%'>Start Date</th>");
		strBuffer.append("<th width='15%'>End Date</th>");
		strBuffer.append("<th width='15%'> </th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allPointRules) {
		var ruleRow = allPointRules[index];
		strBuffer.append("<tr rowID='"+ruleRow.Id+"'>");
		strBuffer.append("<td>"+ruleRow.RuleName+"</td>");
		strBuffer.append("<td>"+ruleRow.cv+"</td>");
		strBuffer.append("<td>"+ruleRow.pv+"</td>");
		
		//startDate
		if(jsObjNotNullOrUndefined(ruleRow.StartDate)){
			strBuffer.append("<td>"+ruleRow.StartDate.substring(0,10)+"</td>");
		}else{
			strBuffer.append("<td></td>");
		}
		
		//endDate
		if(jsObjNotNullOrUndefined(ruleRow.EndDate)){
			strBuffer.append("<td>"+ruleRow.EndDate.substring(0,10)+"</td>");
		}else{
			strBuffer.append("<td></td>");
		}
		// load default Loyalty point rule
		if(!jsObjNotNullOrUndefined(ruleRow.EndDate) && !jsObjNotNullOrUndefined(ruleRow.StartDate)){
			$('#defaultRuleID').val(ruleRow.Id);
			$('#oldDefaultRulesName').val(ruleRow.RuleName);
			$('#oldDefaultRulesCV').val(ruleRow.cv);
			$('#oldDefaultRulesPV').val(ruleRow.pv);
			
			$('#defaultRulesName').val(ruleRow.RuleName);
			$('#defaultRulesCV').val(ruleRow.cv);
			$('#defaultRulesPV').val(ruleRow.pv);
		}
		var dateComparedToNow = new Date().DateDiff('d',ruleRow.EndDate);
		if (dateComparedToNow<0) {
			strBuffer.append("<td>Expired</td>");
		}else {
			var isSelected = ruleRow.IsSelected;
			var btnCss = "danger";
			var onclickFunction = "selectUseRule(this)";
			if (jsObjNotNullOrUndefined(isSelected)&&isSelected) {
				btnCss = "success";
				onclickFunction = "";
			}
			strBuffer.append("<td><label class='btn btn-"+btnCss+"' rowID='"+ruleRow.Id+"' onclick='"+onclickFunction+"'></label></td>");
		}

//		if (roleRow.RoleName=="Customer" || roleRow.RoleName=="Administrator") {
//			strBuffer.append("<td></td>");
//		} else {
//			strBuffer.append("<td><i class='fa fa-edit fa-edit-style cursorPointer' onclick='updateRole(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteRole(this)'></i></td>");
//		}
	strBuffer.append("</tr>");
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#pointRule_table').DataTable({
		  responsive: true,
		  "aoColumnDefs": [ { "bSortable": false, "aTargets": [ 5 ] }],
		  "bAutoWidth": false 
	 });
	
	$('#pointRule_table_length').css({ display: "none"});
	$('#pointRule_table_info').parent().parent().css({ display: "none"});
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
						  .children(":first").text("Rule Air pt is required."); 
	} else {
		if (!($.isNumeric(rulePV))) {
			rulePVObj.parent().parent().removeClass("has-error").addClass("has-error");
			rulePVObj.parent().parent().siblings().removeClass("errorTip4RulePoint").addClass("errorTip4RulePoint"); 
			rulePVObj.parent().parent()
							  .next().addClass("displayNone").removeClass("displayNone")
							  .children(":first").text("Rule Air pt should be Numeric.");
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
		"<button type='button' class='btn btn-success' onclick='javascript:void(0);saveItem();'>Save</button>";
	$(".addModalFooter").html(footerHtmlStr);
}
function addModalSpinner(){
	$(".addModalFooter").html("<i class='fa fa-spinner fa-spin fa-x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialogEdit();'>Cancel</button>"+
		"<button type='button' class='btn btn-success' onclick='javascript:void(0);saveUserEdit();'>Save</button>";
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
	addModalSpinner();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var userObj = { "RuleName" : $('#ruleNameAdd').val(),
					"cv" : $('#ruleCVAdd').val(),
					"pv" : $('#rulePVAdd').val(),
					"StartDate" : $('#startDatePointRuleAdd').val(),
					"EndDate" : $('#endDatePointRuleAdd').val()
					};
	
	if(inputsValidation($('#ruleNameAdd'),$('#ruleCVAdd'),$('#rulePVAdd'),$('#startDatePointRuleAdd'),$('#endDatePointRuleAdd'))){
		pullDataFromCloudFunction("PointRule","CREATE",userObj,expand,createCallback);
	} else {
		addModalSaveAndCancel();
	}
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
		rulePVObj.prev().text("Rule Air pt is required.");
		rulePVObj.prev().addClass("displayNone").removeClass("displayNone");
	} else {
		if (!($.isNumeric(rulePV))) {
			rulePVObj.parent().removeClass("has-error").addClass("has-error");
			rulePVObj.prev().text("Rule Air pt should be Numeric.");
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
