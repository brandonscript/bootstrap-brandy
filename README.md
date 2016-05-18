![Header Image](todo)
A living Style Guide Toolkit for Bootstrap 3.
==============================

A living style guide toolkit for Bootstrap-based projects, built on Bootstrap 3, Node.js and Handlebars.

Based on Brett Jankord's [Style Guide Boilerplate](http://brettjankord.com/projects/style-guide-boilerplate/), [Kemie's Bootstrap Fork](https://github.com/kemie/Style-Guide-Boilerplate-Bootstrap-Edition), and [Brad Mason's Node.js implementation](https://github.com/DeadlyBrad42/Style-Guide-Boilerplate-nodejs). I've elected _not_ to retain the forked dependency, in favor of retaining a fresh, clean repo.


## Getting Started With Bootstra-based Style Guide

### Download or clone the project
You can clone, fork, or download the repo directly from GitHub.

### Set the title of your style guide
Open `/style/title.html` and change the text to something like 'My Style Guide'

### Hook up your own CSS into the style guide
Define your custom boostrap overrides (and custom styles) in `theme.css`. 
    
### Install Node.js
The project is Node.js based, so you'll need to have Node.js installed. 

### Install dependencies from NPM
`$ cd` to the project folder and type `$ npm install` to configure the Node.js dependencies.

### Start the server
Run `$ node server.js` to start the server, or use something like Nodejitsu's Forever to have it continually run. Changes to the file system will automatically be picked up each time you load the page.

Browse to `http://localhost:8080` to see your custom style guide.

### Folder structure
The boilerplate comes with several out-of-the-box components. Simply add a new .html file to the directory to have it appear in the style guide:

    - Elements are kept in `/markup/elements`. 
    - Patterns (custom controls and objects you implement) are kept in `/markup/patterns`.

### Custom usage documentation
To add documentation for an element, create a new .html file with the applicable subfolder inside the `/usage` directory.

#### Brand.ai integration
This project is designed to integrate with [Brand.ai](http://brand.ai). If you don't want to use Brand.ai, for the time being, you'll need to fork and remove those components from `server.js` until that feature has been modularized.

To set up your API connection, locate your API key at brand.ai (it's visible in the Connect > JSON section). Replace the empty `"url"` value in `/js/brandai.json` with `https://api.brand.ai/styleguide/{org}/{guide-name}?key={your-key}`.

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




