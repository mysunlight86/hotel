# Hotel

## Overview
* Intro
* Project deployment
* Technologies

### Intro

Project for page layout for finding hotel rooms. The source codes of the project are stored in the `src` directory. The finished project is going to the `dist` folder. 

### Project deployment

**To install dependencies**

```npm install```

**To run a project in development mode**

```npm run dev```

**To run a project in development mode with tracking changes in files**

```npm run watch```

**To run a project in development mode with a web server running on port 4200**

```npm run start```

**To collect files in a project**

```npm run build```

### Technologies
1. [webpack](http://webpack.github.io/)
    * webpack &mdash; collector of modules and resources
    * webpack-cli &mdash; webpack command line interface
    * webpack-dev-server &mdash; a development server
    * html-webpack-plugin &mdash; creates an HTML file based on a template
    * clean-webpack-plugin &mdash; cleans up the dist directory every time the project is built. This allows you to automatically delete old files that are no longer needed.
    * file-loader &mdash; to emit a file into the output directory
    * css-loader &mdash; loading styles for the main JS file containing the CSS import
    * style-loader &mdash; applying styles to DOM elements via the style element
    * copy-webpack-plugin &mdash; сopies individual files or entire directories, which already exist, to the build directory.
    * mini-css-extract-plugin &mdash; extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    * css-minimizer-webpack-plugin &mdash; uses cssnano to optimize and minify CSS files
2. [babel](https://babeljs.io/)
    * babel-loader &mdash; transpiling files with Babel and webpack
    * @babel/core &mdash; transpiling ES2015 + to backward compatible JavaScript
    * @babel/preset-env &mdash; useful Babel default settings
    * @babel/plugin-proposal-class-properties &mdash; example of custom Babel configuration (setting instance properties in the body of the class, not in its constructor)
3. [normalize.css](https://necolas.github.io/normalize.css/)
    * Normalize.css makes browsers render all elements more consistently and in line with modern standards.
4. [jquery](https://jquery.com/)
    * jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
