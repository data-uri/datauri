# datauri
[![Build Status](https://travis-ci.org/heldr/grunt-smushit.svg?branch=master)](http://travis-ci.org/heldr/datauri) [![Coverage Status](https://coveralls.io/repos/heldr/datauri/badge.svg?branch=master&service=github)](https://coveralls.io/github/heldr/datauri?branch=master) [![Dependency Status](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2) [![NPM version](http://img.shields.io/npm/dm/datauri.svg?style=flat)](https://www.npmjs.org/package/datauri)

A simple [Data URI scheme][datauri] module and client for [Node.js][nodejs]. To install datauri, just run:




## CLIENT
`npm install -g datauri` (it may require Root privileges)

### Print datauri scheme
To print a data-uri scheme from a file
```CLI
$ datauri brand.png
```

### CSS Background
You can generate or update an output css file with data-uri background:
```CLI
$ datauri brand.png asset/background.css
```
If you want to define a Class Name, just type:
```CLI
$ datauri brand.png asset/background.css MyNewClass
```

## MODULE
`npm install --save datauri`

```js
const Datauri = require('datauri');
let   datauri = new Datauri();

datauri.on('encoded', function (content) {
    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
});

datauri.on('error', function (content) {
    console.log('Fail!');
});

datauri.encode('test/myfile.png');
```

### Promise (node 0.12+)
```js
import { promise as DataURI } from 'datauri';
// or var DataURI = require('datauri').promise;

DataURI('test/myfile.png')
  .then((content) => {
    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }).catch((err) => {
    throw err;
  });
```

### Callback for vintage users
```js
const DataURI = require('datauri');
let   datauri = new DataURI();

datauri.encode('test/myfile.png', function (err, content) {
  if (err) {
      throw err;
  }

  console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

  console.log(this.mimetype); //=> "image/png"
  console.log(this.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
  console.log(this.getCss()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
  console.log(this.getCss("myClass")); //=> "\n.myClass {\n    background-image: url('data:image/png;base64,iVBORw..."
});

```

### Create from a string
```js
const DataURI = require('datauri');
let datauri   = new Datauri();

datauri.format('.png', 'xkcd');

console.log(datauri.content); //=> "data:image/png;base64,eGtjZA=="
console.log(datauri.mimetype); //=> "image/png"
console.log(datauri.base64); //=> "eGtjZA=="
console.log(datauri.getCss("myClassName")); //=> "\n.myClassName {\n    background-image: url('data:image/png;base64,eGtjZA==..."

```

### Create from a Buffer
If you already have your file as a Buffer, use this. It's much faster than passing a string.

```js
var Datauri = require('datauri'),
    dUri    = new Datauri();

//...
var buffer = fs.readFileSync('./hello');
//...

dUri.format('.png', buffer);

console.log(dUri.content); //=> "data:image/png;base64,eGtjZA=="
console.log(dUri.mimetype); //=> "image/png"
console.log(dUri.base64); //=> "eGtjZA=="
console.log(dUri.getCss("myClassName")); //=> "\n.myClassName {\n    background-image: url('data:image/png;base64,eGtjZA==..."

```

#### Chaining all stuff
```js
//...
datauri
  .on('encoded', function (content) {
    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    console.log(this.mimetype); //=> "image/png"
    console.log(this.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
    console.log(this.getCss()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
    console.log(this.getCss("myClass")); //=> "\n.myClass {\n    background-image: url('data:image/png;base64,iVBORw..."
  })
  .on('error', function (content) {
      console.log('Fail!');
  })
  .encode('test/myfile.png');
```

### Sync (kids! Don't use it at home!)

#### Sync Class
If DataURI class is instanciated with a file path, the same will be processed synchronously.

```js
const Datauri = require('datauri');
let   datauri = new Datauri('test/myfile.png');

console.log(datauri.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
console.log(datauri.mimetype); //=> "image/png"
console.log(datauri.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
console.log(datauri.getCss()); //=> "\n.case {\n    background-image: url('data:image/png;base64,iVBORw..."
console.log(datauri.getCss("myClass")); //=> "\n.myClass {\n    background-image: url('data:image/png;base64,iVBORw..."
```

#### Sync Function
```js
const Datauri = require('datauri').sync;

console.log(Datauri('test/myfile.png')); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```
or for ES2015/6 lovers

```js
import { sync as DataURI } from 'datauri';

console.log(DataURI('test/myfile.png')); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
```

GRUNT
-----

There are a bunch of grunt plugins running on top of datauri module.

* [grunt-datauri](https://npmjs.org/package/grunt-datauri) - Create base64 encoded data-uris for css from images
* [grunt-imweb](https://npmjs.org/package/grunt-imweb) - IMWEB Tasks Collection For Daily Workflow.
* [grunt-static-inline](https://npmjs.org/package/grunt-static-inline) - A grunt plugin to replace url from static files such as img,js,css an put inline in a template.
* [grunt-data-uri](https://npmjs.org/package/grunt-data-uri) - Convert to data-uri from image path.
* [grunt-inline](https://npmjs.org/package/grunt-inline)

GULP
-----

* [gulp-image-data-uri](https://github.com/adam-lynch/gulp-image-data-uri) - A [Gulp](http://github.com/gulpjs/gulp) plugin for converting images to inline data-URIs. Intended to be a simple single-purpose wrapper for [heldr/datauri](https://github.com/heldr/datauri).

DEVELOPING
----------

```CLI
$ npm install
$ npm run watch
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

[nodejs]: http://nodejs.org/download
[iojs]: https://iojs.org/
[datauri]: http://en.wikipedia.org/wiki/Data_URI_scheme
[promisesaplus]: http://promises-aplus.github.io/promises-spec/
