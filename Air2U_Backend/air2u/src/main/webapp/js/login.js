
function loginFunction(){
//	jQuery.ajax({
//		type: "GET",
//		contentType: "application/json; charset=utf-8",
//		url: "../report/test",
//		dataType: "json",
//		success: function(data){
//			alert(data.Result);
//		}
//	});
		var user = {
			    "username": $("#username").val().toLowerCase(),
			    "password": $("#password").val(),
			    "grant_type": "password"
			};
		
		$(".loginAndErrorDiv").html("<i class='fa fa-spinner fa-spin fa-3x fa-fw'></i><span class='sr-only'>Processing...</span>");
//		var el = new Everlive(cloudAppInfos.appID);
//		el.authentication.login('admin', // username
//			    '123456', // password
//			    function (data) { // success callback
//			        
//			    },
//			    function(error) { // error callback
//			        alert("Failed to login");
//			    });
			$.ajax({
			    type: "POST",
			    url: 'https://api.everlive.com/v1/'+cloudAppInfos.appID+'/oauth/token',
			    contentType: "application/json",
			    data: JSON.stringify(user),
			    success: function (data) {
			    	var tokenObj = data.Result;
			        var token = tokenObj.access_token;
			        var userID = tokenObj.principal_id;
			        var expand = {
			    			"AppRoles" : {
			    				"TargetTypeName" : "AppRoles",
			    				"Fields" : {
			    					"RoleName" : 1
			    					 
			    				}
			    			}
			    		}
			    	var fieldsReturn = {
			    			"Username" : 1,
			    			"AppRoless" : 1
			    			 
			    		}
			        
			        //get Role of User
			        $.ajax({
			        	url: 'https://api.everlive.com/v1/'+cloudAppInfos.appID+'/Users/'+userID,
			            type: "GET",
			            headers: {
			                "Authorization": token,
			                "X-Everlive-Expand" : JSON.stringify(expand),
				    		"X-Everlive-Fields" : JSON.stringify(fieldsReturn)
			            },
			            success: function (data) {
			            	var dataResult = data.Result; 
			            	var userRole = dataResult.AppRoles.RoleName;
			            	var userRole = dataResult.AppRoles[0].RoleName;
			            	window.location.href = "../main/save_token?token="+token+'&roleValue='+userRole+"&userID="+userID;
			            },
			            error: function (error) {
					        if (error.responseJSON.errorCode=="205") {
					        	
					        	var footerHtmlStr = '<label class="errorTip displayNone"></label>'+
					    		'<a href="javascript:void(0);loginFunction();" class="btn btn-lg btn-success btn-block">Login</a>';
					        	$(".loginAndErrorDiv").html(footerHtmlStr);
					        	
					        	$(".errorTip").text(error.responseJSON.message);
								$(".errorTip").removeClass('displayNone');
							}else{
								$('.errorMessageInAlertModal').text("ERROR Code: "+error.responseJSON.errorCode+" ---- ERROR MESSAGE:"+error.responseJSON.message);
						    	$("#informationAlertModal").modal('show');
							}
					    }
			        }); 
			        
			    },
			    error: function (error) {
			        if (error.responseJSON.errorCode=="205") {
			        	
			        	var footerHtmlStr = '<label class="errorTip displayNone"></label>'+
			    		'<a href="javascript:void(0);loginFunction();" class="btn btn-lg btn-success btn-block">Login</a>';
			        	$(".loginAndErrorDiv").html(footerHtmlStr);
			        	
			        	$(".errorTip").text(error.responseJSON.message);
						$(".errorTip").removeClass('displayNone');
					}else{
						$('.errorMessageInAlertModal').text("ERROR Code: "+error.responseJSON.errorCode+" ---- ERROR MESSAGE:"+error.responseJSON.message);
				    	$("#informationAlertModal").modal('show');
					}
			    }
			});	
}

