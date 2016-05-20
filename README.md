![Header Image](todo)
A living Style Guide Toolkit for Bootstrap 3
==============================

A living style guide toolkit for Bootstrap-based projects, built on Bootstrap 3, Node.js and Handlebars.

Based on Brett Jankord's [Style Guide Boilerplate](http://brettjankord.com/projects/style-guide-boilerplate/), [Kemie's Bootstrap Fork](https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition), and [Brad Mason's Node.js implementation](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs). I've elected _not_ to retain the forked dependency, in favor of a fresh, clean repo.


## Getting Started With Bootstrap-based Style Guide

### 1. Download or clone the project

You can clone, fork, or download the repo directly from GitHub.

### 2. Set the title of your style guide

Open `/components/title.html` and change the title tag's text.

### 3. Add your own CSS into the style guide
Define your custom boostrap overrides (and custom styles) in `theme.css`. 
    
### 4. Install Node.js and NPM dependencies
The project is Node.js based, so you'll need to have [Node.js installed](https://nodejs.org/en/download/), then `$ cd` to the project folder and type `$ npm install` to configure the Node.js dependencies.

### 5. Start the server
This project is designed to use [Grunt](http://gruntjs.com) to live-reload the page each time you make a change to one of its components. Simply run `$ grunt` from the project directory to start the server. If you don't want to use Grunt, you can use [nodemon](http://nodemon.io) to have it continually run but without the live reload, or run it manually by running `$ node server.js`.

Browse to `http://localhost:8080` once the server is running.

### 6. Adding elements and patterns
The boilerplate comes with several out-of-the-box components. Add a new .html file into one of these directories to have it appear in the style guide:

- Elements are kept in `/markup/elements`. 
- Patterns (custom controls and objects you implement) are kept in `/markup/patterns`.

If you want to change these or add to them, you will need to modify server.js for the time being.

### 7. Custom usage details and documentation
To add documentation for an element, create a new .html file with the applicable subfolder inside the `/usage` directory.

### 8. Brand.ai integration
This project is designed to integrate with [Brand.ai](http://brand.ai). If you don't want to use Brand.ai, for the time being, you'll need to fork and remove those components from `server.js` until that feature has been modularized.

To set up your API connection, locate your API key at brand.ai (it's visible in the Connect > JSON section). Update the template `/config/brandai.json` your org, style-guide name, and key:

	{
	    "key": "...",
	    "org": "yourOrg",
	    "name": "yourStyleGuideName"
	}

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




