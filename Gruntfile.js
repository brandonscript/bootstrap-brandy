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
                    test() {
                        return config.brandai.enabled
                    }
                },
                ifTrue: ['brandai-on'],
                ifFalse: ['brandai-off']
            }
        },
        clean: {
            userContent: {
                src: [
                    'content', 
                    'css', 
                    'scss/**/*.scss', 
                    '!scss/framework/*', 
                    'js/**/*.js', 
                    '!js/framework/*'
                ]
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
                src: [
                    'content/**/*.html',
                    'scss/**/*.scss',
                    'js/**/*.js'
                ],
                dest: process.cwd()
            },
            bootstrap: {
                expand: true,
                flatten: true,
                src: 'node_modules/bootstrap-sass/assets/fonts/bootstrap/*',
                dest: 'css/fonts/bootstrap'
            }
        },
        uglify: {
            js: {
                src: ['js/**/*.js', '!js/framework/*.js'],
                dest: 'js/_composite.min.js'
            }
        },
        sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'css/framework/scaffolding.css': 'scss/framework/scaffolding.scss',
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
        open: {
            url: {
                path: 'http://localhost:' + config.server.port
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
                    'config.json',
                    'scss/**/*.scss',
                    'js/**/*.js'
                ],
                tasks: ['clean', 'curl:brandai', 'copy:userContent', 'uglify', 'sass', 'express'],
                options: {
                    spawn: false,
                    cwd: assets
                }
            },
            core: {
                files: [
                    'defaults.json',
                    'server.js',
                    'Gruntfile.js',
                    'index.html'
                ],
                tasks: ['express'],
                options: {
                    spawn: false,
                    cwd: assets
                }
            }
        },
    })
    grunt.registerTask('brandai-on', ['clean', 'curl:brandai', 'copy', 'uglify', 'sass', 'express:dev', 'open', 'watch'])
    grunt.registerTask('brandai-off', ['clean', 'copy', 'uglify', 'sass', 'express:dev', 'open', 'watch'])
    grunt.registerTask('default', ['if'])
}