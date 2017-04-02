'use strict';

app.myProfileView = kendo.observable({
	onShow: function () {
		var el = new Everlive('o6yuauaw7f5m56jb');
		var data = el.data('Users');
		data.getById('f701bc80-db33-11e6-ba7d-ed8ffe6e33d3')
			.then(function (data) {							
				alert(JSON.stringify(data));
				
			},
			function (error) {
				alert(JSON.stringify(error));
			});
	},
	afterShow: function () { }
});
app.localization.registerView('myProfileView');



// START_CUSTOM_CODE_myProfileView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileView

// START_CUSTOM_CODE_myProfileViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileViewModel