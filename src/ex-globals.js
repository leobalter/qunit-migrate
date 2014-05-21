/* QUnit ex-globals */

(function() {
	var i, l, method,
		methods = [
			"begin", "done", "log",
			"testStart", "testDone",
			"moduleStart", "moduleDone"
		];

	for ( i = 0, l = methods.length; i < l; i++ ) {
		method = methods[ i ];

		migrateTool.makeWarn(
			window, method,
			"Please use QUnit." + method + "() instead of global " + method + "()",
			QUnit[ method ]
		);
	}
})();

