module.exports = function( grunt ) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		concat: {
			dist: {
				src: [
					"src/migrate.js",
					"src/migrate-qunit.js"
				],
				dest: "dist/<%= pkg.name %>.js"
			}
		},
		qunit: {
			files: [ "test/**/*.html" ]
		},
		jshint: {
			options: {
				jshintrc: "src/.jshintrc"
			},
			src: {
				src: [ "src/**/*.js" ]
			},
			tests: {
				src: [ "test/**/*.js" ]
			},
			grunt: {
				src: [ "Gruntfile.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			}
		},
		watch: {
			files: [
				"src/**/*.js",
				"test/**/*.js",
				"Gruntfile.js"
			],
			tasks: "default"
		}
	});

	[
		"grunt-contrib-concat",
		"grunt-contrib-watch",
		"grunt-contrib-jshint",
		"grunt-contrib-qunit"
	].forEach(function( task ) {
		grunt.loadNpmTasks( task );
	});

	// Default task.
	grunt.registerTask( "default", [ "jshint", "qunit", "concat" ]);
};
