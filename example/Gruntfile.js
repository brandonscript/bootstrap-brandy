module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    var path = require('path')
    grunt.initConfig({
        subgrunt: {
            styleguide: {
                options: {
                    npmInstall: true
                },
                projects: {
                    'node_modules/bootstrap-style-guide': ['default', '--assets=' + path.resolve()]
                }
            }
        }
    })
    grunt.registerTask('default', ['subgrunt:styleguide'])
}