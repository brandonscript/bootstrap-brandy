# Bootstrap Brandy
![Codacy](https://img.shields.io/codacy/grade/df020913faeb47c8a7f352892f32b2e4.svg?maxAge=2592000) ![NPM-downloads](https://img.shields.io/npm/dm/bootstrap-brandy.svg?maxAge=2592000) ![NPM-version](https://img.shields.io/npm/v/bootstrap-brandy.svg)


![Logo](http://i.imgur.com/oYSt3KC.png?1) 

A living style guide for Bootstrap 3 SASS projects, built on Node.js, Grunt, and Handlebars, with optional [Brand.ai](brand.ai) integration.

![Header Image](http://i.imgur.com/zl9Z47F.png)

Based on Brett Jankord's [Style Guide Boilerplate](http://brettjankord.com/projects/style-guide-boilerplate/), [Kemie's Bootstrap Fork](https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition), and [Brad Mason's Node.js implementation](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs). I've elected _not_ to retain the forked dependency, in favor of a fresh, clean repo.

## Installation

(If you want to skip this part, just copy `/example` and customize it. Make sure you change the dependency in package.json to point to the npm package `bootstrap-brandy` not the github repo.)

The easiest way to get started is via [npm](https://www.npmjs.com/package/bootstrap-brandy).

1. Install Node.js version 6.0 or higher.

2. Install [Grunt](http://gruntjs.com/), and be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

3. Create a new Node.js project folder and install the style guide core:

	```bash
	$ npm install bootstrap-brandy --save
	```
    
4. Create Gruntfile.js in the root folder of your new project:

	```javascript
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
	                    'node_modules/bootstrap-brandy': ['default', '--assets=' + path.resolve()]
	                }
	            }
	        }
	    })
	    grunt.registerTask('default', ['subgrunt:styleguide'])
	}
	```
	
5. Install [npm](npmjs.com) dependencies in the root folder of your project:

    ```bash
    $ npm install
    ```
    
    
## Configuration 

Create a new config.json file in the root folder of your project:

```json
{
    "brandai": {
        "enabled": true,
        "key": "yourAPIKey",
        "name": "yourStyleGuideName",
        "org": "yourOrg"
    },
    "livereload": {
        "port": 35729
    },
    "project": {
        "name": "My"
    },
    "server": {
        "port": 8080
    }
}
```

## Creating content

All user-configurable content (elements, patterns, etc.) must be added to the `/content` directory as individual .html files. 

Create an applicable .html file for the content you want to add. Each file must named identically in all the folders they're being added to. 

For example, if you want to add a section for buttons, you'll need to add:

- Page-rendered markup: `markup/*/buttons.html`
- Usage doc: `usage/*/buttons.html` (optional)
- Copy/paste-friendly code snippets: `examples/*/buttons.html` (optional)

## CSS style customization & Bootstrap theme

- Define your custom boostrap overrides in `_theme.scss`, and optionally import `external/brandai.scss` if you're integrating with Brand.ai.
- Define your custom CSS styles in `style.scss`.
    

## Fire it up!

To run the project, simply run:

```bash
$ grunt
```

(That was easy, right?)

## Contributing

Please fork and submit a pull request. The project has been designed to keep the core services isolated from any user-configurable content, but please ensure sure you don't include any user-created elements in the PR.

By default, you should not include any of the following:

	scss/_theme.scss
	scss/style.scss
	scss/**/*
	content/**/*
	config.json
	
To make developing easier, you may want to clone this project and keep it separate from your user-configurable elements. To do this, edit your project's Gruntfile.js to add a `grunt-contrib-copy` option (which you'll need to install):

    module.exports = function(grunt) {
        require('load-grunt-tasks')(grunt)
        var path = require('path')
        grunt.initConfig({
            copy: {
                dev: {
                    expand: true,
                    cwd: '/Users/{you}/Development/bootstrap-brandy',
                    src: ['**/*'],
                    dest: path.join(process.cwd(), 'node_modules/bootstrap-brandy/')
                }
            },
            subgrunt: {
                styleguide: {
                    options: {
                        npmInstall: false // or true, if you want to always install from git
                    },
                    projects: {
                        'node_modules/bootstrap-brandy': ['default', '--assets=' + path.resolve()]
                    }
                }
            }
        })
        grunt.registerTask('default', ['subgrunt:styleguide'])
        grunt.registerTask('dev', ['copy:dev', 'subgrunt:styleguide'])
    }

Then add the `dev` argument when starting the project:

    $ grunt dev
    
## Troubleshooting

### SASS is not installed

If you try to run the project and don't have sass installed, you might get an error indicating as much. El Capitan has Ruby restrictions, so try:

```
$ sudo gem install sass -n/usr/local/bin
```
Or use NVM, brew, or rubenv to manage a local instance of Ruby.

### Fatal error: Unable to find local grunt

You probably forgot to run `$ npm install` after cloning the project. Check out Installation step 5.

## Licensing 
**Bootstrap Brandy** is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Additional Resources
[Bootstrap documentation](http://getbootstrap.com/css/)
