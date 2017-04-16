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
                var el = app.data.backendServices;
                if (!parent.selectedFee) {
                    alert('Please select a shipping');
                    return;
                }

                app.showLoading();
                el.data('Order').updateSingle({Id: parent.orderid,
                                               'Status': 1,
                                               'ShippingFee' : parent.selectedFee.Id,
                                               'Address' : (parent.address || "")},
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
                    });
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

            updateCheckoutView: function () {
                $("#total-price").text("RM "+ parent.totalPrice);
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
        var tax = totalPrice * parseFloat(app.data.taxRate || 0);
        var deAddress = app.currentUser.DeliveryAddress;

        parent.orderid = orderId;
        parent.totalPrice = (totalPrice + tax);
        parent.totalPoint = totalPoint;
        parent.earnPoint = earnPoint;
        parent.tax = tax;
        parent.set('address', deAddress);

        checkoutViewModel.updateCheckoutView();
        $('#selectlink').on('change', function () {
            var index = this.selectedIndex;
            if (index > 0) {
                var selectedFeeObj = parent.shippingFees[index - 1];
                parent.selectedFee = selectedFeeObj;
            }
            var fee = parseFloat(this.value);
            console.log("fee: " + fee + ", index: " + index);
            var totalPrice = parseFloat(parent.totalPrice) + fee;
            var tax = totalPrice * (app.data.taxRate || 0);
            parent.set('totalPrice', (totalPrice + tax));
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
                    var option = $('<option>').val(item.Charges).text(item.ItemName);
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