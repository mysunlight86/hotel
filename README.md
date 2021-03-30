# Hotel

## Overview
* Intro
* Project deployment
* Technologies

---

### Intro

Project for page layout for finding hotel rooms. The source codes of the project are stored in the `src` directory. The finished project is going to the `dist` folder. 

---

### Project deployment

**To install dependencies**

```npm install```

**To run a project in development mode**

```npm run dev```

**To run a project in development mode with a web server running on port 4200**

```npm run start```

**To collect files in a project (in production mode)**

```npm run build```

---

### Technologies
1. [webpack](http://webpack.github.io/)
    * webpack &mdash; collector of modules and resources
    * webpack-cli &mdash; webpack command line interface
    * webpack-dev-server &mdash; a development server
    * html-webpack-plugin &mdash; creates an HTML file based on a template
    * clean-webpack-plugin &mdash; cleans up the dist directory every time the project is built. This allows you to automatically delete old files that are no longer needed.
    * copy-webpack-plugin &mdash; сopies individual files or entire directories, which already exist, to the build directory.
    * cross-env &mdash; run scripts that set and use environment variables across platforms
2. [babel](https://babeljs.io/)
    * babel-loader &mdash; transpiling files with Babel and webpack
    * @babel/core &mdash; transpiling ES2015 + to backward compatible JavaScript
    * @babel/preset-env &mdash; useful Babel default settings
    * core-js &mdash; Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2021: promises, symbols, collections, iterators, typed arrays, many other features, ECMAScript proposals, some cross-platform WHATWG / W3C features and proposals like URL. You can load only required features or use it without global namespace pollution.
3. [sass](https://sass-lang.com/)
    * css-loader &mdash; loading styles for the main JS file containing the CSS import
    * style-loader &mdash; applying styles to DOM elements via the style element
    * mini-css-extract-plugin &mdash; extracts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    * css-minimizer-webpack-plugin &mdash; uses cssnano to optimize and minify CSS files
    * postCSS &mdash; a CSS post-processing tool that can transform your CSS in a variety of ways, such as auto-prefixing.
    * autoprefixer &mdash; postCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
    * node-sass &mdash; a package that compiles Sass to CSS
    * sass-loader &mdash; downloads SCSS and compiles it to CSS
4. [pug](https://pugjs.org/api/getting-started.html)
    * pug-loader &mdash; loads Pug and Jade templates and returns a function
5. [normalize.css](https://necolas.github.io/normalize.css/)
    * Normalize.css makes browsers render all elements more consistently and in line with modern standards.
6. [jquery](https://jquery.com/)
    * jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.
