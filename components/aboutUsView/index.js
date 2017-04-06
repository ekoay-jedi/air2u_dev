'use strict';

app.aboutUsView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('aboutUsView');

// START_CUSTOM_CODE_aboutUsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_aboutUsView
(function(parent) {
    var aboutUsViewModel = kendo.observable({});

    parent.set('aboutUsViewModel', aboutUsViewModel);
})(app.aboutUsView);

// START_CUSTOM_CODE_aboutUsViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_aboutUsViewModel