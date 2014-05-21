(function( window, undefined ) {
"use strict";

var console,
	migrateTool = {
		options : {

			// Set to true to prevent console output
			mute : false,
			trace : true
		}
	},
	warnedAbout = {},
	warnPreText = "MIGRATE TOOL: ";

window.migrateTool = migrateTool;

// List of warnings already given
migrateTool.warnings = [];

// Don't spew on in the console in PhantomJS
if ( navigator.userAgent.indexOf( "PhantomJS" ) >= 0 ) {
	migrateTool.options.mute = true;
}

// Fail safe console
// If mute is on, don't bother
if ( window.console && !migrateTool.options.mute ) {
	console = window.console;

	// Fallback to console.log if console.warn is not present
	console.warn = console.warn || console.log;

	// If it doesn't have console.trace, turns off trace option
	// Compat: Chrome, FF10+, IE10+, Safari 7.0.1+
	// Ref: https://developer.mozilla.org/en-US/docs/Web/API/console.trace
	if ( typeof console.trace !== "function" ) {
		migrateTool.options.trace = false;
	}
} else {

	// Not possible to set the console methods, so turn on muting
	migrateTool.options.mute = true;
}

// Show a message on the console so devs know we're active
if ( !migrateTool.options.mute ) {
	console.log( warnPreText + "Logging is active" );
}

// Forget any warnings we've already given; public
migrateTool.reset = function() {
	warnedAbout = {};
	migrateTool.warnings.length = 0;
};

migrateTool.warn = function( msg ) {
	if ( !warnedAbout[ msg ] ) {
		warnedAbout[ msg ] = true;
		migrateTool.warnings.push( msg );
	}

	if ( !migrateTool.options.mute ) {
		console.warn( warnPreText + msg );
		if ( migrateTool.options.trace ) {
			console.trace();
		}
	}
};

migrateTool.warnProp = function( obj, prop, value, msg ) {
	if ( Object.defineProperty ) {

		// On ES5 browsers (non-oldIE), warn if the code tries to get prop;
		// allow property to be overwritten in case some other plugin wants it
		try {
			Object.defineProperty( obj, prop, {
				configurable: true,
				enumerable: true,
				get: function() {
					migrateTool.warn( msg );
					return value;
				},
				set: function( newValue ) {
					migrateTool.warn( msg );
					value = newValue;
				}
			});
			return;
		} catch( err ) {
			// IE8 is a dope about Object.defineProperty, can't warn there
		}
	}

	// Non-ES5 (or broken) browser; just set the property
	migrateTool._definePropertyBroken = true;
	obj[ prop ] = value;
};

migrateTool.makeWarn = function( context, methodName, msg, newMethod ) {
	var original = context[ methodName ],
		method = newMethod || original;

	context[ methodName ] = function() {
		var args = [].slice.apply( arguments ),
			returned = method.apply( this, args );

		migrateTool.warn( msg );

	    // calls the original method
        return returned;
	};
};

})( window );
