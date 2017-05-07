function MOLPay() {
    window.open = cordova.InAppBrowser.open
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this)
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var a = this.length - 1; a >= 0; a--) this[a] && this[a].parentElement && this[a].parentElement.removeChild(this[a])
};
var isInternalDebugging = !1,
    moduleId = "molpay-mobile-xdk-cordova",
    wrapperVersion = "0",
    molpaySdkUrl = "molpay-mobile-xdk-www/index.html",
    mpopenmolpaywindow = "mpopenmolpaywindow://",
    mptransactionresults = "mptransactionresults://",
    mprunscriptonpopup = "mprunscriptonpopup://",
    mpcloseallwindows = "mpcloseallwindows://",
    mppinstructioncapture = "mppinstructioncapture://",
    molpayresulturl = "MOLPay/result.php",
    molpaynbepayurl = "MOLPay/nbepay.php",
    b4results = '"msgType":"B4"',
    c6results = '"msgType":"C6"',
    molpayPaymentDetails, transactionResultCallback, molpayDiv, mainUiFrame, bankUiWindow, molpayTransactionRequestFrame, isClosingMolpay = !1,
    hideFrame = function(a) {
        a.style.visibility = "hidden", a.style.position = "absolute", a.style.width = "0px", a.style.height = "0px"
    },
    showFrame = function(a) {
        a.style.visibility = "visible", a.style.position = "absolute", a.style.width = "100%", a.style.height = "100%"
    },
    postMolpayResultHandler = function(a) {
        var b = a;
        if (b) {
            var c = new RegExp("<iframe"),
                d = c.exec(b);
            d && (b = b.slice(0, d.index));
            var e = function(a) {
                var b, c, d = a,
                    e = new RegExp("<", "g"),
                    f = new RegExp("<"),
                    g = new RegExp(">"),
                    h = d.match(e);
                if (d && h && f.exec(d) && g.exec(d))
                    for (var i = h.length - 1; i >= 0; i--) b = f.exec(d).index, c = g.exec(d).index, d = d.substring(0, b) + "" + d.substring(c + 1);
                return d
            };
            b = e(b);
            var f, g;
            if (f = new RegExp(b4results), f.test(b) && (g = JSON.parse(b))) {
                var h = g.tranID;
                h && mainUiFrame.contentWindow.transactionRequestWithTransactionId(h)
            }
        }
    },
    createBankUiWindow = function(a) {
        var b = "data:text/html;base64," + a;
        bankUiWindow = window.open(b, "_blank", "location=no,hardwareback=no,disallowoverscroll=yes,toolbarposition=top,transitionstyle=crossdissolve");
        var c = function(a) {
            mainUiFrame.contentWindow.transactionRequest(), bankUiWindow.removeEventListener("exit", c)
        };
        bankUiWindow.addEventListener("exit", c);
        var d = function(a) {
            var b;
            b = new RegExp(molpaynbepayurl), a && b.test(a.url) && (bankUiWindow.executeScript({
                code: "window.open = function (open) {        return function (url, name, features) {          window.location = url ;          return window;         };         } (window.open);"
            }, function(a) {}), bankUiWindow.executeScript({
                code: "window.close = function () {        window.location.assign(window.location);        };"
            }, function(a) {}))
        };
        bankUiWindow.addEventListener("loadstop", d);
        var e = function(a) {
            var b;
            if (mainUiFrame.contentWindow.nativeWebRequestUrlUpdates({
                    requestPath: a.url
                }), b = new RegExp(molpaynbepayurl), a && b.test(a.url)) var c = 10,
                d = 0,
                f = setInterval(function() {
                    g()
                }, 1e3),
                g = function() {
                    d++, d > c ? clearInterval(f) : bankUiWindow.executeScript({
                        code: "document.body.innerHTML"
                    }, function(a) {
                        var b = a[0],
                            c = new RegExp(b4results);
                        c.test(b) && (postMolpayResultHandler(b), bankUiWindow.removeEventListener("loadstart", e), bankUiWindow.close(), clearInterval(f))
                    })
                }
        };
        bankUiWindow.addEventListener("loadstart", e)
    },
    inAppCallback = function(a) {
        function b() {
            window.plugins.toast.showWithOptions({
                message: "Image saved success!",
                duration: 1e3,
                position: "bottom"
            })
        }

        function c() {
            window.plugins.toast.showWithOptions({
                message: "Image saved fail!",
                duration: 1e3,
                position: "bottom"
            })
        }

        function d() {
            var a = cordova.plugins.permissions;
            c();
            var b = function() {
                c()
            };
            a.requestPermission(a.WRITE_EXTERNAL_STORAGE, function(a) {
                a.hasPermission ? k() : b()
            }, b)
        }
        var e, f;
        if (a && a.indexOf(mpopenmolpaywindow) > -1) f = new RegExp(mpopenmolpaywindow, "g"), e = a.replace(f, ""), e && e.length > 0 && createBankUiWindow(e);
        else if (a && a.indexOf(mpcloseallwindows) > -1) bankUiWindow.close();
        else if (a && a.indexOf(mptransactionresults) > -1) {
            if (f = new RegExp(mptransactionresults, "g"), e = a.replace(f, ""), e && e.length > 0) {
                var g = window.atob(e),
                    h = JSON.stringify(JSON.parse(g));
                transactionResultCallback(h), isClosingMolpay && (molpayDiv.innerHTML = "", isClosingMolpay = !1), molpayTransactionRequestFrame && molpayTransactionRequestFrame.remove()
            }
        } else if (a && a.indexOf(mppinstructioncapture) > -1) {
            f = new RegExp(mppinstructioncapture, "g"), e = a.replace(f, "");
            var i = JSON.parse(atob(e)),
                j = {
                    data: i.base64ImageUrlData,
                    prefix: i.filename,
                    format: "PNG",
                    quality: 100,
                    mediaScanner: !0
                };
            window.imageSaver.saveBase64Image(j, function(a) {
                b()
            }, d);
            var k = function() {
                window.imageSaver.saveBase64Image(j, function(a) {
                    b()
                }, function(a) {
                    c()
                })
            }
        }
        if (a && a.indexOf(mprunscriptonpopup) > -1 && (f = new RegExp(mprunscriptonpopup, "g"), e = a.replace(f, ""), e && e.length > 0)) {
            var l = window.atob(e);
            bankUiWindow.executeScript({
                code: l
            }, function(a) {})
        }
    },
    testCredentialsCallback = function(a, b) {
        testMerchantCredentialsCallback(a, b), isClosingMolpay && (molpayDiv.innerHTML = "", isClosingMolpay = !1), molpayChannelRequestFrame && molpayChannelRequestFrame.remove()
    },
    exec = require("cordova/exec");
MOLPay.prototype.startMolpay = function(a, b) {
    isClosingMolpay = !1;
    try {
        molpayPaymentDetails = JSON.parse(a)
    } catch (c) {
        molpayPaymentDetails = a
    }
    molpayPaymentDetails.module_id = moduleId, molpayPaymentDetails.wrapper_version = wrapperVersion, transactionResultCallback = b, molpayDiv = document.getElementById("molpay"), molpayDiv.style.width = "100%", molpayDiv.style.padding = "0px", molpayDiv.style.border = "0px", mainUiFrame = document.createElement("iframe");
    var d = function(a) {
        mainUiFrame.contentWindow.updateSdkData(JSON.stringify(molpayPaymentDetails), inAppCallback), mainUiFrame.removeEventListener("load", d)
    };
    mainUiFrame.style.border = "0px", mainUiFrame.style.padding = "0px", mainUiFrame.style.width = "100%", mainUiFrame.style.height = "100%", mainUiFrame.id = "mainUiFrame", mainUiFrame.allowScriptAccess = "always", mainUiFrame.setAttribute("src", molpaySdkUrl), molpayDiv.appendChild(mainUiFrame), mainUiFrame.addEventListener("load", d);
}, MOLPay.prototype.transactionRequest = function(a, b) {
    try {
        molpayPaymentDetails = JSON.parse(a)
    } catch (c) {
        molpayPaymentDetails = a
    }
    molpayPaymentDetails.module_id = moduleId, molpayPaymentDetails.wrapper_version = wrapperVersion, transactionResultCallback = b, molpayTransactionRequestFrame = document.createElement("iframe");
    var d = function(a) {
        molpayTransactionRequestFrame.contentWindow.updateSdkData(molpayPaymentDetails, inAppCallback), molpayTransactionRequestFrame.removeEventListener("load", d)
    };
    molpayTransactionRequestFrame.id = "molpayTransactionRequestFrame", molpayTransactionRequestFrame.allowScriptAccess = "always", molpayTransactionRequestFrame.setAttribute("src", molpaySdkUrl), hideFrame(molpayTransactionRequestFrame), document.body.appendChild(molpayTransactionRequestFrame), molpayTransactionRequestFrame.addEventListener("load", d)
}, MOLPay.prototype.closeMolpay = function() {
    mainUiFrame.contentWindow.closemolpay()
}, MOLPay.prototype.testMerchantCredentials = function(a, b) {
    b && (testMerchantCredentialsCallback = b), molpayChannelRequestFrame = document.createElement("iframe");
    var c = function(b) {
        molpayChannelRequestFrame.contentWindow.testMerchantCredentials(a, testCredentialsCallback), molpayChannelRequestFrame.removeEventListener("load", c)
    };
    molpayChannelRequestFrame.allowScriptAccess = "always", molpayChannelRequestFrame.setAttribute("src", molpaySdkUrl), hideFrame(molpayChannelRequestFrame), document.body.appendChild(molpayChannelRequestFrame), molpayChannelRequestFrame.addEventListener("load", c)
};
var molpay = new MOLPay;
module.exports = molpay;