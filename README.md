android-swipe-shim
==================

On some Android devices when the user touches the screen a touchstart event is fired, Android passes the event to WebView (javascript) to be handled. If WebView does not preventdefault (within some timeframe), Android resumes native scrolling and stops passing events to WebView.  This behavior is embedded in millions of Android devices and cannot be corrected at it source. This shim provides a solution.
