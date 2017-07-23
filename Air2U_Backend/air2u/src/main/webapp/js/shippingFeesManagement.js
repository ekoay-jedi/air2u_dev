var currentPage = 0;
var currentnum = 10;

$(document).ready(function() {
	// set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Shipping-Fees').addClass("active");
//	 loadCategoryTreeData(); 
	loadPageContentData();
	
	//************新增查询
	$(".select-opr").unbind('click').bind('click', function(){
		
		//var select_name = $("input[name='select_name']").val();
		var select_name = $("input[name='select_name']").val();
		//var select_charges = $("input[name='select_charges']").val();
		
		var filters = new Array();
		
		if(jsObjNotNullOrUndefined(select_name) && select_name != ""){
			var select_nameFilter = {"ItemName": {"$regex": ".*" + select_name + ".*"}};
			filters.push(select_nameFilter);
		}
		/*if(jsObjNotNullOrUndefined(select_charges) && select_charges !=""){
			var select_emailFilter = {"Charges": {"$regex": ".*" + select_charges + ".*"}};
			filters.push(select_emailFilter);
		}*/
		
		
		var filter2 ={};
		if (filters.length > 0) {
			filter2 ={ "$and": filters };
		}
		
		var fieldsReturn = {
				 "Id" : 1,
				 "ItemName" : 1,
				 "Charges" : 1 
			}
		
		var expand = {	
				"AppRoles" : {
		            "TargetTypeName": "AppRoles"
		        }
		};
		currentPage = 0;
		pullDataFromCloudFunction("ShippingFee","READ","",expand,listAllShippingFeeCallback,filter2,0, 10);
		 	
	});
	
	//******************
});

function loadPageContentData() {
 		
	var fieldsReturn = {
		 "Id" : 1,
		 "ItemName" : 1,
		 "Charges" : 1 
	}
	//pullDataFromCloudWithToken("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback);
 	pullDataFromCloudWithToken2("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback, 0, 10);
}

function previousAdd(){
	currentPage = currentPage -1;
	
	var fieldsReturn = {
			 "Id" : 1,
			 "ItemName" : 1,
			 "Charges" : 1 
		}
	$('.next').removeClass('disabled');	
	if(currentPage < 0){
		currentPage = 0;
		$(".previous").addClass('disabled');
	}else{
		pullDataFromCloudWithToken2("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback, currentPage, 10);
	}
};

function nextAdd(){
	var fieldsReturn = {
			 "Id" : 1,
			 "ItemName" : 1,
			 "Charges" : 1 
		}
	
	$(".previous").removeClass('disabled');
	if(currentnum < 10){
		
	}else{
		if(currentPage<0){
			currentPage = 0;
		}
		currentPage = currentPage +1;
		pullDataFromCloudWithToken2("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback, currentPage, 10);
	}
}

function listAllShippingFeeCallback(data) {

	var allShippingFee = data.Result;
	
	currentnum = allShippingFee.length;
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
	var parentCategory;
	var category;
	var categoryId;
	var cateImgUrl;
	strBuffer.append("<table width='100%;' class='table dataTable table-striped table-bordered table-hover  dataTable no-footer dtr-inline' id='shipping_fees_table'>");
	strBuffer.append("<thead>");
	strBuffer.append("<tr class='table-header'>");
	strBuffer.append("<th width='15%'>#</th>");
	strBuffer.append("<th width='40%'>Item Name</th>");
	strBuffer.append("<th width='30%'>Charges</th>"); 
	strBuffer.append("<th width='15%'>Operation</th>");
	strBuffer.append("</tr>");
	strBuffer.append("</thead>");
	strBuffer.append("<tbody>");
	for ( var index in allShippingFee) {
		var shippingFeesRow = allShippingFee[index];
		var shippingFeesNum = parseInt(index) + 1; 
 
		strBuffer.append("<tr rowID='" + shippingFeesRow.Id + "'>");
		strBuffer.append("<td>" + shippingFeesNum + "</td>");
		strBuffer.append("<td>" + shippingFeesRow.ItemName + "</td>");
		strBuffer.append("<td>" + shippingFeesRow.Charges + "</td>"); 
	//	strBuffer.append("<td>" + shippingFeesRow.Charges + "</td>"); 
		 
		strBuffer.append("<td><i class='glyphicon glyphicon-edit cursorPointer' onclick='updateShippingFees(this)'></i>    <i class='glyphicon glyphicon-remove cursorPointer' onclick='comfirmCheckOfDeleteShippingFees(this)'></i></td>");
//		 
		strBuffer.append("</tr>");
	}
	strBuffer.append("</tbody>");
	strBuffer.append("</table>");
	$('.tableDiv').html(strBuffer.toString());
	$('#shipping_fees_table').DataTable({
		responsive : true,
		"autoWidth": false,
		"aoColumnDefs" : [ {
			"bSortable" : false,
			"aTargets" : [ 3 ]
		} ],
		"bAutoWidth": false 
	});
	
	$('#shipping_fees_table_length').css({ display: "none"});
	$('#shipping_fees_table_info').parent().parent().css({ display: "none"});
	$('#shipping_fees_table_filter').css({ display: "none"});
	
}


/**
 * add Shipping Fees begin
 */
 
function saveShippingFees() {
	addModalSpinner();
	var itemNameVal = $('#shippingFeesItemNameAdd').val();
	var chargesVal = $('#shippingFeesChargesAdd').val();
	var expand = {												 
	};
	var userObj = { "ItemName" : itemNameVal,
					"Charges" : chargesVal 
					};
	
	if(inputsShippingFeesValidation(itemNameVal, chargesVal, "Add")){
		pullDataFromCloudWithToken("ShippingFee", "CREATE", userObj, "", "","", createShippingFeeCallback);
	} else {
		addModalSaveAndCancel();
	}
}


function createShippingFeeCallback(data) {
	$("#addShippingFeesModal").modal('hide');
	addModalSaveAndCancel();
	refreshTableContent();

}
/**
 * add Shipping Fees end
 */



/**
 * edit Shipping Fees begin
 */
/**
 * show data for the edit modal
 */
function updateShippingFees(obj){
	var shippingFeesID = $(obj).parents('tr').attr("rowid");
	
	var itemNameVal = $(obj).parents('tr').children('td:nth-child(2)').text(); 
	var chargesVal = $(obj).parents('tr').children('td:nth-child(3)').text(); 
	
	$("#toEditShippingFees").val(shippingFeesID);
	$('#shippingFeesItemNameEdit').val(itemNameVal);
	$('#shippingFeesChargesEdit').val(chargesVal); 
	
	$('#editShippingFeesModal').modal('show');
}

/**
 * save Edit Data
 */
function saveEditShippingFees(){
	editModalSpinner();
	var shippingFeesID = $("#toEditShippingFees").val(); 
	var itemNameVal = $('#shippingFeesItemNameEdit').val();
	var chargesVal = $('#shippingFeesChargesEdit').val(); 
	
	var shippingFeesObj = {
			"Id" : shippingFeesID,
			"ItemName" : itemNameVal,
			"Charges" : chargesVal 
		};
	
	if(inputsShippingFeesValidation(itemNameVal, chargesVal, "Edit")){
		pullDataFromCloudWithToken("ShippingFee/" + shippingFeesID, "UPDATE", shippingFeesObj, "", "", "", editShippingFeeCallback);
	}else{
		editModalSaveAndCancel();
	}
}

function editShippingFeeCallback(data){
	$('#editShippingFeesModal').modal('hide');
	editModalSaveAndCancel();
	refreshTableContent2();
}

function refreshTableContent2() {
	cancelDialog();
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData2();
	
	
}

function loadPageContentData2() {
 		
	var fieldsReturn = {
		 "Id" : 1,
		 "ItemName" : 1,
		 "Charges" : 1 
	}
	//pullDataFromCloudWithToken("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback);
 	pullDataFromCloudWithToken2("ShippingFee", "READ", "", "", "","", listAllShippingFeeCallback, currentPage, 10);
}


/**
 * edit Shipping Fees end
 */

/**
 * Delete Shipping Fees start
 */
var deleteShippingId = "";
function comfirmCheckOfDeleteShippingFees(obj){
	var shippingFeesID = $(obj).parents('tr').attr("rowid");
	deleteShippingId = shippingFeesID;
	$("#toDeleteItemID").val(shippingFeesID);
	$('#deleteModal').modal('show');
}

function deleteShippingFees(){ 
	shippingFeesID = deleteShippingId;
	if(shippingFeesID != null && shippingFeesID != ""){
		var expand = {};
		var shippingFeesID = $("#toDeleteItemID").val();
		var shippingFeesObj = {};
		deleteModalSpinner();
		pullDataFromCloudWithToken("ShippingFee/"+shippingFeesID,"DELETE",shippingFeesObj,expand,"","",deleteShippingFeesCallback);	
	}
	
}

function deleteShippingFeesCallback(data) {
	$('#deleteModal').modal('hide');
	deleteModalYesAndNo();
	refreshTableContent2();
}
/***
 * Delete Shipping Fees end
 */
 
 
function addModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-success' onclick='javascript:void(0);saveShippingFees();'>Save</button>";
	$(".addShippingFeesFooter").html(footerHtmlStr);
}
function addModalSpinner() {
	$(".addShippingFeesFooter")
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function editModalSaveAndCancel() {
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog();'>Cancel</button>"
			+ "<button type='button' class='btn btn-success' onclick='javascript:void(0);saveEditShippingFees();'>Save</button>";
	$(".editShippingFeesFooter").html(footerHtmlStr);
}
function editModalSpinner() {
	$(".editShippingFeesFooter")
			.html(
					"<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}

function deleteModalYesAndNo(){
	var footerHtmlStr = '<button type="button" class="btn btn-default" data-dismiss="modal">No</button>'+
		'<button type="button" class="btn btn-danger" onclick="javascript:void(0);deleteShippingFees();">Yes</button>';
	$(".deleteModalFooter").html(footerHtmlStr);
}
function deleteModalSpinner(){
	$(".deleteModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}


/**
 * ShippingFees inputs Validation
 * @param itemNameVal
 * @param chargesVal
 * @param operation
 * @returns
 */
function inputsShippingFeesValidation(itemNameVal, chargesVal, operation) {
	var validInputs = false;

//	var itemNameVal = itemName;
//	var chargesVal = charges;
	var errorTipObj2ItemName;
	var errorTipObj2Name;
	
	if (operation == "Add"){
		errorTipObj2ItemName = $(".errorTipShippingFeesItemNameAdd");
		errorTipObj2Charges = $(".errorTipShippingFeesChargesAdd");
	}else{
		errorTipObj2ItemName = $(".errorTipShippingFeesItemNameEdit");
		errorTipObj2Charges = $(".errorTipShippingFeesChargesEdit");
	}

	// remove Error Tip
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error"); 

	var validateItemName = false;
	if (itemNameVal == 'undefined' || itemNameVal == null || itemNameVal.length < 1) {
		errorTipObj2ItemName.parent().removeClass("has-error").addClass("has-error"); 
		errorTipObj2ItemName.text("Item Name is required.");
		errorTipObj2ItemName.addClass("displayNone").removeClass("displayNone");
	} else {
		if (itemNameVal.length < 3 || itemNameVal.length > 45) {
			errorTipObj2ItemName.parent().removeClass("has-error").addClass("has-error"); 
			errorTipObj2ItemName.text("Length is 3 - 45.");
			errorTipObj2ItemName.addClass("displayNone").removeClass("displayNone");
			 
		} else {
			validateItemName = true;
		}
	}

	var validateCharges = false;
	if (chargesVal == 'undefined' || chargesVal == null || chargesVal.length < 1) {
		errorTipObj2Charges.parent().removeClass("has-error").addClass("has-error"); 
		errorTipObj2Charges.text("Charges is required.");
		errorTipObj2Charges.addClass("displayNone").removeClass("displayNone");
	} else {
		var reg = new RegExp("0|(^[1-9]+\d*$)");
		if (!reg.test(chargesVal)) {
			errorTipObj2Charges.parent().removeClass("has-error").addClass("has-error"); 
			errorTipObj2Charges.text("Charges must be positive real number or 0.");
			errorTipObj2Charges.addClass("displayNone").removeClass("displayNone");
			 
		} else {
			validateCharges = true;
		}
	}
	
	if (validateItemName && validateCharges) {
		validInputs = true;
	}
	return validInputs;
}


function refreshTableContent() {
	cancelDialog();
	currentPage = 0;
	$('.tableDiv').html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
	loadPageContentData();
	
	
}

function cancelDialog() {
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("input").val("");
	$("input").text("");
	$("textarea").val("");
	$("textarea").text(""); 
}

function cancelTreeDialog() {

}
