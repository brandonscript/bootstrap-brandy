module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({
        copy: {
            bootstrap: {
                expand: true,
                flatten: true,
                src: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
                dest: 'css/fonts/bootstrap'
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'css/framework/scaffolding.css': 'scss/framework/scaffolding.scss',
                    'css/framework/extensions.css': 'scss/framework/extensions.scss',
                    'css/style.css': 'scss/style.scss'
                }
            }
        },
        express: {
            dev: {
                options: {
                    port: 8080,
                    script: 'server.js',
                    background: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                debounceDelay: 50
            },
            express: {
                files: [
                    '**/*.html',
                    'css/syntax-highlighting/*.css',
                    'css/fonts/*',
                    'scss/**/*.scss',
                    'js/*.js',
                    'images/*'
                ],
                tasks: ['sass', 'express'],
                options: {
                    spawn: false
                }
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.json', 'server.js', 'js/*.js'],
                tasks: ['express'],
                options: {
                    spawn: false
                }
            }
        },
    })
    grunt.registerTask('default', ['copy:bootstrap', 'sass', 'express:dev', 'watch'])
}