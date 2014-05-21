QUnit.module( "QUnit ex-globals" );

(function() {
	var i, l, exGlob,
		exGlobals = [
			"begin", "done", "log",
			"testStart", "testDone",
			"moduleStart", "moduleDone"
		],
		testCb = function( name ) {
			return function( assert ) {
				migrateTool.expectWarning( assert, name, 1, function() {

					// empty function prevents timeout from QUnit logging functions
					window[ name ]( function() {} );
				});
			};
		};

	for ( i = 0, l = exGlobals.length; i < l; i++ ) {
		exGlob = exGlobals[ i ];

		QUnit.test( exGlob, testCb( exGlob ) );
	}
})();
