var util = require('util'),
    fs = require('fs'),
    querystring = require("querystring")

require('rootpath')()

module.exports = {
    buildGoogleFontsLink: function(brandAi) {
        var url = "https://fonts.googleapis.com/css?family="
        url += brandAi.fonts.filter(function(font) {
            return font.source === 'google'
        }).map(function(font) {
            return util.format("%s:%s", font.family.replace(' ', '+'), font.variants.map(function(v) {
                return util.format("%s%s", module.exports.fontVariants.parse(v).weight, (module.exports.fontVariants.parse(v).italic) ? "italic" : "")
            }).join(','))
        }).join('&')
        return url
    },
    fontVariants: {
        toString: function(variant) {
            var style = styleFromCode(variant.split('')[0])
            var weight = weightFromCode(variant.split('')[1])
            return weight + style
        },
        parse: function(variant) {
            return {
                italic: variant.split('')[0] === 'i',
                weight: parseInt(variant.split('')[1]) * 100
            }
        }
    },
    tryLoadFile: function(path) {
        try {
            var content = fs.readFileSync(path)
            return content
        } catch (e) {
            return ""
        }
    },
    extendHandlebars: function(handlebars) {
        handlebars.registerHelper('nameToCSS', function(str) {
            return str.toLowerCase().replace(/ /g, '-')
        })

        handlebars.registerHelper('fontVariantString', function(str) {
            return module.exports.fontVariants.toString(str)
        })

        handlebars.registerHelper('fontStyle', function(fontObject, variant) {
            var fontString = "font-family: '" + fontObject.family + "'" + ((fontObject.fallback) ? ", " + fontObject.fallback : "") + "; "
            fontString += "font-weight: " + module.exports.fontVariants.parse(variant).weight + "; "
            if (module.exports.fontVariants.parse(variant).italic) {
                fontString += "font-style: italic;"
            }
            return fontString
        })
    },
    rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

function componentToHex(c) {
    var hex = parseInt(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function styleFromCode(style) {
    return (style === 'i') ? " Italic" : ""
}

function weightFromCode(weight) {
    switch (weight) {
        case '3':
            return "300 Light"
        case '4':
            return "400 Regular"
        case '7':
            return "700 Bold"
        default:
            return "400 Regular"
    }
}