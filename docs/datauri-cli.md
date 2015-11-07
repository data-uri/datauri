# datauri
[![Build Status](https://travis-ci.org/heldr/grunt-smushit.svg?branch=master)](http://travis-ci.org/heldr/datauri) [![Coverage Status](https://coveralls.io/repos/heldr/datauri/badge.svg?branch=master&service=github)](https://coveralls.io/github/heldr/datauri?branch=master) [![Dependency Status](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2) [![NPM version](http://img.shields.io/npm/dm/datauri.svg?style=flat)](https://www.npmjs.org/package/datauri)

[Module](http://npm.im/datauri) and [Client](http://npm.im/datauri-cli) to generate [Data URI scheme][datauri].

## CLIENT
`npm install -g datauri-cli` (it may require Root privileges)

### Print
To print a data-uri scheme from a file
```CLI
$ datauri brand.png
```

### CSS Background
You can generate or update an output css file with data-uri background:
```CLI
$ datauri brand.png --css=asset/background.css
```

If you want to define a Class Name, width and etc just type:

```CLI
$ datauri brand.png --css=asset/background.css --class=MyNewClass
$ datauri brand.png --css=asset/background.css --width --height
$ datauri brand.png --css=asset/background.css --background-size
```
## Release notes

* 1.0-alpha - many changes, will be documented soon
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
