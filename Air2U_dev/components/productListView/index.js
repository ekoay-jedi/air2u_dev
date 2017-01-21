'use strict';
app.productListView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});
app.localization.registerView('productListView');

// START_CUSTOM_CODE_productListView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_productListView
(function(parent) {
    var dataProvider = app.data.backendServices,
        /// start global model properties
        /// end global model properties

        fetchFilteredData = function(paramFilter, searchFilter) {
            var model = parent.get('productListViewModel'),
                dataSource;

            if (model) {
                dataSource = model.get('dataSource');
            } else {
                parent.set('productListViewModel_delayedFetch', paramFilter || null);
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
                typeName: 'Product',
                dataProvider: dataProvider
            },
            change: function(e) {
                var data = this.data();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var item = dataItem['ProductImages'];
                    dataItem['ProductImagesUrl'] =
                        processImage(item[0]);

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
                        'ProductName': {
                            field: 'ProductName',
                            defaultValue: ''
                        },
                        'cvPrice': {
                            field: 'cvPrice',
                            defaultValue: ''
                        },
                        'ProductImages': {
                            field: 'ProductImages',
                            defaultValue: ''
                        },
                        'ProductID': {
                            field: 'ProductID',
                            defaultValue: ''
                        },
                        'QTY': {
                            field: 'QTY',
                            defaultValue: ''
                        },
                    }
                }
            },
            serverFiltering: true,
        },
        /// start data sources
        /// end data sources
        productListViewModel = kendo.observable({
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
            itemClick: function(e) {
                var dataItem = e.dataItem || productListViewModel.originalItem;
                app.mobileApp.navigate('#components/productListView/details.html?uid=' + dataItem.uid+'&productId='+dataItem.productId);

            },
            detailsShow: function(e) {
                var uid = e.view.params.uid,
                    dataSource = productListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(uid);

                productListViewModel.setCurrentItemByUid(uid);

                /// start detail form show
                /// end detail form show
            },
            setCurrentItemByUid: function(uid) {
                var item = uid,
                    dataSource = productListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                var imgitem = itemModel.ProductImages;
                if (imgitem.count>0){
                    itemModel.ProductImagesUrl = processImage(imgitem[0]);
                }

                if (!itemModel.ProductName) {
                    itemModel.ProductName = String.fromCharCode(160);
                }

                /// start detail form initialization
                /// end detail form initialization

                var descitem = itemModel.ProductDescription;
                if (!descitem.count>0) {
                    productListViewModel.set("productDesc",descitem[0]);
                }
                if (!itemModel.ProductID) {
                    productListViewModel.set("ProductID",itemModel.ProductID);
                }
                productListViewModel.set('originalItem', itemModel);
                productListViewModel.set('currentItem',
                    productListViewModel.fixHierarchicalData(itemModel));

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
            parent.set('productListViewModel', productListViewModel);
            var param = parent.get('productListViewModel_delayedFetch');
            if (typeof param !== 'undefined') {
                parent.set('productListViewModel_delayedFetch', undefined);
                fetchFilteredData(param);
            }
        });
    } else {
        parent.set('productListViewModel', productListViewModel);
    }

    parent.set('onShow', function(e) {
        var param = e.view.params.filter ? JSON.parse(e.view.params.filter) : null,
            isListmenu = false,
            backbutton = e.view.element && e.view.element.find('header [data-role="navbar"] .backButtonWrapper'),
            dataSourceOptions = productListViewModel.get('_dataSourceOptions'),
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
        productListViewModel.set('dataSource', dataSource);
        fetchFilteredData(param);
    });

})(app.productListView);

// START_CUSTOM_CODE_productListViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
<<<<<<< HEAD
app.productListView.productListViewModel = kendo.observable({
    addtoCart: function() {
        $("[data-click=addtoCart]").click(function() {
            var el = new Everlive('o6yuauaw7f5m56jb');
            var cartData = el.data('ProductCart');
            var query = new Everlive.Query();
            query.where().eq('productId', itemModel.productId);
            cartData.get(query).then(function (data) {
                if (JSON.stringify(data).count > 0) {
                } else {
                    cartData.create({'productId': itemModel.productId, 'qty': 1, 'userId': null},
                        function (data) {
                            alert('Add to cart successfully!');
                        },
                        function (error) {
                            alert('Fail to add to cart!');
                        });
                }
            });
        });
	},
    // onshow: function () {
    //     app.productListView.productListViewModel.cash
    // },
});
=======
>>>>>>> feature/SalesHistory
// END_CUSTOM_CODE_productListViewModel