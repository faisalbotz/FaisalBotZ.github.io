  // Make sure that the properties exist on the window.
  window.googlefc = window.googlefc || {};
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];

  window.googlefc.controlledMessagingFunction = function(message) {
    // Only supress consent dialog when ads are not shown AND GDPR applies
    if (window.displayAds === false) {
      __tcfapi('getTCData', 0, (data, success) => {
       	if (success && data.gdprApplies) {
       	  message.proceed(false);
       	} else {
          message.proceed(true);
       	}
      });
    } else {
      message.proceed(true);
    }
  }

  // Queue the callback on the callbackQueue.
  googlefc.callbackQueue.push({
    'CONSENT_DATA_READY':
    function() {
      __uspapi('getUSPData', 1, (data, success) => {
        if (success) {
          var privacyStringOverride = data.uspString;
          if (navigator.globalPrivacyControl && data.uspString.charAt(2) == 'N') {
            // We have to override google if globalPrivacyControl is set. See also .well-known/gpc.json
            // https://globalprivacycontrol.github.io/gpc-spec/#expressing-a-do-not-sell-or-share-preference
            var oldUspApi = __uspapi;
            privacyStringOverride = data.uspString.substring(0,2) + 'Y' + data.uspString.charAt(3);
            window.__uspapi = function(name, version, callback) {
              if (name == 'getUSPData') {
                callback({"version": 1, "uspString": privacyStringOverride}, true);
              } else {
                oldUspApi(name, version, callback);
              }
            };
          }
          // Loot at override instead of original string so that code above can affect this code
          if (privacyStringOverride.charAt(2) == 'Y') {
            if (getCookie('ccpa_optout_tracked') !== '1') {
              var oXHR = new XMLHttpRequest();
              oXHR.open('POST', '/dynamic/track_ccpa_optout.php', true);
              oXHR.send();
              setCookie('ccpa_optout_tracked', '1', 730);
            }
          }
        }
      });
    }
  });
