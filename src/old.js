/* Old, inexistent methods */

migrateTool.makeWarn(
	window, "raises",
	"raises() is no longer existent, use assert.throws instead",
	function() {}
);

migrateTool.makeWarn(
	window, "equals",
	"equals() is no longer existent, use assert.equal instead",
	function() {}
);

migrateTool.makeWarn(
	window, "same",
	"same() is no longer existent, use assert.deepEqual instead",
	function() {}
);
