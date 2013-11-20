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
        },
        jsbeautifier: {
            files: ["higgle.js", 'Gruntfile.js'],
            options: {}
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.registerTask('default', ['jsbeautifier', 'jshint', 'uglify']);

};
