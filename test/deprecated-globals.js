QUnit.module( "Good to drop globals" );

QUnit.test( "start()", function( assert ) {
	migrateTool.expectWarning( assert, "start()", 1, function() {
		// This will prevent an error as QUnit already started
		// >> Message: Called start() while already started (QUnit.config.semaphore was 0 already)
		QUnit.config.semaphore = 1;
		window[ "start" ]();
	});
});

QUnit.test( "stop()", function( assert ) {
	migrateTool.expectWarning( assert, "stop()", 1, function() {
		window[ "stop" ]();
		
		// Restart the testing :)
		QUnit.start();
	});
});

QUnit.test( "test()", function( assert ) {
	migrateTool.expectWarning( assert, "test()", 1, function() {
		window[ "test" ]( "foo", function( t ) {
			t.expect( 0 );
		});
	});
});

QUnit.test( "asyncTest()", function( assert ) {
	migrateTool.expectWarning( assert, "asyncTest()", 1, function() {
		window[ "asyncTest" ]( "foo", function( t ) {
			t.expect( 0 );

			// Start the asyncTest
			QUnit.start();
		});
	});
});

QUnit.test( "module()", function( assert ) {
	migrateTool.expectWarning( assert, "module()", 1, function() {

		// We just reseted the module name
		window[ "module" ]();
	});
});
