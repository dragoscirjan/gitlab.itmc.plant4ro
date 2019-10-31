/*------------------------------------------------------------------
 Project:	ShopLocator
 Version:	1
 Last change:	09 March 2016
 Modified by:   Dragos Stefanache
 -------------------------------------------------------------------*/

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
"use strict";

;(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once

    var pluginName = "ShopLocator",
        defaults = {
        pluginStyle: "lollipop",
        paginationStyle: 1,
        preloader: false,
        json: null,
        map: {
            center: [52.2296760, 21.0122290],
            MapType: google.maps.MapTypeId.ROADMAP, //MapTypeId.ROADMAP, MapTypeId.SATELLITE, MapTypeId.HYBRID, MapTypeId.TERRAIN
            disableDefaultUI: false,
            mapStyle: [],
            draggable: true,
            disableDoubleClickZoom: false,
            maxZoom: "",
            minZoom: "",
            scrollwheel: true,
            zoom: 10,
            allMarkersInViewport: true
        },
        infoBubble: {
            visible: false,
            padding: 0,
            borderRadius: 4,
            borderWidth: 0,
            borderColor: "#fff",
            backgroundColor: "#fff",
            shadowStyle: 0,
            minHeight: null,
            maxHeight: 100,
            minWidth: 200,
            maxWidth: null,
            arrowStyle: 0,
            arrowSize: 10,
            arrowPosition: 50,
            hideCloseButton: false,
            closeSrc: "src/style/closeButton.svg",
            offsetTop: 2,
            offsetRight: 2,
            disableAutoPan: false,
            getDirectionsButton: true,
            getDirectionsButtonName: "Get Directions",
            directionsUseGeolocation: true
        },
        markersIcon: "src/style/lollipop/images/marker.png",
        marker: {
            latlng: [52.2296760, 21.0122290],
            animation: false, //google.maps.Animation.DROP, google.maps.Animation.BOUNCE
            title: "CreateIT",
            street: "",
            zip: "",
            city: ""
        },
        cluster: {
            enable: false,
            clusterClass: "cluster",
            gridSize: 50,
            maxZoom: 11,
            style: {
                anchorIcon: [0, 0],
                anchorText: [0, 0],
                backgroundPosition: "0 0",
                fontFamily: 'Arial,sans-serif',
                fontStyle: 'normal',
                textColor: 'white',
                fontWeight: 'bold',
                textSize: 18,
                heightSM: 60,
                widthSM: 54,
                heightMD: 60,
                widthMD: 54,
                heightBIG: 60,
                widthBIG: 54,
                iconSmall: "src/style/lollipop/images/clusterSmall.png",
                iconMedium: "src/style/lollipop/images/clusterMedium.png",
                iconBig: "src/style/lollipop/images/clusterBig.png"
            }
        },
        sidebar: {
            visible: false,
            selectSection: {
                visible: false,
                pathToJSONDirectory: "src/json/",
                difFiles: [["First Region", "markers"], ["Second Region", "diffmarkers"]],
                fileTypes: "json"
            },
            searchBox: {
                visible: false,
                findPlaceBy: "cities",
                searchByCountry: [false, "us"],
                search: false,
                searchRadius: 20
            },
            results: {
                visibleInFirstPage: true,
                pageSize: 10,
                currentPage: 1,
                paginationItems: 5
            }
        }
    };

    var openInfoWindow;

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend(true, {}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function init() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            // this.loadDependences(this, this.element, this.settings);
            this.setUpScriptBody(this.element, this.settings);
            this.setUpMap(this.element, this.settings);
        },
        //Load important scripts:
        //    - markerclusterer.js https://github.com/mahnunchik/markerclustererplus
        //    - infobubble.js https://github.com/googlemaps/js-info-bubble
        loadDependences: function loadDependences(constructor, element, settings) {
            if ($('#markerclusterer').length === 0) {
                var src = "src/dependences/markerclusterer.js";
                var sdk = $('<script id="markerclusterer" type="text/javascript"></script>');
                sdk.attr("src", src);
                sdk.appendTo($('head'));
            }
            if ($('#infobubble').length === 0) {
                var src2 = "src/dependences/infobubble.js";
                var sdk2 = $('<script id="infobubble" type="text/javascript"></script>');
                sdk2.attr("src", src2);
                sdk2.appendTo($('head'));
            }
        },
        //Prepares DOM body for plugin elements
        setUpScriptBody: function setUpScriptBody(element, settings) {
            var sidebarBody;
            $(element).addClass(settings.pluginStyle);
            if (settings.sidebar.visible == true) {
                element.innerHTML = "<div class='ct-googleMap--sidebar row'></div>" + "<div class='ct-googleMap ct-js-googleMap' id='map_canvas'></div>";
                sidebarBody = $(element).find('.ct-googleMap--sidebar');
                if (settings.sidebar.selectSection.visible == true) {
                    var difFiles = settings.sidebar.selectSection.difFiles;
                    sidebarBody.append('<div class="col-sm-6">' + "<div class='ct-googleMap--selectContainer'>" + '<div class="dropdown ct-googleMap--select">' + '<button id="selectRegion" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + '<span class="dropdown-value">' + difFiles[0][0] + '</span>' + '<span class="caret"></span>' + '</button>' + '<ul class="dropdown-menu" aria-labelledby="selectRegion"></ul>' + '</div>' + "</div>" + "</div>");
                    this.createSelectSection(element, settings);
                }
                if (settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {
                    sidebarBody.append('<div class="col-sm-6">' + "<div class='ct-googleMap--searchContainer'>" + "<input type='text' class='ct-googleMap--search' id='searchGmaps' placeholder='Code or city'>" + "</div>" + "</div>");
                    // if(settings.sidebar.searchBox.search == true){
                    //     sidebarBody.append("<div class='ct-googleMap--resultsCounter'></div>"+"<div class='ct-googleMap--results'></div>");
                    // }else if(settings.sidebar.results.visibleInFirstPage == true){
                    //     sidebarBody.append("<div class='ct-googleMap--results'></div>")
                    // }
                }
                if (settings.preloader == true) {
                    $(element).append("<div class='ct-preloader'><div class='ct-preloaderCenter'><div class='ct-preloader-content'><span></span><span></span><span></span><span></span><span></span></div></div> </div>");
                }
            } else {
                element.innerHTML = "<div class='ct-googleMap ct-js-googleMap' id='map_canvas'></div>";
            }
        },
        //Create map with added options, call marker function
        setUpMap: function setUpMap(element, settings) {
            var selectorMap = $(element).find('.ct-js-googleMap');
            var infoWindow, mapCanvas, bounds, draggable;
            if (window.screen.width < 998) {
                draggable = false;
            } else {
                draggable = settings.map.draggable;
            }
            mapCanvas = new google.maps.Map(selectorMap[0], {
                center: new google.maps.LatLng(settings.map.center[0], settings.map.center[1]),
                mapTypeId: settings.map.MapType,
                styles: settings.map.mapStyle,
                disableDefaultUI: settings.map.disableDefaultUI,
                draggable: draggable,
                disableDoubleClickZoom: settings.map.disableDoubleClickZoom,
                maxZoom: settings.map.maxZoom,
                minZoom: settings.map.minZoom,
                scrollwheel: settings.map.scrollwheel,
                zoom: settings.map.zoom
            });
            if (settings.infoBubble.visible == true) {
                ////Creates a infowindow object.
                infoWindow = new google.maps.InfoWindow();
            }
            //Mapping markers on the map
            bounds = new google.maps.LatLngBounds();

            //Fits the map bounds
            //mapCanvas.fitBounds(bounds);

            this.displayMarkers(this, element, mapCanvas, bounds, settings);
        },
        //JSon function for different files
        JSonMainFunction: function JSonMainFunction(constructor, searchBox, data, arrayMarker, element, map, bounds, settings) {
            var clearClusterer;
            var dataMarkers, marker, cluster, clusterStyles, clusterOptions;
            //var gmarkers = [];
            clusterStyles = [{
                anchorIcon: settings.cluster.style.anchorIcon,
                anchorText: settings.cluster.style.anchorText,
                backgroundPosition: settings.cluster.style.backgroundPosition,
                fontFamily: settings.cluster.style.fontFamily,
                fontStyle: settings.cluster.style.fontStyle,
                textColor: settings.cluster.style.textColor,
                fontWeight: settings.cluster.style.fontWeight,
                textSize: settings.cluster.style.textSize,
                url: settings.cluster.style.iconSmall,
                height: settings.cluster.style.heightSM,
                width: settings.cluster.style.widthSM
            }, {
                anchorIcon: settings.cluster.style.anchorIcon,
                anchorText: settings.cluster.style.anchorText,
                backgroundPosition: settings.cluster.style.backgroundPosition,
                fontFamily: settings.cluster.style.fontFamily,
                fontStyle: settings.cluster.style.fontStyle,
                textColor: settings.cluster.style.textColor,
                fontWeight: settings.cluster.style.fontWeight,
                textSize: settings.cluster.style.textSize,
                url: settings.cluster.style.iconMedium,
                height: settings.cluster.style.heightMD,
                width: settings.cluster.style.widthMD
            }, {
                anchorIcon: settings.cluster.style.anchorIcon,
                anchorText: settings.cluster.style.anchorText,
                backgroundPosition: settings.cluster.style.backgroundPosition,
                fontFamily: settings.cluster.style.fontFamily,
                fontStyle: settings.cluster.style.fontStyle,
                textColor: settings.cluster.style.textColor,
                fontWeight: settings.cluster.style.fontWeight,
                textSize: settings.cluster.style.textSize,
                url: settings.cluster.style.iconBig,
                height: settings.cluster.style.heightBIG,
                width: settings.cluster.style.widthBIG
            }];
            clusterOptions = {
                clusterClass: settings.cluster.clusterClass,
                gridSize: settings.cluster.gridSize,
                maxZoom: settings.cluster.maxZoom,
                styles: clusterStyles
            };

            $(element).find('.ct-googleMap--search').val('');
            arrayMarker = [];
            dataMarkers = data;
            dataMarkers.sort(function (a, b) {
                var a1 = a.title,
                    b1 = b.title;
                if (a1 == b1) return 0;
                return a1 > b1 ? 1 : -1;
            });
            bounds = new google.maps.LatLngBounds(null);
            for (var i = 0; dataMarkers.length > i; i++) {
                marker = constructor.createMarkers(map, searchBox, dataMarkers[i], settings);
                bounds.extend(marker.position);
                arrayMarker.push(marker);
                if (settings.sidebar.visible == true && settings.sidebar.results.visibleInFirstPage == true) {
                    constructor.createSidebarButtons(map, marker, element, settings);
                }
            }
            constructor.resultsInPage(constructor, element, settings);
            if (settings.cluster.enable == true) {
                clearClusterer = true;
                cluster = new MarkerClusterer(map, arrayMarker, clusterOptions);
            }
            // some logic
            if (settings.map.allMarkersInViewport == true) {
                map.fitBounds(bounds);
            }
            if (settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {
                constructor.searchPlace(constructor, searchBox, map, arrayMarker, element, settings);
            }
            return cluster;
        },
        //Add markers to map
        displayMarkers: function displayMarkers(constructor, element, map, bounds, settings) {
            var gmarkers = [];
            var selectDOM, sidebarItem, selectValue, marker, cluster, clearClusterer, searchBox, optionsSearchBox;
            selectDOM = $(element).find('.ct-googleMap--select');
            if (settings.preloader == true) {
                var $preloader = $(element).find('.ct-preloader');
            }
            if (settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {
                if (settings.sidebar.searchBox.searchByCountry[0] == true) {
                    optionsSearchBox = {
                        types: ["(" + settings.sidebar.searchBox.findPlaceBy + ")"],
                        componentRestrictions: { country: settings.sidebar.searchBox.searchByCountry[1] }
                    };
                } else {
                    optionsSearchBox = {
                        types: ["(" + settings.sidebar.searchBox.findPlaceBy + ")"]
                    };
                }
                // Create the search box and link it to the UI element.
                var input = $(element).find('.ct-googleMap--search');
                console.log(input);
                //var myPosition = [];

                searchBox = new google.maps.places.Autocomplete(
                /** @type {HTMLInputElement} */input[0], optionsSearchBox);
            }
            if (settings.sidebar.selectSection.visible == true && settings.sidebar.visible == true) {
                $(selectDOM).find('li').click(function () {
                    // $(this).find('option:selected').each(function () {
                    sidebarItem = $(element).find('.ct-googleMap--sidebarItem');
                    sidebarItem.remove();
                    selectValue = $(this).data('value');
                    $('#selectRegion .dropdown-value').text($(this).text());
                    $(element).find('.ct-googleMap--resultsCounter').html('');
                    if (settings.preloader == true) {
                        $preloader.removeClass('make-hidden');
                    }
                    $.ajax({
                        url: settings.sidebar.selectSection.pathToJSONDirectory + selectValue + (settings.sidebar.selectSection.fileTypes ? "." + settings.sidebar.selectSection.fileTypes : ''),
                        dataType: 'json',
                        success: function success(data) {
                            if (clearClusterer == true) {
                                cluster.clearMarkers();
                                clearClusterer = false;
                            }
                            cluster = constructor.JSonMainFunction(constructor, searchBox, data, gmarkers, element, map, bounds, settings);
                            clearClusterer = true;
                            if (settings.preloader == true) {
                                $preloader.addClass('make-hidden');
                            }
                        },
                        error: function error(jqXHR, textStatus, errorThrown) {
                            console.log('ERROR', textStatus, errorThrown);
                        }
                    });
                    // })
                });
                $(selectDOM).find('li:first-child').trigger("click");
            } else {
                if (settings.json == null) {
                    var singleMarker = [{ "lat": settings.marker.latlng[0], "lng": settings.marker.latlng[1], "title": settings.marker.title, "street": settings.marker.street, "city": settings.marker.city, "zip": settings.marker.zip }];
                    marker = constructor.createMarkers(map, searchBox, singleMarker[0], settings);
                    gmarkers.push(marker);
                    if (settings.map.allMarkersInViewport == true) {
                        bounds.extend(marker.position);
                        map.fitBounds(bounds);
                    }
                    if (settings.sidebar.visible == true && settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {
                        constructor.searchPlace(constructor, searchBox, map, gmarkers, element, settings);
                    }
                } else {
                    $.ajax({
                        url: settings.json,
                        dataType: 'json',
                        success: function success(data) {
                            if (clearClusterer == true) {
                                cluster.clearMarkers();
                                clearClusterer = false;
                            }
                            cluster = constructor.JSonMainFunction(constructor, searchBox, data, gmarkers, element, map, bounds, settings);
                            clearClusterer = true;
                            if (settings.preloader == true) {
                                $preloader.addClass('make-hidden');
                            }
                        },
                        error: function error(jqXHR, textStatus, errorThrown) {
                            console.log('ERROR', textStatus, errorThrown);
                        }
                    });
                }
            }
        },
        //Extend displayMarkers function, full setup of marker
        createMarkers: function createMarkers(map, searchBox, markerTable, settings) {
            var getDirectinButton = "";
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(markerTable.lat, markerTable.lng),
                animation: settings.marker.animation,
                map: map,
                title: markerTable.title,
                icon: new google.maps.MarkerImage(settings.markersIcon)
            });
            var markerPosition = marker.getPosition();
            if (settings.infoBubble.getDirectionsButton == true) {
                getDirectinButton = "<a class='ct-button--direction make-hidden' href='' target='_blank'>" + settings.infoBubble.getDirectionsButtonName + "</a>";
            }
            if (settings.infoBubble.visible == true) {
                var infoBubble = new InfoBubble({
                    visible: settings.infoBubble.visible,
                    content: "<div class = 'ct-googleMap--InfoWindowBody' style='text-align: center;'>" + "<span>" + markerTable.title + "</span>" + "<span>" + markerTable.street + "</span>" + "<span>" + markerTable.zip + " - " + markerTable.city + "</span>" + getDirectinButton + "</div>",
                    backgroundClassName: 'ct-googleMap--customInfoWindow',
                    padding: settings.infoBubble.padding,
                    borderRadius: settings.infoBubble.borderRadius,
                    borderWidth: settings.infoBubble.borderWidth,
                    borderColor: settings.infoBubble.borderColor,
                    backgroundColor: settings.infoBubble.backgroundColor,
                    shadowStyle: settings.infoBubble.shadowStyle,
                    minHeight: settings.infoBubble.minHeight,
                    maxHeight: settings.infoBubble.maxHeight,
                    minWidth: settings.infoBubble.minWidth,
                    maxWidth: settings.infoBubble.maxWidth,
                    arrowStyle: settings.infoBubble.arrowStyle,
                    arrowSize: settings.infoBubble.arrowSize,
                    arrowPosition: settings.infoBubble.arrowPosition,
                    hideCloseButton: settings.infoBubble.hideCloseButton,
                    closeSrc: settings.infoBubble.closeSrc,
                    offsetTop: settings.infoBubble.offsetTop,
                    offsetRight: settings.infoBubble.offsetRight,
                    disableAutoPan: settings.infoBubble.disableAutoPan
                });

                google.maps.event.addListener(marker, "click", function () {
                    if (openInfoWindow) {
                        openInfoWindow.close();
                    }
                    infoBubble.open(map, marker);
                    openInfoWindow = infoBubble;
                });
                if (settings.infoBubble.getDirectionsButton == true) {
                    if (settings.infoBubble.directionsUseGeolocation == false && settings.sidebar.searchBox.visible == true && settings.sidebar.visible == true) {
                        var place, directionsLat, directionsLng;
                        var makeVis = false;
                        google.maps.event.addListener(searchBox, 'places_changed', function () {
                            place = searchBox.getPlace();
                            directionsLat = place.geometry.location.lat();
                            directionsLng = place.geometry.location.lng();
                            makeVis = true;
                        });
                    }

                    google.maps.event.addListener(infoBubble, "domready", function () {
                        var directionButton = $('a.ct-button--direction');
                        if (settings.infoBubble.directionsUseGeolocation == true || settings.sidebar.visible == false) {
                            directionButton.removeClass('make-hidden');
                            // Try HTML5 geolocation
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(function (position) {
                                    directionButton.each(function () {
                                        $(this).attr("href", "");
                                        $(this).attr("href", 'http://maps.google.com/maps?saddr=' + position.coords.latitude + "," + position.coords.longitude + ',&daddr=' + markerPosition.lat() + "," + markerPosition.lng());
                                    });
                                }, function () {
                                    console.log("Error: The Geolocation service failed.");
                                });
                            } else {
                                // Browser doesn't support Geolocation
                                console.log("Error: Your browser doesn't support geolocation.");
                            }
                        } else {
                            directionButton.each(function () {
                                $(this).attr("href", "");
                                $(this).attr("href", 'http://maps.google.com/maps?saddr=' + directionsLat + "," + directionsLng + ',&daddr=' + markerPosition.lat() + "," + markerPosition.lng());
                            });
                            if (makeVis == true) {
                                directionButton.removeClass('make-hidden');
                            }
                        }
                    });
                }
            }
            google.maps.event.addDomListener(marker, "click", function () {
                map.setCenter(markerPosition);
            });

            return marker;
        },
        //Sidebar buttons of map markers
        createSidebarButtons: function createSidebarButtons(map, marker, element, settings) {
            //Creates a sidebar button
            var ul = $(element).find('.ct-googleMap--results');
            var li = document.createElement("div");
            li.className = "ct-googleMap--sidebarItem";
            google.maps.event.clearListeners(li, 'click');
            li.innerHTML = "<span class='ct-googleMap--sidebarItemTitle'>" + marker.getTitle() + "</span>";
            ul.append(li);

            //Trigger a click event to marker when the button is clicked.
            google.maps.event.addDomListener(li, "click", function () {
                google.maps.event.trigger(marker, "click");
                map.setZoom(12);
                map.setCenter(marker.getPosition());
            });
        },
        //Google map search function.
        searchPlace: function searchPlace(constructor, searchBox, map, markerTable, element, settings) {
            var locations = [];

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.

            google.maps.event.addListener(searchBox, 'place_changed', function () {
                //places = null;

                var place = searchBox.getPlace();
                var searchLocationPosition = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                if (settings.sidebar.searchBox.search == true) {
                    constructor.displaySearchResults(constructor, map, markerTable, searchLocationPosition, element, settings);
                }

                map.setCenter(place.geometry.location);
                if (place.length == 0) {
                    return;
                }
                map.setZoom(11);
            });
        },
        //Display results
        displaySearchResults: function displaySearchResults(constructor, map, markerTable, position, element, settings) {
            var sidebarItem;
            var searchDistance = [];
            var resultsCounter = $(element).find('.ct-googleMap--resultsCounter');

            sidebarItem = $(element).find('.ct-googleMap--sidebarItem');
            sidebarItem.remove();

            for (var i = 0; markerTable.length > i; i++) {

                var lat = markerTable[i].getPosition().lat();
                var lng = markerTable[i].getPosition().lng();

                var latlng = new google.maps.LatLng(lat, lng);
                var itemDistance = google.maps.geometry.spherical.computeDistanceBetween(position, latlng) / 1000;
                if (itemDistance < settings.sidebar.searchBox.searchRadius) {
                    markerTable[i].distance = itemDistance.toFixed(2);
                    searchDistance.push(markerTable[i]);
                }
            }
            searchDistance.sort(function (a, b) {
                var a1 = parseFloat(a.distance, 10),
                    b1 = parseFloat(b.distance, 10);
                {
                    return a1 - b1;
                }
            });
            for (var j = 0; searchDistance.length > j; j++) {
                constructor.createSidebarButtons(map, searchDistance[j], element, settings);
                $(element).find(".ct-googleMap--sidebarItem:nth-child(" + (j + 1) + ")").append("<span class='ct-googleMap--sidebarItemDistance'>" + searchDistance[j].distance + " km</span>");
            }
            resultsCounter.html('');
            resultsCounter.append("Items" + "<span class='ct-googleMap--itemCounter'>" + searchDistance.length + "</span>");
            constructor.resultsInPage(constructor, element, settings);
        },
        //This function makes all pages of results with pagination, extends displaySearchResults function.
        resultsInPage: function resultsInPage(constructor, element, settings) {
            var pageSize = settings.sidebar.results.pageSize;
            var currentPage = settings.sidebar.results.currentPage;
            var pageCounter = 1;
            var sidebarResults = $(element).find('.ct-googleMap--results');
            var pageNav = "<ul class='Navigation'>";
            var pageNavPages = "<li class='paginationCounter'>";

            constructor.sidebarClear(pageCounter, element);

            if (settings.paginationStyle != 1) {
                pageNavPages += "</li>";
            } else {
                pageNavPages += "<a rel='1' class='NavPage'>" + 1 + "</a>";
            }

            sidebarResults.children().each(function (i) {
                if (i < pageCounter * pageSize && i >= (pageCounter - 1) * pageSize) {
                    $(this).addClass("page" + pageCounter);
                } else {
                    $(this).addClass("page" + (pageCounter + 1));
                    if (settings.paginationStyle == 1) {
                        pageNavPages += "<a rel='" + (pageCounter + 1) + "' class='NavPage'>" + (pageCounter + 1) + "</a>";
                    }
                    pageCounter++;
                }
            });
            if (settings.paginationStyle == 1) {
                pageNavPages += "</li>";
            }

            // show/hide the appropriate regions
            sidebarResults.children().hide();
            sidebarResults.children(".page" + currentPage).show();

            if (pageCounter <= 1) {
                return;
            }

            //Build pager navigation

            var i = 1;

            pageNav += "<li class='NavigationPrev NavigationDisable Navigation" + i + "'><a rel='" + i + "'>" + "</a></li>";
            pageNav += pageNavPages;
            pageNav += "<li class='NavigationNext Navigation" + (i + 1) + "'><a rel='" + (i + 1) + "' >" + "</a></li>";
            pageNav += "</ul>";

            $(element).find('.ct-googleMap--sidebar').append(pageNav);

            constructor.pagination(constructor, sidebarResults, pageCounter, pageSize, currentPage, element, settings);
        },
        //Create pagination, extends resultsInPage function
        pagination: function pagination(constructor, sidebarResults, pageCounter, pageSize, currentPage, element, settings) {
            var i = 1;
            var k = 1;
            var goToPage;
            var paginationCounter = 1;
            var paginationCounterElement = $(element).find('.paginationCounter');
            var NavigationPrev = $(element).find('.NavigationPrev');
            var NavigationNext = $(element).find('.NavigationNext');

            if (settings.paginationStyle == 2) {
                constructor.counterElements(sidebarResults, paginationCounterElement, pageCounter, pageSize, currentPage, element);
            }

            if (settings.paginationStyle == 1) {
                paginationCounterElement.children().each(function (i) {
                    if (i < paginationCounter * settings.sidebar.results.paginationItems && i >= (paginationCounter - 1) * settings.sidebar.results.paginationItems) {
                        $(this).addClass("paginationPage" + paginationCounter);
                    } else {
                        $(this).addClass("paginationPage" + (paginationCounter + 1));
                        paginationCounter = paginationCounter + 1;
                    }
                });
                paginationCounterElement.children().hide();
                paginationCounterElement.children(".paginationPage" + currentPage).show();
                $(element).find(".NavPage[rel='" + currentPage + "']").addClass('active');

                $(element).find('.NavPage').on("click", function () {
                    var whatPage = $(this).attr('rel');
                    $(this).addClass('active').siblings().removeClass('active');
                    goToPage = true;
                    if (whatPage < i) {
                        i = whatPage;
                        NavigationPrev.trigger("click");
                    } else {
                        i = whatPage;
                        NavigationNext.trigger("click");
                    }
                });
            }

            $(element).find('.NavigationPrev').on("click", function () {
                if (goToPage == true) {
                    sidebarResults.children().hide();
                    sidebarResults.find(".page" + i).show();
                    if (i == 1) {
                        $(this).addClass('NavigationDisable');
                    }
                    NavigationNext.removeClass('NavigationDisable');
                    goToPage = false;
                } else {
                    if (i == 1) {
                        i = 1;
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                    } else {
                        if (i == 2) {
                            $(this).addClass('NavigationDisable');
                        }
                        NavigationNext.removeClass('NavigationDisable');
                        i = i - 1;
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                    }
                    if (settings.paginationStyle != 1) {
                        paginationCounterElement.children().hide();
                        paginationCounterElement.children(".paginationCount" + i).show();
                    } else {
                        if (i < k * settings.sidebar.results.paginationItems && i == (k - 1) * settings.sidebar.results.paginationItems) {
                            k = k - 1;
                            paginationCounterElement.children().hide();
                            paginationCounterElement.children(".paginationPage" + k).show();
                        } else {
                            if (i < k * settings.sidebar.results.paginationItems && i >= (k - 1) * settings.sidebar.results.paginationItems) {
                                paginationCounterElement.children().hide();
                                paginationCounterElement.children(".paginationPage" + k).show();
                            } else {
                                k = k - 1;
                                paginationCounterElement.children().hide();
                                paginationCounterElement.children(".paginationPage" + k).show();
                            }
                        }
                        $(element).find(".NavPage[rel='" + i + "']").addClass('active').siblings().removeClass('active');
                    }
                }
            });
            $(element).find('.NavigationNext').on("click", function () {
                if (goToPage == true) {
                    sidebarResults.children().hide();
                    sidebarResults.find(".page" + i).show();
                    if (i == pageCounter) {
                        $(this).addClass('NavigationDisable');
                    }
                    NavigationPrev.removeClass('NavigationDisable');
                    goToPage = false;
                } else {
                    if (i == pageCounter) {
                        i = pageCounter;
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                    } else {
                        if (i == pageCounter - 1) {
                            $(this).addClass('NavigationDisable');
                        }
                        NavigationPrev.removeClass('NavigationDisable');
                        i = parseInt(i, 10) + 1;
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                    }
                    if (settings.paginationStyle != 1) {
                        paginationCounterElement.children().hide();
                        paginationCounterElement.children(".paginationCount" + i).show();
                    } else {
                        if (i < k * settings.sidebar.results.paginationItems && i >= (k - 1) * settings.sidebar.results.paginationItems || i == k * settings.sidebar.results.paginationItems) {
                            paginationCounterElement.children().hide();
                            paginationCounterElement.children(".paginationPage" + k).show();
                        } else {
                            k++;
                            paginationCounterElement.children().hide();
                            paginationCounterElement.children(".paginationPage" + k).show();
                        }
                        $(element).find(".NavPage[rel='" + i + "']").addClass('active').siblings().removeClass('active');
                    }
                }
            });
        },
        //Count how much items is found, extends pagination function
        counterElements: function counterElements(sidebarResults, paginationCounterElement, pageCounter, pageSize, currentPage, element) {
            var tableResults = [];

            for (var j = 0; pageCounter > j; j++) {
                tableResults.push($(element).find('.page' + (1 + j)).length);
                if (tableResults[j] > 1) {
                    paginationCounterElement.append("<span class='paginationCount" + (j + 1) + "'>" + (1 + j * pageSize) + " - " + (tableResults[j] + j * pageSize) + " of " + sidebarResults.children().length + "</span>");
                } else {
                    paginationCounterElement.append("<span class='paginationCount" + (j + 1) + "'>" + (tableResults[j] + j * pageSize) + " of " + sidebarResults.children().length + "</span>");
                }
            }
            paginationCounterElement.children().hide();
            $(element).find(".paginationCount" + currentPage).show();
        },
        //Create select with multiple json files
        createSelectSection: function createSelectSection(element, settings) {
            var difFiles = settings.sidebar.selectSection.difFiles;
            var sidebarSelect = $(element).find('.ct-googleMap--select');
            for (var k = 0; difFiles.length > k; k++) {
                sidebarSelect.find('.dropdown-menu').append(
                // "<option value='"+difFiles[k][1]+"'>"+difFiles[k][0]+"</option>"
                '<li data-value="' + difFiles[k][1] + '">' + difFiles[k][0] + '</li>');
            }
        },
        //Clear sidebar
        sidebarClear: function sidebarClear(pageCounter, element) {
            $(element).find('.Navigation').remove();
            pageCounter = 1;
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
//# sourceMappingURL=data:application/json;base64,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LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gUHJvamVjdDpcdFNob3BMb2NhdG9yXG4gVmVyc2lvbjpcdDFcbiBMYXN0IGNoYW5nZTpcdDA5IE1hcmNoIDIwMTZcbiBNb2RpZmllZCBieTogICBEcmFnb3MgU3RlZmFuYWNoZVxuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gICAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAgIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAgIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuXG4gICAgdmFyIHBsdWdpbk5hbWUgPSBcIlNob3BMb2NhdG9yXCIsXG4gICAgICAgIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgcGx1Z2luU3R5bGU6IFwibG9sbGlwb3BcIixcbiAgICAgICAgICAgIHBhZ2luYXRpb25TdHlsZTogMSxcbiAgICAgICAgICAgIHByZWxvYWRlcjogZmFsc2UsXG4gICAgICAgICAgICBqc29uOiBudWxsLFxuICAgICAgICAgICAgbWFwOntcbiAgICAgICAgICAgICAgICBjZW50ZXI6IFs1Mi4yMjk2NzYwLCAyMS4wMTIyMjkwXSxcbiAgICAgICAgICAgICAgICBNYXBUeXBlOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgLy9NYXBUeXBlSWQuUk9BRE1BUCwgTWFwVHlwZUlkLlNBVEVMTElURSwgTWFwVHlwZUlkLkhZQlJJRCwgTWFwVHlwZUlkLlRFUlJBSU5cbiAgICAgICAgICAgICAgICBkaXNhYmxlRGVmYXVsdFVJOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtYXBTdHlsZTogW10sXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IGZhbHNlLFxuICAgICAgICAgICAgICAgIG1heFpvb206IFwiXCIsXG4gICAgICAgICAgICAgICAgbWluWm9vbTogXCJcIixcbiAgICAgICAgICAgICAgICBzY3JvbGx3aGVlbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB6b29tOiAxMCxcbiAgICAgICAgICAgICAgICBhbGxNYXJrZXJzSW5WaWV3cG9ydDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluZm9CdWJibGU6e1xuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgICAgICAgICAgIGJvcmRlcldpZHRoOiAwLFxuICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI2ZmZlwiLFxuICAgICAgICAgICAgICAgIHNoYWRvd1N0eWxlOiAwLFxuICAgICAgICAgICAgICAgIG1pbkhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogMjAwLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGFycm93U3R5bGU6IDAsXG4gICAgICAgICAgICAgICAgYXJyb3dTaXplOiAxMCxcbiAgICAgICAgICAgICAgICBhcnJvd1Bvc2l0aW9uOiA1MCxcbiAgICAgICAgICAgICAgICBoaWRlQ2xvc2VCdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsb3NlU3JjOiBcInNyYy9zdHlsZS9jbG9zZUJ1dHRvbi5zdmdcIixcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3A6IDIsXG4gICAgICAgICAgICAgICAgb2Zmc2V0UmlnaHQ6IDIsXG4gICAgICAgICAgICAgICAgZGlzYWJsZUF1dG9QYW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIGdldERpcmVjdGlvbnNCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgZ2V0RGlyZWN0aW9uc0J1dHRvbk5hbWU6IFwiR2V0IERpcmVjdGlvbnNcIixcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25zVXNlR2VvbG9jYXRpb246IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXJrZXJzSWNvbjogXCJzcmMvc3R5bGUvbG9sbGlwb3AvaW1hZ2VzL21hcmtlci5wbmdcIixcbiAgICAgICAgICAgIG1hcmtlcjoge1xuICAgICAgICAgICAgICAgIGxhdGxuZzogWzUyLjIyOTY3NjAsIDIxLjAxMjIyOTBdLFxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsIC8vZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsIGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0VcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJDcmVhdGVJVFwiLFxuICAgICAgICAgICAgICAgIHN0cmVldDogXCJcIixcbiAgICAgICAgICAgICAgICB6aXA6IFwiXCIsXG4gICAgICAgICAgICAgICAgY2l0eTogXCJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNsdXN0ZXI6e1xuICAgICAgICAgICAgICAgIGVuYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY2x1c3RlckNsYXNzOiBcImNsdXN0ZXJcIixcbiAgICAgICAgICAgICAgICBncmlkU2l6ZTogNTAsXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogMTEsXG4gICAgICAgICAgICAgICAgc3R5bGU6e1xuICAgICAgICAgICAgICAgICAgICBhbmNob3JJY29uOiBbMCwwXSxcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yVGV4dDogWzAsMF0sXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogXCIwIDBcIixcbiAgICAgICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ0FyaWFsLHNhbnMtc2VyaWYnLFxuICAgICAgICAgICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IDE4LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRTTTogNjAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoU006IDU0LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRNRDogNjAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoTUQ6IDU0LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHRCSUc6IDYwLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aEJJRzogNTQsXG4gICAgICAgICAgICAgICAgICAgIGljb25TbWFsbDogXCJzcmMvc3R5bGUvbG9sbGlwb3AvaW1hZ2VzL2NsdXN0ZXJTbWFsbC5wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbk1lZGl1bTogXCJzcmMvc3R5bGUvbG9sbGlwb3AvaW1hZ2VzL2NsdXN0ZXJNZWRpdW0ucG5nXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb25CaWc6IFwic3JjL3N0eWxlL2xvbGxpcG9wL2ltYWdlcy9jbHVzdGVyQmlnLnBuZ1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNpZGViYXI6e1xuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdFNlY3Rpb246e1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcGF0aFRvSlNPTkRpcmVjdG9yeTogXCJzcmMvanNvbi9cIixcbiAgICAgICAgICAgICAgICAgICAgZGlmRmlsZXM6IFtbXCJGaXJzdCBSZWdpb25cIiwgXCJtYXJrZXJzXCJdLCBbXCJTZWNvbmQgUmVnaW9uXCIsIFwiZGlmZm1hcmtlcnNcIl1dLFxuICAgICAgICAgICAgICAgICAgICBmaWxlVHlwZXM6IFwianNvblwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZWFyY2hCb3g6IHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGZpbmRQbGFjZUJ5OiBcImNpdGllc1wiLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hCeUNvdW50cnk6IFtmYWxzZSwgXCJ1c1wiXSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmFkaXVzOiAyMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzdWx0czp7XG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVJbkZpcnN0UGFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UGFnZTogMSxcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkl0ZW1zOiA1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgdmFyIG9wZW5JbmZvV2luZG93O1xuXG4gICAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgICBmdW5jdGlvbiBQbHVnaW4gKCBlbGVtZW50LCBvcHRpb25zICkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAgICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgICAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgICAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuICAgICAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBBdm9pZCBQbHVnaW4ucHJvdG90eXBlIGNvbmZsaWN0c1xuICAgICQuZXh0ZW5kKFBsdWdpbi5wcm90b3R5cGUsIHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgICAgICAgIC8vIGFuZCB0aGlzLnNldHRpbmdzXG4gICAgICAgICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAgICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMuc2V0dGluZ3MpLlxuICAgICAgICAgICAgLy8gdGhpcy5sb2FkRGVwZW5kZW5jZXModGhpcywgdGhpcy5lbGVtZW50LCB0aGlzLnNldHRpbmdzKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VXBTY3JpcHRCb2R5KHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncyk7XG4gICAgICAgICAgICB0aGlzLnNldFVwTWFwKHRoaXMuZWxlbWVudCwgdGhpcy5zZXR0aW5ncyk7XG5cbiAgICAgICAgfSxcbiAgICAgICAgLy9Mb2FkIGltcG9ydGFudCBzY3JpcHRzOlxuICAgICAgICAvLyAgICAtIG1hcmtlcmNsdXN0ZXJlci5qcyBodHRwczovL2dpdGh1Yi5jb20vbWFobnVuY2hpay9tYXJrZXJjbHVzdGVyZXJwbHVzXG4gICAgICAgIC8vICAgIC0gaW5mb2J1YmJsZS5qcyBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlbWFwcy9qcy1pbmZvLWJ1YmJsZVxuICAgICAgICBsb2FkRGVwZW5kZW5jZXM6IGZ1bmN0aW9uICggY29uc3RydWN0b3IsIGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZigkKCcjbWFya2VyY2x1c3RlcmVyJykubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICB2YXIgc3JjPVwic3JjL2RlcGVuZGVuY2VzL21hcmtlcmNsdXN0ZXJlci5qc1wiO1xuICAgICAgICAgICAgICAgIHZhciBzZGsgPSAkKCc8c2NyaXB0IGlkPVwibWFya2VyY2x1c3RlcmVyXCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPjwvc2NyaXB0PicpO1xuICAgICAgICAgICAgICAgIHNkay5hdHRyKFwic3JjXCIsIHNyYyk7XG4gICAgICAgICAgICAgICAgc2RrLmFwcGVuZFRvKCQoJ2hlYWQnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZigkKCcjaW5mb2J1YmJsZScpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgdmFyIHNyYzI9XCJzcmMvZGVwZW5kZW5jZXMvaW5mb2J1YmJsZS5qc1wiO1xuICAgICAgICAgICAgICAgIHZhciBzZGsyID0gJCgnPHNjcmlwdCBpZD1cImluZm9idWJibGVcIiB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+PC9zY3JpcHQ+Jyk7XG4gICAgICAgICAgICAgICAgc2RrMi5hdHRyKFwic3JjXCIsIHNyYzIpO1xuICAgICAgICAgICAgICAgIHNkazIuYXBwZW5kVG8oJCgnaGVhZCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy9QcmVwYXJlcyBET00gYm9keSBmb3IgcGx1Z2luIGVsZW1lbnRzXG4gICAgICAgIHNldFVwU2NyaXB0Qm9keTogZnVuY3Rpb24gKGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YXIgc2lkZWJhckJvZHk7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLmFkZENsYXNzKHNldHRpbmdzLnBsdWdpblN0eWxlKTtcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnNpZGViYXIudmlzaWJsZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nY3QtZ29vZ2xlTWFwLS1zaWRlYmFyIHJvdyc+PC9kaXY+XCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2N0LWdvb2dsZU1hcCBjdC1qcy1nb29nbGVNYXAnIGlkPSdtYXBfY2FudmFzJz48L2Rpdj5cIjtcbiAgICAgICAgICAgICAgICBzaWRlYmFyQm9keSA9ICQoZWxlbWVudCkuZmluZCgnLmN0LWdvb2dsZU1hcC0tc2lkZWJhcicpO1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnNpZGViYXIuc2VsZWN0U2VjdGlvbi52aXNpYmxlID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlmRmlsZXMgPSBzZXR0aW5ncy5zaWRlYmFyLnNlbGVjdFNlY3Rpb24uZGlmRmlsZXM7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXJCb2R5LmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXNtLTZcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY3QtZ29vZ2xlTWFwLS1zZWxlY3RDb250YWluZXInPlwiK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRyb3Bkb3duIGN0LWdvb2dsZU1hcC0tc2VsZWN0XCI+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGlkPVwic2VsZWN0UmVnaW9uXCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtZXhwYW5kZWQ9XCJmYWxzZVwiPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZHJvcGRvd24tdmFsdWVcIj4nICsgZGlmRmlsZXNbMF1bMF0gKyAnPC9zcGFuPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+JytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJzZWxlY3RSZWdpb25cIj48L3VsPicrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU2VsZWN0U2VjdGlvbihlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LnZpc2libGUgPT0gdHJ1ZSB8fCBzZXR0aW5ncy5zaWRlYmFyLnNlYXJjaEJveC5zZWFyY2ggPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXJCb2R5LmFwcGVuZChcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiY29sLXNtLTZcIj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nY3QtZ29vZ2xlTWFwLS1zZWFyY2hDb250YWluZXInPlwiK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nY3QtZ29vZ2xlTWFwLS1zZWFyY2gnIGlkPSdzZWFyY2hHbWFwcycgcGxhY2Vob2xkZXI9J0NvZGUgb3IgY2l0eSc+XCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIitcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3guc2VhcmNoID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgc2lkZWJhckJvZHkuYXBwZW5kKFwiPGRpdiBjbGFzcz0nY3QtZ29vZ2xlTWFwLS1yZXN1bHRzQ291bnRlcic+PC9kaXY+XCIrXCI8ZGl2IGNsYXNzPSdjdC1nb29nbGVNYXAtLXJlc3VsdHMnPjwvZGl2PlwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfWVsc2UgaWYoc2V0dGluZ3Muc2lkZWJhci5yZXN1bHRzLnZpc2libGVJbkZpcnN0UGFnZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNpZGViYXJCb2R5LmFwcGVuZChcIjxkaXYgY2xhc3M9J2N0LWdvb2dsZU1hcC0tcmVzdWx0cyc+PC9kaXY+XCIpXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucHJlbG9hZGVyID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmFwcGVuZChcIjxkaXYgY2xhc3M9J2N0LXByZWxvYWRlcic+PGRpdiBjbGFzcz0nY3QtcHJlbG9hZGVyQ2VudGVyJz48ZGl2IGNsYXNzPSdjdC1wcmVsb2FkZXItY29udGVudCc+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj48c3Bhbj48L3NwYW4+PHNwYW4+PC9zcGFuPjxzcGFuPjwvc3Bhbj48L2Rpdj48L2Rpdj4gPC9kaXY+XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdjdC1nb29nbGVNYXAgY3QtanMtZ29vZ2xlTWFwJyBpZD0nbWFwX2NhbnZhcyc+PC9kaXY+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vQ3JlYXRlIG1hcCB3aXRoIGFkZGVkIG9wdGlvbnMsIGNhbGwgbWFya2VyIGZ1bmN0aW9uXG4gICAgICAgIHNldFVwTWFwOiBmdW5jdGlvbiAoZWxlbWVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rvck1hcCA9ICQoZWxlbWVudCkuZmluZCgnLmN0LWpzLWdvb2dsZU1hcCcpO1xuICAgICAgICAgICAgdmFyIGluZm9XaW5kb3csIG1hcENhbnZhcywgYm91bmRzLCBkcmFnZ2FibGU7XG4gICAgICAgICAgICBpZih3aW5kb3cuc2NyZWVuLndpZHRoIDwgOTk4KXtcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGUgPSBmYWxzZVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlID0gc2V0dGluZ3MubWFwLmRyYWdnYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFwQ2FudmFzID0gbmV3IGdvb2dsZS5tYXBzLk1hcChzZWxlY3Rvck1hcFswXSwge1xuICAgICAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhzZXR0aW5ncy5tYXAuY2VudGVyWzBdLCBzZXR0aW5ncy5tYXAuY2VudGVyWzFdKSxcbiAgICAgICAgICAgICAgICBtYXBUeXBlSWQ6IHNldHRpbmdzLm1hcC5NYXBUeXBlLFxuICAgICAgICAgICAgICAgIHN0eWxlczogc2V0dGluZ3MubWFwLm1hcFN0eWxlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0VUk6IHNldHRpbmdzLm1hcC5kaXNhYmxlRGVmYXVsdFVJLFxuICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogZHJhZ2dhYmxlLFxuICAgICAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IHNldHRpbmdzLm1hcC5kaXNhYmxlRG91YmxlQ2xpY2tab29tLFxuICAgICAgICAgICAgICAgIG1heFpvb206IHNldHRpbmdzLm1hcC5tYXhab29tLFxuICAgICAgICAgICAgICAgIG1pblpvb206IHNldHRpbmdzLm1hcC5taW5ab29tLFxuICAgICAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBzZXR0aW5ncy5tYXAuc2Nyb2xsd2hlZWwsXG4gICAgICAgICAgICAgICAgem9vbTogc2V0dGluZ3MubWFwLnpvb21cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoc2V0dGluZ3MuaW5mb0J1YmJsZS52aXNpYmxlID09IHRydWUpe1xuICAgICAgICAgICAgICAgIC8vLy9DcmVhdGVzIGEgaW5mb3dpbmRvdyBvYmplY3QuXG4gICAgICAgICAgICAgICAgaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL01hcHBpbmcgbWFya2VycyBvbiB0aGUgbWFwXG4gICAgICAgICAgICBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cbiAgICAgICAgICAgIC8vRml0cyB0aGUgbWFwIGJvdW5kc1xuICAgICAgICAgICAgLy9tYXBDYW52YXMuZml0Qm91bmRzKGJvdW5kcyk7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU1hcmtlcnModGhpcywgZWxlbWVudCwgbWFwQ2FudmFzLCBib3VuZHMsIHNldHRpbmdzKTtcbiAgICAgICAgfSxcbiAgICAgICAgLy9KU29uIGZ1bmN0aW9uIGZvciBkaWZmZXJlbnQgZmlsZXNcbiAgICAgICAgSlNvbk1haW5GdW5jdGlvbjogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBzZWFyY2hCb3gsIGRhdGEsIGFycmF5TWFya2VyLCBlbGVtZW50LCBtYXAsIGJvdW5kcywgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciBjbGVhckNsdXN0ZXJlcjtcbiAgICAgICAgICAgIHZhciBkYXRhTWFya2VycywgbWFya2VyLCBjbHVzdGVyLCBjbHVzdGVyU3R5bGVzLCBjbHVzdGVyT3B0aW9ucztcbiAgICAgICAgICAgIC8vdmFyIGdtYXJrZXJzID0gW107XG4gICAgICAgICAgICBjbHVzdGVyU3R5bGVzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9ySWNvbjogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5hbmNob3JJY29uLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3JUZXh0OiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmFuY2hvclRleHQsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuZm9udEZhbWlseSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmZvbnRTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLnRleHRDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5mb250V2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS50ZXh0U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmljb25TbWFsbCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmhlaWdodFNNLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS53aWR0aFNNXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGFuY2hvckljb246IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuYW5jaG9ySWNvbixcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yVGV4dDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5hbmNob3JUZXh0LFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5OiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmZvbnRGYW1pbHksXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5mb250U3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIHRleHRDb2xvcjogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS50ZXh0Q29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuZm9udFdlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dFNpemU6IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUudGV4dFNpemUsXG4gICAgICAgICAgICAgICAgICAgIHVybDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5pY29uTWVkaXVtLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuaGVpZ2h0TUQsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLndpZHRoTURcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9ySWNvbjogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5hbmNob3JJY29uLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3JUZXh0OiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmFuY2hvclRleHQsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IHNldHRpbmdzLmNsdXN0ZXIuc3R5bGUuZm9udEZhbWlseSxcbiAgICAgICAgICAgICAgICAgICAgZm9udFN0eWxlOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmZvbnRTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dENvbG9yOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLnRleHRDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5mb250V2VpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2l6ZTogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS50ZXh0U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLmljb25CaWcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogc2V0dGluZ3MuY2x1c3Rlci5zdHlsZS5oZWlnaHRCSUcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBzZXR0aW5ncy5jbHVzdGVyLnN0eWxlLndpZHRoQklHXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNsdXN0ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGNsdXN0ZXJDbGFzczogc2V0dGluZ3MuY2x1c3Rlci5jbHVzdGVyQ2xhc3MsXG4gICAgICAgICAgICAgICAgZ3JpZFNpemU6IHNldHRpbmdzLmNsdXN0ZXIuZ3JpZFNpemUsXG4gICAgICAgICAgICAgICAgbWF4Wm9vbTogc2V0dGluZ3MuY2x1c3Rlci5tYXhab29tLFxuICAgICAgICAgICAgICAgIHN0eWxlczogY2x1c3RlclN0eWxlc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuY3QtZ29vZ2xlTWFwLS1zZWFyY2gnKS52YWwoJycpO1xuICAgICAgICAgICAgYXJyYXlNYXJrZXIgPSBbXTtcbiAgICAgICAgICAgIGRhdGFNYXJrZXJzID0gZGF0YTtcbiAgICAgICAgICAgIGRhdGFNYXJrZXJzLnNvcnQoZnVuY3Rpb24oYSwgYil7XG4gICAgICAgICAgICAgICAgdmFyIGExPSBhLnRpdGxlLCBiMT0gYi50aXRsZTtcbiAgICAgICAgICAgICAgICBpZihhMT09IGIxKSByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYTE+IGIxPyAxOiAtMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYm91bmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcyhudWxsKTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGRhdGFNYXJrZXJzLmxlbmd0aCA+IGk7IGkrKyl7XG4gICAgICAgICAgICAgICAgbWFya2VyID0gY29uc3RydWN0b3IuY3JlYXRlTWFya2VycyhtYXAsIHNlYXJjaEJveCwgZGF0YU1hcmtlcnNbaV0sIHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICBib3VuZHMuZXh0ZW5kIChtYXJrZXIucG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGFycmF5TWFya2VyLnB1c2gobWFya2VyKTtcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5zaWRlYmFyLnZpc2libGUgPT0gdHJ1ZSAmJiBzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMudmlzaWJsZUluRmlyc3RQYWdlID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvci5jcmVhdGVTaWRlYmFyQnV0dG9ucyhtYXAsIG1hcmtlciwgZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnJlc3VsdHNJblBhZ2UoY29uc3RydWN0b3IsIGVsZW1lbnQsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLmNsdXN0ZXIuZW5hYmxlID09IHRydWUpe1xuICAgICAgICAgICAgICAgIGNsZWFyQ2x1c3RlcmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjbHVzdGVyID0gbmV3IE1hcmtlckNsdXN0ZXJlcihtYXAsIGFycmF5TWFya2VyLCBjbHVzdGVyT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzb21lIGxvZ2ljXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5tYXAuYWxsTWFya2Vyc0luVmlld3BvcnQgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgbWFwLmZpdEJvdW5kcyAoYm91bmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LnZpc2libGUgPT0gdHJ1ZSB8fCBzZXR0aW5ncy5zaWRlYmFyLnNlYXJjaEJveC5zZWFyY2ggPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3Iuc2VhcmNoUGxhY2UoY29uc3RydWN0b3IsIHNlYXJjaEJveCwgbWFwLCBhcnJheU1hcmtlciwgZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXJcbiAgICAgICAgfSxcbiAgICAgICAgLy9BZGQgbWFya2VycyB0byBtYXBcbiAgICAgICAgZGlzcGxheU1hcmtlcnM6IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgZWxlbWVudCwgbWFwLCBib3VuZHMsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YXIgZ21hcmtlcnMgPSBbXTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RET00sIHNpZGViYXJJdGVtLCBzZWxlY3RWYWx1ZSwgbWFya2VyLCBjbHVzdGVyLCBjbGVhckNsdXN0ZXJlciwgc2VhcmNoQm94LCBvcHRpb25zU2VhcmNoQm94O1xuICAgICAgICAgICAgc2VsZWN0RE9NID0gJChlbGVtZW50KS5maW5kKCcuY3QtZ29vZ2xlTWFwLS1zZWxlY3QnKTtcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnByZWxvYWRlciA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICB2YXIgJHByZWxvYWRlciA9ICQoZWxlbWVudCkuZmluZCgnLmN0LXByZWxvYWRlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3gudmlzaWJsZSA9PSB0cnVlIHx8IHNldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LnNlYXJjaCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5zaWRlYmFyLnNlYXJjaEJveC5zZWFyY2hCeUNvdW50cnlbMF0gPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTZWFyY2hCb3ggPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlczogW1wiKFwiK3NldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LmZpbmRQbGFjZUJ5K1wiKVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge2NvdW50cnk6IHNldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LnNlYXJjaEJ5Q291bnRyeVsxXX1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1NlYXJjaEJveCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVzOiBbXCIoXCIrc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3guZmluZFBsYWNlQnkrXCIpXCJdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgc2VhcmNoIGJveCBhbmQgbGluayBpdCB0byB0aGUgVUkgZWxlbWVudC5cbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXNlYXJjaCcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0KVxuICAgICAgICAgICAgICAgIC8vdmFyIG15UG9zaXRpb24gPSBbXTtcblxuICAgICAgICAgICAgICAgIHNlYXJjaEJveCA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKFxuICAgICAgICAgICAgICAgICAgICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovKGlucHV0WzBdKSwgb3B0aW9uc1NlYXJjaEJveCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzZXR0aW5ncy5zaWRlYmFyLnNlbGVjdFNlY3Rpb24udmlzaWJsZSA9PSB0cnVlICYmIHNldHRpbmdzLnNpZGViYXIudmlzaWJsZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAkKCBzZWxlY3RET00gKS5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICQodGhpcykuZmluZCgnb3B0aW9uOnNlbGVjdGVkJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW0gPSAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXNpZGViYXJJdGVtJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhckl0ZW0ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VmFsdWUgPSAkKHRoaXMpLmRhdGEoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3NlbGVjdFJlZ2lvbiAuZHJvcGRvd24tdmFsdWUnKS50ZXh0KCQodGhpcykudGV4dCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXJlc3VsdHNDb3VudGVyJykuaHRtbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucHJlbG9hZGVyID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcHJlbG9hZGVyLnJlbW92ZUNsYXNzKCdtYWtlLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHNldHRpbmdzLnNpZGViYXIuc2VsZWN0U2VjdGlvbi5wYXRoVG9KU09ORGlyZWN0b3J5ICsgc2VsZWN0VmFsdWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNldHRpbmdzLnNpZGViYXIuc2VsZWN0U2VjdGlvbi5maWxlVHlwZXMgPyBcIi5cIiArIHNldHRpbmdzLnNpZGViYXIuc2VsZWN0U2VjdGlvbi5maWxlVHlwZXMgOiAnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNsZWFyQ2x1c3RlcmVyID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDbHVzdGVyZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgPSAgY29uc3RydWN0b3IuSlNvbk1haW5GdW5jdGlvbihjb25zdHJ1Y3RvcixzZWFyY2hCb3gsIGRhdGEsIGdtYXJrZXJzLCBlbGVtZW50LCBtYXAsIGJvdW5kcywgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDbHVzdGVyZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucHJlbG9hZGVyID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRwcmVsb2FkZXIuYWRkQ2xhc3MoJ21ha2UtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFUlJPUicsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICQoc2VsZWN0RE9NKS5maW5kKCdsaTpmaXJzdC1jaGlsZCcpLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmpzb24gPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaW5nbGVNYXJrZXIgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XCJsYXRcIjpzZXR0aW5ncy5tYXJrZXIubGF0bG5nWzBdLCBcImxuZ1wiOnNldHRpbmdzLm1hcmtlci5sYXRsbmdbMV0sIFwidGl0bGVcIjpzZXR0aW5ncy5tYXJrZXIudGl0bGUsIFwic3RyZWV0XCI6c2V0dGluZ3MubWFya2VyLnN0cmVldCwgXCJjaXR5XCI6c2V0dGluZ3MubWFya2VyLmNpdHksIFwiemlwXCI6c2V0dGluZ3MubWFya2VyLnppcH0sXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IGNvbnN0cnVjdG9yLmNyZWF0ZU1hcmtlcnMobWFwLCBzZWFyY2hCb3gsIHNpbmdsZU1hcmtlclswXSwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICBnbWFya2Vycy5wdXNoKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLm1hcC5hbGxNYXJrZXJzSW5WaWV3cG9ydCA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kcy5leHRlbmQgKG1hcmtlci5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAuZml0Qm91bmRzIChib3VuZHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnNpZGViYXIudmlzaWJsZSA9PSB0cnVlICYmIHNldHRpbmdzLnNpZGViYXIuc2VhcmNoQm94LnZpc2libGUgPT0gdHJ1ZSB8fCBzZXR0aW5ncy5zaWRlYmFyLnNlYXJjaEJveC5zZWFyY2ggPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvci5zZWFyY2hQbGFjZShjb25zdHJ1Y3Rvciwgc2VhcmNoQm94LCBtYXAsIGdtYXJrZXJzLCBlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogc2V0dGluZ3MuanNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY2xlYXJDbHVzdGVyZXIgPT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyQ2x1c3RlcmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIgPSAgY29uc3RydWN0b3IuSlNvbk1haW5GdW5jdGlvbihjb25zdHJ1Y3Rvciwgc2VhcmNoQm94LCBkYXRhLCBnbWFya2VycywgZWxlbWVudCwgbWFwLCBib3VuZHMsIHNldHRpbmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckNsdXN0ZXJlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucHJlbG9hZGVyID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkcHJlbG9hZGVyLmFkZENsYXNzKCdtYWtlLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SJywgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vRXh0ZW5kIGRpc3BsYXlNYXJrZXJzIGZ1bmN0aW9uLCBmdWxsIHNldHVwIG9mIG1hcmtlclxuICAgICAgICBjcmVhdGVNYXJrZXJzOiBmdW5jdGlvbihtYXAsIHNlYXJjaEJveCwgbWFya2VyVGFibGUsIHNldHRpbmdzKXtcbiAgICAgICAgICAgIHZhciBnZXREaXJlY3RpbkJ1dHRvbiA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcmtlclRhYmxlLmxhdCwgbWFya2VyVGFibGUubG5nKSxcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHNldHRpbmdzLm1hcmtlci5hbmltYXRpb24sXG4gICAgICAgICAgICAgICAgbWFwIDogbWFwLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBtYXJrZXJUYWJsZS50aXRsZSxcbiAgICAgICAgICAgICAgICBpY29uOiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VySW1hZ2Uoc2V0dGluZ3MubWFya2Vyc0ljb24pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBtYXJrZXJQb3NpdGlvbiA9IG1hcmtlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaWYoc2V0dGluZ3MuaW5mb0J1YmJsZS5nZXREaXJlY3Rpb25zQnV0dG9uID09IHRydWUpe1xuICAgICAgICAgICAgICAgIGdldERpcmVjdGluQnV0dG9uID0gXCI8YSBjbGFzcz0nY3QtYnV0dG9uLS1kaXJlY3Rpb24gbWFrZS1oaWRkZW4nIGhyZWY9JycgdGFyZ2V0PSdfYmxhbmsnPlwiK3NldHRpbmdzLmluZm9CdWJibGUuZ2V0RGlyZWN0aW9uc0J1dHRvbk5hbWUrXCI8L2E+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzZXR0aW5ncy5pbmZvQnViYmxlLnZpc2libGUgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmZvQnViYmxlID0gbmV3IEluZm9CdWJibGUoe1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiBzZXR0aW5ncy5pbmZvQnViYmxlLnZpc2libGUsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiPGRpdiBjbGFzcyA9ICdjdC1nb29nbGVNYXAtLUluZm9XaW5kb3dCb2R5JyBzdHlsZT0ndGV4dC1hbGlnbjogY2VudGVyOyc+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPHNwYW4+XCIrbWFya2VyVGFibGUudGl0bGUrXCI8L3NwYW4+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPHNwYW4+XCIrbWFya2VyVGFibGUuc3RyZWV0K1wiPC9zcGFuPlwiK1xuICAgICAgICAgICAgICAgICAgICBcIjxzcGFuPlwiK21hcmtlclRhYmxlLnppcCtcIiAtIFwiK21hcmtlclRhYmxlLmNpdHkrXCI8L3NwYW4+XCIrXG4gICAgICAgICAgICAgICAgICAgIGdldERpcmVjdGluQnV0dG9uK1xuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2xhc3NOYW1lOiAnY3QtZ29vZ2xlTWFwLS1jdXN0b21JbmZvV2luZG93JyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogc2V0dGluZ3MuaW5mb0J1YmJsZS5wYWRkaW5nLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IHNldHRpbmdzLmluZm9CdWJibGUuYm9yZGVyUmFkaXVzLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJXaWR0aDogc2V0dGluZ3MuaW5mb0J1YmJsZS5ib3JkZXJXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNldHRpbmdzLmluZm9CdWJibGUuYm9yZGVyQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2V0dGluZ3MuaW5mb0J1YmJsZS5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd1N0eWxlOiBzZXR0aW5ncy5pbmZvQnViYmxlLnNoYWRvd1N0eWxlLFxuICAgICAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IHNldHRpbmdzLmluZm9CdWJibGUubWluSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHNldHRpbmdzLmluZm9CdWJibGUubWF4SGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBtaW5XaWR0aDogc2V0dGluZ3MuaW5mb0J1YmJsZS5taW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IHNldHRpbmdzLmluZm9CdWJibGUubWF4V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGFycm93U3R5bGU6IHNldHRpbmdzLmluZm9CdWJibGUuYXJyb3dTdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dTaXplOiBzZXR0aW5ncy5pbmZvQnViYmxlLmFycm93U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dQb3NpdGlvbjogc2V0dGluZ3MuaW5mb0J1YmJsZS5hcnJvd1Bvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBoaWRlQ2xvc2VCdXR0b246IHNldHRpbmdzLmluZm9CdWJibGUuaGlkZUNsb3NlQnV0dG9uLFxuICAgICAgICAgICAgICAgICAgICBjbG9zZVNyYzogc2V0dGluZ3MuaW5mb0J1YmJsZS5jbG9zZVNyYyxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0VG9wOiBzZXR0aW5ncy5pbmZvQnViYmxlLm9mZnNldFRvcCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0UmlnaHQ6IHNldHRpbmdzLmluZm9CdWJibGUub2Zmc2V0UmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiBzZXR0aW5ncy5pbmZvQnViYmxlLmRpc2FibGVBdXRvUGFuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZihvcGVuSW5mb1dpbmRvdyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuSW5mb1dpbmRvdy5jbG9zZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5mb0J1YmJsZS5vcGVuKG1hcCwgbWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgb3BlbkluZm9XaW5kb3cgPSBpbmZvQnViYmxlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmluZm9CdWJibGUuZ2V0RGlyZWN0aW9uc0J1dHRvbiA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MuaW5mb0J1YmJsZS5kaXJlY3Rpb25zVXNlR2VvbG9jYXRpb24gPT0gZmFsc2UgJiYgc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3gudmlzaWJsZSA9PSB0cnVlICYmIHNldHRpbmdzLnNpZGViYXIudmlzaWJsZSA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGFjZSwgZGlyZWN0aW9uc0xhdCwgZGlyZWN0aW9uc0xuZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYWtlVmlzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihzZWFyY2hCb3gsICdwbGFjZXNfY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlID0gc2VhcmNoQm94LmdldFBsYWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uc0xhdCA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbnNMbmcgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWtlVmlzID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihpbmZvQnViYmxlLCBcImRvbXJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkaXJlY3Rpb25CdXR0b24gPSAkKCdhLmN0LWJ1dHRvbi0tZGlyZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5pbmZvQnViYmxlLmRpcmVjdGlvbnNVc2VHZW9sb2NhdGlvbiA9PSB0cnVlIHx8IHNldHRpbmdzLnNpZGViYXIudmlzaWJsZSA9PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uQnV0dG9uLnJlbW92ZUNsYXNzKCdtYWtlLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJ5IEhUTUw1IGdlb2xvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbkJ1dHRvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiaHJlZlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJocmVmXCIsJ2h0dHA6Ly9tYXBzLmdvb2dsZS5jb20vbWFwcz9zYWRkcj0nK3Bvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZStcIixcIitwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlKycsJmRhZGRyPScrbWFya2VyUG9zaXRpb24ubGF0KCkrXCIsXCIrbWFya2VyUG9zaXRpb24ubG5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogVGhlIEdlb2xvY2F0aW9uIHNlcnZpY2UgZmFpbGVkLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCcm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBHZW9sb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBZb3VyIGJyb3dzZXIgZG9lc24ndCBzdXBwb3J0IGdlb2xvY2F0aW9uLlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbkJ1dHRvbi5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImhyZWZcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImhyZWZcIiwnaHR0cDovL21hcHMuZ29vZ2xlLmNvbS9tYXBzP3NhZGRyPScrZGlyZWN0aW9uc0xhdCtcIixcIitkaXJlY3Rpb25zTG5nKycsJmRhZGRyPScrbWFya2VyUG9zaXRpb24ubGF0KCkrXCIsXCIrbWFya2VyUG9zaXRpb24ubG5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1ha2VWaXMgPT0gdHJ1ZSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25CdXR0b24ucmVtb3ZlQ2xhc3MoJ21ha2UtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKG1hcmtlciwgXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIobWFya2VyUG9zaXRpb24pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgICAgIH0sXG4gICAgICAgIC8vU2lkZWJhciBidXR0b25zIG9mIG1hcCBtYXJrZXJzXG4gICAgICAgIGNyZWF0ZVNpZGViYXJCdXR0b25zOiBmdW5jdGlvbiAobWFwLCBtYXJrZXIsIGVsZW1lbnQsIHNldHRpbmdzKXtcbiAgICAgICAgICAgIC8vQ3JlYXRlcyBhIHNpZGViYXIgYnV0dG9uXG4gICAgICAgICAgICB2YXIgdWwgPSAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXJlc3VsdHMnKTtcbiAgICAgICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBsaS5jbGFzc05hbWUgPSBcImN0LWdvb2dsZU1hcC0tc2lkZWJhckl0ZW1cIjtcbiAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFyTGlzdGVuZXJzKGxpLCAnY2xpY2snKTtcbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IFwiPHNwYW4gY2xhc3M9J2N0LWdvb2dsZU1hcC0tc2lkZWJhckl0ZW1UaXRsZSc+XCIrbWFya2VyLmdldFRpdGxlKCkrXCI8L3NwYW4+XCI7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuXG4gICAgICAgICAgICAvL1RyaWdnZXIgYSBjbGljayBldmVudCB0byBtYXJrZXIgd2hlbiB0aGUgYnV0dG9uIGlzIGNsaWNrZWQuXG4gICAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcihsaSwgXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LnRyaWdnZXIobWFya2VyLCBcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgIG1hcC5zZXRab29tKDEyKTtcbiAgICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKG1hcmtlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvL0dvb2dsZSBtYXAgc2VhcmNoIGZ1bmN0aW9uLlxuICAgICAgICBzZWFyY2hQbGFjZTogZnVuY3Rpb24gKGNvbnN0cnVjdG9yLCBzZWFyY2hCb3gsIG1hcCwgbWFya2VyVGFibGUsIGVsZW1lbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRpb25zID0gW107XG5cbiAgICAgICAgICAgIC8vIExpc3RlbiBmb3IgdGhlIGV2ZW50IGZpcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBpdGVtIGZyb20gdGhlXG4gICAgICAgICAgICAvLyBwaWNrIGxpc3QuIFJldHJpZXZlIHRoZSBtYXRjaGluZyBwbGFjZXMgZm9yIHRoYXQgaXRlbS5cblxuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIoc2VhcmNoQm94LCAncGxhY2VfY2hhbmdlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vcGxhY2VzID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIHZhciBwbGFjZSA9IHNlYXJjaEJveC5nZXRQbGFjZSgpO1xuICAgICAgICAgICAgICAgIHZhciBzZWFyY2hMb2NhdGlvblBvc2l0aW9uID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSwgcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCkpO1xuXG4gICAgICAgICAgICAgICAgaWYoc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3guc2VhcmNoID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvci5kaXNwbGF5U2VhcmNoUmVzdWx0cyhjb25zdHJ1Y3RvciwgbWFwLCBtYXJrZXJUYWJsZSwgc2VhcmNoTG9jYXRpb25Qb3NpdGlvbiwgZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIocGxhY2UuZ2VvbWV0cnkubG9jYXRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1hcC5zZXRab29tKDExKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAvL0Rpc3BsYXkgcmVzdWx0c1xuICAgICAgICBkaXNwbGF5U2VhcmNoUmVzdWx0czogZnVuY3Rpb24oY29uc3RydWN0b3IsIG1hcCwgbWFya2VyVGFibGUsIHBvc2l0aW9uLCBlbGVtZW50LCBzZXR0aW5ncyl7XG4gICAgICAgICAgICB2YXIgc2lkZWJhckl0ZW07XG4gICAgICAgICAgICB2YXIgc2VhcmNoRGlzdGFuY2UgPSBbXTtcbiAgICAgICAgICAgIHZhciByZXN1bHRzQ291bnRlciA9ICQoZWxlbWVudCkuZmluZCgnLmN0LWdvb2dsZU1hcC0tcmVzdWx0c0NvdW50ZXInKTtcblxuICAgICAgICAgICAgc2lkZWJhckl0ZW0gPSAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXNpZGViYXJJdGVtJyk7XG4gICAgICAgICAgICBzaWRlYmFySXRlbS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgZm9yKHZhciBpPTA7IG1hcmtlclRhYmxlLmxlbmd0aCA+IGk7IGkrKyApe1xuXG4gICAgICAgICAgICAgICAgdmFyIGxhdCA9IG1hcmtlclRhYmxlW2ldLmdldFBvc2l0aW9uKCkubGF0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGxuZyA9IG1hcmtlclRhYmxlW2ldLmdldFBvc2l0aW9uKCkubG5nKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF0bG5nID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsbG5nKTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbURpc3RhbmNlID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuc3BoZXJpY2FsLmNvbXB1dGVEaXN0YW5jZUJldHdlZW4ocG9zaXRpb24sIGxhdGxuZykvMTAwMDtcbiAgICAgICAgICAgICAgICBpZiggaXRlbURpc3RhbmNlIDwgc2V0dGluZ3Muc2lkZWJhci5zZWFyY2hCb3guc2VhcmNoUmFkaXVzKXtcbiAgICAgICAgICAgICAgICAgICAgbWFya2VyVGFibGVbaV0uZGlzdGFuY2UgPSBpdGVtRGlzdGFuY2UudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRGlzdGFuY2UucHVzaChtYXJrZXJUYWJsZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoRGlzdGFuY2Uuc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgICAgICAgICAgICB2YXIgYTE9IHBhcnNlRmxvYXQoYS5kaXN0YW5jZSwgMTApLCBiMT0gcGFyc2VGbG9hdChiLmRpc3RhbmNlLCAxMCk7XG4gICAgICAgICAgICAgICAgeyByZXR1cm4gYTEgLSBiMTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IodmFyIGo9MDsgc2VhcmNoRGlzdGFuY2UubGVuZ3RoID4gajsgaisrICl7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IuY3JlYXRlU2lkZWJhckJ1dHRvbnMobWFwLCBzZWFyY2hEaXN0YW5jZVtqXSwgZWxlbWVudCwgc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZChcIi5jdC1nb29nbGVNYXAtLXNpZGViYXJJdGVtOm50aC1jaGlsZChcIisoaisxKStcIilcIikuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2N0LWdvb2dsZU1hcC0tc2lkZWJhckl0ZW1EaXN0YW5jZSc+XCIrc2VhcmNoRGlzdGFuY2Vbal0uZGlzdGFuY2UrXCIga208L3NwYW4+XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0c0NvdW50ZXIuaHRtbCgnJyk7XG4gICAgICAgICAgICByZXN1bHRzQ291bnRlci5hcHBlbmQoXCJJdGVtc1wiK1wiPHNwYW4gY2xhc3M9J2N0LWdvb2dsZU1hcC0taXRlbUNvdW50ZXInPlwiK3NlYXJjaERpc3RhbmNlLmxlbmd0aCtcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5yZXN1bHRzSW5QYWdlKGNvbnN0cnVjdG9yLCBlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vVGhpcyBmdW5jdGlvbiBtYWtlcyBhbGwgcGFnZXMgb2YgcmVzdWx0cyB3aXRoIHBhZ2luYXRpb24sIGV4dGVuZHMgZGlzcGxheVNlYXJjaFJlc3VsdHMgZnVuY3Rpb24uXG4gICAgICAgIHJlc3VsdHNJblBhZ2U6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yLCBlbGVtZW50LCBzZXR0aW5ncyl7XG4gICAgICAgICAgICB2YXIgcGFnZVNpemUgPSBzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMucGFnZVNpemU7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSBzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMuY3VycmVudFBhZ2U7XG4gICAgICAgICAgICB2YXIgcGFnZUNvdW50ZXIgPSAxO1xuICAgICAgICAgICAgdmFyIHNpZGViYXJSZXN1bHRzID0gJChlbGVtZW50KS5maW5kKCcuY3QtZ29vZ2xlTWFwLS1yZXN1bHRzJyk7XG4gICAgICAgICAgICB2YXIgcGFnZU5hdiA9IFwiPHVsIGNsYXNzPSdOYXZpZ2F0aW9uJz5cIjtcbiAgICAgICAgICAgIHZhciBwYWdlTmF2UGFnZXMgPSBcIjxsaSBjbGFzcz0ncGFnaW5hdGlvbkNvdW50ZXInPlwiO1xuXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvci5zaWRlYmFyQ2xlYXIocGFnZUNvdW50ZXIsIGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uU3R5bGUgIT0gMSl7XG4gICAgICAgICAgICAgICAgcGFnZU5hdlBhZ2VzICs9IFwiPC9saT5cIjtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHBhZ2VOYXZQYWdlcyArPSBcIjxhIHJlbD0nMScgY2xhc3M9J05hdlBhZ2UnPlwiKzErXCI8L2E+XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNpZGViYXJSZXN1bHRzLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgICAgICAgICBpZihpIDwgcGFnZUNvdW50ZXIqcGFnZVNpemUgJiYgaSA+PSAocGFnZUNvdW50ZXItMSkqcGFnZVNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInBhZ2VcIitwYWdlQ291bnRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwicGFnZVwiKyhwYWdlQ291bnRlcisxKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb25TdHlsZSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VOYXZQYWdlcyArPSBcIjxhIHJlbD0nXCIrKHBhZ2VDb3VudGVyKzEpK1wiJyBjbGFzcz0nTmF2UGFnZSc+XCIrKHBhZ2VDb3VudGVyKzEpK1wiPC9hPlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhZ2VDb3VudGVyICsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvblN0eWxlID09IDEpe1xuICAgICAgICAgICAgICAgIHBhZ2VOYXZQYWdlcyArPSBcIjwvbGk+XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNob3cvaGlkZSB0aGUgYXBwcm9wcmlhdGUgcmVnaW9uc1xuICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICBzaWRlYmFyUmVzdWx0cy5jaGlsZHJlbihcIi5wYWdlXCIrY3VycmVudFBhZ2UpLnNob3coKTtcblxuICAgICAgICAgICAgaWYocGFnZUNvdW50ZXIgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9CdWlsZCBwYWdlciBuYXZpZ2F0aW9uXG5cbiAgICAgICAgICAgIHZhciBpID0gMTtcblxuICAgICAgICAgICAgcGFnZU5hdiArPSBcIjxsaSBjbGFzcz0nTmF2aWdhdGlvblByZXYgTmF2aWdhdGlvbkRpc2FibGUgTmF2aWdhdGlvblwiK2krXCInPjxhIHJlbD0nXCIraStcIic+XCIrXCI8L2E+PC9saT5cIjtcbiAgICAgICAgICAgIHBhZ2VOYXYgKz0gcGFnZU5hdlBhZ2VzO1xuICAgICAgICAgICAgcGFnZU5hdiArPSBcIjxsaSBjbGFzcz0nTmF2aWdhdGlvbk5leHQgTmF2aWdhdGlvblwiKyhpKzEpK1wiJz48YSByZWw9J1wiKyhpKzEpK1wiJyA+XCIrXCI8L2E+PC9saT5cIjtcbiAgICAgICAgICAgIHBhZ2VOYXYgKz0gXCI8L3VsPlwiO1xuXG4gICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXNpZGViYXInKS5hcHBlbmQocGFnZU5hdik7XG5cbiAgICAgICAgICAgIGNvbnN0cnVjdG9yLnBhZ2luYXRpb24oY29uc3RydWN0b3IsIHNpZGViYXJSZXN1bHRzLCBwYWdlQ291bnRlciwgcGFnZVNpemUsIGN1cnJlbnRQYWdlLCBlbGVtZW50LCBzZXR0aW5ncyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vQ3JlYXRlIHBhZ2luYXRpb24sIGV4dGVuZHMgcmVzdWx0c0luUGFnZSBmdW5jdGlvblxuICAgICAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbihjb25zdHJ1Y3Rvciwgc2lkZWJhclJlc3VsdHMsIHBhZ2VDb3VudGVyLCBwYWdlU2l6ZSwgY3VycmVudFBhZ2UsIGVsZW1lbnQsIHNldHRpbmdzKXtcbiAgICAgICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgICAgIHZhciBrID0gMTtcbiAgICAgICAgICAgIHZhciBnb1RvUGFnZTtcbiAgICAgICAgICAgIHZhciBwYWdpbmF0aW9uQ291bnRlciA9IDE7XG4gICAgICAgICAgICB2YXIgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50ID0gJChlbGVtZW50KS5maW5kKCcucGFnaW5hdGlvbkNvdW50ZXInKTtcbiAgICAgICAgICAgIHZhciBOYXZpZ2F0aW9uUHJldiA9ICQoZWxlbWVudCkuZmluZCgnLk5hdmlnYXRpb25QcmV2Jyk7XG4gICAgICAgICAgICB2YXIgTmF2aWdhdGlvbk5leHQgPSAkKGVsZW1lbnQpLmZpbmQoJy5OYXZpZ2F0aW9uTmV4dCcpO1xuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uU3R5bGUgPT0gMil7XG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IuY291bnRlckVsZW1lbnRzKHNpZGViYXJSZXN1bHRzLCBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQsIHBhZ2VDb3VudGVyLCBwYWdlU2l6ZSwgY3VycmVudFBhZ2UsIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5wYWdpbmF0aW9uU3R5bGUgPT0gMSl7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA8IHBhZ2luYXRpb25Db3VudGVyKnNldHRpbmdzLnNpZGViYXIucmVzdWx0cy5wYWdpbmF0aW9uSXRlbXMgJiYgaSA+PSAocGFnaW5hdGlvbkNvdW50ZXItMSkqc2V0dGluZ3Muc2lkZWJhci5yZXN1bHRzLnBhZ2luYXRpb25JdGVtcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwicGFnaW5hdGlvblBhZ2VcIitwYWdpbmF0aW9uQ291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcInBhZ2luYXRpb25QYWdlXCIrKHBhZ2luYXRpb25Db3VudGVyKzEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyID0gcGFnaW5hdGlvbkNvdW50ZXIgKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyRWxlbWVudC5jaGlsZHJlbihcIi5wYWdpbmF0aW9uUGFnZVwiK2N1cnJlbnRQYWdlKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKFwiLk5hdlBhZ2VbcmVsPSdcIitjdXJyZW50UGFnZStcIiddXCIpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLk5hdlBhZ2UnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3aGF0UGFnZSA9ICQodGhpcykuYXR0cigncmVsJyk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBnb1RvUGFnZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmKHdoYXRQYWdlIDwgaSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpID0gd2hhdFBhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBOYXZpZ2F0aW9uUHJldi50cmlnZ2VyKFwiY2xpY2tcIik7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHdoYXRQYWdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgTmF2aWdhdGlvbk5leHQudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLk5hdmlnYXRpb25QcmV2Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKGdvVG9QYWdlID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyUmVzdWx0cy5jaGlsZHJlbigpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuZmluZChcIi5wYWdlXCIraSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBpZihpPT0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ05hdmlnYXRpb25EaXNhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgTmF2aWdhdGlvbk5leHQucmVtb3ZlQ2xhc3MoJ05hdmlnYXRpb25EaXNhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGdvVG9QYWdlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyUmVzdWx0cy5maW5kKFwiLnBhZ2VcIitpKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaT09Mil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnTmF2aWdhdGlvbkRpc2FibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIE5hdmlnYXRpb25OZXh0LnJlbW92ZUNsYXNzKCdOYXZpZ2F0aW9uRGlzYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGktMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXJSZXN1bHRzLmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuZmluZChcIi5wYWdlXCIraSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnBhZ2luYXRpb25TdHlsZSAhPSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyRWxlbWVudC5jaGlsZHJlbigpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyRWxlbWVudC5jaGlsZHJlbihcIi5wYWdpbmF0aW9uQ291bnRcIitpKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaTxrKnNldHRpbmdzLnNpZGViYXIucmVzdWx0cy5wYWdpbmF0aW9uSXRlbXMgJiYgaSA9PSAoay0xKSpzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMucGFnaW5hdGlvbkl0ZW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrPWstMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKFwiLnBhZ2luYXRpb25QYWdlXCIraykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaTxrKnNldHRpbmdzLnNpZGViYXIucmVzdWx0cy5wYWdpbmF0aW9uSXRlbXMgJiYgaSA+PSAoay0xKSpzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMucGFnaW5hdGlvbkl0ZW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQuY2hpbGRyZW4oXCIucGFnaW5hdGlvblBhZ2VcIitrKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGs9ay0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyRWxlbWVudC5jaGlsZHJlbihcIi5wYWdpbmF0aW9uUGFnZVwiK2spLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmZpbmQoXCIuTmF2UGFnZVtyZWw9J1wiK2krXCInXVwiKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoZWxlbWVudCkuZmluZCgnLk5hdmlnYXRpb25OZXh0Jykub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKGdvVG9QYWdlID09IHRydWUpe1xuICAgICAgICAgICAgICAgICAgICBzaWRlYmFyUmVzdWx0cy5jaGlsZHJlbigpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuZmluZChcIi5wYWdlXCIraSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBpZihpPT1wYWdlQ291bnRlcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdOYXZpZ2F0aW9uRGlzYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIE5hdmlnYXRpb25QcmV2LnJlbW92ZUNsYXNzKCdOYXZpZ2F0aW9uRGlzYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBnb1RvUGFnZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKGk9PXBhZ2VDb3VudGVyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBwYWdlQ291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXJSZXN1bHRzLmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuZmluZChcIi5wYWdlXCIraSkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpPT1wYWdlQ291bnRlci0xKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdOYXZpZ2F0aW9uRGlzYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgTmF2aWdhdGlvblByZXYucmVtb3ZlQ2xhc3MoJ05hdmlnYXRpb25EaXNhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpPSBwYXJzZUludCgoaSksIDEwKSsxO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhclJlc3VsdHMuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyUmVzdWx0cy5maW5kKFwiLnBhZ2VcIitpKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucGFnaW5hdGlvblN0eWxlICE9IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKFwiLnBhZ2luYXRpb25Db3VudFwiK2kpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpPGsqc2V0dGluZ3Muc2lkZWJhci5yZXN1bHRzLnBhZ2luYXRpb25JdGVtcyAmJiBpID49IChrLTEpKnNldHRpbmdzLnNpZGViYXIucmVzdWx0cy5wYWdpbmF0aW9uSXRlbXMgfHwgaT09aypzZXR0aW5ncy5zaWRlYmFyLnJlc3VsdHMucGFnaW5hdGlvbkl0ZW1zKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKFwiLnBhZ2luYXRpb25QYWdlXCIraykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgayArKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ291bnRlckVsZW1lbnQuY2hpbGRyZW4oKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKFwiLnBhZ2luYXRpb25QYWdlXCIraykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKFwiLk5hdlBhZ2VbcmVsPSdcIitpK1wiJ11cIikuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LFxuICAgICAgICAvL0NvdW50IGhvdyBtdWNoIGl0ZW1zIGlzIGZvdW5kLCBleHRlbmRzIHBhZ2luYXRpb24gZnVuY3Rpb25cbiAgICAgICAgY291bnRlckVsZW1lbnRzOiBmdW5jdGlvbihzaWRlYmFyUmVzdWx0cywgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LCBwYWdlQ291bnRlciwgcGFnZVNpemUsIGN1cnJlbnRQYWdlLCBlbGVtZW50KXtcbiAgICAgICAgICAgIHZhciB0YWJsZVJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgcGFnZUNvdW50ZXIgPiBqIDsgaisrKXtcbiAgICAgICAgICAgICAgICB0YWJsZVJlc3VsdHMucHVzaCgkKGVsZW1lbnQpLmZpbmQoJy5wYWdlJysoMStqKSkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZih0YWJsZVJlc3VsdHNbal0+MSl7XG4gICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db3VudGVyRWxlbWVudC5hcHBlbmQoXCI8c3BhbiBjbGFzcz0ncGFnaW5hdGlvbkNvdW50XCIrKGorMSkrXCInPlwiKygxK2oqcGFnZVNpemUpK1wiIC0gXCIrICh0YWJsZVJlc3VsdHNbal0raipwYWdlU2l6ZSkrXCIgb2YgXCIrc2lkZWJhclJlc3VsdHMuY2hpbGRyZW4oKS5sZW5ndGgrXCI8L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmFwcGVuZChcIjxzcGFuIGNsYXNzPSdwYWdpbmF0aW9uQ291bnRcIisoaisxKStcIic+XCIrKHRhYmxlUmVzdWx0c1tqXStqKnBhZ2VTaXplKStcIiBvZiBcIitzaWRlYmFyUmVzdWx0cy5jaGlsZHJlbigpLmxlbmd0aCtcIjwvc3Bhbj5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFnaW5hdGlvbkNvdW50ZXJFbGVtZW50LmNoaWxkcmVuKCkuaGlkZSgpO1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKFwiLnBhZ2luYXRpb25Db3VudFwiK2N1cnJlbnRQYWdlKS5zaG93KCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8vQ3JlYXRlIHNlbGVjdCB3aXRoIG11bHRpcGxlIGpzb24gZmlsZXNcbiAgICAgICAgY3JlYXRlU2VsZWN0U2VjdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgc2V0dGluZ3Mpe1xuICAgICAgICAgICAgdmFyIGRpZkZpbGVzID0gc2V0dGluZ3Muc2lkZWJhci5zZWxlY3RTZWN0aW9uLmRpZkZpbGVzO1xuICAgICAgICAgICAgdmFyIHNpZGViYXJTZWxlY3QgPSAkKGVsZW1lbnQpLmZpbmQoJy5jdC1nb29nbGVNYXAtLXNlbGVjdCcpO1xuICAgICAgICAgICAgZm9yKHZhciBrID0gMDsgZGlmRmlsZXMubGVuZ3RoID4gazsgaysrKXtcbiAgICAgICAgICAgICAgICBzaWRlYmFyU2VsZWN0LmZpbmQoJy5kcm9wZG93bi1tZW51JykuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAvLyBcIjxvcHRpb24gdmFsdWU9J1wiK2RpZkZpbGVzW2tdWzFdK1wiJz5cIitkaWZGaWxlc1trXVswXStcIjwvb3B0aW9uPlwiXG4gICAgICAgICAgICAgICAgICAgICc8bGkgZGF0YS12YWx1ZT1cIicgKyBkaWZGaWxlc1trXVsxXSArICdcIj4nICsgZGlmRmlsZXNba11bMF0gKyAnPC9saT4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy9DbGVhciBzaWRlYmFyXG4gICAgICAgIHNpZGViYXJDbGVhcjogZnVuY3Rpb24ocGFnZUNvdW50ZXIsIGVsZW1lbnQpe1xuICAgICAgICAgICAgJChlbGVtZW50KS5maW5kKCcuTmF2aWdhdGlvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcGFnZUNvdW50ZXIgPSAxO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAgIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAgICQuZm5bIHBsdWdpbk5hbWUgXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggISQuZGF0YSggdGhpcywgXCJwbHVnaW5fXCIgKyBwbHVnaW5OYW1lICkgKSB7XG4gICAgICAgICAgICAgICAgJC5kYXRhKCB0aGlzLCBcInBsdWdpbl9cIiArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
