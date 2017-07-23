function pushNotification(){
//	var Everlive = require('everlive-sdk');
	var message = $("#pushMessageBody").val();
	console.log("message:"+message)
	var el = new Everlive({'appId' : 'emqn75r4njlqhrtx',
		'masterKey' : 'CsWA258EDUwLhN9YcwA6rJ95KmhsezLj'});
	var info = {
		"Message":message
	};
	el.push.notifications.create(info,
	    function(data){
			alert("success");
	        console.log(JSON.stringify(data));
	    },
	    function(error){
	    	alert("failure:"+JSON.stringify(error));
	        console.log(JSON.stringify(error));
	    });
}