(function () {
    "use strict";
    HTMLElement.prototype.scrollSwipe = function () {
        var target = this,
            container,
            data = {},
            swiper = (function () {
                function createElement(type, styles) {
                    var el = document.createElement(type);
                    for (var property in styles) {
                        el.style[property] = styles[property];
                    }
                    return el;
                }

                function dispatch(name, delta) {
                    if ((Math.abs(delta.x) > 1) || (Math.abs(delta.y) > 1))
                        return target.dispatchEvent(new CustomEvent(name, {
                            detail: {
                                delta: delta,
                                bubbles: false,
                                cancelable: true
                            }
                        }));
                }
                function reset() {
                    container.scrollLeft = container.clientWidth;
                    container.scrollTop = container.clientHeight;
                    data.last = {
                        x: container.clientWidth >> 1,
                        y: container.clientHeight >> 1,
                        t: 0
                    };
                    return true;
                }

                function scrollable() {
                    var center = {
                            x: (container.clientWidth >> 1) + container.clientWidth,
                            y: (container.clientHeight >> 1) + container.clientHeight
                        },
                        timer = null,
                        starttime = 0,
                        swiping = false;
                    reset();
                    container.onscroll = function () {
                        //todo swipeEnd if overshot
                        var delta,
                            d = new Date().getTime();
                        if (!swiping) {
                            starttime = d;
                            delta = data.last;
                            dispatch("swipeStart", delta);
                            swiping = true;
                        } else {
                            delta = {
                                x: center.x - container.scrollLeft - data.last.x,
                                y: center.y - container.scrollTop - data.last.y,
                                t: d - starttime - data.last.t
                            };
                            data.last = {
                                x: center.x - container.scrollLeft,
                                y: center.y - container.scrollTop,
                                t: d - starttime
                            };
                            dispatch("swipeMove", delta);
                        }
                        if (timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(function () {
                            timer = null;
                            swiping = false;
                            d = new Date().getTime();
                            delta = {
                                x: center.x - container.scrollLeft,
                                y: center.y - container.scrollTop,
                                t: d - starttime
                            };
                            dispatch("swipeEnd", delta);
                            if (Math.abs(delta.y) > Math.abs(delta.x)) {
                                if (delta.y < 0) {
                                    dispatch("swipeUp", delta);
                                } else {
                                    dispatch("swipeDown", delta);
                                }
                            } else {
                                if (delta.x < 0) {
                                    dispatch("swipeLeft", delta);
                                } else {
                                    dispatch("swipeRight", delta);
                                }
                            }
                            reset();
                        }, 100);
                    };
                    return true;
                }

                return {
                    createElement: createElement,
                    scrollable: scrollable
                }
            })();
        container = swiper.createElement('div', {
            zIndex: 2147483646,
            overflow: "auto",
            opacity: 0,
            top: 0,
            left: 0,
            position: "absolute",
            width: "100%",
            height: "100%",
            webkitUserSelect: "none",
            webkitOverflowScrolling: "touch"
        });
        container.appendChild(swiper.createElement('div', {
            position: "relative",
            width: "300%",
            height: "300%"
        }));
        target.insertBefore(container, target.firstElementChild);
        swiper.scrollable();
        return target;
    }
})();			
