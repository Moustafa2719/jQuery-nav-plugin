/**
 * Plugin Name : msNAV
 * Discreption : responsible for adding a side navigation to the page to be a one page with scroll control
 * Version	   : 0.1
 * Date 	   : 26/10/2015
 * Auther	   : Moustafa Ahmed, Mohamed saaed]
 */

jQuery.fn.MSNAV = function(options) {
    // MSNAV default settings:
    var defaults = {
            nav: "",
            currentClass: "",
            elements: [],
            positions: [],
            scrollSpeed: 500
        },
        // the extended options
        settings = $.extend({}, defaults, options),
        // the plugin methods
        METHODS = {
            /**
             * @Method 		: getElementsPositions
             * @Description : set array contain all elements positions
             */
            'getElementsPositions': function() {
                $(settings.elements).each(function(i, ele) {
                    // getthe elements positions
                    settings.positions.push($(ele).position().top);
                    // call append method
                    if (i === settings.elements.length - 1) {
                        METHODS.appendNavigationBullets();
                    }
                });
            },
            /**
             * @Method 		: appendNavigationBullets
             * @Description : create the bullets of the navigation and handle the click event of each one of theme
             */
            'appendNavigationBullets': function() {
                var target = '';
                $(settings.elements).each(function(i, ele) {
                    // append elements
                    $(settings.nav).append("<li><a href='" + ele + "' data-target='" + $(ele).position().top + "'></a></li>");
                    $(settings.nav).find('a').eq(0).addClass(settings.currentClass);
                });

                // handle click events once the append is done
                $(settings.nav).promise().done(function() {
                    $(settings.nav).find('a').each(function(i, ele) {
                        $(ele).on('click', function(event) {
                            // prevent the default pehave of the element
                            event.preventDefault();
                            // set target
                            target = $(ele).data("target");
                            // animate the screen
                            METHODS.animatePageScroll(target, i);
                        });
                    });
                    // handle scrolling method
                    METHODS.handleScrolling();
                });
            },
            /**
             * @Method 		   : animatePageScroll
             * @Description    : animate the screen to the target position
             * @Param {target} : the next position
             * @Param {i}	   : the number of next element 
             */
            'animatePageScroll': function(target, i) {
                // animate the page scroll
                $('html, body').animate({
                    scrollTop: target
                }, settings.scrollSpeed);
            },
            /**
             * @Method 		   : searchInRange
             * @Description    : get the order of the target element by using manual scrolling and active the bullets
             * @Param {value}  : the value of the scroll top position
             */
            'searchInRange': function(value) {
                for (var i = 0; i < settings.positions.length; i++) {
                    var lastIndex = i + 1;
                    if (lastIndex < settings.positions.length) {
                        var start = settings.positions[i],
                            end = settings.positions[lastIndex];
                        if (value >= start && value < end) {
                            $(settings.nav).find('a').removeClass(settings.currentClass);
                            $(settings.nav).find('a').eq(settings.positions.indexOf(start)).addClass(settings.currentClass);
                        }
                    }
                    if (value >= settings.positions[settings.positions.length - 1]) {
                        $(settings.nav).find('a').removeClass(settings.currentClass);
                        $(settings.nav).find('a').last().addClass(settings.currentClass);
                    }
                }
            },
            /**
             * @Method 		   : handleScrolling
             * @Description    : bind the scrollTop value and path it to the searchInRange Method
             */
            'handleScrolling': function() {
                $(document).on('scroll', function(event) {
                    METHODS.searchInRange($(document).scrollTop());
                });
            },
            /**
             * @Method 		   : init
             * @Description    : fire the plugin
             */
            'init': function() {
                return METHODS.getElementsPositions();
            }
        };
    // init the plugin
    METHODS.init();
};