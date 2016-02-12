
<h1 align="center">
  <br />
  <img width="365" src="https://cdn.rawgit.com/heldr/datauri/master/media/datauri.svg" alt="datauri" />
  <br />
  <br />
  <br />
</h1>

[Module](http://npm.im/datauri) and [Client](http://npm.im/datauri-cli) to generate [Data URI scheme][datauri].

[![Build Status](https://travis-ci.org/heldr/grunt-smushit.svg?branch=master)](http://travis-ci.org/heldr/datauri) [![Coverage Status](https://coveralls.io/repos/heldr/datauri/badge.svg?branch=master&service=github)](https://coveralls.io/github/heldr/datauri?branch=master) [![Dependency Status](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2) [![NPM version](http://img.shields.io/npm/dm/datauri.svg?style=flat)](https://www.npmjs.org/package/datauri)

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

NPM SCRIPT
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

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[nodejs]: http://nodejs.org/download
[iojs]: https://iojs.org/
[datauri]: http://en.wikipedia.org/wiki/Data_URI_scheme
[promisesaplus]: http://promises-aplus.github.io/promises-spec/
