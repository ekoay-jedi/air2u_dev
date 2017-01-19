'use strict';

var apiKey = "o6yuauaw7f5m56jb";
var el = new Everlive(apiKey);
var username;
var address;
var phone;


app.myProfileView = kendo.observable({
    onShow: function () {
        el.Users.currentUser().then(function (data) {
                for (var item in data) {
                    if (item == 'result') {
                        if (data[item] == null) {
                           /* confirm("You do not login,Please login first.").then(function () {
                                //window.location.href = "#login";
                                alert("11111111");
                                //app.mobileApp.navigate('components/loginModelView/view.html');
                            }, function () {
                                alert("22222222");
                            });*/

                        } else {
                            var datainside = data[item];
                            for (var iteminside in datainside) {
                                if (iteminside == 'Username') {
                                    username = datainside[iteminside];
                                } else if (iteminside == 'DeliveryAddress') {
                                    address = datainside[iteminside]
                                } else if (iteminside == 'ContactNumber') {
                                    phone = datainside[iteminside]
                                }
                            }
                        }
                    }
                }
                app.myProfileView.set("usernameinfo", username);
                app.myProfileView.set("defaultaddress", address);
                app.myProfileView.set("phone", phone);

            },
            function (error) {
                alert(JSON.stringify(error));
            });
    },
    afterShow: function () {

    }
});
app.localization.registerView('myProfileView');


// START_CUSTOM_CODE_myProfileView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileView

// START_CUSTOM_CODE_myProfileViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileViewModel