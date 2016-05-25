module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var brandAiConfig = require('./config/brandai.json'),
        util = require('util'),
        globalConfig = {
            scssUrl: util.format("https://assets.brand.ai/%s/%s/_style-params.scss?key=%s", brandAiConfig.org, brandAiConfig.name, brandAiConfig.key),
        }

    grunt.initConfig({
        globalConfig: globalConfig,
        // Download external resources
        curl: {
            'styles': {
                src: ['<%= globalConfig.scssUrl %>'],
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
    grunt.registerTask('default', ['curl', 'copy:bootstrap', 'sass', 'express:dev', 'watch'])
}