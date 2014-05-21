/* Deprecated Globals to use in QUnit.* namespace */

(function() {
	var i, l, method,
		methods = [
			"start", "stop",
			"module", "test", "asyncTest"
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

