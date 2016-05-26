module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var brandAiConfig = require('./config/brandai.json'),
        util = require('util')

    grunt.initConfig({
        curl: {
            styles: {
                src: util.format("https://assets.brand.ai/%s/%s/_style-params.scss?key=%s", brandAiConfig.org, brandAiConfig.name, brandAiConfig.key),
                dest: 'scss/external/brandai.scss' // the sass source folder
            }
        },
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
                    'scss/*.scss',
                    'scss/framework/*.scss',
                    'js/*.js',
                    'images/*'
                ],
                tasks: ['curl:styles', 'sass', 'express'],
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
    grunt.registerTask('default', ['curl:styles', 'copy:bootstrap', 'sass', 'express:dev', 'watch'])
}