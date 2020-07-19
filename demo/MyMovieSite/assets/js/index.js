/*
	AUTHOR: Osvaldas Valutis, www.osvaldas.info
*/
(function($, window, document, undefined) {
    var isTouch = 'ontouchstart' in window,
        eStart = isTouch ? 'touchstart' : 'mousedown',
        eMove = isTouch ? 'touchmove' : 'mousemove',
        eEnd = isTouch ? 'touchend' : 'mouseup',
        eCancel = isTouch ? 'touchcancel' : 'mouseup',
        secondsToTime = function(secs) {
            var hours = Math.floor(secs / 3600),
                minutes = Math.floor(secs % 3600 / 60),
                seconds = Math.ceil(secs % 3600 % 60);
            return (hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0' + hours + ':' : hours + ':') + (minutes.toString().length < 2 ? '0' + minutes : minutes) + ':' + (seconds.toString().length < 2 ? '0' + seconds : seconds);
        },
        canPlayType = function(file) {
            var audioElement = document.createElement('audio');
            return !!(audioElement.canPlayType && audioElement.canPlayType('audio/' + file.split('.').pop().toLowerCase() + ';').replace(/no/, ''));
        };

    $.fn.audioPlayer = function(params) {
        var params = $.extend({
                classPrefix: 'audioplayer',
                strPlay: '',
                strPause: '',
                strVolume: ''
            }, params),
            cssClass = {},
            cssClassSub = {
                playPause: 'playpause',
                playing: 'playing',
                time: 'time',
                timeCurrent: 'time-current',
                timeDuration: 'time-duration',
                bar: 'bar',
                barLoaded: 'bar-loaded',
                barPlayed: 'bar-played',
                volume: 'volume',
                volumeButton: 'volume-button',
                volumeAdjust: 'volume-adjust',
                noVolume: 'novolume',
                mute: 'mute',
                mini: 'mini'
            };

        for (var subName in cssClassSub)
            cssClass[subName] = params.classPrefix + '-' + cssClassSub[subName];

        this.each(function() {
            if ($(this).prop('tagName').toLowerCase() != 'audio')
                return false;

            var $this = $(this),
                audioFile = $this.attr('src'),
                isAutoPlay = $this.get(0).getAttribute('autoplay'),
                isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
                isLoop = $this.get(0).getAttribute('loop'),
                isLoop = isLoop === '' || isLoop === 'loop' ? true : false,
                isSupport = false;

            if (typeof audioFile === 'undefined') {
                $this.find('source').each(function() {
                    audioFile = $(this).attr('src');
                    if (typeof audioFile !== 'undefined' && canPlayType(audioFile)) {
                        isSupport = true;
                        return false;
                    }
                });
            } else if (canPlayType(audioFile)) isSupport = true;

            var thePlayer = $('<div class="' + params.classPrefix + '">' + (isSupport ? $('<div>').append($this.eq(0).clone()).html() : '<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() + '" loop="' + isLoop.toString() + '" />') + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>'),
                theAudio = isSupport ? thePlayer.find('audio') : thePlayer.find('embed'),
                theAudio = theAudio.get(0);

            if (isSupport) {
                thePlayer.find('audio').css({
                    'width': 0,
                    'height': 0,
                    'visibility': 'hidden'
                });
                thePlayer.append('<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div><div class="' + cssClass.volume + '"><div class="' + cssClass.volumeButton + '" title="' + params.strVolume + '"><a href="#">' + params.strVolume + '</a></div><div class="' + cssClass.volumeAdjust + '"><div><div></div></div></div></div>');

                var theBar = thePlayer.find('.' + cssClass.bar),
                    barPlayed = thePlayer.find('.' + cssClass.barPlayed),
                    barLoaded = thePlayer.find('.' + cssClass.barLoaded),
                    timeCurrent = thePlayer.find('.' + cssClass.timeCurrent),
                    timeDuration = thePlayer.find('.' + cssClass.timeDuration),
                    volumeButton = thePlayer.find('.' + cssClass.volumeButton),
                    volumeAdjuster = thePlayer.find('.' + cssClass.volumeAdjust + ' > div'),
                    volumeDefault = 0,
                    adjustCurrentTime = function(e) {
                        theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                        theAudio.currentTime = Math.round((theAudio.duration * (theRealEvent.pageX - theBar.offset().left)) / theBar.width());
                    },
                    adjustVolume = function(e) {
                        theRealEvent = isTouch ? e.originalEvent.touches[0] : e;
                        theAudio.volume = Math.abs((theRealEvent.pageX - volumeAdjuster.offset().left) / volumeAdjuster.width());
                    },
                    updateLoadBar = setInterval(function() {
                      if (theAudio.buffered.length > 0) {
                        barLoaded.width((theAudio.buffered.end(0) / theAudio.duration) * 100 + '%');
                        if (theAudio.buffered.end(0) >= theAudio.duration)
                            clearInterval(updateLoadBar);
                      }
                    }, 100);

                var volumeTestDefault = theAudio.volume,
                    volumeTestValue = theAudio.volume = 0.111;
                if (Math.round(theAudio.volume * 1000) / 1000 == volumeTestValue) theAudio.volume = volumeTestDefault;
                else thePlayer.addClass(cssClass.noVolume);

                timeDuration.html('&hellip;');
                timeCurrent.text(secondsToTime(0));

                theAudio.addEventListener('loadeddata', function() {
                    timeDuration.text(secondsToTime(theAudio.duration));
                    volumeAdjuster.find('div').width(theAudio.volume * 100 + '%');
                    volumeDefault = theAudio.volume;
                });

                theAudio.addEventListener('timeupdate', function() {
                    timeCurrent.text(secondsToTime(theAudio.currentTime));
                    barPlayed.width((theAudio.currentTime / theAudio.duration) * 100 + '%');
                });

                theAudio.addEventListener('volumechange', function() {
                    volumeAdjuster.find('div').width(theAudio.volume * 100 + '%');
                    if (theAudio.volume > 0 && thePlayer.hasClass(cssClass.mute)) thePlayer.removeClass(cssClass.mute);
                    if (theAudio.volume <= 0 && !thePlayer.hasClass(cssClass.mute)) thePlayer.addClass(cssClass.mute);
                });

                theAudio.addEventListener('ended', function() {
                    thePlayer.removeClass(cssClass.playing);
                });

                theBar.on(eStart, function(e) {
                        adjustCurrentTime(e);
                        theBar.on(eMove, function(e) {
                            adjustCurrentTime(e);
                        });
                    })
                    .on(eCancel, function() {
                        theBar.unbind(eMove);
                    });

                volumeButton.on('click', function() {
                    if (thePlayer.hasClass(cssClass.mute)) {
                        thePlayer.removeClass(cssClass.mute);
                        theAudio.volume = volumeDefault;
                    } else {
                        thePlayer.addClass(cssClass.mute);
                        volumeDefault = theAudio.volume;
                        theAudio.volume = 0;
                    }
                    return false;
                });

                volumeAdjuster.on(eStart, function(e) {
                        adjustVolume(e);
                        volumeAdjuster.on(eMove, function(e) {
                            adjustVolume(e);
                        });
                    })
                    .on(eCancel, function() {
                        volumeAdjuster.unbind(eMove);
                    });
            } else thePlayer.addClass(cssClass.mini);

            if (isAutoPlay) thePlayer.addClass(cssClass.playing);

            thePlayer.find('.' + cssClass.playPause).on('click', function() {
                if (thePlayer.hasClass(cssClass.playing)) {
                    $(this).attr('title', params.strPlay).find('a').html(params.strPlay);
                    thePlayer.removeClass(cssClass.playing);
                    isSupport ? theAudio.pause() : theAudio.Stop();
                } else {
                    $(this).attr('title', params.strPause).find('a').html(params.strPause);
                    thePlayer.addClass(cssClass.playing);
                    isSupport ? theAudio.play() : theAudio.Play();
                }
                return false;
            });

            $this.replaceWith(thePlayer);
        });
        return this;
    };
})(jQuery, window, document);
















/* Video Card */

$(window).load(function() {
  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});















(function (document, window, $)
{	
	/*=================================
	=            Polyfills            =
	=================================*/
	
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

	if (!Function.prototype.bind)
	{
		Function.prototype.bind = function (context)
		{
			var fn = this;

			return function ()
			{
				return fn.apply(context, arguments);
			};
		};
	}

	function debounce (fn, delay) {
	  var timer = null;
	  return function () {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      fn.apply(context, args);
	    }, delay);
	  };
	}

	/*==============================
	=            Plugin            =
	==============================*/
	
	function Parallax (el, options)
	{
		this.el  = el;
		this.$el = $(el);

		this.animationFrame    = null;
		this.scrolling         = false;

		this.currentTransforms = [];
		this.firstTops         = [];
		this.speeds            = [];

		this._setup();
		this._events();
	}

	Parallax.prototype._setup = function ()
	{	
		this.$window = $(window);

		this.lastScrollTop = null;

		this._cacheValues();
		this._parallax();
	};

	Parallax.prototype._events = function ()
	{
		this.$window.on('scroll.parallax.begin', this._beginScroll.bind(this));

		this.$window.on('scroll.parallax.debounce', debounce(function ()
		{
			cancelAnimationFrame(this.animationFrame);
			this.scrolling = false;
			this.$window.on('scroll.parallax.begin', this._beginScroll.bind(this));

		}.bind(this), 30));

		this.$window.on('resize.parallax', debounce(this.refresh.bind(this), 30));
	};

	Parallax.prototype._beginScroll = function ()
	{
		if (!this.scrolling)
		{
			this._go();
			this.scrolling = true;
			this.$window.off('scroll.parallax.begin');			
		}
	};

	Parallax.prototype._cacheValues = function ()
	{	
		var self = this;

		this.$el.each(function (index, el)
		{	
			var $this            = $(this),
				currentTransform = self.currentTransforms[index],
				offset           = $this.offset().top,
				top              = (currentTransform !== undefined)? offset - currentTransform : offset;

			self.firstTops[index] = top;
			self.speeds[index]    = $this.attr('data-speed');
		});
	};

	Parallax.prototype._go = function ()
	{	
		this.animationFrame = requestAnimationFrame(this._go.bind(this));
		this._parallax();
	};

	Parallax.prototype._isInView = function (el)
	{
	    var bounds = el.getBoundingClientRect();

	    return bounds.top < window.innerHeight && bounds.bottom > 0;
	};

	Parallax.prototype._parallax = function ()
	{
        var viewportTop = this.$window.scrollTop();

        if (viewportTop === this.lastScrollTop)
        {
        	return false;
        }

        this.lastScrollTop = viewportTop;
 		
 		for (var i = 0, l = this.$el.length; i < l; i++)
 		{
 			var el = this.$el[i];

			if (!this._isInView(el))
			{
				continue;
			}

			var $el = $(el);

			this.currentTransforms[i] = (viewportTop - this.firstTops[i]) * this.speeds[i];
				
			$el.css('transform','translate3d(0, ' + this.currentTransforms[i] +'px,0)'); 			
 		}
	};

	Parallax.prototype.refresh = function ()
	{	
		this.lastScrollTop = null;

		this._cacheValues();
		this._parallax();
	};

	function Plugin (options)
	{	
		var args = Array.prototype.slice.call(arguments, 1);

		var el   = $(this),
			data = el.data('parallax');

		if (!data)
		{
			el.data('parallax', (data = new Parallax(this, options)));
		}

		if (typeof options === "string")
		{
		    if (data[options] && options[0] !== '_')
		    {
		        data[options].apply(data, args);
		    }
		}		
	}	

	$.fn.jQueryParallax = Plugin;

}(document, window, jQuery));








/* Parralax */

        $('[data-parallax]').jQueryParallax();


/* Audio */

      $(function() {
        $('audio').audioPlayer();
      });


/* Pop Up */

 var delay_popup = 15000;
          var msg_pop = document.getElementById('msg_pop'); setTimeout("document.getElementById('msg_pop').style.display='block';document.getElementById('msg_pop').className += 'fadeIn';", delay_popup);


/* Aria Tabs */

/*
MIT License

Copyright (c) 2017 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  }
}(function ($, window, document) {
  'use strict';
  var pluginName = 'ariaTabs', // the name of the plugin
    a = {
      aHi: 'aria-hidden',
      aSe: 'aria-selected',
      aCs: 'aria-controls',
      aLab: 'aria-labelledby',
      aOr: 'aria-orientation',
      tbI: 'tabindex',
      r: 'role',
      t: 'true',
      f: 'false'
    },
    count = 0,
    win = $(window);


  //-----------------------------------------
  //Private functions
  /*
   * set id of the element passed along
   * if the element does not have one
   * and return the id of the element
   * If no suffix is passed, then do not set it
   */
  function setId(element, idPrefix, idSuffix) {
    idSuffix = idSuffix !== undefined ? idSuffix : '';

    if (!element.is('[id]')) {
      element.attr('id', idPrefix + idSuffix);
    }
    return element.attr('id');
  }


  /*
   * Check if any of the four modifiers keys are pressed.
   */
  function checkForModifierKeys(event) {
    if (!event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      //none is pressed
      return true;
    }
    return false;
  }


  /*
   *
   */
  function checkBreakpoint(win, breakpoint) {
    if (win.width() >= breakpoint) {
      return true;
    }
    return false;
  }


  //-----------------------------------------
  // The actual plugin constructor
  function AriaTabs(element, userSettings) {
    var self = this;

    self.element = $(element); //the tabs group element
    self.settings = $.extend({}, $.fn[pluginName].defaultSettings, userSettings);
    self.elementId = setId(self.element, self.settings.tabGroupIdPrefix, count); // the id of the element
    self.nav = self.element.find('.' + self.settings.navClass); //the nav, container of the tablist
    self.list = self.element.find('.' + self.settings.listClass); //the list
    self.panelsContainer = self.element.find('.' + self.settings.panelsContainerClass); //the container of all tabpanels
    self.elements = {
      listItems: self.list.find('.' + self.settings.listItemClass), // the list items
      btn: self.list.find('.' + self.settings.btnClass), //the tab buttons
      panel: self.panelsContainer.find('.' + self.settings.panelClass),
      content: self.panelsContainer.find('.' + self.settings.contentClass)
    };
    self.elementsLenght = self.elements.panel.length; // the number of tabpanels in the tab group
    self.selectedTab = 0; //save the index of the selected tab


    //call init
    self.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(AriaTabs.prototype, {
    init: function () {
      var self = this,
        settings = self.settings,
        elements = self.elements,
        btn = elements.btn,
        panel = elements.panel;

      //Add roles and attributes to the groups elements
      self.nav.attr(a.r, 'tablist');
      btn.attr(a.r, 'tab');
      self.list.attr(a.r, 'none presentation');
      elements.listItems.attr(a.r, 'none presentation');

      /*
       * Check value of option verticalMode and
       * set aria-orientation to vertical, if verticalMode is enabled
       */
      if (settings.verticalMode) {
        self.nav.attr(a.aOr, 'vertical');
      }

      /*
       * We need to check if each tab and each tabpanel has an id,
       * if not we have to set it with scripting.
       * The ids of this elements are necessary to expose relationship between this elements
       * by referencing this in aria-labelledby and aria-controls
       */
      btn.each(function (index) {
        setId(btn.eq(index), self.elementId + '__btn--', count);
        setId(panel.eq(index), self.elementId + '__panel--', count);

        //reference the tab and tabpanel elements to expose relationship
        btn.eq(index).attr(a.aCs, panel.eq(index).attr('id'));
        panel.eq(index).attr(a.aLab, btn.eq(index).attr('id'));
      });


      /*
       * Set the role of the content of each panel:
       * More informations about the roles model here: https://www.w3.org/TR/wai-aria-1.1/
       * Because each panel can have a different role,
       * the option contentRole accepts both a string or an array of strings,
       * wich is used to map the role to each panel.
       * We need to check if an array or a string is passed,
       * and then set the roles accordingly.
       */
      if (typeof settings.contentRole === 'string') {
        elements.content.attr(a.r, settings.contentRole);
      } else if (Array.isArray(settings.contentRole)) {
        elements.content.each(function (index) {
          $(this).attr(a.r, settings.contentRole[index]);
        });
      }


      /*
       * Now we have to init the widget by hiding all panels except one.
       * We do this by performing a direct call to the hide and show methods.
       */
      btn.each(function (index) {
        if (index > 0) {
          self.hide(index);
        } else {
          self.show(index, false);
        }
      });


      /*
       * Bind event handlers on widget buttons.
       * We use delegated events to improve code performance
       */
      self.element.on('click.' + pluginName + '.count', '.' + settings.btnClass, function () {
        var tabIndex = btn.index($(this));

        //Select the new tab, only if not yet selected
        if (tabIndex !== self.selectedTab) {
          self.toggle(tabIndex, true);
        }
      });


      /*
       * Bind keydown event for keyboard navigation.
       * As before, we use delegated events and namespaces
       * for the implemantation of keys navigation
       */
      self.element.on('keydown.' + pluginName + '.' + count, '.' + settings.btnClass, function (event) {
        self.keyboardNavigation(event);
      });


      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.initialised', [self]);


      //increment count by 1
      count = count + 1;
    },
    toggle: function (tabIndex, animate) {
      var self = this;

      self.hide(self.selectedTab);

      self.show(tabIndex, animate);
    },
    keyboardNavigation: function (event) {
      var self = this,
        elementsLenght = self.elementsLenght,
        focussedElementIndex = self.selectedTab, //placeholder variable for the index of the tab button
        pressedKey = event.keyCode, // the code of the pressed key
        newTab = 0, // a placeholder for the index of the tab to select
        vertical = self.settings.verticalMode;

      /*
       * Before performing any action we check if any of the four modifier keys
       * has been pressed during the keydown event.
       * If any modifiers keys was pressed, then we interrupt the functions execution.
       */
      if (!checkForModifierKeys(event)) {
        return false;
      }
      /*
       * If no modifeier key was pressed, we can proceed and  retrive
       8 the index of the new tab to select
       * by checking the pressed key and the index of the currenty selected tab
       */
      switch (pressedKey) {
      case 37: //left
        if (focussedElementIndex === 0) {
          newTab = elementsLenght - 1;
        } else {
          newTab = focussedElementIndex - 1;
        }
        break;
      case 39: //right
        if (focussedElementIndex === (elementsLenght - 1)) {
          newTab = 0;
        } else {
          newTab = focussedElementIndex + 1;
        }
        break;
      case 36: //home
        newTab = 0;
        break;
      case 35: //end
        newTab = elementsLenght;
        break;
      case 38: //top
        if (vertical) { //only if acting in vertical mode
          if (focussedElementIndex === 0) {
            newTab = elementsLenght - 1;
          } else {
            newTab = focussedElementIndex - 1;
          }
        } else {
          newTab = false;
        }
        break;
      case 40: //bottom
        if (vertical) { //only if acting in vertical mode
          if (focussedElementIndex === (elementsLenght - 1)) {
            newTab = 0;
          } else {
            newTab = focussedElementIndex + 1;
          }
        } else {
          newTab = false;
        }
        break;
      default:
        newTab = false;
        break;
      }

      /*
       * If the pressed key is one of the navigational key,
       * then we move focus to the new tab and select it.
       */
      if (newTab !== false) {
        event.preventDefault();
        self.elements.btn.eq(newTab).focus();
        self.toggle(newTab, true);
      }
    },
    select: function (tabIndex) {
      var self = this,
        setting = self.settings,
        elements = self.elements;

      //update classes and attributes on button
      elements.btn.eq(tabIndex)
        .addClass(setting.btnSelectedClass)
        .attr(a.tbI, '0')
        .attr(a.aSe, a.t);

      //Update classes and attributes on tabpanel
      elements.panel.eq(tabIndex)
        .addClass(setting.panelSelectedClass)
        .attr(a.aHi, a.f);

      //Update selected tab object
      self.selectedTab = tabIndex;
    },
    deselect: function (tabIndex) {
      var self = this,
        setting = self.settings,
        elements = self.elements;


      //update classes and attributes on button
      elements.btn.eq(tabIndex)
        .removeClass(setting.btnSelectedClass)
        .attr(a.tbI, '-1')
        .attr(a.aSe, a.f);

      //Update classes and attributes on tabpanel
      elements.panel.eq(tabIndex)
        .removeClass(setting.panelSelectedClass)
        .attr(a.aHi, a.t);
    },
    show: function (tabIndex, animate) {
      var self = this,
        fadeSpeed = animate ? self.settings.fadeSpeed : 0;

      //Fade in panel with js, if css transitions are disabled
      if (!self.settings.cssTransitions) {
        self.elements.panel.eq(tabIndex)
          .fadeIn(fadeSpeed);
      }

      //call select to update classes and attributes
      self.select(tabIndex);

      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.select', [self, tabIndex]);
    },
    hide: function (tabIndex) {
      var self = this;

      //Hide tabpanel if css transitions are disabled
      if (!self.settings.cssTransitions) {
        self.elements.panel.eq(tabIndex).hide();
      }

      //call deselect to update classes and attributes
      self.deselect(tabIndex);


      //trigger custom event on window for authors to listen for
      win.trigger(pluginName + '.deselect', [self, tabIndex]);
    },
    methodCaller: function (methodName, methodArg) {
      /*
       * This function is the control center for any method call implemented in the plugin.
       * Because the methods accepts different arguments, the function checks the type of
       * the passed arguments and performs the needed operations in order to make a function call
       */

      var self = this;

      if (typeof methodArg !== 'number') {
        if (typeof methodArg === 'string') {
          /*
           * If the user passes a string we assum this is a jQuery selector.
           * We perform a call to the jQuery function and get the element
           */
          methodArg = $(methodArg);
        }

        if (typeof methodArg === 'object') {
          /*
           * If the user passes an object we assum this is a jQuery obejct.
           * In order to perform a method call,
           * we need to retrive the index of the passed accordion object.
           * The passed element must:
           * - be a single jQuery element object (no collection and non empty),
           * - be a tab (it must have the tab class),
           * - must be a child element of the tablist element,
           */
          if (methodArg.length === 1 &&
            methodArg.hasClass(self.settings.btnClass) &&
            methodArg.closest(self.element).length === 1) {
            methodArg = self.nav.index(methodArg);
          }
        }
      }

      /*
       * Now we have the index of the element and can perform the method call:
       * Currently only toggle can be called as external method.
       * The only accepted value for methodName is 'select'
       * We do not use toggle as method name, because this could be confusing for the author
       */
      if (methodName === 'select') {
        self.toggle(methodArg, true);
      }
    }
  });




  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (userSettings, methodArg) {
    return this.each(function () {
      var self = this;
      /*
       * If following conditions matches, then the plugin must be initialsied:
       * Check if the plugin is instantiated for the first time
       * Check if the argument passed is an object or undefined (no arguments)
       */
      if (!$.data(self, 'plugin_' + pluginName) && (typeof userSettings === 'object' || typeof userSettings === 'undefined')) {
        $.data(self, 'plugin_' + pluginName, new AriaTabs(self, userSettings));
      } else if (typeof userSettings === 'string' && typeof methodArg !== 'undefined') {
        $.data(self, 'plugin_' + pluginName).methodCaller(userSettings, methodArg);
      }
    });
  };


  //Define default settings
  $.fn[pluginName].defaultSettings = {
    tabGroupIdPrefix: 'tab-group--',
    navClass: 'tab-group__tab-nav',
    listClass: 'tab-group__tab-ul',
    listItemClass: 'tab-group__tab-li',
    btnClass: 'tab-group__tab-btn',
    panelsContainerClass: 'tab-group__tabs-cont',
    panelClass: 'tab-group__tabpanel',
    contentClass: 'tab-group__tab-content',
    contentRole: 'document',
    btnSelectedClass: 'tab-group__tab-btn_selected',
    panelSelectedClass: 'tab-group__tabpanel_selected',
    verticalMode: false,
    fadeSpeed: 300,
    cssTransitions: false
  };
}(jQuery, window, document)));


/* Tabs */

    $(document).ready(function() {
      'use strict';
      $(window).on('ariaTabs.initialised', function(event, element) {
        console.log(element + 'init');
      });
      $('.tab-group').ariaTabs({
        contentRole: ['document', 'application', 'document'],
      });
      $(window).on('ariaTabs.select', function(event, element, index) {
        console.log(index);
      });
      $(window).on('ariaTabs.deselect', function(event, element, index) {
        console.log(index);
      });
    });



/* Descripton */

(function ( $ ) {

/* morelines - simple to use, if you need to expand the text by various line - this is it
 *
 * <script>
 *   $(function() {
 *     $('.js-description_readmore').moreLines({
 *       linecount: 2, 
 *       baseclass: 'b-description',
 *       basejsclass: 'js-description',
 *       classspecific: 'readmore',
 *       buttontxtmore: "read more",
 *       buttontxtless: "read less",
 *       animationspeed: 250 
 *     });
 *   });
 * </script>
 * 
 * V.Tsurule
 */
    $.fn.moreLines = function (options) {

    "use strict";

        this.each(function(){

            var element = $(this), 
                textelement = element.find("p"),
                baseclass = "b-morelines_",
                basejsclass = "js-morelines_",
                currentclass = "section",
                singleline = parseFloat(element.css("line-height")),
                auto = 1,
                fullheight = element.innerHeight(),
                settings = $.extend({
                    linecount: auto,
                    baseclass: baseclass,
                    basejsclass: basejsclass,
                    classspecific: currentclass,
                    buttontxtmore: "more lines",
                    buttontxtless: "less lines",
                    animationspeed: auto
                }, options ),
                
                ellipsisclass = settings.baseclass+settings.classspecific+"_ellipsis",
                buttonclass = settings.baseclass+settings.classspecific+"_button",
                wrapcss = settings.baseclass+settings.classspecific+"_wrapper",
                wrapjs = settings.basejsclass+settings.classspecific+"_wrapper",
                wrapper = $("<div>").addClass(wrapcss+ ' ' +wrapjs).css({'max-width': element.css('width')}),
                linescount = singleline * settings.linecount;

            element.wrap(wrapper);

            if (element.parent().not(wrapjs)) {

                if (fullheight > linescount) {

                element.addClass(ellipsisclass).css({'min-height': linescount, 'max-height': linescount, 'overflow': 'hidden'});

                var moreLinesButton = $("<div>", {
                    "class": buttonclass,
                    click: function() {

                        element.toggleClass(ellipsisclass);
                        $(this).toggleClass(buttonclass+'_active');

                        if (element.css('max-height') !== 'none') {
                            element.css({'height': linescount, 'max-height': ''}).animate({height:fullheight}, settings.animationspeed, function () {
                                moreLinesButton.html(settings.buttontxtless);
                            });

                        } else {
                            element.animate({height:linescount}, settings.animationspeed, function () {
                                moreLinesButton.html(settings.buttontxtmore);
                                element.css('max-height', linescount);
                            });
                        }
                    },

                    html: settings.buttontxtmore
                });

                element.after(moreLinesButton);

                }
            }
        });

        return this;
    };

}(jQuery));



/* Description Main */

    $(function() {
      $('.js-description_readmore').moreLines({
        linecount: 3, 
        baseclass: 'b-description',
        basejsclass: 'js-description',
        classspecific: '_readmore',    
        buttontxtmore: "Read More",               
        buttontxtless: "Less",
        animationspeed: 250 
      });
    });



/* Description Wallpaper */

    $(function() {
      $('.js-description_readmore_wallpaper').moreLines({
        linecount: 34, 
        baseclass: 'b-description',
        basejsclass: 'js-description',
        classspecific: '_readmore',    
        buttontxtmore: "More Category",               
        buttontxtless: "Less",
        animationspeed: 250 
      });
    });


/* Description Popular */


    $(function() {
      $('.js-description_readmore_popular').moreLines({
        linecount: 8, 
        baseclass: 'b-description',
        basejsclass: 'js-description',
        classspecific: '_readmore',    
        buttontxtmore: "More Popular",               
        buttontxtless: "Less",
        animationspeed: 250 
      });
    });


/* Parallux Js */
!function(e,t,i,a){"use strict";function n(){for(var e=0,i=["ms","moz","webkit","o"],a=0;a<i.length&&!t.requestAnimationFrame;++a)t.requestAnimationFrame=t[i[a]+"RequestAnimationFrame"],t.cancelAnimationFrame=t[i[a]+"CancelAnimationFrame"]||t[i[a]+"CancelRequestAnimationFrame"];t.requestAnimationFrame||(t.requestAnimationFrame=function(i){var a=(new Date).getTime(),n=Math.max(0,16-(a-e)),o=t.setTimeout(function(){i(a+n)},n);return e=a+n,o}),t.cancelAnimationFrame||(t.cancelAnimationFrame=function(e){clearTimeout(e)})}function o(){return"object"==typeof Modernizr}function r(){if(o()&&Modernizr.csstransforms3d)return!0;if(!t.getComputedStyle)return!1;var e,n=i.createElement("p"),r={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};i.body.insertBefore(n,null);for(var s in r)n.style[s]!==a&&(n.style[s]="translate3d(1px,1px,1px)",e=t.getComputedStyle(n).getPropertyValue(r[s]));return i.body.removeChild(n),e!==a&&e.length>0&&"none"!==e}function s(){var e=t.navigator.userAgent,i=e.indexOf("MSIE ");if(i>0)return parseInt(e.substring(i+5,e.indexOf(".",i)),10);var a=e.indexOf("Trident/");if(a>0){var n=e.indexOf("rv:");return parseInt(e.substring(n+3,e.indexOf(".",n)),10)}var o=e.indexOf("Edge/");return o>0?parseInt(e.substring(o+5,e.indexOf(".",o)),10):!1}function l(t,i){this.element=t,h=!1,this.options=e.extend({},p,i),this._defaults=p,this._name=d,this.init(t)}var m,d="parallux",c=e(t),h=!1,u=!1,f=!1,p={fullHeight:!0,onMobile:"fixed"};t.mobilecheck=function(){var e=!1;return function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0)}(navigator.userAgent||navigator.vendor||t.opera),e},n(),r()&&(u=!0,e("html").addClass("csstransforms3d")),l.prototype={init:function(i){this.options.fullHeight===!1&&e(i).addClass("not-full"),f=t.mobilecheck(),this.updateHeight();var a=this,n=e(i).find("img.cover, video.cover");a.simulateCover(),n.one("load",function(){a.simulateCover(),e(this).fadeIn()}),n.complete&&n.load(),c.bind("orientationchange, resize",function(){f||(a.updateHeight(),a.simulateCover(),e(this).trigger("scroll"))});var o=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),r=null!=navigator.userAgent.match(/iPad/i);if(f||o||e(i).addClass("bg-fixed"),f||r)if(e(i).css("overflow","hidden"),"fixed"===this.options.onMobile)c.scroll(function(){a.updateIndex()}),c.scroll();else if("parallax"===this.options.onMobile&&u){var l=a.render.bind(a);m=setInterval(function(){t.requestAnimationFrame(l)},10)}else e(i).find(".parallux-bg").css("position","absolute");else u?(c.scroll(function(){a.render()}),s()?s()>=11?(e("body").on("mousewheel",function(){event.preventDefault();var e=event.wheelDelta,i=t.pageYOffset;t.scrollTo(0,i-e/4)}),c.scroll()):(e(t).off("scroll"),this.disableParallax()):c.scroll()):this.disableParallax()},disableParallax:function(){e(this.element).removeClass("bg-fixed").addClass("no-parallax")},mobileHandler:function(){},updateIndex:function(){var t=e(this.element),i=t.offset().top,a=c.scrollTop();a+c.height()>=i&&a<=i+t.height()?t.css("z-index",5):t.css("z-index",1)},simulateCover:function(){var t=c.height(),i=c.width(),a=e(this.element).find("img.cover, video.cover");a.css({width:"auto",height:"100%"}),a.width()<i&&a.css({width:"100%","max-height":"initial",height:"auto"}),a.css({width:"100%",height:"auto"}),a.height()<t&&a.css({height:t+"px","max-width":"initial",width:"auto"});var n=-(a.width()-i)/2,o=-(a.height()-t)/2;a.css("transform","translate("+n+"px,"+o+"px)")},updateHeight:function(){var i=e(this.element),a=i.find(".parallux-inner"),n=1+Math.floor(3*Math.random());if(this.options.fullHeight){var r=0;(f||o()&&Modernizr.mq("only screen and (max-width: 1024px)")||t.matchMedia&&t.matchMedia("only screen and (max-width: 1024px)").matches)&&(r=70),i.height(c.height()+r),i.find(".parallux-bg").height(c.height()+r)}else i.find(".parallux-bg").height(i.height());h||(a.hasClass("dark")&&a.addClass("dark-"+n),a.hasClass("light")&&a.addClass("light-"+n),h=!0)},render:function(){var i=e(this.element),a=i.find(".parallux-bg"),n=a.find(".parallux-inner"),o=i.offset().top,r=t.scrollY||t.pageYOffset||0,s=c.scrollTop();if(s+c.height()>=o&&s<=o+i.height()){var l=((r-o)/1.3).toFixed(0)+"px";a.css("transform","translate3d(0,"+(o-r)+"px,0)"),n.css("transform","translate3d(0,"+l+",0)")}else a.css("transform","translate3d(0,100%,0)")}},e.fn[d]=function(t){return this.each(function(){e.data(this,"plugin_"+d)||e.data(this,"plugin_"+d,new l(this,t))})}}(jQuery,window,document);




/* Parallux Script */

            $(function() {
                $(".parallux").parallux(
                    {
                        fullHeight: false,
                        onMobile: 'fixed'
                    }
                );
            });
