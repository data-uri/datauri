
<h1 align="center">
  <br />
  <img width="365" src="media/datauri.svg" alt="datauri" />
  <br />
</h1>

Node.js [Module](#module) and [Client](http://npm.im/datauri-cli) to generate [Data URI scheme][datauri].

>  The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

[![Build Status](https://travis-ci.org/heldr/grunt-smushit.svg?branch=master)](http://travis-ci.org/heldr/datauri) [![Coverage Status](https://coveralls.io/repos/heldr/datauri/badge.svg?branch=master&service=github)](https://coveralls.io/github/heldr/datauri?branch=master) [![Dependency Status](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2) [![NPM version](http://img.shields.io/npm/dm/datauri.svg?style=flat)](https://www.npmjs.org/package/datauri)

## MODULE
`npm install --save datauri`

1. [From file path](#readable-stream)
  * [Asynchronous](#readable-stream)
    * [Readable Stream](#readable-stream)
    * [Promise](#promise-node-012-works-with-es2016-asyncawait)
    * [Callback](#callback)
  * [Synchronous](#synchronous-class)
    * [Class](#synchronous-class)
    * [Function](#synchronous-function)
2. [From a Buffer](#from-a-buffer)
3. [From a String](#from-a-string)
4. [Method chaining](#from-a-string)
5. [Task plugins using datauri](#tools-using-datauri)
  * [npm script](#npm-script)
  * [gulp](#gulp)
  * [grunt](#grunt)
6. [Develop](#develop)
6. [License](#license)

### Readable Stream
```js
const Datauri = require('datauri');
const datauri = new Datauri();

datauri.pipe(process.stdout);
datauri.encode('test/myfile.png');
```

```js
const Datauri = require('datauri');
const datauri = new Datauri();

datauri.on('encoded', content => console.log(content));
//=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

datauri.on('error', err => console.log(err));
datauri.encode('test/myfile.png');
```

### Promise (node 0.12+, works with es2016 async/await)
```js
'use strict';

const DataURI = require('datauri').promise;
// babelers: import { promise as DataURI } from 'datauri';

DataURI('test/myfile.png')
  .then(content => console.log(content))
  //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  .catch(err => { throw err; });
```

### Callback
```js
const DataURI = require('datauri');
const datauri = new DataURI();

datauri.encode('test/myfile.png', (err, content) => {
  if (err) {
      throw err;
  }

  console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

  console.log(this.mimetype); //=> "image/png"
  console.log(this.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
  console.log(this.getCSS()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
  console.log(this.getCSS({
    class: "myClass",
    width: true,
    height: true
  })); //=> adds image width and height and custom class name
});

```


### Synchronous Class
If DataURI class is instanciated with a file path, the same will be processed synchronously.

```js
const Datauri = require('datauri');
let   datauri = new Datauri('test/myfile.png');

console.log(datauri.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
console.log(datauri.mimetype); //=> "image/png"
console.log(datauri.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
console.log(datauri.getCSS()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
console.log(datauri.getCSS("myClass")); //=> "\n.myClass {\n    background-image: url('data:image/png;base64,iVBORw..."
```

### Synchronous Function
```js
const Datauri = require('datauri').sync;

console.log(Datauri('test/myfile.png')); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```
or for ES2015/6 lovers

```js
import { sync as DataURI } from 'datauri';

console.log(DataURI('test/myfile.png')); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

### From a Buffer
If you already have your file as a Buffer, use this. It's much faster than passing a string.

```js
const Datauri = require('datauri'),
const datauri = new Datauri();

//...
const buffer = fs.readFileSync('./hello');
//...

datauri.format('.png', buffer);

console.log(datauri.content); //=> "data:image/png;base64,eGtjZA=="
console.log(datauri.mimetype); //=> "image/png"
console.log(datauri.base64); //=> "eGtjZA=="
console.log(datauri.getCSS({
  class: "myClass",
  width: true,
  height: true
})); //=> adds image width and height and custom class name

```

### From a string
```js
const DataURI = require('datauri');
const datauri = new Datauri();

datauri.format('.png', 'xkcd');

console.log(datauri.content); //=> "data:image/png;base64,eGtjZA=="
console.log(datauri.mimetype); //=> "image/png"
console.log(datauri.base64); //=> "eGtjZA=="
console.log(datauri.getCSS({
  class: "myClass",
  width: true,
  height: true
})); //=> adds image width and height and custom class name

```

#### Method chaining
```js
//...
datauri
  .on('encoded', content => {
    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    console.log(this.mimetype); //=> "image/png"
    console.log(this.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
    console.log(this.getCSS()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
    console.log(this.getCSS({
      class: "myClass"
    }); //=> "\n.myClass {\n    background-image: url('data:image/png;base64,iVBORw..."
  })
  .on('error', err => console.error(err))
  .encode('test/myfile.png');
```

### Tools using datauri

NPM SCRIPT AND TERMINAL CLIENT
-------
* [datauri-cli](https://npmjs.org/package/datauri-cli)


GULP
-----

* [gulp-image-data-uri](https://github.com/adam-lynch/gulp-image-data-uri) - A [Gulp](http://github.com/gulpjs/gulp) plugin for converting images to inline data-URIs. Intended to be a simple single-purpose wrapper for [heldr/datauri](https://github.com/heldr/datauri).

GRUNT
-----

There are a bunch of grunt plugins running on top of datauri module.

* [grunt-datauri](https://npmjs.org/package/grunt-datauri) - Create base64 encoded data-uris for css from images
* [grunt-imweb](https://npmjs.org/package/grunt-imweb) - IMWEB Tasks Collection For Daily Workflow.
* [grunt-static-inline](https://npmjs.org/package/grunt-static-inline) - A grunt plugin to replace url from static files such as img,js,css an put inline in a template.
* [grunt-data-uri](https://npmjs.org/package/grunt-data-uri) - Convert to data-uri from image path.
* [grunt-inline](https://npmjs.org/package/grunt-inline)

DEVELOP
-------

```CLI
$ npm install
$ npm run check
```

To run test specs

```CLI
$ npm run spec
```

If you'd like to test the full process including npm installer, just run:

```CLI
$ npm run fulltest
```

## Release notes

* 1.0 - async by default, native promise, streams, split between datauri and datauri-cli package
* 0.8 - remove node 0.8 support
* 0.7 - generate css background-image instead of background shorthand
* 0.6 - io.js support
* 0.5 - Format data uri from a string
* 0.4 - Promises support
* 0.3 - API Rewritten from the top to the bottom + full async compatibility
* 0.2 - Splitted in submodules mimer and templayed
* 0.1 - First release

## License

MIT License
(c) [Helder Santana](http://heldr.com)
