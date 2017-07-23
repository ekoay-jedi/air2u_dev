$(document).ready(function() {
	// set the selected menu highlighted.
	$('#side-menu').children('a').removeClass("active");
	$('.Admin-Taxation').addClass("active");
//	 loadCategoryTreeData(); 
	loadPageContentData();
	$('#editTaxRate').unbind("click").bind("click",function(){
		$(this).addClass("hidden");
		$('#taxRate').removeAttr("disabled");
		$('#saveTaxRate').removeClass("hidden");
		$('#cancelTaxRate').removeClass("hidden");
	}); 
	
	$('#cancelTaxRate').unbind("click").bind("click",function(){
		//var rateValue = $('#editTaxRate').text();
		$('#taxRate').val($('#taxRate').attr("name"));
		$('#taxRate').attr("disabled", true);
		$(this).addClass("hidden");
		$('#saveTaxRate').addClass("hidden");
		$('#editTaxRate').removeClass("hidden");
		$(".input-group").removeClass("has-error");
		$(".errorTip-tax").addClass("displayNone");
	}); 

	$('#taxStatus').unbind('click').bind('click',function(){
		
		alert(111)
	})
	$('#saveTaxRate').unbind("click").bind("click",function(){
		saveTaxRate();
	}); 
	
	$('#taxStatus').bootstrapSwitch({  
        onText:'On',  
        offText:'Off'  
    });  
});

function loadPageContentData() { 
				
 var fieldsReturn = {
		 "Id" : 1,
		 "TaxRate" : 1,
		 "TaxStatus": 1
	}
	pullDataFromCloudWithToken("TaxRate", "READ", "", "", "",fieldsReturn, showTaxRate);

}

function showTaxRate(data) {
	var dataResult = data.Result;
	//alert(dataResult.Id);
	if (dataResult[0].Id != null && dataResult[0].Id != undefined && dataResult[0].Id != ""){
		$('#taxRateID').val(dataResult[0].Id);
	}
	
	if (dataResult[0].TaxRate != null && dataResult[0].TaxRate != undefined && dataResult[0].TaxRate != ""){
		$('#taxRate').val(dataResult[0].TaxRate * 100);
		$('#taxRate').attr("name",dataResult[0].TaxRate * 100);
	}
	
	if(dataResult[0].TaxStatus != null && dataResult[0].TaxStatus != undefined ){
		if(dataResult[0].TaxStatus == "1"){
			$('#taxStatus').bootstrapSwitch('state',true); 
		}else{
			$('#taxStatus').bootstrapSwitch('state',false); 
		}
	}else{
		console.log(dataResult[0].TaxStatus);
	}
}
function saveTaxRate(){
	
	
	//$('#editTaxRate').removeClass("hidden");
	var taxRateID = $('#taxRateID').val();
	var taxRateVal = $('#taxRate').val();
	var taxStatusVal = $('#taxStatus').bootstrapSwitch('state');
	console.log($('#taxStatus').bootstrapSwitch('state'));
	
	if (taxRateVal == null && taxRateVal == undefined && taxRateVal == ""){
		taxRateVal = 0;
	}
	var taxStatus = 0; // 0 : false , 1: true
	if(taxStatusVal == true){
		taxStatus = 1;
	}
	
	if (taxRateInputsValidation(taxRateVal)){
		taxRateVal = taxRateVal/100;
		$('#taxRate').attr("disabled", true);
		$('#cancelTaxRate').addClass("hidden");
		$('#saveTaxRate').addClass("hidden");
		$('.saveSpinner').removeClass('hidden');
		var fileObj = {
				"TaxRate" : taxRateVal,
				"TaxStatus": taxStatus
			 };
		if (taxRateID != null && taxRateID != undefined && taxRateID != ""){
			pullDataFromCloudWithToken("TaxRate/" + taxRateID, "UPDATE", fileObj, "", "", "",taxRateCallback);
		}else{
			pullDataFromCloudWithToken("TaxRate", "CREATE", fileObj, "", "", "",taxRateCallback);
		}
	} else{
		return;
	}
	
}

function taxRateCallback(data) {
	$('.saveSpinner').addClass('hidden');
	$('#editTaxRate').removeClass("hidden");
	loadPageContentData();
}


//function taxRateInputsValidation(val){
//    var reg = /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/;
//    var isMoneyFormatRight = reg.test(val);
//    return isMoneyFormatRight;
//}


function taxRateInputsValidation(val) {
	// remove Error Tip
	$(".input-group").removeClass("has-error");
	$(".errorTip-tax").addClass("displayNone");
	var validInputs = false;
	 
	var reg = new RegExp("^[0-9]+([.][0-9]{1}){0,1}$");
	var errorMsg = "Field must be number and precision should be two decimals.";
	if(!reg.test(val)){
		$(".input-group").addClass("has-error");
		$(".errorTip-tax").text(errorMsg);
		$(".errorTip-tax").css("display","");
		$(".errorTip-tax").removeClass("displayNone");
	}else{
		validInputs = true;
	}
	return validInputs;
}

