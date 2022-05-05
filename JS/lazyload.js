            (function() {
                // Constants
                var AD_UNITS_CONFIG = getConfig();
                var BIDDER_ALIASES = getBidderAliases();
                var DISABLED_AD_UNITS = JSON.parse('["div-gpt-ad-1579281193413-0"]');
                var BIDDER_SETTINGS = JSON.parse('[]');
                var PREBID_TIMEOUT = 1000;
                var MAX_RETRIES = 20;
                var LAZY_LOAD_AD_UNIT_MARGIN = 0;

                // Init namespaces
                var googletag = googletag || {};
                var pbjs = pbjs || {};
                googletag.cmd = googletag.cmd || [];
                pbjs.que = pbjs.que || [];
                pbjs.retries = 0;

                // Export
                window.googletag = googletag;
                window.pbjs = pbjs;

                // Disable load until bids arrive
                googletag.cmd.push(function() {
                    googletag.pubads().disableInitialLoad();
                });

                function getConfig() {
                    return JSON.parse('[{"code":"div-gpt-ad-1575674121640-0","sizes":[[320,50],[320,100],[300,100],[300,75]],"mediaTypes":{"banner":{"sizes":[[320,50],[320,100],[300,100],[300,75]]}},"tracking_id":"\/21882844027\/Mobileweb-Ad1-Intl","bids":[{"bidder":"openx","params":{"delDomain":"mediafire-d.openx.net","unit":"539074895"}},{"bidder":"pubmatic","params":{"publisherId":"158936","adSlot":"MediaFire_MobileWeb_Top"}},{"bidder":"sharethrough","params":{"pkey":"hkeT3H47uRjxo6oZMXyxY1z7"},"labelAny":["GEO-AU","GEO-BE","GEO-BR","GEO-CA","GEO-FR","GEO-DE","GEO-IN","GEO-IT","GEO-MY","GEO-MX","GEO-NL","GEO-NZ","GEO-PH","GEO-SG","GEO-ZA","GEO-ES","GEO-CH","GEO-AE","GEO-GB","GEO-US"]},{"bidder":"onetag","params":{"pubId":"754491929fcbe98"},"labelAny":["GEO-AR","GEO-BR","GEO-CA","GEO-CL","GEO-CO","GEO-EC","GEO-FR","GEO-DE","GEO-GT","GEO-MX","GEO-PE","GEO-PL","GEO-ES","GEO-GB","GEO-US"]},{"bidder":"medianet","params":{"cid":"8CUO2689O","crid":"126221593"}}]},{"code":"div-gpt-ad-1579281108195-0","sizes":[[320,50]],"mediaTypes":{"banner":{"sizes":[[320,50]]}},"tracking_id":"\/21882844027\/Mobileweb-Ad2-Intl","bids":[{"bidder":"openx","params":{"delDomain":"mediafire-d.openx.net","unit":"539074894"}},{"bidder":"pubmatic","params":{"publisherId":"158936","adSlot":"MediaFire_MobileWeb_Bottom"}},{"bidder":"sharethrough","params":{"pkey":"P0NqaGuacHlOQJGBagkC4TFV"},"labelAny":["GEO-AU","GEO-BE","GEO-BR","GEO-CA","GEO-FR","GEO-DE","GEO-IN","GEO-IT","GEO-MY","GEO-MX","GEO-NL","GEO-NZ","GEO-PH","GEO-SG","GEO-ZA","GEO-ES","GEO-CH","GEO-AE","GEO-GB","GEO-US"]},{"bidder":"onetag","params":{"pubId":"754491929fcbe98"},"labelAny":["GEO-AR","GEO-BR","GEO-CA","GEO-CL","GEO-CO","GEO-EC","GEO-FR","GEO-DE","GEO-GT","GEO-MX","GEO-PE","GEO-PL","GEO-ES","GEO-GB","GEO-US"]},{"bidder":"medianet","params":{"cid":"8CUO2689O","crid":"524626231"}}]},{"code":"div-gpt-ad-1579281193413-0","sizes":[[320,50],[320,100],[300,100],[300,75]],"mediaTypes":{"banner":{"sizes":[[320,50],[320,100],[300,100],[300,75]]}},"tracking_id":"\/21882844027\/Mobileweb-Ad3-Intl","bids":[{"bidder":"openx","params":{"delDomain":"mediafire-d.openx.net","unit":"539078236"}},{"bidder":"pubmatic","params":{"publisherId":"158936","adSlot":"MediaFire_MobileWeb_Ad3"}},{"bidder":"sharethrough","params":{"pkey":"P0NqaGuacHlOQJGBagkC4TFV"},"labelAny":["GEO-AU","GEO-BE","GEO-BR","GEO-CA","GEO-FR","GEO-DE","GEO-IN","GEO-IT","GEO-MY","GEO-MX","GEO-NL","GEO-NZ","GEO-PH","GEO-SG","GEO-ZA","GEO-ES","GEO-CH","GEO-AE","GEO-GB","GEO-US"]},{"bidder":"onetag","params":{"pubId":"754491929fcbe98"},"labelAny":["GEO-AR","GEO-BR","GEO-CA","GEO-CL","GEO-CO","GEO-EC","GEO-FR","GEO-DE","GEO-GT","GEO-MX","GEO-PE","GEO-PL","GEO-ES","GEO-GB","GEO-US"]},{"bidder":"medianet","params":{"cid":"8CUO2689O","crid":"616778526"}}]}]');
                }

                function getBidderAliases() {
                    return JSON.parse('[]');
                }

                // Bids arrived or timeout reached
                function initAdserver() {
                    if (pbjs.initAdserverSet) return;

                    if (!googletag.pubadsReady && pbjs.retries <= MAX_RETRIES) {
                      setTimeout(initAdserver, 50);
                      pbjs.retries++;
                      return;
                    }

                    pbjs.initAdserverSet = true;

                    googletag.cmd.push(function() {
                        pbjs.que.push(function() {
                            pbjs.setTargetingForGPTAsync();
                
                            window.setMaxBidTargeting();

                            // Load ad units except disabled ones
                            AD_UNITS_CONFIG.forEach(function(ad) {
                                if (DISABLED_AD_UNITS.includes(ad.code))
                                    return;
                                window.refreshSlot(ad.code);
                            });
                        });
                    });
                }

                // define public method to refresh a slot
                window.refreshSlot = function(code) {
                    googletag.pubads().getSlots().some(function(slot) {
                        if (slot.getSlotElementId() == code) {
                            googletag.pubads().refresh([slot]);
                            return true;
                        }
                    });
                }
                
                // Find max bids and their bidders for each ad code
                // See https://docs.prebid.org/dev-docs/publisher-api-reference.html
                window.setMaxBidTargeting = function() {
                    var maxBids = [];
                    pbjs.adUnits.forEach(unit=>{
                        var topMaxBid = null;
                        var topMaxBidStr;
                        var topBidder ;
                        pbjs.getBidResponsesForAdUnitCode(unit.code).bids.forEach(bid=>{
                            var fBidValue = parseFloat(bid.pbCg);
                            if (topMaxBid == null || fBidValue > topMaxBid) {
                                topMaxBid = fBidValue;
                                topMaxBidStr = bid.pbCg;
                                topBidder = bid.bidder;
                            }
                        });
                        maxBids[unit.code] = {
                            bidder: topBidder,
                            maxBid: topMaxBidStr
                        };
                    });
                    googletag.pubads().getSlots().map(slot=>{
                        var adCode = slot.getSlotElementId();
                        slot
                            .setTargeting('hb_highestbidder', maxBids[adCode].bidder)
                            .setTargeting('hb_highestbid', maxBids[adCode].maxBid);
                    });
                }

                window['adLazyLoadQueue'] = [];
                var adLoaded = [];

                window.checkAdUnitView = function(code, elementPosition, windowScrollData) {
                    if (adLoaded[code]) {
                        return;
                    }

                    if ((elementPosition.left - LAZY_LOAD_AD_UNIT_MARGIN) < windowScrollData.windowInnerWidth &&
                            (elementPosition.right + LAZY_LOAD_AD_UNIT_MARGIN) > 0 &&
                            (elementPosition.top - LAZY_LOAD_AD_UNIT_MARGIN) < windowScrollData.windowInnerHeight &&
                            (elementPosition.bottom + LAZY_LOAD_AD_UNIT_MARGIN) > 0) {
                        googletag.cmd.push(function () {
                            window.refreshSlot(code);
                            adLoaded[code] = true;
                        });
                    }
                }

                window.checkQueuedAdUnitViews = function(windowScrollData) {
                    var queue = window['adLazyLoadQueue'];
                    if (!queue.length) return;

                    queue.forEach(function(code) {
                        var adElement = document.getElementById(code);
                        if (adElement) {
                            var boundingRect = adElement.getBoundingClientRect();
                            window.checkAdUnitView(code, {
                                left: boundingRect.left - windowScrollData.windowPageXOffset,
                                right: boundingRect.left + boundingRect.width,
                                top: boundingRect.top - windowScrollData.windowPageYOffset,
                                bottom: boundingRect.top + boundingRect.height
                            }, windowScrollData);
                        }
                    });
                }


                // Helper function to load scripts
                function loadScript(src) {
                    var script = document.createElement('script');
                    script.async = true;
                    script.type = 'text/javascript';
                    script.src = src;
                    var node = document.getElementsByTagName('script')[0];
                    node.parentNode.insertBefore(script, node);
                }

                // Timeout if bids take x milliseconds
                setTimeout(initAdserver, PREBID_TIMEOUT);

                // Load Google Services
                loadScript('https://securepubads.g.doubleclick.net/tag/js/gpt.js');

                // Load Prebid
                /*
                    Version: 5.10.0
                    Bidders:
                        AppNexus
                        OpenX
                        Pubmatic
                        Sharethrough
                    Analytic Adapters:
                    Modules:
                */
                loadScript('/js/prebid5.17.0.js');

                // Setup and request bids
                pbjs.que.push(function() {

                    // For reference:
                    // http://prebid.org/dev-docs/publisher-api-reference.html#module_pbjs.setConfig
                    pbjs.setConfig({
                        debug: false,
                        enableSendAllBids: true,
                        priceGranularity: {
                            buckets: [
                                {
                                    max: 0.05,
                                    increment: 0.01
                                },
                                {
                                    max: 5,
                                    increment: 0.05
                                },
                                {
                                    max: 10,
                                    increment: 0.10
                                },
                                {
                                    max: 20,
                                    increment: 0.50
                                }
                            ]
                        },
                        bidderSequence: 'random',
                        bidderTimeout: PREBID_TIMEOUT,
                        userSync: {
                            filterSettings: {
                                iframe: {
                                    bidders: '*',
                                    filter: 'include'
                                }
                            }
                        }
                        // cache: {url: "https://prebid.adnxs.com/pbc/v1/cache"},
                        // s2sConfig: {
                            // endpoint: "https://prebid.adnxs.com/pbs/v1/openrtb2/auction",
                            // syncEndpoint: "https://prebid.adnxs.com/pbs/v1/cookie_sync",
                        // }
                    });

                    BIDDER_ALIASES.forEach(function(bidderAlias) {
                        pbjs.aliasBidder(bidderAlias.name, bidderAlias.alias);
                    });

                    // Bidder settings
                    for (bidder in BIDDER_SETTINGS) {
                        if (BIDDER_SETTINGS[bidder].bidCpmAdjustment) {
                            pbjs.bidderSettings[bidder] = pbjs.bidderSettings[bidder] || {};
                            pbjs.bidderSettings[bidder].bidCpmAdjustment = (function(bidCpmAdjustment, bidCpm, bid){
                                return bidCpm * bidCpmAdjustment / 100;
                            }).bind(null, BIDDER_SETTINGS[bidder].bidCpmAdjustment);
                        }
                    }

                    pbjs.addAdUnits(AD_UNITS_CONFIG);
                    pbjs.requestBids({
                        bidsBackHandler: initAdserver,
                        labels: ['GEO-ID']
                    });
                });

                // Define and enable ad slots
                googletag.cmd.push(function() {
                    for (var i = 0; i < AD_UNITS_CONFIG.length; i++) {
                        var slot;
                        var ad;
                        try {
                            ad = AD_UNITS_CONFIG[i];
                            slot = googletag.defineSlot(ad.tracking_id, ad.sizes, ad.code);
                            if (slot) {
                                slot.addService(googletag.pubads())
                                    .setTargeting('buildnumber', '121873')
                                    .setTargeting('dladtemplate', '4')
                                    .setTargeting('button_delay', 'disabled');
                            }
                        } catch (e) {
                            console.log('ad failed: ', e, ad, slot);
                        }
                    }
                    try {
                        googletag.pubads().set('page_url', top.location.href);
                    } catch(e) {
                        googletag.pubads().set('page_url', 'https://www.mediafire.com');
                    }
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });
            })();
