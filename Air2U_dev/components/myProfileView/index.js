'use strict';

var apiKey = "o6yuauaw7f5m56jb";
var el = new Everlive(apiKey);
var username;
var address;
var phone;
var userid;
var state;
var avatar;
var status;
var email;
var card;

app.myProfileView = kendo.observable({
    onShow: function () {
        $("#rightview").text("Edit");
        el.Users.currentUser().then(function (data) {
                for (var item in data) {
                    if (item == 'result') {
                        if (data[item] == null) {
                            alert("You do not login,Please login first.");
                            app.mobileApp.navigate('components/loginModelView/view.html');
                        } else {
                            var datainside = data[item];
                            for (var iteminside in datainside) {
                                if (iteminside == 'Username') {
                                    username = datainside[iteminside];
                                } else if (iteminside == 'DeliveryAddress') {
                                    address = datainside[iteminside]
                                } else if (iteminside == 'ContactNumber') {
                                    phone = datainside[iteminside]
                                } else if (iteminside == 'Id') {
                                    userid = datainside[iteminside]
                                } else if (iteminside == 'State') {
                                    state = datainside[iteminside]
                                } else if (iteminside == 'Avatar') {
                                    avatar = datainside[iteminside]
                                }else if (iteminside == 'Email') {
                                    email = datainside[iteminside]
                                }else if (iteminside == 'Card') {
                                    card = datainside[iteminside]
                                }else if (iteminside == 'Status') {
                                    status = datainside[iteminside]
                                }

                            }
                        }
                    }
                }
                app.myProfileView.set("usernameinfo", username);
                app.myProfileView.set("emailinfo", email);
                app.myProfileView.set("defaultaddress", address);
                app.myProfileView.set("phone", phone);
                app.myProfileView.set("state", state);
                app.myProfileView.set("status", status);
                app.myProfileView.set("card", card);

                $("#save").attr("disabled", true);
                $("#usernameinfo").attr("disabled", true);
                $("#emailinfo").attr("disabled", true);
                $("#defaultaddress").attr("disabled", true);
                $("#phone").attr("disabled", true);
                $("#state").attr("disabled", true);
                $("#status").attr("disabled", true);
                $("#card").attr("disabled", true);

                var imagehead = document.getElementById("userheadview");
                if (avatar != null) {
                    el.Files.getById(avatar).then(function (data) {
                            for (var item in data) {
                                if (item == 'result') {
                                    var datainside = data[item];
                                    for (var iteminside in datainside) {
                                        if (iteminside == 'Uri') {
                                            var iamgeurl = datainside[iteminside];
                                            imagehead.src = iamgeurl;
                                        }
                                    }
                                }
                            }
                        },
                        function (error) {
                            alert(JSON.stringify(error));
                        });
                } else {
                    imagehead.src = "/resources/head.png";
                }


            },
            function (error) {
                alert(JSON.stringify(error));
            });

    },
    afterShow: function () {

    },
    editprofile: function () {
        var righttitle = $("#rightview").text();

        if (righttitle=="Edit") {
            $("#rightview").text("Save");
            $("#save").attr("disabled", false);
            $("#usernameinfo").attr("disabled", false);
            $("#defaultaddress").attr("disabled", false);
            $("#phone").attr("disabled", false);
            $("#state").attr("disabled", false);
            $("#emailinfo").attr("disabled", false);
            $("#status").attr("disabled", false);
            $("#card").attr("disabled", false);
        } else if (righttitle == "Save") {
            var username = $("#usernameinfo").val();
            var address = $("#defaultaddress").val();
            var phone = $("#phone").val();

            if (username == "") {
                alert("username can not empty");
            } else {
                if (phone == "") {
                    alert("phone can not empty");
                } else {
                    if (address == "") {
                        alert("address can not empty");
                    } else {
                        var re = /^1\d{10}$/
                        if (re.test(phone)) {
                            el.Users.updateSingle({
                                    'Id': userid,
                                    'Username': username,
                                    'DeliveryAddress': address,
                                    'ContactNumber': phone,
                                    'Email': email,
                                    'Card': card,
                                    'State': state,
                                    'Status': status

                                },
                                function (data) {
                                    alert("Update myProfile Info successfully");
                                    $("#rightview").text("Edit");
                                    $("#save").attr("disabled", true);
                                    $("#usernameinfo").attr("disabled", true);
                                    $("#defaultaddress").attr("disabled", true);
                                    $("#phone").attr("disabled", true);
                                    $("#state").attr("disabled", true);
                                    $("#emailinfo").attr("disabled", true);
                                    $("#status").attr("disabled", true);
                                    $("#card").attr("disabled", true);
                                },
                                function (error) {
                                    alert(JSON.stringify(error));
                                });
                        } else {
                            alert("The phone is not valid");
                        }
                    }
                }
            }
        }


    },
    viewpoint: function () {
        alert("The function will be soon.");
    },

    /*addressdetail: function () {
        alert("address detail");
    },*/

    /* saveprofile: function () {
     var username = $("#usernameinfo").val();
     var address = $("#defaultaddress").val();
     var phone = $("#phone").val();

     if(username==""){
     alert("username can not empty");
     }else {
     if (phone==""){
     alert("phone can not empty");
     }else {
     if (address==""){
     alert("address can not empty");
     }else {
     var re = /^1\d{10}$/
     if (re.test(phone)) {
     //alert("usernae---  "+username+"--address-- "+address+"--phone-- "+phone);
     el.Users.updateSingle({ 'Id': userid, 'Username': username, 'DeliveryAddress': address, 'ContactNumber': phone },
     function(data){
     alert(JSON.stringify(data));
     },
     function(error){
     alert(JSON.stringify(error));
     });
     } else {
     alert("The phone is not valid");
     }
     }
     }
     }
     },*/
});
app.localization.registerView('myProfileView');


// START_CUSTOM_CODE_myProfileView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileView

// START_CUSTOM_CODE_myProfileViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileViewModel