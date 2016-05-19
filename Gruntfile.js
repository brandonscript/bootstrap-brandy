var files = [
    'markup/*',
    'usage/*',
    'examples/*',
    'components/*',
    'css/**/*',
    'js/**/*',
    'images/**/*'
]

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({
        express: {
            options: {
                port: 8080
            },
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
                livereload: true
            },
            express: {
                files: files,
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
        },
    })
    grunt.registerTask('default', ['express:dev', 'watch'])
}