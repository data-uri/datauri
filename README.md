datauri [![Build Status](https://secure.travis-ci.org/heldr/datauri.png?branch=master)](http://travis-ci.org/heldr/datauri)
=======

A simple [Data URI scheme][datauri] generator built on top of [Node.js][nodejs]. To install datauri, just run:

`npm install -g datauri` (it may require Root privileges)


CLIENT
------

### Print datauri scheme
To print a datauri scheme from a file
```CLI
$ datauri brand.png
```

### CSS Background
You can generate or update an output css file with datauri background:
```CLI
$ datauri brand.png asset/background.css
```
If you want to define a Class Name, just type:
```CLI
$ datauri brand.png asset/background.css MyNewClass
```

API
---

### Function
```js
var Datauri = require('datauri'),
    dUri    = Datauri('test/myfile.png');

console.log(dUri); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
```

### Class
```js
var Datauri = require('datauri'),
    dUri    = new Datauri('test/myfile.png');

console.log(dUri.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
console.log(dUri.mimetype); //=> "image/png";
console.log(dUri.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA...";
console.log(dUri.getCSS()); //=> "\n.case {\n    background: url('data:image/png;base64,iVBORw...";
console.log(dUri.getCSS("myClass")); //=> "\n.myClass {\n    background: url('data:image/png;base64,iVBORw...";
```

### Async

```js
var Datauri = require('datauri'),
    dUri    = new Datauri();

dUri.on('encoded', function (content) {
    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
});

dUri.on('error', function (content) {
    console.log('Fail!');
});

dUri.encode('test/myfile.png');
```

#### Chaining all stuff
```js
dUri.on('encoded', function (content) {
        console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
    })
    .on('error', function (content) {
        console.log('Fail!');
    })
    .encode('test/myfile.png');
```

### The famous callback async approach (haters gonna hate)
```js
var Datauri = require('datauri');

DataURI('test/myfile.png', function (err, content) {
    if (err) {
        throw err;
    }

    console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";
});

```


DEVELOPING
----------

The only essential library to develop datauri is jshint.

```CLI
$ make install
$ make test
```

If you'd like to test the full process including npm installer, just run:

```CLI
$ make fulltest
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[nodejs]: http://nodejs.org/download
[datauri]: http://en.wikipedia.org/wiki/Data_URI_scheme
