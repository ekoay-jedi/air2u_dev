'use strict';

var apiKey = "o6yuauaw7f5m56jb";
var el = new Everlive(apiKey);
var currentUserName = "";

app.loginModelView = kendo.observable({
    onShow: function() {
        el.Users.currentUser().then(function (data) {
                    for(var item in data){
                        if(item == 'result') {
                            var resVal = data[item];
                            if(resVal != null) {
                                for(var subitem in resVal){
                                    if(subitem == 'Username') {
                                        currentUserName = resVal[subitem];
                                        //alert(currentUserName);
                                    }
                                }

                                //alert(JSON.stringify(resVal));
                                window.location.href = "#userinfo";
                                app.userinfoView.set("username", currentUserName);
                            }
                        }
                    }

                    //alert(JSON.stringify(data));
                },
                function(error){

                });
    },
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
                    window.location.href = "#userinfo";
					//app.mobileApp.navigate('components/home/view.html');
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
                    window.location.href = "#loginModelViewScreen";
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
                    window.location.href = "#loginModelViewScreen";
                },
                error: function () {
                    navigator.notification.alert("Unfortunately, an error occurred resetting your password.")
                }
            });
        }
});
app.localization.registerView('passwordView');

app.userinfoView = kendo.observable({
    logout: function (event) {
        //Prevent going to the login page until the login call processes.
        event.preventDefault();
        el.Users.logout(function () {
            window.location.href = "#loginModelViewScreen";
            //app.loginModelView.set("username", "");
            app.loginModelView.set("password", "");
        }, function () {
            navigator.notification.alert("Unfortunately an error occurred logging out of your account.");
        });
    }
});
app.localization.registerView('userinfoView');
// START_CUSTOM_CODE_loginModelView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_loginModelView