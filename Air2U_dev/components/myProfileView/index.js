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
var fullName;

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {}

app.myProfileView = kendo.observable({
    _pictureSource: null,

    _destinationType: null,
    onShow: function () {
        $("#rightview").text("Edit");
        var imagehead = document.getElementById("userheadview");
        imagehead.src = "/resources/head.png";
        el.Users.currentUser().then(function(data) {
                    if (data.result == null) {
                        navigator.notification.alert("You do not login,Please login first.");
                        setTimeout(function () {
                            app.mobileApp.navigate('components/loginModelView/view.html');
                        }, 10);
                    } else {
                        var item=data.result;
                            userid = item.Id;
                            username = item.Username;
                            email = item.Email;
                            address = item.HomeAddress;
                            phone = item.ContactNumber;
                            state = item.State;
                            status = item.Status;
                            card = item.Card;
                            avatar = item.Avatar;
                            introduceName = item.IntroducerName;
                            introduceContact = item.IntroducerContact;
                            introduceEmail = item.IntroducerEmail;
                            fullName=item.FullName;

                            currentPoint = parseFloat(item.CurrentPoint);
                            lastqwarded = parseFloat(item.LatestAwardedPoint);

                            if(currentPoint == undefined ||isNaN(currentPoint)){
                                currentPoint = 0;
                            }
                            if(lastqwarded == undefined||isNaN(lastqwarded)){
                                lastqwarded=0;
                            }

                        if(fullName =="undefined" ){
                            fullName = "";
                        }
                        if(phone =="undefined" ){
                            phone = "";
                        }

                        if(username =="undefined" ){
                            username = "";
                        }
                        if(email =="undefined" ){
                            email = "";
                        }

                        if(address =="undefined" ){
                            address = "";
                        }
                        if(introduceName =="undefined" ){
                            introduceName = "";
                        }
                        if(introduceContact =="undefined" ){
                            introduceContact = "";
                        }
                        if(introduceEmail =="undefined" ){
                            introduceEmail = "";
                        }


                            app.myProfileView.set("usernameinfo", username);
                            app.myProfileView.set("emailinfo", email);
                            app.myProfileView.set("defaultaddress", address);
                            app.myProfileView.set("phone", phone);
                            app.myProfileView.set("state", state);
                            app.myProfileView.set("status", status);
                            app.myProfileView.set("full_name", fullName);
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
                            $("#full_name").attr("disabled", true);



                            if (introduceName != "") {
                                app.myProfileView.set("introduce_name", introduceName);
                            }

                            if (introduceContact != "") {
                                app.myProfileView.set("introduce_contact", introduceContact);
                            }

                            if (introduceEmail != "") {
                                app.myProfileView.set("introduce_email", introduceEmail);
                            }


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
            }


            for (var item in data['result']) {
                if (data['result'].hasOwnProperty(item)) {
                    app.currentUser[item] = data['result'][item];
                }
            }




        /*if (app.currentUser.Id != "") {
            imagehead.src = "/resources/head.png";
            userid = app.currentUser.Id;
            username = app.currentUser.Username;
            email = app.currentUser.Email;
            address = app.currentUser.HomeAddress;
            phone = app.currentUser.ContactNumber;
            state = app.currentUser.State;
            status = app.currentUser.Status;
            card = app.currentUser.Card;
            avatar = app.currentUser.Avatar;
            introduceName = app.currentUser.IntroducerName;
            introduceContact = app.currentUser.IntroducerContact;
            introduceEmail = app.currentUser.IntroducerEmail;
            fullName=app.currentUser.FullName;

            currentPoint = parseFloat(app.currentUser.CurrentPoint);
            lastqwarded = parseFloat(app.currentUser.LatestAwardedPoint);

            if(currentPoint == undefined ||isNaN(currentPoint)){
                currentPoint = 0;
            }
            if(lastqwarded == undefined||isNaN(lastqwarded)){
                lastqwarded=0;
            }


            app.myProfileView.set("usernameinfo", username);
            app.myProfileView.set("emailinfo", email);
            app.myProfileView.set("defaultaddress", address);
            app.myProfileView.set("phone", phone);
            app.myProfileView.set("state", state);
            app.myProfileView.set("status", status);
            app.myProfileView.set("full_name", fullName);
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
            $("#full_name").attr("disabled", true);



            if (introduceName != "") {
                app.myProfileView.set("introduce_name", introduceName);
            }

            if (introduceContact != "") {
                app.myProfileView.set("introduce_contact", introduceContact);
            }

            if (introduceEmail != "") {
                app.myProfileView.set("introduce_email", introduceEmail);
            }


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
           /!* $('#layout_point').html("PV4445555");*!/
             navigator.notification.alert("You do not login,Please login first.");
             setTimeout(function () {
             app.mobileApp.navigate('components/loginModelView/view.html');
             }, 10);
        }*/
        }, function (error) {

        });


    },
    afterShow: function () {

    },


    takePhoto: function(){
        var that=app.myProfileView;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
        that._capturePhotoEdit.apply(that,arguments);
        //that._capturePhoto.apply(that,arguments);
    },
    selfctLibrary: function(){
        var that=app.myProfileView;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
        that._getPhotoFromLibrary.apply(that,arguments);
        //that._getPhotoFromAlbum.apply(that,arguments);
    },



    _getPhotoFromAlbum: function() {
        var that= app.myProfileView;
        // On Android devices, pictureSource.PHOTOLIBRARY and pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.SAVEDPHOTOALBUM)
    },


    _getPhotoFromLibrary: function() {
        var that= app.myProfileView;
        // On Android devices, pictureSource.PHOTOLIBRARY and
        // pictureSource.SAVEDPHOTOALBUM display the same photo album.
        that._getPhoto(that._pictureSource.PHOTOLIBRARY);
    },
    _capturePhotoEdit: function() {
        var that = app.myProfileView;
        // Take picture using device camera, allow edit, and retrieve image as base64-encoded string.
        // The allowEdit property has no effect on Android devices.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        }, function(){
            that._onFail.apply(that,arguments);
        }, {
            quality: 50, allowEdit: true,
            destinationType: that._destinationType.DATA_URL
        });
    },

    _getPhoto: function(source) {
        var that = app.myProfileView;
        // Retrieve image file location from specified source.

        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        }, function(){
            that._onFail.apply(that,arguments);
        }, {
            quality: 50,
            destinationType: that._destinationType.DATA_URL,
            sourceType: source
        });
    },

    _onPhotoDataSuccess: function(imageData) {
        var that = app.myProfileView;
        var smallImage = document.getElementById('userheadview');
        smallImage.src = "data:image/jpeg;base64," + imageData;
        that._uploadPhoto.apply(that,arguments);
    },

    _onFail: function(message) {
        //alert(message);
    },

   /* _onPhotoURISuccess: function(imageURI) {
        var el = new Everlive('emqn75r4njlqhrtx');
        var smallImage = document.getElementById('userheadview');

        // Show the captured photo.
        alert("mary-----111 "+imageURI);

        smallImage.src = "data:image/jpeg;base64," + imageURI;
    },

    _capturePhoto: function() {
    var that = app.myProfileView;
    // Take picture using device camera and retrieve image as base64-encoded string.
    navigator.camera.getPicture(function(){
    that._onPhotoDataSuccess.apply(that,arguments);
    },function(){
    that._onFail.apply(that,arguments);
    },{
    quality: 50,
    destinationType: that._destinationType.DATA_URL
    });
    },


    },
    */

    _uploadPhoto:function (imageData) {
        var el = new Everlive('emqn75r4njlqhrtx');
        var file = {
            "Filename": Math.random().toString(36).substring(2, 15) +".png",
            "ContentType": "image/png",
            "CustomField": "customValue",
            "base64": imageData
        };

        el.files.create(file,
            function (data) {
                el.Users.updateSingle({
                        'Id': userid,
                        'Avatar': data.result.Id
                    },
                    function (data) {
                        alert("Update myProfile Head successfully");
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });
            },
            function (error) {
                alert(JSON.stringify(error));
            });

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
            $("#full_name").attr("disabled", false);
            //$("#card").attr("disabled", false);
            //$("#introduce_name").attr("disabled", true);
            //$("#introduce_contact").attr("disabled", true);
            //$("#introduce_email").attr("disabled", true);

            document.getElementById("emailinfo").style.color="grey";
            document.getElementById("state").style.color="grey";
            document.getElementById("phone").style.color="grey";
            document.getElementById("introduce_name").style.color="black";
            document.getElementById("introduce_contact").style.color="black";
            document.getElementById("introduce_email").style.color="black";
            document.getElementById("defaultaddress").style.color="grey";
            document.getElementById("full_name").style.color="grey";


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
            var fullname=$("#full_name").val();


            if (phone!=""){
                var re=/^\d{8,}$/;//the phone minlength is 8
                if (!re.test(phone)) {
                    alert("The phone min length is 8 ");
                    return
                }
            }

           /* if(introduceEmail != ""){
                var emailMat=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
                if(!emailMat.test(introduceEmail)){
                    alert("Introducer Email Address is not verify format.");
                    return;
                }
            }*/




                el.Users.updateSingle({
                        'Id': userid,
                        'Username': username,
                        'HomeAddress': address,
                        'ContactNumber': phone,
                        'Card': card,
                        'State': state,
                        'Status': status,
                        'IntroducerName': introduceName,
                        'IntroducerContact': introduceContact,
                        'IntroducerEmail': introduceEmail,
                        'Email': email,
                        'FullName': fullname

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
                        $("#full_name").attr("disabled", true);

                        document.getElementById("emailinfo").style.color="black";
                        document.getElementById("state").style.color="black";
                        document.getElementById("phone").style.color="black";
                        document.getElementById("introduce_name").style.color="black";
                        document.getElementById("introduce_contact").style.color="black";
                        document.getElementById("introduce_email").style.color="black";
                        document.getElementById("defaultaddress").style.color="black";
                        document.getElementById("full_name").style.color="black";

                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });

            }



    }


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
        //userid=userid.substr(userid.lastIndexOf("-")+1,userid.length);
        JsBarcode("#barcode4", userid, {displayValue: true});

        var img = document.getElementById('barcode4');
        img.style.width = "100%"
        img.style.height = "auto"



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