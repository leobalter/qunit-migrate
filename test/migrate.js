migrateTool.expectWarning = function( assert, name, expected, fn ) {
	if ( !fn ) {
		fn = expected;
		expected = null;
	}
	migrateTool.reset();
	fn();

	// Special-case for 0 warnings expected
	if ( expected === 0 ) {
		assert.deepEqual( migrateTool.warnings, [], name + ": did not warn" );

	// Simple numeric equality assertion for warnings matching an explicit count
	} else if ( expected && migrateTool.warnings.length === expected ) {
		assert.equal( migrateTool.warnings.length, expected, name + ": warned" );

	// Simple ok assertion when we saw at least one warning and weren't looking for an explict count
	} else if ( !expected && migrateTool.warnings.length ) {
		assert.ok( true, name + ": warned" );

	// Failure; use deepEqual to show the warnings that *were* generated and the expectation
	} else {
		assert.deepEqual( migrateTool.warnings, "<warnings: " + ( expected || "1+" ) + ">", name + ": warned" );
	}
};

migrateTool.expectNoWarning = function( assert, name, expected, fn ) {

	// Expected is present only for signature compatibility with expectWarning
	return migrateTool.expectWarning( assert, name, 0, fn || expected );
};
