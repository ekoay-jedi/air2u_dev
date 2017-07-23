
function ShowProfileFunction(){
	var userID = $('#userIDValue').val();
	var expand = {};
	var filter ={};
     
	pullDataFromCloudFunction("Users/"+userID,"READ","",expand,showProfileToEditForm,filter);
	addUpdateProfileModalSaveAndCancel();	
}

function showProfileToEditForm(data){
	var userDetails = data.Result;
	
	/*$('#emailEdit').val(userDetails.Email);*/
	$('#usernameEdit').val(userDetails.Username);
	$('#fullNameEdit').val(userDetails.FullName);
	$('#contactNumberEdit').val(userDetails.ContactNumber);
	$('#homeAddressEdit').val(userDetails.HomeAddress);
	$('#updateProfileModal').modal('show');
	addUpdateProfileModalSaveAndCancel();
}


function addUpdateProfileModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog2();'>Cancel</button>"+
		"<button type='button' class='btn btn-primary' onclick='javascript:void(0);saveUpdatedProfile();'>Save</button>";
	$(".updateProfileModalFooter").html(footerHtmlStr);
}


function saveUpdatedProfile(){
	addModalSpinnerForUpdatedProfile();
	var expand = {												//Please read the APIs to get how to write the valid query Expand
	};
	var userObj = { /*"Email" : $('#emailEdit').val(),*/
					"Username" : $('#usernameEdit').val(),
					"FullName" : $('#fullNameEdit').val(),
					"ContactNumber" : $('#contactNumberEdit').val(),
					"HomeAddress" : $('#homeAddressEdit').val()
					};
	
	if(inputsUpdateProfileValidation(/*$('#emailEdit'),*/$('#usernameEdit'),$('#fullNameEdit'),$('#contactNumberEdit'))){
		pullDataFromCloudFunction("Users/"+$('#userIDValue').val(),"UPDATE",userObj,expand,updateProfileCallback);
	} else {
		addModalSaveAndCancel();
	}
}

function updateProfileCallback(data){
	$('#updateProfileModal').modal('hide');
	addModalSaveAndCancel();
}

function addModalSpinnerForUpdatedProfile(){
	$(".updateProfileModalFooter").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
}


function inputsUpdateProfileValidation(/*emailObj,*/ userNameObj, fullNameObj, userContactNumberObj){
	var validInputs = false;
	
	//remove Error Tip 
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	
	/*var validateEmail = false;
	var email = emailObj.val();
	if(email=='undefined' || email==null || email.length<1){
		emailObj.parent().removeClass("has-error").addClass("has-error");
		emailObj.prev().text("Email is required.");
		emailObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(email.length<2 || email.length>100){
			emailObj.parent().removeClass("has-error").addClass("has-error");
			emailObj.prev().text("Length is 2 - 100.");
			emailObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateEmail = true;
		}
	}*/
	
	var validateUserName = false;
	var userName = userNameObj.val();
	if(userName=='undefined' || userName==null || userName.length<1){
		usernameObj.parent().removeClass("has-error").addClass("has-error");
		userNameObj.prev().text("User Name is required.");
		userNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(userName.length<3 || userName.length>45){
			userNameObj.parent().removeClass("has-error").addClass("has-error");
			userNameObj.prev().text("Length is 3 - 45.");
			userNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateUserName = true;
		}
	}
	
	var validateFullName = false;
	var fullName = fullNameObj.val();
	if(fullName=='undefined' || fullName==null || fullName.length<1){
		fullNameObj.parent().removeClass("has-error").addClass("has-error");
		fullNameObj.prev().text("Full Name is required.");
		fullNameObj.prev().addClass("displayNone").removeClass("displayNone");
	}else{
		if(fullName.length<5 || fullName.length>45){
			fullNameObj.parent().removeClass("has-error").addClass("has-error");
			fullNameObj.prev().text("Length is 5 - 45.");
			fullNameObj.prev().addClass("displayNone").removeClass("displayNone");
		}else{
			validateFullName = true;
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
	if (/*validateEmail &&*/ validateUserName && validateFullName && validateContactNumber) {
		validInputs = true;
	}
	return validInputs;
}

function addModalSaveAndCancel(){
	var footerHtmlStr = "<button type='button' class='btn btn-default' data-dismiss='modal' onclick='javascript:void(0);cancelDialog2();'>Cancel</button>"+
		"<button type='button' class='btn btn-success' onclick='javascript:void(0);saveRole();'>Save</button>";
	$(".updateProfileModalFooter").html(footerHtmlStr);
}


function cancelDialog2() {
	
	$(".errorTip").addClass("displayNone");
	$(".form-group").removeClass("has-error");
	$("textarea").val("");
	$("textarea").text("");
	//$(textarea)
}
