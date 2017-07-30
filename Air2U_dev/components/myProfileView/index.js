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

app.myProfileView = kendo.observable({
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


                            $('#layout_point').html("Air Point "+currentPoint);
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



                            if(introduceName =="undefined" || introduceName =="N/A"|| introduceName =="n/a" ){
                                app.myProfileView.set("introduce_name", introduceName);
                            }

                            if(introduceContact =="undefined" || introduceContact =="N/A"|| introduceContact =="n/a") {
                                app.myProfileView.set("introduce_contact", introduceContact);
                            }

                            if(introduceEmail =="undefined"|| introduceEmail =="N/A"|| introduceEmail =="n/a" ) {
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
        }, function (error) {

        });


    },
    afterShow: function () {
        
    },

    takePhoto: function(e){
		e.preventDefault();
        var that=app.myProfileView;
        var options =  {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            // allowEdit: false,
            correctOrientation: true
        };
        that._getImageWithOptions(options);
    },

    selfctLibrary: function(e){
		e.preventDefault();
        var that=app.myProfileView;
        var options =  {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            // allowEdit: false,
            correctOrientation: true
        };
        that._getImageWithOptions(options);
    },

    _getImageWithOptions: function(options) {
        var that=app.myProfileView;
        navigator.camera.getPicture(function(imageData){
            that._onPhotoDataSuccess(imageData);
        }, function(message){
            that._onFail(message);
        }, options);
    },

    _onPhotoDataSuccess: function(imageData) {
        var that = app.myProfileView;
        var smallImage = document.getElementById('userheadview');
        smallImage.src = "data:image/jpeg;base64," + imageData;
        that._uploadPhoto(imageData);
    },

    _onFail: function(message) {
        alert(message);
    },

    _uploadPhoto:function (imageData) {
        var el = new Everlive('emqn75r4njlqhrtx');
        var file = {
            "Filename": Math.random().toString(36).substring(2, 15) +".png",
            "ContentType": "image/png",
            "CustomField": "customValue",
            "base64": imageData
        };
        app.showLoading();
        el.files.create(file,
            function (data) {
                el.Users.updateSingle({
                        'Id': userid,
                        'Avatar': data.result.Id
                    },
                    function (data) {
                        app.hideLoading();
                        alert("Update myProfile Head successfully");
                    },
                    function (error) {
                        app.hideLoading();
                        alert(JSON.stringify(error));
                    });
            },
            function (error) {
                app.hideLoading();
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
});

app.localization.registerView('myProfileView');

app.myloyaltypointView = kendo.observable({
    onShow: function () {
        $("#current_point").attr("disabled", true);
        $("#last_awarded").attr("disabled", true);
        app.myloyaltypointView.set("current_point", "PV "+currentPoint);
        app.myloyaltypointView.set("last_awarded", "PV "+lastqwarded);

        JsBarcode("#barcode4", userid, {displayValue: true});

        var img = document.getElementById('barcode4');
        img.style.width = "100%";
        img.style.height = "auto";
    },

    buyproduct: function () {
        alert("The buy product.");
        app.mobileApp.navigate('components/productListView/view.html?filter=' + encodeURIComponent(JSON.stringify({
                field: 'pvPrice',
                value: dataItem.Id,
                operator: 'eq'
            })));
    }
});


app.localization.registerView('myloyaltypointView');
