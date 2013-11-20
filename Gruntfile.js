module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'higgle.js']
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'bin/higgle.min.js': ['higgle.js']
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['jshint','uglify']);

};