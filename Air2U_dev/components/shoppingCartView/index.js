'use strict';

app.shoppingCartView = kendo.observable({
    onShow: function() {},
    afterShow: function() {},
});
app.localization.registerView('shoppingCartView');

// START_CUSTOM_CODE_shoppingCartView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_shoppingCartView
(function(parent) {
    var dataProvider = app.data.backendServices,
    /// start global model properties
    /// end global model properties
        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('shoppingCartViewModel'),
                dataSource;

            if (model) {
                dataSource = model.get('dataSource');
            } else {
                parent.set('shoppingCartViewModel_delayedFetch', paramFilter || null);
                return;
            }

            if (paramFilter) {
                model.set('paramFilter', paramFilter);
            } else {
                model.set('paramFilter', undefined);
            }

            if (paramFilter && searchFilter) {
                dataSource.filter({
                    logic: 'and',
                    filters: [paramFilter, searchFilter]
                });
            } else if (paramFilter || searchFilter) {
                dataSource.filter(paramFilter || searchFilter);
            } else {
                dataSource.filter({});
            }
        },

        flattenLocationProperties = function(dataItem) {
            var propName, propValue,
                isLocation = function(value) {
                    return propValue && typeof propValue === 'object' &&
                        propValue.longitude && propValue.latitude;
                };

            for (propName in dataItem) {
                if (dataItem.hasOwnProperty(propName)) {
                    propValue = dataItem[propName];
                    if (isLocation(propValue)) {
                        dataItem[propName] =
                            kendo.format('Latitude: {0}, Longitude: {1}',
                                propValue.latitude, propValue.longitude);
                    }
                }
            }
        },
        dataSourceOptions = {
            type: 'everlive',
            transport: {
                typeName: 'ProductCart',
                read: {
                    contentType: "application/json",
                    headers: {
                        "X-Everlive-Expand": JSON.stringify({
                            "product": {
                                "TargetTypeName": "Product"
                            }
                        })
                        //"X-Everlive-Filter": JSON.stringify({
                        //    'Owner': app.currentUser.Id
                        //})
                    }},
                        //{
                        //    "Authorization" : app.currentUser.access_token
                        //}
                dataProvider: dataProvider
            },
            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    dataItem.cchecked = dataItem.cchecked | false;
                    var product = dataItem['product'];
                    var imgs = product['ProductImages'];
                    if (imgs && imgs.length > 0) {
                        dataItem['productIdUrl'] =
                            processImage(imgs[0]);
                    }else {
                        dataItem['productIdUrl'] = "";
                    }

                    /// start flattenLocation property
                    flattenLocationProperties(dataItem);
                    /// end flattenLocation property
                }
            },
            error: function(e) {

                if (e.xhr) {
                    var errorText = "";
                    try {
                        errorText = JSON.stringify(e.xhr);
                    } catch (jsonErr) {
                        errorText = e.xhr.responseText || e.xhr.statusText || 'An error has occurred!';
                    }
                    alert(errorText);
                }
            },
            schema: {
                model: {
                    fields: {
                        'productId': {
                            field: 'productId',
                            defaultValue: ''
                        },
                        'qty': {
                            field: 'qty',
                            defaultValue: ''
                        },
                        'cchecked': {
                            field: 'cchecked',
                            defaultValue: false
                        }
                    }
                }
            },
            serverFiltering: true,
        },
    /// start data sources
    /// end data sources
        shoppingCartViewModel = kendo.observable({
            _dataSourceOptions: dataSourceOptions,
            fixHierarchicalData: function(data) {
                var result = {},
                    layout = {};

                $.extend(true, result, data);

                (function removeNulls(obj) {
                    var i, name,
                        names = Object.getOwnPropertyNames(obj);

                    for (i = 0; i < names.length; i++) {
                        name = names[i];

                        if (obj[name] === null) {
                            delete obj[name];
                        } else if ($.type(obj[name]) === 'object') {
                            removeNulls(obj[name]);
                        }
                    }
                })(result);

                (function fix(source, layout) {
                    var i, j, name, srcObj, ltObj, type,
                        names = Object.getOwnPropertyNames(layout);

                    if ($.type(source) !== 'object') {
                        return;
                    }

                    for (i = 0; i < names.length; i++) {
                        name = names[i];
                        srcObj = source[name];
                        ltObj = layout[name];
                        type = $.type(srcObj);

                        if (type === 'undefined' || type === 'null') {
                            source[name] = ltObj;
                        } else {
                            if (srcObj.length > 0) {
                                for (j = 0; j < srcObj.length; j++) {
                                    fix(srcObj[j], ltObj[0]);
                                }
                            } else {
                                fix(srcObj, ltObj);
                            }
                        }
                    }
                })(result, layout);

                return result;
            },

            updateTotalPrice: function(data) {
                var totalP = 0;
                var totalPV = 0;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (item.cchecked) {
                        totalP = totalP + parseFloat(item.product.cvPrice);
                        totalPV = totalPV + parseFloat(item.product.pvPrice);
                    }
                }

                totalP = totalP.toFixed(2);
                totalPV = totalPV.toFixed(2);

                var currentTotal = shoppingCartViewModel.get('total');
                if (currentTotal != totalP) {
                    shoppingCartViewModel.set('total', totalP);
                }

                var currentPV = shoppingCartViewModel.get('pv');
                if (totalPV != currentPV) {
                    shoppingCartViewModel.set('pv', totalPV);
                }
            },
            /// start masterDetails view model functions
            /// end masterDetails view model function
            checkout: function (e) {
                var totalP = shoppingCartViewModel.get('total');
                var totalPV = shoppingCartViewModel.get('pv');
                var source = shoppingCartViewModel.get('dataSource');
                var data = source.data();
                var checkedProducts = [];
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    if (item.cchecked) {
                        checkedProducts.push(item);
                        source.remove(item);
                    }
                }

                if (checkedProducts.length == 0) {
                    return;
                }
                source.one('sync', function() {
                     shoppingCartViewModel.createProductOrders(checkedProducts, function(error, pdata) {
                         if (error) {
                             alert(JSON.stringify(error));
                         }else {
                             var retP = pdata['result'];
                             shoppingCartViewModel.createOrder(retP, totalP, totalPV, function(error, odata) {
                                 if (error) {
                                     alert(JSON.stringify(error));
                                 }else {
                                     var retO = odata['result'];
                                     shoppingCartViewModel.updateProductOrders(retO, retP, function(error, data) {
                                         if (error) {
                                             alert(JSON.stringify(error));
                                         }else {
                                             app.mobileApp.navigate("components/checkoutView/view.html?orderId=" + retO.Id );
                                         }
                                     });
                                 }
                             });
                         }
                     });
                });
                source.sync();
            },

            createProductOrders: function(productCarts, callback) {
                var pOrders = [];
                for(var i = 0; i < productCarts.length; i++) {
                    var productCard = productCarts[i];
                    console.log("productCart: " + JSON.stringify(productCard));
                    var pOrder = {
                        OrderQTY : productCard.qty,
                        Product: productCard.product.Id,
                        EarnedPV: 0,
                        Owner: app.currentUser.Id
                    };
                    pOrders.push(pOrder);
                }

                var data = dataProvider.data('ProductOrder');
                data.create(pOrders,
                    function(data){
                       callback(null, data);
                    },
                    function(error){
                        callback(error);
                    }
                );
            },

            createOrder: function(productOders,price,pv, callback) {
                console.log("productOrders: " + JSON.stringify(productOders));
                var pOrderIds = [];
                for (var i = 0; i < productOders.length; i++) {
                    var pOrder = productOders[i];
                    pOrderIds.push(pOrder.Id);
                }

                var order = {
                    OrderCustomer: app.currentUser.Id,
                    OrderNumber: kendo.guid(),
                    Status: 0,
                    totalPrice: price,
                    totalPV: pv,
                    OrderProductOrder: pOrderIds,
                    Owner: app.currentUser.Id
                };
                var data = dataProvider.data('Order');
                data.create(order,
                    function(data){
                        callback(null, data);
                    },
                    function(error){
                        callback(error);
                    }
                );
            },

            updateProductOrders: function(order, pOrders, callback) {
                console.log("update order: " + JSON.stringify(order));
                var ids = [];
                for (var i = 0; i < pOrders.length; i++) {
                    var pOrder = pOrders[i];
                    ids.push(pOrder.Id);
                 }

                var data = dataProvider.data('ProductOrder');
                var query = new Everlive.Query();
                query.where().isin('Id', ids);
                data.update({OrderNumber: order.Id}, query,
                    function(data){
                        callback(null, data);
                    },
                    function(error){
                        callback(error);
                    }
                );
            },

            currentItem: {},
            total: 0,
            pv: 0,
            allChecked: false,

        });

    shoppingCartViewModel.bind('change', function(e) {
        var source = shoppingCartViewModel.get('dataSource');
        var data = source.data();

        if (e.field == 'dataSource') {
            var checkedCount = 0;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.cchecked) {
                    checkedCount = checkedCount + 1;
                }
            }

            if (checkedCount == data.length && data.length > 0) {
                shoppingCartViewModel.set('allChecked', true);
            }else if (checkedCount == 0) {
                shoppingCartViewModel.set('allChecked', false);
            }
            shoppingCartViewModel.updateTotalPrice(data);
        }else if (e.field == 'allChecked') {
            var checked = this.get(e.field);
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.get('cchecked') != checked) {
                    item.set('cchecked', checked);
                }
            }
            //shoppingCartViewModel.updateTotalPrice(data);
        }
    });


    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('shoppingCartViewModel', shoppingCartViewModel);
            var param = parent.get('shoppingCartViewModel_delayedFetch');
            if (typeof param !== 'undefined') {
                parent.set('shoppingCartViewModel_delayedFetch', undefined);
                fetchFilteredData(param);
            }
        });
    } else {
        parent.set('shoppingCartViewModel', shoppingCartViewModel);
    }

    parent.set('onShow', function(e) {
        if (!app.currentUser.Id) {
            alert('You do not login,Please login first.');
            app.mobileApp.navigate('components/loginModelView/view.html');

        }
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null,
            isListmenu = false,
            backbutton = e.view.element && e.view.element.find('header [data-role="navbar"] .backButtonWrapper'),
            dataSourceOptions = shoppingCartViewModel.get('_dataSourceOptions'),
            dataSource;

        if (param || isListmenu) {
            backbutton.show();
            backbutton.css('visibility', 'visible');
        } else {
            if (e.view.element.find('header [data-role="navbar"] [data-role="button"]').length) {
                backbutton.hide();
            } else {
                backbutton.css('visibility', 'hidden');
            }
        }

        dataSource = new kendo.data.DataSource(dataSourceOptions);
        shoppingCartViewModel.set('dataSource', dataSource);
        fetchFilteredData(param);
    });

})(app.shoppingCartView);

// START_CUSTOM_CODE_shoppingCartViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_shoppingCartViewModel