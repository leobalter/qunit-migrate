QUnit.module( "Old, inexistent methods" );

QUnit.test( "raises", function( assert ) {
	migrateTool.expectWarning( assert, "raises", 1, function() {
		window[ "raises" ]();
	});
});

QUnit.test( "equals", function( assert ) {
	migrateTool.expectWarning( assert, "equals", 1, function() {
		window[ "equals" ]();
	});
});

QUnit.test( "same", function( assert ) {
	migrateTool.expectWarning( assert, "same", 1, function() {
		window[ "same" ]();
	});
});