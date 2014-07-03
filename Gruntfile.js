
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            express: {
                files:  [ 'app/**/*.js' ],
                tasks:  [ 'jshint:all', 'express' ],
                options: {
                    spawn: false
                }
            },
            test: {
                files:  [ 'app/**/*.js', 'test/**/*.js' ],
                tasks:  [ 'test' ],
            }
        },

        express: {
            app: {
                options: {
                    script: 'app/index.js',
                    port: 3010
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'test/**/*.js'
            ]
        },

        mochaTest: {
            options: {
                reporter: 'spec'
            },
            test: {
                src: ['test/**/*_test.js']
            }
        }

    });

    grunt.registerTask('test', [
        'jshint',
        'mochaTest:test'
    ]);

    grunt.registerTask('serve', [
        'express',
        'watch:express'
    ]);

};
