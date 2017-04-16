'use strict';
var el = app.data.backendServices;
var orderID;
var pointRule;
var checkSubmitFlag;
app.orderDetailView = kendo.observable({
    // opencheckout: function () {
    //    alert("------ "+orderID);
    //     app.mobileApp.navigate('components/checkoutView/view.html?orderId='+orderID);
    // },
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('orderDetailView');

// START_CUSTOM_CODE_orderDetailView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_orderDetailView
(function(parent) {
    var dataProvider = app.data.backendServices,
        /// start global model properties
        /// end global model properties
        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('orderDetailViewModel'),
                dataSource;

            if (model) {
                dataSource = model.get('dataSource');
            } else {
                parent.set('orderDetailViewModel_delayedFetch', paramFilter || null);
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
                typeName: 'ProductOrder',
                dataProvider: dataProvider,
                read: {
                   contentType: "application/json",
                   headers: {
                       "X-Everlive-Expand": JSON.stringify({
                           "Product": {
                               "TargetTypeName": "Product"
                           },
                           "OrderNumber": {
                               "TargetTypeName": "Order"
                           }
                       })
                   }
                }
            },
            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    if(dataItem.Product) {
                        var item = dataItem.Product.ProductImages;
                        if (item && item.length > 0) {
                            dataItem['ProductImagesUrl'] =
                                processImage(item[0]);
                        } else {
                            dataItem['ProductImagesUrl'] = "resources/default.png";
                        }
                    }else{
                        this.data().remove(dataItem);
                        // alert('Sorry! This product does not exist.');
                    }
                    /// start flattenLocation property
                    flattenLocationProperties(dataItem);
                    /// end flattenLocation property

                }
                if(this.data().length==0){
                    document.getElementById("checkoutBtn").style.display="none";
                    alert('None product can be found.')
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
                        'Product': {
                            field: 'Product',
                            defaultValue: ''
                        },
                        'OrderQTY': {
                            field: 'OrderQTY',
                            defaultValue: ''
                        },
                    }
                }
            },
            serverFiltering: true,
        },
        /// start data sources
        /// end data sources
        orderDetailViewModel = kendo.observable({
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
            getPointRule: function () {
                var dataProvider = app.data.backendServices;
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
                        pointRule = ret;
                        console.log("point rule: pv: " + ret.pv + " cv: " + ret.cv + " price: ");
                    }else {
                        alert("get point rule: " + JSON.stringify(data));
                    }
                }, function (error) {
                    pointRule = null;
                });
            },
            getPointFromPrice: function(price){
                var cv = parseFloat(pointRule.cv);
                var pv = parseFloat(pointRule.pv);
                return ((price - price % cv) / cv) * pv;
            },
            itemClick: function(e) {
                var dataItem = e.dataItem || orderDetailViewModel.originalItem;

                app.mobileApp.navigate('#components/orderDetailView/details.html?uid=' + dataItem.uid);

            },
            detailsShow: function(e) {
                var uid = e.view.params.uid,
                    dataSource = orderDetailViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(uid).Product;

                orderDetailViewModel.setCurrentItemByUid(uid);

                /// start detail form show
                /// end detail form show
            },
            setCurrentItemByUid: function(uid) {
                var item = uid,
                    dataSource = orderDetailViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item).Product;
                checkSubmitFlag = false;
                $("#qtyField").val(1);
                if(itemModel) {
                    if (!itemModel.ProductName) {
                        itemModel.ProductName = String.fromCharCode(160);
                    }
                    orderDetailViewModel.set("img", dataSource.getByUid(item).ProductImagesUrl);
                    /// start detail form initialization
                    var earnPoint = orderDetailViewModel.getPointFromPrice(itemModel.cvPrice);
                    orderDetailViewModel.set("earnPoints", earnPoint);
                    /// end detail form initialization

                    var descitem = itemModel.ProductDescription;
                    if (descitem && !descitem.count > 0) {
                        orderDetailViewModel.set("productDesc", descitem[0]);
                    }
                }
                // alert(itemModel.ProductName);
                orderDetailViewModel.set('originalItem', itemModel);
                orderDetailViewModel.set('currentItem',
                    orderDetailViewModel.fixHierarchicalData(itemModel));

                return itemModel;
            },
            linkBind: function(linkString) {
                var linkChunks = linkString.split('|');
                if (linkChunks[0].length === 0) {
                    return this.get('currentItem.' + linkChunks[1]);
                }
                return linkChunks[0] + this.get('currentItem.' + linkChunks[1]);
            },
            /// start masterDetails view model functions
            /// end masterDetails view model functions
            currentItem: {}
        });

    if (typeof dataProvider.sbProviderReady === 'function') {
        dataProvider.sbProviderReady(function dl_sbProviderReady() {
            parent.set('orderDetailViewModel', orderDetailViewModel);
            var param = parent.get('orderDetailViewModel_delayedFetch');
            if (typeof param !== 'undefined') {
                parent.set('orderDetailViewModel_delayedFetch', undefined);
                fetchFilteredData(param);
            }
        });
    } else {
        parent.set('orderDetailViewModel', orderDetailViewModel);
    }

    parent.set('onShow', function(e) {
        orderDetailViewModel.getPointRule();
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null,
            isListmenu = false,
            backbutton = e.view.element && e.view.element.find('header [data-role="navbar"] .backButtonWrapper'),
            dataSourceOptions = orderDetailViewModel.get('_dataSourceOptions'),
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
        orderDetailViewModel.set('dataSource', dataSource);
        fetchFilteredData(param);

        orderID = e.view.params.orderId;
        if(e.view.params.status==0){
            document.getElementById("checkoutBtn").style.display="inline";
        }else{
            document.getElementById("checkoutBtn").style.display="none";
        }
    });
})(app.orderDetailView);

// START_CUSTOM_CODE_orderDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_orderDetailViewModel