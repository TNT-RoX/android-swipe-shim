(function() {
	function _droid_swipe(el) {
		var _child = el.getElementsByClassName("_ezswipe_surface")[0];
		el.ezSwipe = {
			center : {
				x : (_child.clientWidth / 2) - (el.clientWidth / 2),
				y : (_child.clientHeight / 2) - (el.clientHeight / 2)
			},
			timer : null,
			scrolling : false,
			result : {
				starttime : 0,
				stoptime : 0,
				delta : {
					x : 0,
					y : 0,
					t : 0
				}
			}
		};
		el.scrollLeft = el.ezSwipe.center.x;
		el.scrollTop = el.ezSwipe.center.y;
		el.onscroll = function(e) {
			var _self = this;

			if ((this.scrollLeft != this.ezSwipe.center.x) || (this.scrollTop != this.ezSwipe.center.y)) {
				function dispatchEvent(name) {
					var settings = {
						"detail" : {
							delta : {
								x : _self.ezSwipe.center.x - _self.scrollLeft,
								y : _self.ezSwipe.center.y - _self.scrollTop,
								t : (new Date().getTime()) - _self.ezSwipe.starttime
							},
							bubbles : false,
							cancelable : true
						}
					};
					var event = new CustomEvent(name, settings);
					_self.parentNode.dispatchEvent(event);
					delete event;
				};
				if (!this.ezSwipe.scrolling) {
					this.ezSwipe.result.starttime = new Date().getTime();
					dispatchEvent('swipeStart');
					this.ezSwipe.scrolling = true;
				} else {
					dispatchEvent('swipeMove');
				}
				if (this.ezSwipe.timer) {
					clearTimeout(this.ezSwipe.timer);
				}

				this.ezSwipe.timer = setTimeout(function() {
					_self.ezSwipe.timer = null;
					with (_self.ezSwipe.result) {
						stoptime = new Date().getTime();
						delta.t = stoptime - starttime;
						delta.x = _self.ezSwipe.center.x - _self.scrollLeft;
						delta.y = _self.ezSwipe.center.y - _self.scrollTop;
					};
					dispatchEvent('swipeEnd');
					if (Math.abs(_self.ezSwipe.result.delta.y) > Math.abs(_self.ezSwipe.result.delta.x)) {
						//vertical
						if (_self.ezSwipe.result.delta.y < 0) {
							dispatchEvent('swipeUp');
						} else {
							dispatchEvent('swipeDown');
						}
					} else {
						//horizontal
						if (_self.ezSwipe.result.delta.x < 0) {
							dispatchEvent('swipeLeft');
						} else {
							dispatchEvent('swipeRight');
						}
					}
					_self.ezSwipe.scrolling = false;
					_droid_swipe(_self);
				}, 100);
			}

		};
	}

	var _ezSwipes = document.getElementsByClassName("_ezswipe");
	//Prepend the HTML
	for (var i = 0; i < _ezSwipes.length; i++) {
		var ezswipe_container = document.createElement("div");
		ezswipe_container.classList.add("_ezswipe_container");
		with (ezswipe_container.style) {
			webkitUserSelect = 'none';
			webkitOverflowScrolling = 'touch';
			overflow = 'scroll';
			opacity = 0;
			position = 'relative';
			top = 0;
			left = 0;
			width = '100%';
			height = '100%';
		};
		var ezswipe_surface = document.createElement("div");
		ezswipe_surface.classList.add("_ezswipe_surface");
		with (ezswipe_surface.style) {
			position = 'relative';
			width = '300%';
			height = '300%';
		};
		ezswipe_container.appendChild(ezswipe_surface);
		var item = _ezSwipes[i].insertBefore(ezswipe_container, _ezSwipes[i].firstElementChild);
		_droid_swipe(item);
	}
})();
