'use strict';
var keyword;
var filter;
var curItem;
var pointRule;
var checkSubmitFlag;
var now;
var aLi;
var open;
// var photoPaths;
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
			serverPaging: true,
			pageSize: 50,
            serverSorting: true,
            sort: { field: "ProductName", dir: "asc" },
            serverFiltering: true,
            change: function(e) {
                var data = this.data();
                filter = $("#filterSelected").val();
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var name = dataItem['ProductName'];
                    if (keyword!=null && name.toLowerCase().indexOf(keyword.toLowerCase())==-1){
                        this.data().remove(dataItem);
                        continue;
                    }else if (filter!=null){
                        if (filter == '10' && parseInt(dataItem["pvPrice"])>0) {
                            this.data().remove(dataItem);
                            continue;
                        }else if (filter == '01' && parseInt(dataItem["cvPrice"])>0) {
                            this.data().remove(dataItem);
                            continue;
                        }else if (filter == '11' && (parseInt(dataItem["cvPrice"])==0 || parseInt(dataItem["pvPrice"])==0)) {
                            this.data().remove(dataItem);
                            continue;
                        }
                    }
                    var item = dataItem['ProductImages'];
                    if (item && item.length > 0) {
                        dataItem['ProductImagesUrl'] =
                            processImage(item[0]);
                    }else{
                        dataItem['ProductImagesUrl'] = "resources/default.png";
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
                        'ProductName': {
                            field: 'ProductName',
                            defaultValue: ''
                        },
                        'cvPrice': {
                            field: 'cvPrice',
                            defaultValue: '--'
                        },
                        'ProductImages': {
                            field: 'ProductImages',
                            defaultValue: ''
                        },
                        'ProductID': {
                            field: 'ProductID',
                            defaultValue: '--'
                        },
                        'QTY': {
                            field: 'QTY',
                            defaultValue: '--'
                        },
                        'ProductImagesUrl': {
                            field: 'ProductImagesUrl',
                            defaultValue: 'http://img1.imgtn.bdimg.com/it/u=3024194923,2121226372&fm=23&gp=0.jpg'
                        },
                        'ProductSpecifications': {
                            field: 'ProductSpecifications',
                            defaultValue: '--'
                        },
                        'ProductDescription': {
                            field: 'ProductDescription',
                            defaultValue: '--'
                        }
                    }
                }
            }
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
                curItem = dataItem;
                app.mobileApp.navigate('components/productListView/details.html?uid=' + dataItem.uid+'&productId='+dataItem.productId);

            },

            imgShow: function() {
                // var curImg = photoPaths[now];
                var photoPath = 'resources/default.png';
                if (curItem['ProductImages']){
                    photoPath = processImage(curItem["ProductImages"][now]);
                }
                var imgtemp = '<img id="bigImg" style="width: 100%; height: auto; max-width: 100%; max-width: 100%" src="'+photoPath+'" alt="">';
                $("#bigImg").replaceWith(imgtemp);
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
                        // console.log("point rule: pv: " + ret.pv + " cv: " + ret.cv + " price: ");
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

            detailsShow: function(e) {
                var uid = e.view.params.uid,
                    dataSource = productListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(uid);

                var tiptemp = "";
                var imgtemp = "";
                var content = document.getElementById('gallery');
                if (curItem['ProductImages']){
                    imgtemp = '<div id="gallery">';
                    tiptemp = '<ul id="tips">';
                    for (var i = 0; i < curItem['ProductImages'].length; i++) {
                        var imgPath = processImage(curItem["ProductImages"][i]);
                        imgtemp += '<li style="width: 300px; height: 200px"><img style="width: auto; height: 100%" src="'+ imgPath +'" alt=""></li>';
                        tiptemp += '<li>'+(i+1)+'</li>';
                        // photoPaths.append(imgPath);
                    }
                    imgtemp += "</div>";
                    tiptemp += "</ul>"
                    var size = curItem['ProductImages'].length;
                }else{
                    imgtemp = '<div id="gallery" style="width: 300px;height: 200px"><li style="width: 300px; height: 200px"><img style="width: auto; height: 100%" src="resources/default.png" alt=""></li></div>';
                    tiptemp = '<ul id="tips"><li>1</li></ul>';
                    // photoPaths.append("resources/default.png");
                }
                // console.log(imgtemp);

                $("#gallery").replaceWith(imgtemp);
                $("#tips").replaceWith(tiptemp);


                var content = document.getElementById('content');
                var tips = document.getElementById('tips');
                aLi = tips.getElementsByTagName('li');
                now = 0;
                for (var i = 0; i < aLi.length; i++) {
                    aLi[0].className = 'active';                //把初始状态定义好
                    content.style.left = 0 +'px';
                    aLi[i].index = i; //自定义属性
                }

                productListViewModel.setCurrentItemByUid(uid);

                /// start detail form show
                open = true;
                /// end detail form show
            },
            play: function () {
                for (var j = 0; j < aLi.length; j++) {
                    aLi[j].className = '';
                }
                aLi[now].className = 'active';

                //this.index = now;                         //反过来写就不对了大兄弟
                //content.style.left = -400 * this.index + 'px';
                var content = document.getElementById('content');
                productListViewModel.startMove(content, {
                    left: -300 * now,
                });
            },

            autoPlay:function () {
                now++;
                if (now == aLi.length) {
                    now = 0;
                }
                productListViewModel.play();
            },

            getStyle:function (obj,name){
                if(obj.currentStyle){
                    return obj.currentStyle[name];
                } else{
                    return getComputedStyle(obj,false)[name];
                }
            },

            startMove:function (obj, json, fnEnd) {
                clearInterval(obj.timer);
                obj.timer = setInterval(function() {
                    var bStop = true;
                    for (var attr in json) {
                        var cur = 0;
                        if (attr == "opacity") {
                            cur = Math.round(parseFloat(productListViewModel.getStyle(obj, attr)) * 100);
                        } else {
                            cur = parseInt(productListViewModel.getStyle(obj, attr))
                        }
                        var speed = (json[attr] - cur) / 10;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        if (cur !== json[attr]) {
                            bStop = false;
                        };
                        if (attr == "opacity") {
                            obj.style.opacity = (speed + cur) / 100;
                            obj.style.filter = 'alpha(opacity:' + (speed + cur) + ')';
                        } else {
                            obj.style[attr] = cur + speed + 'px';
                        }
                    }
                    if (bStop) {
                        clearInterval(obj.timer);
                        if (fnEnd) fnEnd();
                    }
                }, 30)
            },

            setCurrentItemByUid: function(uid) {
                var item = uid,
                    dataSource = productListViewModel.get('dataSource'),
                    itemModel = dataSource.getByUid(item);
                checkSubmitFlag = false;
                $("#qtyField").val(1);
                if (!itemModel) {
                    return null;
                }
                
                var imgitem = [];
                if(itemModel && itemModel.hasOwnProperty('ProductImages')) {
                    imgitem = itemModel["ProductImages"];
                }
                if (typeof imgitem != 'undefined' && imgitem.count>0){
                    itemModel.ProductImagesUrl = processImage(imgitem[0]);
                }

                if (!itemModel.ProductName) {
                    itemModel.ProductName = String.fromCharCode(160);
                }
                var earnPoint = productListViewModel.getPointFromPrice(itemModel.cvPrice);
                productListViewModel.set("earnPoints", earnPoint);

                /// start detail form initialization
                /// end detail form initialization

                var descitem = itemModel.ProductDescription;
                var desc = "";
                if (descitem!=null) {
                    desc = descitem[0];
                }
                productListViewModel.set("productDesc",desc);
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
        keyword = "";
        open = false;
        $("#resultListView").empty();
        $("#search").val('');
        $("#filterSelected").val('00');
        if (!pointRule){
            pointRule = productListViewModel.getPointRule();
        }
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
// END_CUSTOM_CODE_productListViewModel