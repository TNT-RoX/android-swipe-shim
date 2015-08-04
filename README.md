android-swipe-shim
==================

On some Android devices when the user touches the screen a touchstart event is fired, Android passes the event to WebView (javascript) to be handled. If WebView does not preventdefault (within 200ms), Android resumes native scrolling and stops passing touch events to WebView.  

The solution to this has mostly been to preventDefault on touchstart and manually scroll using javascript. 

This behavior is embedded in millions of Android devices and cannot be corrected at its source.

This shim provides a solution by overlaying a contained element that can be natively scrolled and fires swipe events based on its scroll offsets, allowing your software to handle move events with native scrolling enabled.

**Remove**
```sh
*.preventDefault()
```
**from touchStart events. This shim needs native scrolling enabled.**

Add to your html document:
```sh
<script src="_ezSwipe.js" type="text/javascript"></script>
```
Run scrollSwipe on the element you want to transmit swipe events.
```sh
document.getElementById('test').scrollSwipe()
```
Handel the Swipe event:
```sh
with (document.getElementById('test')) {
			addEventListener("swipeStart", logEvent, true);
			addEventListener("swipeMove", logEvent, true);
			addEventListener("swipeEnd", logEvent, true);
			addEventListener("swipeUp", logEvent, true);
			addEventListener("swipeDown", logEvent, true);
			addEventListener("swipeLeft", logEvent, true);
			addEventListener("swipeRight", logEvent, true);
		};
```
Or jQuery:
```sh
$(el).on("swipeUp", function(e) {
 console.dir(e.detail);
})
```
The event contains extended detail data: event.detail.delta
```sh
//for swipeStart event
delta = {
  x : 0, 
  y : 0,
  t : 0
}
//for swipeMove event
delta = {
  x : horizontal distance from previous event, 
  y : vertical distance from previous event,
  t : time in milliseconds since last event
}
//for swipeEnd, swipeUp, swipeDown, swipeLeft, swipeRight events
delta = {
  x : horizontal distance from swipeStart event, 
  y : vertical distance from swipeStart event,
  t : time in milliseconds since swipeStart event
}


```

License
----

Artistic License 2
