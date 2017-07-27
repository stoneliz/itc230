module.exports = function(grunt){

	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jslint',
		'grunt-exec',
		'grunt-less',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},
		exec: {
			linkchecker: { cmd: 'linkchecker https://itc230-stoneliz.c9users.io' }
		},
		less: {
			development: {
				options: {
					customFunctions: {
						static: function(lessObject, name){
							return 'url("' +
							require('./lib/static.js').map(name.value) + '")';
						}
					}
				},
				files: {
					'public/css/main.css': 'less/main.less',
				}
			}
		}
	});	

	// register tasks
	grunt.registerTask('default', ['cafemocha','jslint','exec']);
};