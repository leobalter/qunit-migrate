/* Assertions */

(function() {
	var i, l, assert, msg,
		assertions = [
			"ok", "equal", "notEqual",
			"propEqual", "notPropEqual",
			"deepEqual", "notDeepEqual",
			"strictEqual", "notStrictEqual",
			"throws", "expect"
		];

	for ( i = 0, l = assertions.length; i < l; i++ ) {
		assert = assertions[ i ];

		msg = "Please use assert." + assert + "() instead of global " + assert + "()" +
			"\nThe assert object is passed as the first parameter " +
			"in the callback function of each test block";

		migrateTool.makeWarn(
			window, assert,
			msg,
			QUnit.assert[ assert ]
		);
	}
})();

migrateTool.makeWarn(
	QUnit, "expect",
	"Please use assert.expect() instead of QUnit.expect()" +
	"\nThe assert object is passed as the first parameter " +
	"in the callback function of each test block",
	QUnit.assert.expect
);