android-swipe-shim (beta)
==================

On some Android devices when the user touches the screen a touchstart event is fired, Android passes the event to WebView (javascript) to be handled. If WebView does not preventdefault (within some timeframe), Android resumes native scrolling and stops passing events to WebView.  

This behavior is embedded in millions of Android devices and cannot be corrected at its source.

This shim provides a solution by overlaying an element that can be natively scrolled and fires swipe events based on its scroll offsets. 

**Remove**
```sh
e.preventDefault()
```
**from touchStart events. This shim needs native scrolling enabled.**


License
----

Artistic License 2
