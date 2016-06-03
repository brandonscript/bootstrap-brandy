module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var util = require('util'),
        path = require('path'),
        pkg = require('./package.json'),
        assets = grunt.option('assets'),
        config = grunt.file.readJSON(path.join(assets, 'config.json')) || grunt.file.readJSON('./defaults.json')

    grunt.initConfig({
        if: {
            default: {
                options: {
                    test: function() { return config.brandai.enabled }
                },
                ifTrue: ['brandai-on'],
                ifFalse: ['brandai-off']
            }
        },
        curl: {
            brandai: {
                src: util.format("https://assets.brand.ai/%s/%s/_style-params.scss?key=%s", config.brandai.org, config.brandai.name, config.brandai.key),
                dest: 'scss/external/brandai.scss' // the sass source folder
            }
        },
        copy: {
            userContent: {
                expand: true,
                cwd: assets,
                src: ['content/**/*.html', 'scss/*.scss'],
                dest: process.cwd()
            },
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
                    'css/framework/prettify-theme.css': 'scss/framework/prettify-theme.scss',
                    'css/style.css': 'scss/style.scss'
                }
            }
        },
        express: {
            dev: {
                options: {
                    port: config.server.port,
                    args: [
                        '--assets',
                        assets
                    ],
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
            userContent: {
                files: [
                    'content/**/*.html',
                    'scss/*.scss',
                    'config.json'
                ],
                tasks: ['curl:brandai', 'copy:userContent', 'sass', 'express'],
                options: {
                    spawn: false,
                    cwd: assets
                }
            },
            core: {
                files: [
                    'defaults.json',
                    'server.js',
                    'js/*.js',
                    'Gruntfile.js',
                    'index.html',
                    'css/syntax-highlighting/*.css',
                    'scss/framework/*.scss'
                ],
                tasks: ['express'],
                options: {
                    spawn: false,
                    cwd: assets
                }
            }
        },
    })
    grunt.registerTask('brandai-on', ['curl:brandai', 'copy', 'sass', 'express:dev', 'watch'])
    grunt.registerTask('brandai-off', ['copy', 'sass', 'express:dev', 'watch'])
    grunt.registerTask('default', ['if'])
    //'copy', 'sass', 'express:dev', 'watch'
}