'use strict';
app.checkoutView = kendo.observable({
    onShow: function () {
    },
    afterShow: function () {
    },
    orderid: null,
    totalPrice: 0,
    totalPoint: 0,
    earnPoint: 0,
    tax: 0,
    address:null,
    shippingFees: [],
    selectedFee: null,
    paymentDetails: {
        'mp_amount' : '0',
        'mp_username' : 'api_air2u',
        'mp_password' : 'api_aiRU3481wi@',
        'mp_merchant_ID' : 'air2u',
        'mp_app_name' : 'air',
        'mp_order_ID' : 'sfdsfsdafdsfa23423',
        'mp_currency' : 'MYR',
        'mp_country' : 'MY',
        'mp_verification_key' : 'f53b5629960e80c0e063d45891480f8f',
        'mp_channel' : 'multi',
        'mp_bill_description' : 'Bill description',
        'mp_bill_name' : 'AQUA POWER SDN BHD',
        'mp_bill_email' : 'support@air2u.com.my',
        'mp_bill_mobile' : '012-2215511',
        'mp_sandbox_mode': true
    }
});
app.localization.registerView('checkoutView');

// START_CUSTOM_CODE_checkoutView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_checkoutView
(function (parent) {
    var
    /// start global model properties

        processImage = function (img) {

            if (!img) {
                var empty1x1png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';
                img = 'data:image/png;base64,' + empty1x1png;
            }

            return img;
        },
    /// end global model properties

        checkoutViewModel = kendo.observable({
            submit: function () {
                if (!parent.selectedFee) {
                    alert('Please select a shipping');
                    return;
                }

                var price = checkoutViewModel.getTotalPrice();
                if (price > 0) {
                   checkoutViewModel.makePayment(price, function (success, transaction) {
                       if (success) {
                           checkoutViewModel.updateInfo(transaction);
                       }
                   });
                }else {
                    checkoutViewModel.updateInfo();
                }
            },

            makePayment: function (price, callback) {
                parent.paymentDetails.mp_amount = price;
                var username = app.currentUser.Username;
                var email = app.currentUser.Email;
                var phone = app.currentUser.ContactNumber;
                if (username) {
                    parent.paymentDetails.mp_bill_name = username;
                }
                if (email) {
                    parent.paymentDetails.mp_bill_email = email;
                }
                if (phone) {
                    parent.paymentDetails.mp_bill_mobile = phone;
                }

                window.molpay.startMolpay(parent.paymentDetails, function (transactionResult) {
                    var ret = JSON.parse(transactionResult);
                    var status_code  = ret.status_code || "00";
                    $("#molpay").slideUp();
                    if (status_code == "00") {
                        alert(transactionResult);
                        callback(false);
                    }else {
                        callback(true, transactionResult);
                    }
                });
            },

            updateInfo: function (transaction) {
                var el = app.data.backendServices;
                app.showLoading();
                el.data('Order').updateSingle({Id: parent.orderid,
                        'Status': 1,
                        'ShippingFee' : parent.selectedFee.Id,
                        'Address' : (parent.address || ""),
                        'transaction' : (transaction || "")},
                    function (data) {
                        checkoutViewModel.updateUserWithOrder(function (error, data) {
                            app.hideLoading();
                            if (error) {
                                alert(JSON.stringify(error));
                            }else {
                                alert( "Order  Created Successfully");
                                app.mobileApp.navigate('components/purchaseHistoryView/view.html');
                            }
                        });
                    },
                    function (error) {
                        app.hideLoading();
                        alert(JSON.stringify(error));
                    }
                );
            },

            cancel: function () {
                app.mobileApp.navigate("components/shoppingCartView/view.html");
            },

            updateUserWithOrder: function (callback) {
                var el = app.data.backendServices;

                var userTotalPoint = parseFloat(app.currentUser.CurrentPoint || "0") +
                    parseFloat(parent.earnPoint) - parseFloat(parent.totalPoint);
                el.Users.updateSingle({
                        'Id': app.currentUser.Id,
                        'LatestAwardedPoint' : parent.earnPoint,
                        'CurrentPoint' : userTotalPoint
                    },
                    function (data) {
                        app.currentUser.LatestAwardedPoint = parent.earnPoint;
                        app.currentUser.CurrentPoint = userTotalPoint;
                        callback(null, app.currentUser);
                    },
                    function (error) {
                        callback(error);
                    });
            },

            getTotalPrice: function () {
                var fee = 0;
                if (parent.selectedFee) {
                    fee = parseFloat(parent.selectedFee.Charges || '0');
                }
                var price = parent.totalPoint +
                    parent.tax +
                    fee;
                return price;
            },

            updateCheckoutView: function () {
                var price = checkoutViewModel.getTotalPrice();
                $("#total-price").text("RM "+ price);
                $("#tax").text("RM "+ parent.tax);
                $("#total-point").text(parent.totalPoint);
                $("#earn-point").text(parent.earnPoint);
            }
        });


    parent.set('onShow', function _onShow(e) {
        var orderId = e.view.params.orderId;
        var totalPrice = parseFloat(e.view.params.price);
        var totalPoint = parseFloat(e.view.params.point);
        var earnPoint = parseFloat(e.view.params.gotPoint);
        var tax = totalPrice * parseFloat(app.data.taxRate || '0');
        var deAddress = app.currentUser.HomeAddress;

        parent.orderid = orderId;
        parent.totalPrice = totalPrice;
        parent.totalPoint = totalPoint;
        parent.earnPoint = earnPoint;
        parent.tax = parseFloat(tax.toFixed(2));
        parent.set('address', deAddress);

        checkoutViewModel.updateCheckoutView();
        $('#selectlink').on('change', function () {
            var index = this.selectedIndex;
            if (index > 0) {
                var selectedFeeObj = parent.shippingFees[index - 1];
                parent.selectedFee = selectedFeeObj;
            }else{
                parent.selectedFee = null;
            }
            var fee = parseFloat(this.value);
            var totalPrice = parseFloat(parent.totalPrice) + fee;
            totalPrice = parseFloat(totalPrice.toFixed(2));
            var tax = totalPrice * parseFloat(app.data.taxRate || 0);
            tax = parseFloat(tax.toFixed(2));
            parent.set('tax', tax);
            checkoutViewModel.updateCheckoutView();
        });

        var el = app.data.backendServices;
        el.data('ShippingFee').get().then(function(data){
                var result = data["result"];
                parent.shippingFees = result;
                $('#selectlink').empty();
                var defaultOption = $('<option>').val("0").text("Select shipping method");
                $('#selectlink').append(defaultOption);
                for (var item in result){
                    item = result[item];
                    var option = $('<option>').val(item.Charges).text("( RM "+item.Charges+" )"+item.ItemName);
                    $('#selectlink').append(option);
                    //alert(item.ItemName+"---"+item.Charges);
                }
                },
                function(error){
                    alert(JSON.stringify(error));
                });
    });
    parent.set('checkoutViewModel', checkoutViewModel);
})(app.checkoutView);

// START_CUSTOM_CODE_checkoutViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_checkoutViewModel