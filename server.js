'use strict'
var http = require('http'),
    util = require('util'),
    exec = require('sync-exec'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    express = require('express'),
    argv = require('minimist')(process.argv.slice(2)),
    app = express(),
    request = require('request'),
    helpers = require('./js/helpers'),
    path = require('path'),
    config = require(path.join(argv.assets, 'config.json')),
    _ = require('lodash')

// Prototype Extensions
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};


// Helpers
helpers.extendHandlebars(handlebars)

// Load
var template = {
        content: []
    },
    baseTemplate = fs.readFileSync('index.html', 'utf8'),
    pageBuilder = handlebars.compile(baseTemplate),
    componentsDir = 'components',
    contentDir = 'content',
    markupDir = 'markup',
    examplesDir = 'examples',
    usageDir = 'usage',
    fileDirs = ['elements', 'patterns']

_.merge(template, {
    config: config
}, {
    components: fs.readdirSync(componentsDir).filter(function(file) {
        return path.extname(file) === '.html'
    }).reduce(function(obj, file) {
        return (obj[path.basename(file, '.html')] = fs.readFileSync(path.join(componentsDir, file)), obj)
    }, {})
})

fileDirs.forEach(function(dir) {
    var content = {
        objects: [],
        title: dir.toTitleCase(),
        href: dir
    }
    fs.readdirSync(path.join(contentDir, markupDir, dir)).filter(function(file) {
        return path.extname(file) === '.html'
    }).forEach(function(file) {
        var comp = {
            title: path.basename(file, '.html').replace('-', ' ').toTitleCase(),
            href: path.basename(file, '.html'),
            type: dir,
            fileName: file,
            content: fs.readFileSync(path.join(contentDir, markupDir, dir, file)),
            example: helpers.tryLoadFile(path.join(contentDir, examplesDir, dir, file)),
            usage: helpers.tryLoadFile(path.join(contentDir, usageDir, dir, file))
        }
        content.objects.push(comp)
    })
    template.content.push(content)
})

// Index
app.get('/', function(req, res) {
    if (config.brandai.enabled) {
        request.get({
            url: util.format("https://api.brand.ai/styleguide/%s/%s?key=%s", config.brandai.org, config.brandai.name, config.brandai.key),
            json: true
        }, function(err, response, body) {
            _.merge(template, {
                brandai: _.merge(body.result, {
                    googleFonts: helpers.buildGoogleFontsLink(body.result),
                    customFonts: util.format("https://api.brand.ai/styleguide/%s/%s/custom-fonts.css?key=%s", config.brandai.org, config.brandai.name, config.brandai.key)
                })
            })
            template.brandai.colorSections.forEach(function(section) {
                section.colors.map(function(color) {
                    color.value = helpers.rgbToHex.apply(this, color.value.match(/(\d+)/g))
                    return color
                })
            })
            res.status(200).send(pageBuilder(template))
        })
    } else {
        res.status(200).send(pageBuilder(template))
    }
})

// Static files
app.use('/images', express.static('images'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

// Live reload
app.use(require('connect-livereload')({
    port: config.livereload.port || 35729
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