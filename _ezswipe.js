(function() {
	function _droid_swipe(el) {
		function dispatchEvent(name, delta) {
			var settings = {
				"detail" : {
					delta : delta,
					bubbles : false,
					cancelable : true
				}
			};
			var event = new CustomEvent(name, settings);
			el.parentNode.dispatchEvent(event);
			delete event;
		};
		var _child = el.getElementsByClassName("_ezswipe_surface")[0];
		el.ezSwipe = {
			center : {
				x : (_child.clientWidth / 2) - (el.clientWidth / 2),
				y : (_child.clientHeight / 2) - (el.clientHeight / 2)
			},
			timer : null,
			scrolling : false,
			starttime : 0,
			last : {
				x : 0,
				y : 0,
				t : 0
			}
		};
		el.scrollLeft = el.ezSwipe.center.x;
		el.scrollTop = el.ezSwipe.center.y;
		el.ontouchstart = function() {
			//NOTE: touchstart is allways fired.
			//TODO: set initial x,y pos and calc relative values.
		};
		el.onscroll = function(e) {
			//TODO: swipeCancel if edge of scroll surface reached. */
			//TODO: Time still buggy
			//TODO: replace self & this with(el) {}
			if ((el.scrollLeft != el.ezSwipe.center.x) || (el.scrollTop != el.ezSwipe.center.y)) {
				if (!el.ezSwipe.scrolling) {
					var delta = {
						x : 0,
						y : 0,
						t : new Date().getTime()
					};
					el.ezSwipestarttime = delta.t;
					el.ezSwipelast = delta;
					dispatchEvent('swipeStart', delta);
					el.ezSwipe.scrolling = true;
				} else {
					var d = new Date().getTime();
					var delta = {
						x : (el.ezSwipe.center.x - el.scrollLeft) - el.ezSwipelast.x,
						y : (el.ezSwipe.center.y - el.scrollTop) - el.ezSwipelast.y,
						t : (d - el.ezSwipe.starttime) - el.ezSwipelast.t
					};
					el.ezSwipelast = {
						x : el.ezSwipe.center.x - el.scrollLeft,
						y : el.ezSwipe.center.y - el.scrollTop,
						t : d - el.ezSwipe.starttime
					};
					dispatchEvent('swipeMove', delta);
				}
				if (el.ezSwipe.timer) {
					clearTimeout(el.ezSwipe.timer);
				}
				el.ezSwipe.timer = setTimeout(function() {
					el.ezSwipe.timer = null;
					var t = parseInt(new Date().getTime());
					var delta = {
						x : el.ezSwipe.center.x - el.scrollLeft,
						y : el.ezSwipe.center.y - el.scrollTop,
						t : t - el.ezSwipe.starttime
					};
					el.ezSwipelast = delta;
					dispatchEvent('swipeEnd', delta);
					if (Math.abs(delta.y) > Math.abs(delta.x)) {
						delta.y < 0 ? dispatchEvent('swipeUp', delta) : dispatchEvent('swipeDown', delta);
					} else {
						delta.x < 0 ? dispatchEvent('swipeLeft', delta) : dispatchEvent('swipeRight', delta);
					}
					el.ezSwipe.scrolling = false;
					_droid_swipe(el);
				}, 100);
			}
		};
	}

	var _ezSwipes = document.getElementsByClassName("_ezswipe");
	for (var i = 0; i < _ezSwipes.length; i++) {
		var ezswipe_container = document.createElement("div");
		ezswipe_container.classList.add("_ezswipe_container");
		_ezSwipes[i].style.overflow = 'hidden';
		with (ezswipe_container.style) {
			webkitUserSelect = 'none';
			webkitOverflowScrolling = 'touch';
			overflow = 'auto';
			opacity = 0;
			top = 0;
			left = 0;
			position = 'absolute';
			_ezSwipes[i].offsetWidth > document.width ? width = document.width + 'px' : width = _ezSwipes[i].offsetWidth + 'px';
			_ezSwipes[i].offsetHeight > document.height ? height = document.height + 'px' : height = _ezSwipes[i].offsetHeight + 'px';
		};
		var ezswipe_surface = document.createElement("div");
		ezswipe_surface.classList.add("_ezswipe_surface");
		with (ezswipe_surface.style) {
			position = 'relative';
			width = '300%';
			height = '300%';
		};
		ezswipe_container.appendChild(ezswipe_surface);
		_droid_swipe(_ezSwipes[i].insertBefore(ezswipe_container, _ezSwipes[i].firstElementChild));
	}
})();

