# datauri-cli

 [CLI](#cli) to generate [Data URI scheme](http://en.wikipedia.org/wiki/Data_URI_scheme) using [datauri module](http://npm.im/datauri).

 >  The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

 from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

[![Build Status](https://travis-ci.org/data-uri/datauri.svg?branch=master)](http://travis-ci.org/data-uri/datauri) [![Coverage Status](https://coveralls.io/repos/data-uri/datauri/badge.svg?branch=master&service=github)](https://coveralls.io/github/data-uri/datauri?branch=master) [![Dependency Status](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2/badge.svg?style=flat)](https://www.versioneye.com/user/projects/560b7b3f5a262f001e0007e2) [![NPM version](http://img.shields.io/npm/dm/datauri.svg?style=flat)](https://www.npmjs.org/package/datauri)

## CLI
`npm install -g datauri-cli` (it may require Root privileges)

### Print
To print a data-uri scheme from a file
```CLI
$ datauri brand.png
```

or copy into your clipboard

```CLI
$ datauri brand.png --copy
```

### CSS Background

To output css with data-uri background:

```CLI
$ datauri brand.png --css
$ datauri brand.png --css --copy
```

or create/update file:

```CLI
$ datauri brand.png --css=asset/background.css
```

If you want to define a Class Name, width and etc just type:

```CLI
$ datauri brand.png --css --class=MyNewClass
$ datauri brand.png --css --width --height
$ datauri brand.png --css --background-size
```
## [ChangeLog](https://github.com/data-uri/datauri/releases)

## Requirements

Node.js 4+


## License

MIT License
(c) [Data-URI.js](http://github.com/data-uri)
