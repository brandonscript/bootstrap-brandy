'use strict'
var http = require('http'),
    util = require('util'),
    exec = require('sync-exec'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    express = require('express'),
    app = express(),
    request = require('request'),
    helpers = require('./js/helpers'),
    path = require('path'),
    brandAiConfig = require('./config/brandai.json'),
    _ = require('lodash')

// Prototype Extensions
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


// Helpers
helpers.extendHandlebars(handlebars)

// Load
var template = {},
    baseTemplate = fs.readFileSync('index.html', 'utf8'),
    pageBuilder = handlebars.compile(baseTemplate),
    componentsPath = 'components',
    markupDirectory = 'markup',
    examplesDirectory = 'examples',
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
            title: path.basename(file, '.html').replace('-', ' ').toTitleCase(),
            href: path.basename(file, '.html'),
            type: dir,
            fileName: file,
            content: fs.readFileSync(path.join(markupDirectory, dir, file)),
            example: helpers.tryLoadFile(path.join(examplesDirectory, dir, file)),
            usage: helpers.tryLoadFile(path.join(usageDirectory, dir, file))
        }
        template[dir].push(comp)
    })
})

// Index
app.get('/', function(req, res) {
    request.get({
        url: util.format("https://api.brand.ai/styleguide/%s/%s?key=%s", brandAiConfig.org, brandAiConfig.name, brandAiConfig.key),
        json: true
    }, function(err, response, brandAi) {
        _.merge(template, {
            brandAi: _.merge(brandAi.result, {
                googleFonts: helpers.buildGoogleFontsLink(brandAi.result),
                customFonts: util.format("https://api.brand.ai/styleguide/%s/%s/custom-fonts.css?key=%s", brandAiConfig.org, brandAiConfig.name, brandAiConfig.key)
            })
        })
        template.brandAi.colorSections.forEach(function(section) {
            section.colors.map(function(color) {
                color.value = helpers.rgbToHex.apply(this, color.value.match(/(\d+)/g))
                return color
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