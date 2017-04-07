'use strict';

(function() {
    var provider = app.data.backendServices = new Everlive({
        offlineStorage: true,
        appId: 'emqn75r4njlqhrtx',
        scheme: 'https',
        authentication: {
            persist: true
        }
    });

    var registerRemoteNotification = function(el) {
        var pushSettings = {
            iOS: {
                badge: true,
                sound: true,
                alert: true,
                clearBadge: true
            },
            android: {
                senderID: '1064315854771'
            },
            notificationCallbackIOS: function(e) {
                // logic for handling push in iOS
            },
            notificationCallbackAndroid: function(e) {
                // logic for handling push in Android
            }
        };

        el.push.register(
            pushSettings,
            function successCallback(data) {
                // This function will be called once the device is successfully registered
            },
            function errorCallback(error) {
                // This callback will be called any errors occurred during the device
                // registration process
            }
        );
    };

    function _readyTimeout() {
        if (!provider.sbReady) {
            registerRemoteNotification(provider);
            provider.sbReady = true;
            provider.emit('sbReady');
        }
    }

    provider.sbProviderReady = function sbProviderReady(callback) {
        if (provider.sbReady) {
            return callback();
        } else {
            provider.once('sbReady', callback);
        }
    }

    document.addEventListener('online', function _appOnline() {
        provider.offline(false);
        provider.sync();
        _readyTimeout();
    });

    document.addEventListener('offline', function _appOffline() {
        provider.offline(true);
        _readyTimeout();
    });

    window.setTimeout(_readyTimeout, 2000);

}());

// START_CUSTOM_CODE_backendServices
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_backendServices