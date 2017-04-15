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
    tax: 0
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
                app.showLoading();
                el.data('Order').updateSingle({Id: parent.orderid, 'Status': 1},
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

            var userTotalPoint = parseFloat(app.currentUser.CurrentPoint || '0') +
                    parseFloat(parent.earnPoint) - parseFloat(parent.totalPoint);                el.Users.updateSingle({
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
            }
        });


    parent.set('onShow', function _onShow(e) {
        var orderId = e.view.params.orderId;
        var totalPrice = e.view.params.price;
        var totalPoint = e.view.params.point;
        var earnPoint = e.view.params.gotPoint;
        var tax = e.view.params.tax;

        parent.orderid = orderId;
        parent.totalPrice = totalPrice;
        parent.totalPoint = totalPoint;
        parent.earnPoint = earnPoint;
        parent.tax = tax;

        $("#total-price").text("RM "+ totalPrice);
        $("#tax").text("RM "+ tax);
        $("#total-point").text(totalPoint);
        $("#earn-point").text(earnPoint);
    });
    parent.set('checkoutViewModel', checkoutViewModel);
})(app.checkoutView);

// START_CUSTOM_CODE_checkoutViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_checkoutViewModel