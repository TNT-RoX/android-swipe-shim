(function() {
	var ezswipe_container, ezswipe_surface, i, style, _droid_swipe, _ezSwipes;
	_droid_swipe = function(el) {
		var dispatchEvent, _child;
		dispatchEvent = function(name, delta) {
			var event, settings;
			settings = {
				detail : {
					delta : delta,
					bubbles : false,
					cancelable : true
				}
			};
			el.parentNode.dispatchEvent(new CustomEvent(name, settings));
		};
		_child = el.querySelectorAll("._ezswipe_surface")[0];
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
		el.onscroll = function(e) {
			var d, delta;
			d = new Date().getTime();
			if ((el.scrollLeft !== el.ezSwipe.center.x) || (el.scrollTop !== el.ezSwipe.center.y)) {
				if (!el.ezSwipe.scrolling) {
					delta = {
						x : 0,
						y : 0,
						t : 0
					};
					el.ezSwipe.starttime = d;
					el.ezSwipe.last = delta;
					dispatchEvent("swipeStart", delta);
					el.ezSwipe.scrolling = true;
				} else {
					delta = {
						x : el.ezSwipe.center.x - el.scrollLeft - el.ezSwipe.last.x,
						y : el.ezSwipe.center.y - el.scrollTop - el.ezSwipe.last.y,
						t : d - el.ezSwipe.starttime - el.ezSwipe.last.t
					};
					el.ezSwipe.last = {
						x : el.ezSwipe.center.x - el.scrollLeft,
						y : el.ezSwipe.center.y - el.scrollTop,
						t : d - el.ezSwipe.starttime
					};
					dispatchEvent("swipeMove", delta);
				}
				if (el.ezSwipe.timer) {
					clearTimeout(el.ezSwipe.timer);
				}
				el.ezSwipe.timer = setTimeout(function() {
					el.ezSwipe.timer = null;
					d = new Date().getTime();
					delta = {
						x : el.ezSwipe.center.x - el.scrollLeft,
						y : el.ezSwipe.center.y - el.scrollTop,
						t : d - el.ezSwipe.starttime
					};
					el.ezSwipe.last = delta;
					dispatchEvent("swipeEnd", delta);
					if (Math.abs(delta.y) > Math.abs(delta.x)) {
						if (delta.y < 0) {
							dispatchEvent("swipeUp", delta);
						} else {
							dispatchEvent("swipeDown", delta);
						}
					} else {
						if (delta.x < 0) {
							dispatchEvent("swipeLeft", delta);
						} else {
							dispatchEvent("swipeRight", delta);
						}
					}
					el.ezSwipe.scrolling = false;
					_droid_swipe(el);
				}, 100);
			}
		};
	};
	_ezSwipes = document.querySelectorAll("._ezswipe");
	for (i = 0;i < _ezSwipes.length; i++) {
		ezswipe_container = document.createElement("div"), 
		ezswipe_container.classList.add("_ezswipe_container"), 
		_ezSwipes[i].style.overflow = "hidden", 
		style = ezswipe_container.style, 
		style.webkitUserSelect = "none", 
		style.webkitOverflowScrolling = "touch", 
		style.overflow = "auto", 
		style.opacity = 0, 
		style.top = 0, 
		style.left = 0, 
		style.position = "absolute", 
		style.width = _ezSwipes[i].offsetWidth > document.width ? document.width + "px" : _ezSwipes[i].offsetWidth + "px", 
		style.height = _ezSwipes[i].offsetHeight > document.height ? document.height + "px" : _ezSwipes[i].offsetHeight + "px", 
		ezswipe_surface = document.createElement("div"), ezswipe_surface.classList.add("_ezswipe_surface"), 
		style = ezswipe_surface.style, 
		style.position = "relative", 
		style.width = "300%", 
		style.height = "300%", 
		ezswipe_container.appendChild(ezswipe_surface), 
		_droid_swipe(_ezSwipes[i].insertBefore(ezswipe_container,_ezSwipes[i].firstElementChild)); 
	};
})();
