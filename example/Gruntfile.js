module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt)
    grunt.initConfig({
        subgrunt: {
            brandy: {
                options: {
                    npmInstall: true
                },
                projects: {
                    'node_modules/bootstrap-brandy': ['default', '--assets=' + require('path').resolve()]
                }
            }
        }
    })
    grunt.registerTask('default', ['subgrunt:brandy'])
}