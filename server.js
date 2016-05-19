'use strict'
var http = require('http'),
    exec = require('sync-exec'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    express = require('express'),
    app = express(),
    request = require('request'),
    helpers = require('./js/helpers'),
    path = require('path'),
    tryit = require('tryit'),
    brandAiUrl = require('./config/brandai.json').url,
    _ = require('lodash')

// Helpers
helpers.extendHandlebars(handlebars)

// Load
var template = {},
    baseTemplate = fs.readFileSync('index.html', 'utf8'),
    pageBuilder = handlebars.compile(baseTemplate),
    markupDirectory = 'markup',
    examplesOverrideDirectory = 'examples',
    componentsPath = 'components',
    usageDirectory = 'usage',
    fileDirectories = ['elements', 'patterns']

_.merge(template, {
    components: fs.readdirSync(componentsPath).filter(function(file) {
        return path.extname(file) === '.html'
    }).reduce(function(obj, file) {
        return (obj[path.basename(file, '.html')] = fs.readFileSync(path.join(componentsPath, file)), obj)
    }, {})
})

fileDirectories.forEach(function(dir) {
    template[dir] = []
    fs.readdirSync(path.join(markupDirectory, dir)).filter(function(file) {
        return path.extname(file) === '.html'
    }).forEach(function(file) {
        var comp = {
            title: path.basename(file, '.html'),
            type: dir,
            fileName: file,
            content: tryit(function() {
                return fs.readFileSync(path.join(examplesOverrideDirectory, dir, file))
            }) || fs.readFileSync(path.join(markupDirectory, dir, file)),
            usage: tryit(function() {
                return fs.readFileSync(path.join(usageDirectory, dir, file))
            }) || ""
        }
        template[dir].push(comp)
    })
})

// Index
app.get('/', function(req, res) {
    request.get({
        url: brandAiUrl,
        json: true
    }, function(err, response, brandAi) {
        _.merge(template, {
            brandAi: _.merge(brandAi.result, {
                googleFonts: helpers.buildGoogleFontsLink(brandAi.result)
            })
        })
        res.status(200).send(pageBuilder(template))
    })
})

// Static files
app.use('/images', express.static('images'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

// Live reload
app.use(require('connect-livereload')({
    port: 35729
}))

// Error handling
app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("<pre><code>" + err.stack + "</code></pre>")
})

// Server
var server = app.listen(process.env.PORT || 8080, function() {
    console.log("Express app started on port " + server.address().port)
})