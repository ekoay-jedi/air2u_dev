'use strict';

app.shoppingCartView = kendo.observable({
    onShow: function() {},
    afterShow: function() {},
});
app.localization.registerView('shoppingCartView');

// START_CUSTOM_CODE_shoppingCartView
// Add custom code here. Forl more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

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
                    var userId = dataItem["userId"];
                    if (app.currentUser.Id != userId){
                        data.remove(dataItem);
                        i--;
                        continue;
                    }
                    dataItem.cchecked = dataItem.cchecked | false;
                    var product = dataItem['product'];
                    var imgs = product['ProductImages'];
                    if (imgs && imgs.length > 0) {
                        dataItem['productIdUrl'] =
                            processImage(imgs[0]);
                    }else {
                        dataItem['productIdUrl'] = "resources/default.png";
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

                totalPV = totalPV.toFixed(2);

                var taxRate = shoppingCartViewModel.get("taxRate");
                totalP = totalP + totalP * taxRate;
                totalP = totalP.toFixed(2);

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
                var opItems = data.slice();
                for (var i = 0; i <opItems.length; i++) {
                    var item = opItems[i];
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
                    var productPrice = parseFloat(productCard.qty) * parseFloat(productCard.cvPrice);
                    var earnedPoint = shoppingCartViewModel.getPointFromPrice(productPrice);
                    var pOrder = {
                        OrderQTY : productCard.qty,
                        Product: productCard.product.Id,
                        EarnedPV: earnedPoint,
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

                var point = shoppingCartViewModel.getPointFromPrice(price);

                var order = {
                    OrderCustomer: app.currentUser.Id,
                    OrderNumber: kendo.guid(),
                    Status: 0,
                    totalPrice: price,
                    totalPV: pv,
                    Point: point,
                    OrderProductOrder: pOrderIds,
                    Owner: app.currentUser.Id
                };
                var data = dataProvider.data('Order');
                data.create(order,
                    function(data){
                        shoppingCartViewModel.updateUserWithOrder(order, function (error, user) {
                            callback(error, data);
                        });
                    },
                    function(error){
                        callback(error);
                    }
                );
            },

            updateUserWithOrder: function (order, callback) {
                var userTotalPoint = app.currentUser.CurrentPoint + order.Point - order.totalPV;
                dataProvider.Users.updateSingle({
                        'Id': app.currentUser.Id,
                         'LatestAwardedPoint' : order.Point,
                         'CurrentPoint' : userTotalPoint
                    },
                    function (data) {
                         app.currentUser.LatestAwardedPoint = order.Point;
                         app.currentUser.CurrentPoint = userTotalPoint;
                         callback(null, app.currentUser);
                    },
                    function (error) {
                        callback(error);
                    });
            },

            updateProductOrders: function(order, pOrders, callback) {
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

            getTaxRate: function (callback) {
                var data = dataProvider.data('TaxRate');
                data.get().then(function (data) {
                    var ret = data['result'];
                    if (Array.isArray(ret)) {
                        var taxRate = ret[0];
                        if (taxRate.TaxStatus >= 1) {
                            callback(taxRate["TaxRate"]);
                        }else {
                            callback(0);
                        }
                    }else {
                        alert("get tax rate: " + JSON.stringify(data));
                    }
                }, function (error) {
                    callback(null, error);
                });
            },

            getPointRule: function (callback) {
                var data = dataProvider.data('PointRule');
                var query = new Everlive.Query();
                var currentDate = new Date();
                var isoStr = currentDate.toISOString();
                query.where().or().eq('IsSelected', true).gte('EndDate', isoStr).done();
                data.get(query).then(function (data) {
                    var result = data['result'];
                    if (Array.isArray(result)) {
                        var ret = null;
                        if (result.length > 1) {
                            var defaultRule = null;
                            for (var i = 0; i < result.length; i++) {
                                if (result[i]["RuleName"] == "Default Point") {
                                    defaultRule = result[i];
                                }

                                if (result[i]["IsSelected"]) {
                                    ret = result[i];
                                    break;
                                }
                            }

                            if (!ret) {
                                ret = defaultRule;
                            }
                        }else {
                            ret = result[0];
                        }
                        callback(ret);
                    }else {
                        alert("get point rule: " + JSON.stringify(data));
                    }
                }, function (error) {
                    callback(null, error);
                });
            },

            getPointFromPrice: function (price) {
                var point = 0
                if (price > 0) {
                    var pointRule = shoppingCartViewModel.get('pointRule');
                    console.log("point rule: pv: " + pointRule.pv + " cv: " + pointRule.cv + " price: " + price);
                    var cv = parseFloat(pointRule.cv);
                    var pv = parseFloat(pointRule.pv);
                    point = ((price - price % cv) / cv) * pv;
                }
                return point;
            },

            checkIfHaveEnoughtPoints: function () {
                var source = shoppingCartViewModel.get('dataSource');
                var data = source.data();
                shoppingCartViewModel.updateTotalPrice(data);
                var currentPV = shoppingCartViewModel.get("pv");
                if (app.currentUser.CurrentPoint < currentPV) {
                    return false;
                }
                return true;
            },



            currentItem: {},
            total: 0,
            pv: 0,
            allChecked: false,
            taxRate: 0,
            pointRule: {},
            manualUnAllChecked: false

        });

    shoppingCartViewModel.bind('change', function(e) {
        var source = shoppingCartViewModel.get('dataSource');
        var data = source.data();

        if (e.field == 'dataSource') {
            if (!shoppingCartViewModel.checkIfHaveEnoughtPoints()) {
                var itemLength = e.items.length;
                for (var j = 0; i < itemLength; i++) {
                    var item = e.items[i];
                    var checked = item.get("cchecked");
                    if (checked) {
                        item.cchecked = !checked;
                    }
                }
                alert("Your point is not enough for this action");
            }
            shoppingCartViewModel.updateTotalPrice(data);
            var checkedCount = 0;
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.cchecked) {
                    checkedCount = checkedCount + 1;
                }
            }
            $("#cartListView").data().kendoMobileListView.refresh();

            if (checkedCount == data.length && data.length > 0) {
                shoppingCartViewModel.allChecked = true;
            }else {
                shoppingCartViewModel.allChecked = false;
            }

            $("#allChecked").prop("checked", shoppingCartViewModel.allChecked);
        }else if (e.field == 'allChecked') {
            var checked = this.get(e.field);
            if (checked) {
                var totalPV = 0;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    totalPV += parseFloat(item.product.pvPrice);
                }

                if (app.currentUser.CurrentPoint < totalPV) {
                    $("#allChecked").prop("checked", !checked);
                    alert("Your point is not enough for this action");
                    shoppingCartViewModel.allChecked = !checked;
                    return;
                }
            }

            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if (item.get('cchecked') != checked) {
                    item.cchecked = checked;
                }
            }

            $("#cartListView").data().kendoMobileListView.refresh();
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
            //navigator.notification.
            alert("You do not login,Please login first.");
            setTimeout(function(){
                app.mobileApp.navigate('components/loginModelView/view.html');
            }, 10);
        }else {
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


            shoppingCartViewModel.getTaxRate(function (rate, error) {
                if (error) {
                    alert(error);
                } else {
                    shoppingCartViewModel.taxRate = rate;
                    shoppingCartViewModel.getPointRule(function (item, error) {
                        if (error) {
                            alert(error);
                        } else {
                            shoppingCartViewModel.pointRule = item;
                            dataSource = new kendo.data.DataSource(dataSourceOptions);
                            shoppingCartViewModel.set('dataSource', dataSource);
                            fetchFilteredData(param);
                        }
                    });
                }
            });
            
            dataSource = new kendo.data.DataSource(dataSourceOptions);
            shoppingCartViewModel.set('dataSource', dataSource);
            fetchFilteredData(param);

        }
    });

})(app.shoppingCartView);

// START_CUSTOM_CODE_shoppingCartViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_shoppingCartViewModel