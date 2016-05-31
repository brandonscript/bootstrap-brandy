![Header Image](http://i.imgur.com/zl9Z47F.png)
# A Style Guide Toolkit for Bootstrap 3

A living style guide toolkit for Bootstrap-based projects, built on Bootstrap 3, Node.js and Handlebars, with optional [Brand.ai](brand.ai) integration.

Based on Brett Jankord's [Style Guide Boilerplate](http://brettjankord.com/projects/style-guide-boilerplate/), [Kemie's Bootstrap Fork](https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition), and [Brad Mason's Node.js implementation](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs). I've elected _not_ to retain the forked dependency, in favor of a fresh, clean repo.

Also note that the name is subject to change once a better (catchier, hipsterier, awesomer) name is chosen.

## Installation

The easiest way to get started is via [npm](npmjs.com). Currently this project is under heavy development, so you will need to point directly to the git repo when installing.

1. Install [Grunt](http://gruntjs.com/), and be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

2. Create a new Node.js project folder  (or copy `/example`), then add the project:

	    $ npm install brandonscript/bootstrap-based-style-guide --save
    
3. Create (or copy) Gruntfile.js in your new project folder:

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
	
4. Install [npm](npmjs.com) dependencies:

	    $ npm install
    
    
## Configuration 

Create a new config.json file in the root of your project:

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

    $ grunt

(That was easy, right?)

## Contributing

Please fork and submit a pull request. The project has been designed to keep the core services isolated from any user-configurable content, but please ensure sure you don't include any user-created elements in the PR.

By default, you should not include any of the following:

	scss/_theme.scss
	scss/style.scss
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
	                cwd: '/path/to/core-project-working-dir',
	                src: ['index.html', 'package.json', 'Gruntfile.js', 'server.js', 'scss/framework/*.scss'],
	                dest: path.join(process.cwd(), 'node_modules/bootstrap-style-guide/')
	            }
	        },
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
	    grunt.registerTask('dev', ['copy:dev', 'subgrunt:styleguide'])
	}

Then add the `dev` argument when starting the project:

    $ grunt dev

## Licensing 
**Bootstrap-based Style Guide** is licensed under the [MIT License](http://en.wikipedia.org/wiki/MIT_License)

## Additional Resources
[Original Style Guide Boilerplate](http://brettjankord.com/projects/style-guide-boilerplate/)

[Kemie's Bootstrap Fork](https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition)

[Brad Mason's Node.js implementation](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs)

[Bootstrap documentation](http://getbootstrap.com/css/)

[Front-end Style Guides](http://24ways.org/2011/front-end-style-guides/)

[Creating Style guides](http://alistapart.com/article/creating-style-guides)

[Front-end Style Guide Roundup](https://gimmebar.com/collection/4ecd439c2f0aaad734000022/front-end-styleguides)

[Future-Friendly Style Guides](https://speakerdeck.com/lukebrooker/future-friendly-style-guides)

[HTML KickStart](http://www.99lime.com/elements/)

[Oli.jp Style Guide](http://oli.jp/2011/style-guide/)

[Jeremy Keith's Pattern Primer](http://adactio.com/journal/5028/)

[Starbucks Style Guide](http://www.starbucks.com/static/reference/styleguide/)




