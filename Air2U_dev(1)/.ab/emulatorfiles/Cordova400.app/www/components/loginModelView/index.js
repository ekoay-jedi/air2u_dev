'use strict';

var apiKey = "o6yuauaw7f5m56jb";
var el = new Everlive(apiKey);

app.loginModelView = kendo.observable({
    onShow: function() {},
    afterShow: function() {},
	submit: function () {
            if (!this.username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!this.password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            el.Users.login(this.username, this.password,
                function (data) {
                    window.location.href = "#list";

					app.mobileApp.navigate('components/home/view.html');
                }, function () {
                    navigator.notification.alert("Unfortunately we could not find your account.");
                });
        },
});
app.localization.registerView('loginModelView');

app.registerView = kendo.observable({
	submit: function () {
            if (!this.username) {
                navigator.notification.alert("Username is required.");
                return;
            }
            if (!this.password) {
                navigator.notification.alert("Password is required.");
                return;
            }
            el.Users.register(this.username, this.password, { Email: this.email },
                function () {
                    navigator.notification.alert("Your account was successfully created.");
                    window.location.href = "#login";
                },
                function () {
                    navigator.notification.alert("Unfortunately we were unable to create your account.");
                });
        }
});
app.localization.registerView('registerView');

app.passwordView = kendo.observable({
	submit: function () {
            if (!this.email) {
                navigator.notification.alert("Email address is required.");
                return;
            }
            $.ajax({
                type: "POST",
                url: "https://api.everlive.com/v1/" + apiKey + "/Users/resetpassword",
                contentType: "application/json",
                data: JSON.stringify({ Email: this.email }),
                success: function () {
                    navigator.notification.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    window.location.href = "#login";
                },
                error: function () {
                    navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
                }
            });
        }
});
app.localization.registerView('passwordView');
// START_CUSTOM_CODE_loginModelView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_loginModelView