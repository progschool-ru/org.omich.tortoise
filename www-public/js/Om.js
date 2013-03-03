(function()
{

var getAppendedClassName = function(prevClasses, className)
{
	if(! prevClasses)
		return className;
	if(prevClasses.indexOf(className) > -1)
		return prevClasses;

	return prevClasses + " " + className;
}

Om = {
isMac : function()
{
	return navigator.appVersion.indexOf("Mac")!=-1
},

isChrome : function()
{
	return navigator.appVersion.indexOf("Chrome") != -1
},

prependArgumentsByObject : function(obj, oargs)
{
	var size = oargs.length;
	var nargs = [obj];
	for(var j = 0; j < size; ++j)
	{
		nargs.push(oargs[j]);
	}
	return nargs;		
},

getAppendedClassName : getAppendedClassName,

appendClass : function (elem, className)
{
	elem.className = getAppendedClassName(elem.className, className)
},

removeClass : function (elem, className)
{
	var old = elem.className;
	var index = old.indexOf(className);
	if(index < 0)
		return;

	var isLast = index + className.length == old.length;
	var isFirst = index == 0;
	var cut = old.substring(0, index) + old.substring(index + className.length);

	if(!isLast)
	{
		cut = cut.substring(0, index) + cut.substring(index + 1);
	}
	if(isLast && !isFirst)
	{
		cut = cut.substring(0, index - 1);
	}
	elem.className = cut;
},


htmlspecialchars : function (str, withoutAmps)
{
	if (typeof(str) == "string")
	{
		if(!withoutAmps)
		{
			str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
		}
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
	}
	return str;
},
rhtmlspecialchars : function(str)
{
	if (typeof(str) == "string")
	{
		str = str.replace(/&gt;/ig, ">");
		str = str.replace(/&lt;/ig, "<");
		str = str.replace(/&#039;/g, "'");
		str = str.replace(/&quot;/ig, '"');
		str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
	}
	return str;
},

utf8_to_b64 : function ( str )
{
    return window.btoa(unescape(encodeURIComponent( str )));
},
b64_to_utf8 : function ( str )
{
    return decodeURIComponent(escape(window.atob( str )));
}
}

})()