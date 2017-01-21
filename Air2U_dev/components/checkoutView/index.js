'use strict';
var apiKey = "o6yuauaw7f5m56jb";
var el = new Everlive(apiKey);
var totalprice;

app.checkoutView = kendo.observable({
    onShow: function () {
    },
    afterShow: function () {
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
                el.data('Order').updateSingle({Id: '416aacc0-dd49-11e6-8b40-95cdc645b97b', 'Status': 1},
                    function (data) {
                        alert(JSON.stringify(data));
                    },
                    function (error) {
                        alert(JSON.stringify(error));
                    });
            },
            /// start add model functions
            /// end add model functions

            cancel: function () {
            }
        });

    /// start form functions
    /// end form functions

    parent.set('onShow', function _onShow() {
        var location = window.location.href;
        //var orderid= location.split('?')[1];
        //alert(location.split('?')[1]);

        el.data('Order').getById('416aacc0-dd49-11e6-8b40-95cdc645b97b')
            .then(function (data) {
                    for (var item in data) {
                        if (item == 'result') {
                            var datainside = data[item];
                            for (var iteminside in datainside) {
                                if (iteminside == 'totalPrice') {
                                    totalprice = datainside[iteminside];
                                    $("#total-price").text("RMB "+totalprice);
                                    alert(totalprice);
                                }
                            }
                        }
                    }


                },
                function (error) {
                    alert(JSON.stringify(error));
                });

        var that = parent;
        that.set('addFormData', {
            /// start add form data init
            /// end add form data init
        });



        /// start add form show
        /// end add form show
    });
    parent.set('checkoutViewModel', checkoutViewModel);
})(app.checkoutView);

// START_CUSTOM_CODE_checkoutViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_checkoutViewModel