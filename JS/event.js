(function(){
(function() {
  // Options
  var optThemeClass = "defaultTheme";

  // Interface
  var uiButtonLogout = document.getElementById('logout');
  var uiStatusContainer = document.getElementById('status');
  var uiStatusMessage = document.getElementById('status-message');
  var uiIframeWorker = document.getElementById('iframe_worker');
  var uiDropdowns = document.getElementsByClassName('dropdown');
  var uiGoogleLang = document.getElementsByClassName('goog-te-combo');

  // State
  var stateTimerStatus;

  // Legacy
  try {document.domain = 'mediafire.com'} catch(e) {};
  window.reloadPage = function() { window.location.reload(); };
  window.noop = function() {};
  window.ClearStatusMessages = reloadPage;
  window.setCookieSeconds = noop;
  window.Re = reloadPage;
  window.aU = noop;

  // Globals
  window.setCookie = function(name, value, expireDays) {
    var date = new Date();
    date.setDate(date.getDate() + expireDays);
    document.cookie = name + "=" + escape(value)
      + ((expireDays == null) ? "" : ";expires="
      + date.toGMTString()) + ";path=/";
  }

  window.getCookie = function(name) {
    if (document.cookie.length > 0) {
      var start = document.cookie.indexOf(name + "=");
      if (start !== -1) {
        start = start + name.length + 1;
        var end = document.cookie.indexOf(";",start);
        if (end === -1) end = document.cookie.length;
        return unescape(document.cookie.substring(start, end));
      }
    }
    return '';
  }

  window.recordFS = function() {
    if (window['_fs_namespace'])return;
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
    window['_fs_org'] = '1QP6C';
    window['_fs_namespace'] = 'FS';
    (function(m,n,e,t,l,o,g,y){
        if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
        g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
        o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
        y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
        g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
        g.anonymize=function(){g.identify(!!0)};
        g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
        g.log = function(a,b){g("log",[a,b])};
        g.consent=function(a){g("consent",!arguments.length||a)};
        g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
        g.clearUserCookie=function(){};
        g.setVars=function(n, p){g('setVars',[n,p]);};
        g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
        if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
        g._v="1.3.0";
    })(window,document,window['_fs_namespace'],'script','user');
  }

  window.loadHotjar = function() {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:1232118,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  }

  window.registerGoogleLang = function() {
    var updateLanguage = function(e) {
      document.body.className = (e.target.value || 'en') + ' ' + optThemeClass;
    };
    if (uiGoogleLang) {
      for (var i = 0; i < uiGoogleLang.length; i++) {
        uiGoogleLang[i].onchange = updateLanguage;
      }
    }
  }

  // Locals
  function clickOutside() {
    document.removeEventListener('click', clickOutside);
    if (uiDropdowns) {
      for (var i = 0; i < uiDropdowns.length; i++) {
        uiDropdowns[i].classList.remove('show_dropdown');
      }
    }
  }

  function toggleDropdown(dropdown) {
    return function(e) {
      if (dropdown.classList.contains('show_dropdown')) {
        dropdown.classList.remove('show_dropdown');
      } else {
        e.preventDefault();
        dropdown.classList.add('show_dropdown');
        setTimeout(function() {
          document.addEventListener('click', clickOutside);
        }, 0);
      }
    };
  }

  // Events
  if (uiButtonLogout) {
    uiButtonLogout.onclick = function(e) {
      e.preventDefault();
      if (uiIframeWorker)
        uiIframeWorker.src = e.target.href;
      return false;
    }
  }

  if (uiDropdowns) {
    for (var i = 0; i < uiDropdowns.length; i++) {
      uiDropdowns[i].onclick = toggleDropdown(uiDropdowns[i]);
    }
  }

  if (uiStatusContainer) {
    window.closeStatusMessage = function() {
      if (stateTimerStatus) {
        clearTimeout(stateTimerStatus);
        stateTimerStatus = null;
      }
      uiStatusMessage.innerText = '';
      uiStatusMessage.textContent = '';
      uiStatusContainer.style.display = 'none';
    }

    window.showStatusMessage = function(message) {
      uiStatusMessage.innerText = message;
      uiStatusMessage.textContent = message;
      uiStatusContainer.style.display = 'block';
      setTimeout(closeStatusMessage, 3500);
    }

    uiStatusContainer.onclick = function(e) {
      e.preventDefault();
      closeStatusMessage();
    };
  }

  // Keyboard focus styling
  try {
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 9) {
        document.body.classList.add('show-focus-outlines');
      }
    });

    document.addEventListener('click', function(e) {
      document.body.classList.remove('show-focus-outlines');
    });
  } catch (e) {}
})();

(function() {
  // Options
  var optFileKey = "9lqf4hdm7e4i7wu";
  var optFileName = "Chika 20jt.zip";
  var optFileURL = "#";
  var optLoggedIn = "false" === "true";
  var optReportTurboDL = "false" === "true";
  var optSecurityToken = "1651588640.1c14c0d3bf8b92e5eb30091610d263a2a195f4290bf404a9314e1f8f87723363";
  var optJsDirectLink = "false" === "true";

  // Elements
  var elWrapperAd = document.getElementById('non-dl-content');
  var elWrapperShare = document.getElementById('share');
  var elCloseShare = document.getElementById('share-close');
  var elIframeShare = document.getElementById('share-iframe');
  var elShare = document.getElementById('shareButton');
  var elSave = document.getElementById('saveButton');
  var elSaveMobile = document.getElementById('saveButtonMobile');
  var elSaveParallel = document.getElementById('saveButtonParallel');
  var elCopyLink = document.getElementById('copyShareURL');
  var elCopyLinkMobile = document.getElementById('copyShareURLMobile');
  var elTurboDownloadOptIn = document.getElementById('ParallelDL-optIn');

  // State
  var alwaysReloadShareBox = true;
  var stateShareBoxLoaded = false;
  elIframeShare.style.display = '';

  // Events
 

  // Globals
  window.addEventListener("message", function(e) {
    if (e && e.data === 'mf-close-dialogs') {
      closeShareDialog();
    }
  });


  window.showDesktopDownloadArrow = function() {
    try {
      if (navigator.userAgent.match(/Mobi/)) return;
      var div = document.createElement("div");
      div.id = 'download-arrow';
      document.body.appendChild(div);
      setTimeout(function() {div.style.opacity = 1}, 100);
    } catch(e) {}
  };

  window.hideDesktopDownloadArrow = function() {
    try {
      var div = document.getElementById('download-arrow');
      div.parentNode.removeChild(div);
    } catch(e) {}
  };

  window.onLegacyCopyLink = function(legacyLink) {
    copyShareLink(null, legacyLink);
  };

  // Locals
  function openShareDialog(src) {
    src && src.preventDefault();
    document.body.classList.add('modal-open');
    elWrapperShare.style = 'display:block !important';
    if (alwaysReloadShareBox || !stateShareBoxLoaded) {
      elIframeShare.onload = function() {
        stateShareBoxLoaded = true;
      }
      elIframeShare.src = elIframeShare.getAttribute('data-src');
    }
  }

  function closeShareDialog(src) {
    src && src.preventDefault();
    try {
      document.body.classList.remove('modal-open');
      elWrapperShare.style = '';
    } catch(e) { }
  }

  function copyShareLink(src, altLink) {
    src && src.preventDefault();
    var targetLink = altLink || optFileURL;
    try {
      var iosCopyToClipboard = function(el) {
        var oldContentEditable = el.contentEditable,
          oldReadOnly = el.readOnly,
          range = document.createRange();
        el.contentEditable = true;
        el.readOnly = false;
        range.selectNodeContents(el);
        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);
        el.setSelectionRange(0, 999999);
        el.contentEditable = oldContentEditable;
        el.readOnly = oldReadOnly;
        document.execCommand('copy');
        document.activeElement.blur();
      };
      var copyListener = function(event) {
        document.removeEventListener('copy', copyListener, true);
        event.preventDefault();
        var clipboardData = event.clipboardData;
        clipboardData.clearData();
        clipboardData.setData('text/plain', targetLink);
        clipboardData.setData('text/html', targetLink);
      };
      iosCopyToClipboard(document.getElementById('copy')); // iOS workaround
      document.addEventListener('copy', copyListener, true);
      document.execCommand('copy');
      showStatusMessage('Share Link copied to the clipboard!');
    } catch(e) {
      window.prompt('Press CTRL+C to copy share link:', targetLink);
    }
    return false;
  }

  function saveToMyfiles(src) {
    src.preventDefault();
    if (!optLoggedIn) {
      window.location.href = '#';
      return;
    }
    var success = false;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '#', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      try {
        success = JSON.parse(this.responseText).success;
      } catch (e) {
        success = false;
      }
      showStatusMessage(success
        ? 'Saved ' + optFileName + ' to your account!'
        : 'You do not have access to save ' + optFileName + ' to your account.');
    };
    xhr.send('security=' + optSecurityToken + '&quick_key=' + optFileKey);
    return false;
  }

  // Ad viewport events
  if (elWrapperAd && window.checkQueuedAdUnitViews) {
      function onScrollResizeChange() {
          var boundingRect = elWrapperAd.getBoundingClientRect();
          window.checkQueuedAdUnitViews({
              windowPageXOffset: - boundingRect.left,
              windowPageYOffset: - boundingRect.top,
              windowInnerWidth: window.innerWidth,
              windowInnerHeight: window.innerHeight
          });
      }
      window.addEventListener("scroll", onScrollResizeChange);
      window.addEventListener("resize", onScrollResizeChange);
      setTimeout(onScrollResizeChange, 1000);
      setTimeout(onScrollResizeChange, 3000);
  }

  // Lazy-loading
  try {
    var observer;
    function setupObserver() {
      observer = new IntersectionObserver(function(obsList) {
        handleIntersection(obsList);
      }, {rootMargin: "10px 0px"});
      findLazyLoadElements();
    }
    function findLazyLoadElements() {
      var elements = document.getElementsByClassName('lazyload');
      for (var el of elements) {
        observer.observe(el);
      }
    }
    function handleIntersection(obsList) {
      for (var obs of obsList) {
        var el = obs.target;
        if (obs.isIntersecting) {
          var lazyClass = el.getAttribute('data-lazyclass');
          if (lazyClass) el.classList.add(lazyClass);
          var lazySource = el.getAttribute('data-lazysrc');
          if (lazySource && el.src !== lazySource) el.src = lazySource;
        }
      }
    }
    setupObserver();
  } catch(e) {
    var elements = document.getElementsByClassName('lazyload');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      el.className += ' ' + el.getAttribute('data-lazyclass');
      var lazySource = el.getAttribute('data-lazysrc');
      if (lazySource && el.src !== lazySource) el.src = lazySource;
    }
  }
  
  if (window.gtag) {
    gtag('event', 'optimize.callback', {
      callback: function(sVariants, sExperimentId) {
        window.go_experiment = sExperimentId + ':' + sVariants;
      }
    });
  }

})();

})();
