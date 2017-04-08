'use strict';

var el = app.data.backendServices;
var username;
var address;
var phone;
var userid;
var state;
var avatar;
var status;
var email;
var card;
var introduceName;
var introduceContact;
var introduceEmail;

var currentPoint;
var lastqwarded;

app.myProfileView = kendo.observable({
    onShow: function () {
        $("#rightview").text("Edit");

        if (app.currentUser.Id != "") {
            userid = app.currentUser.Id;
            username = app.currentUser.Username;
            email = app.currentUser.Email;
            address = app.currentUser.DeliveryAddress;
            phone = app.currentUser.ContactNumber;
            state = app.currentUser.State;
            status = app.currentUser.Status;
            card = app.currentUser.Card;
            avatar = app.currentUser.Avatar;
            introduceName = app.currentUser.IntroducerName;
            introduceContact = app.currentUser.IntroducerContact;
            introduceEmail = app.currentUser.IntroducerEmail;
            currentPoint = app.currentUser.CurrentPoint;
            lastqwarded = app.currentUser.LatestAwardedPoint;

            if(currentPoint == "undefined"){
                currentPoint = 0;
            }
            if(lastqwarded == "undefined"){
                lastqwarded=0;
            }


            app.myProfileView.set("usernameinfo", username);
            app.myProfileView.set("emailinfo", email);
            app.myProfileView.set("defaultaddress", address);
            app.myProfileView.set("phone", phone);
            app.myProfileView.set("state", state);
            app.myProfileView.set("status", status);
            //app.myProfileView.set("card", card);




            $('#layout_point').html("PV "+currentPoint);

            $("#save").attr("disabled", true);
            $("#usernameinfo").attr("disabled", true);
            $("#emailinfo").attr("disabled", true);
            $("#defaultaddress").attr("disabled", true);
            $("#phone").attr("disabled", true);
            $("#state").attr("disabled", true);
            $("#status").attr("disabled", true);
            //$("#card").attr("disabled", true);
            $("#introduce_name").attr("disabled", true);
            $("#introduce_contact").attr("disabled", true);
            $("#introduce_email").attr("disabled", true);

            if (introduceName != "") {
                app.myProfileView.set("introduce_name", introduceName);
            }

            if (introduceContact != "") {
                app.myProfileView.set("introduce_contact", introduceContact);
            }

            if (introduceEmail != "") {
                app.myProfileView.set("introduce_email", introduceEmail);
            }


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
        } else {
           /* $('#layout_point').html("PV4445555");*/
             navigator.notification.alert("You do not login,Please login first.");
             setTimeout(function () {
             app.mobileApp.navigate('components/loginModelView/view.html');
             }, 10);
        }

        /*el.Users.currentUser().then(function (data) {
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
         } else if (iteminside == 'Email') {
         email = datainside[iteminside]
         } else if (iteminside == 'Card') {
         card = datainside[iteminside]
         } else if (iteminside == 'Status') {
         status = datainside[iteminside]
         }

         }
         }
         }
         }
         },
         function (error) {
         alert(JSON.stringify(error));
         });*/

    },
    afterShow: function () {

    },
    editprofile: function () {
        var righttitle = $("#rightview").text();

        if (righttitle == "Edit") {
            $("#rightview").text("Save");
            $("#save").attr("disabled", false);
            $("#usernameinfo").attr("disabled", false);
            $("#defaultaddress").attr("disabled", false);
            $("#phone").attr("disabled", false);
            $("#state").attr("disabled", false);
            $("#emailinfo").attr("disabled", false);
            $("#status").attr("disabled", false);
            //$("#card").attr("disabled", false);
            $("#introduce_name").attr("disabled", false);
            $("#introduce_contact").attr("disabled", false);
            $("#introduce_email").attr("disabled", false);

        } else if (righttitle == "Save") {
            var username = $("#usernameinfo").val();
            var address = $("#defaultaddress").val();
            var phone = $("#phone").val();
            //var card = $("#card").val();
            var state = $("#state").val();
            var status = $("#status").val();
            var introduceName = $("#introduce_name").val();
            var introduceContact = $("#introduce_contact").val();
            var introduceEmail = $("#introduce_email").val();
            var email = $("#emailinfo").val();

            if (username == "") {
                alert("username can not empty");
            } else {
                if (phone == "") {
                    alert("phone can not empty");
                } else {
                    if (address == "") {
                        alert("address can not empty");
                    } else {
                        //var re = /^1\d{10}$/;
                        var re=/^\d{8,}$/;//the phone minlength is 8
                        if (re.test(phone)) {
                            alert("Update "+username/*+" "+card*/+" "+phone+" "+state);

                            el.Users.updateSingle({
                                    'Id': userid,
                                    'Username': username,
                                    'DeliveryAddress': address,
                                    'ContactNumber': phone,
                                    'Card': card,
                                    'State': state,
                                    'Status': status,
                                    'IntroducerName': introduceName,
                                    'IntroducerContact': introduceContact,
                                    'IntroducerEmail': introduceEmail,
                                    'Email': email
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
                                    //$("#card").attr("disabled", true);
                                    $("#introduce_name").attr("disabled", true);
                                    $("#introduce_contact").attr("disabled", true);
                                    $("#introduce_email").attr("disabled", true);

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

app.myloyaltypointView = kendo.observable({
    onShow: function () {
        /*currentPoint = "PV 24000";
         lastqwarded = "PV 1400";*/
        $("#current_point").attr("disabled", true);
        $("#last_awarded").attr("disabled", true);
        app.myloyaltypointView.set("current_point", "PV "+currentPoint);
        app.myloyaltypointView.set("last_awarded", "PV "+lastqwarded);

        /* JsBarcode("#barcode4",
         "f701bc80-db33-11e6-ba7d-ed8ffe6e33d3",
         {displayValue: true});*/
        JsBarcode("#barcode4", userid, {displayValue: true});

        var img = document.getElementById('barcode4');
        img.style.width = "100%"
        img.style.height = "auto"

        /* var qrcode = new QRCode(document.getElementById("qrcode"), {
         width : 200,
         height : 200
         });

         qrcode.makeCode(userid);*/

    },
    buyproduct: function () {
        alert("The buy product.");
        app.mobileApp.navigate('components/productListView/view.html?filter=' + encodeURIComponent(JSON.stringify({
                field: 'pvPrice',
                value: dataItem.Id,
                operator: 'eq'
            })));

    },
});


app.localization.registerView('myloyaltypointView');

// START_CUSTOM_CODE_myProfileView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileView

// START_CUSTOM_CODE_myProfileViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_myProfileViewModel