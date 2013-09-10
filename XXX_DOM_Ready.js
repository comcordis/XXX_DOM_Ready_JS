
var XXX_DOM_Ready =
{
	count: 0,
	initialized: false,
	
	timer: false,
	
	IE_LOADED: false,
	
	eventListeners: [],
	
	definedReadyBy: '',
	
	ready: function (definedReadyBy)
	{
		if (definedReadyBy)
		{
			this.definedReadyBy = definedReadyBy;
			
			if (XXX_JS)
			{
				XXX_JS.errorNotification(1, 'Defined ready by: ' + this.definedReadyBy);
			}
		}
		else
		{
			XXX_JS.errorNotification(1, 'Defined ready by unknown source');
		}
		
		// Used XXX_DOM_Ready instead of this, due to cross-browser this within events mess...
		if (!XXX_DOM_Ready.initialized)
		{
			XXX_DOM_Ready.initialized = true;
			
			//alert('ready');
			
			XXX_JS.errorNotification(1, 'Triggering DOM ready for eventListeners');
				
			for (var i = 0, iEnd = XXX_DOM_Ready.eventListeners.length; i < iEnd; ++i)
			{
				var eventListener = XXX_DOM_Ready.eventListeners[i];
				
				eventListener();
			}
		}
		
		++XXX_DOM_Ready.count;
	},
	
	addEventListener: function (eventListener)
	{
		if (XXX_DOM_Ready.initialized)
		{
			XXX_JS.errorNotification(1, 'Already DOM ready for eventListener');
			
			eventListener();
		}
		else
		{		
			XXX_JS.errorNotification(1, 'DOM not ready yet, adding event listener');
			XXX_DOM_Ready.eventListeners.push(eventListener);
		}
	}
};

/* For Mozilla and newer versions of Opera 9+ */
if (document.addEventListener)
{
	document.addEventListener('DOMContentLoaded', function () { XXX_DOM_Ready.ready('document.addEventListener DOMContentLoaded'); }, false);
	
	// Fail safe
	window.addEventListener('load', function () { XXX_DOM_Ready.ready('windows.addEventListener load'); }, false);
}

if (window.attachEvent)
{
	window.attachEvent('onload', function () { XXX_DOM_Ready.ready('window.attachEvent onload'); });
}
			
// Internet Explorer (using proprietary conditional comments)
/*@cc_on
	/*@if (@_jscript)			
		document.write('<script id="_ie_onload" src="javascript:void(0)" defer="defer"></script>');
		
		var script = document.getElementById('_ie_onload');
		
		script.onreadystatechange = function()
		{
			if (this.readyState === 'complete')
			{
				XXX_DOM_Ready.ready('script.onreadystatechange');
			}
		};
	/*@end
@*/

if (/*@cc_on!@*/false)
{
	(function()
	{
		var test = document.createElement('doc:rdy');
		
		try
		{
			test.doScroll('left');
			
			XXX_DOM_Ready.ready('doc:rdy');
			
			test = null;
		}
		catch (nativeException)
		{
			setTimeout(arguments.callee, 100);
		}
	})();
}

// Webkit (Safari, Chrome etc.)
if (/WebKit/i.test(navigator.userAgent))
{
	XXX_DOM_Ready.scriptReadyTimer = setInterval(function()
	{
		if (/loaded|complete/.test(document.readyState))
		{
			clearInterval(XXX_DOM_Ready.scriptReadyTimer);
			
			XXX_DOM_Ready.ready('webkit document.readyState');
		}
	}, 100);
}
else
{
	XXX_DOM_Ready.scriptReadyTimer = setInterval(function()
	{
		// If DOM methods are supported, and the body element exists
		// Using a double-check including document.body, for the benefit of older moz builds [eg ns7.1] in which getElementsByTagName('body')[0] is undefined, unless this script is in the body section
		if(typeof document.getElementsByTagName != 'undefined' && (document.getElementsByTagName('body')[0] != null || document.body != null))
		{
			clearInterval(XXX_DOM_Ready.scriptReadyTimer);
			
			XXX_DOM_Ready.ready('typeof');
		}
		else if (XXX_DOM_Ready.IE_LOADED)
		{
			clearInterval(XXX_DOM_Ready.scriptReadyTimer);
			
			XXX_DOM_Ready.ready('IE_LOADED');
		}
	}, 100);
}

/* Other browsers */
window.onload = function () { XXX_DOM_Ready.ready('window.onload'); };