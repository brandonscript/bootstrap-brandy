module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var path = require('path')
    grunt.initConfig({
        copy: {
            dev: {
                expand: true,
                cwd: '../',
                src: ['**/*', '!test/**/*', '!node_modules/**/*'],
                dest: path.join(process.cwd(), 'node_modules/bootstrap-brandy/')
            }
        },
        subgrunt: {
            brandy: {
                options: {
                    npmInstall: true
                },
                projects: {
                    'node_modules/bootstrap-brandy': ['default', '--assets=' + path.resolve()]
                }
            }
        }
    })
    grunt.registerTask('default', ['copy', 'subgrunt:brandy'])
}