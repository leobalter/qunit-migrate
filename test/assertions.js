QUnit.module( "Global Assertions" );

(function() {
	var i, l, theAssert,
		assertions = [
			"ok", "equal",
			"propEqual",
			"deepEqual",
			"strictEqual"
		],
		testCb = function( name ) {
			return function( assert ) {
				migrateTool.expectWarning( assert, name, 1, function() {
					window[ name ]( true, true );
				});
			};
		};

	for ( i = 0, l = assertions.length; i < l; i++ ) {
		theAssert = assertions[ i ];

		QUnit.test( theAssert + "()", testCb( theAssert ) );
	}

	assertions = [
		"notEqual",
		"notPropEqual",
		"notDeepEqual",
		"notStrictEqual"
	];
	testCb = function( name ) {
		return function( assert ) {
			migrateTool.expectWarning( assert, name, 1, function() {
				window[ name ]( { a: true }, { a : false } );
			});
		};
	};

	for ( i = 0, l = assertions.length; i < l; i++ ) {
		theAssert = assertions[ i ];

		QUnit.test( theAssert + "()", testCb( theAssert ) );
	}
})();

QUnit.test( "throws", function( assert ) {
	migrateTool.expectWarning( assert, "throws", 1, function() {
		window[ "throws" ](function() {
			throw "foo";
		});
	});
});

QUnit.test( "expect", function( assert ) {
	migrateTool.expectWarning( assert, "expect", 1, function() {
		window[ "expect" ]();
	});
});
