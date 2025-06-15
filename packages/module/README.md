<h1 align="center">
  <br>
  <img width="365" src="https://avatars.githubusercontent.com/u/24514423?s=365&v=4" alt="datauri">
  <br>
  <br>
  <br>
</h1>

Node.js [Module](#module) and [CLI](http://npm.im/datauri-cli) to generate [Data URI scheme](http://en.wikipedia.org/wiki/Data_URI_scheme).

> The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

## MODULE [![Build Status](https://github.com/data-uri/datauri/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/data-uri/datauri/actions/workflows/main.yml?query=branch%3Amain)

`npm install datauri`

### Getting started
By default, datauri module returns a promise, which is resolved with an object containing the data URI content and metadata about the file.

```js
import datauri from 'datauri';
// const datauri = require('datauri'); // for CommonJS

const { content, ...meta } = await datauri('test/myfile.png');

console.log(content);
//=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.base64);
//=> "iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.mimetype);
//=> "image/png"
```

### Callback style and meta data
If you prefer to use a callback style, you can pass a callback function as the second argument. The callback will receive an error (if any), the data URI content, and metadata about the file.

```js
import datauri from 'datauri';

datauri('test/myfile.png', (err, content, meta) => {
  if (err) {
    throw err;
  }

  console.log(content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

  console.log(meta.mimetype); //=> "image/png"
  console.log(meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
  console.log(meta.buffer); //=> file buffer
});
```

### CSS parser
To generate a CSS class with the data URI as a background image, you can use the `@datauri/css` package. This is useful for embedding images directly into your CSS files.

`npm install datauri @datauri/css`

```js
import datauri from 'datauri';
import datauriCSS from '@datauri/css';

const data = await datauri('test/myfile.png');
await datauriCSS(data);
//=> "\n.myfile {\n    background-image: url('data:image/png; base64,iVBORw..."

await datauriCSS(data, {
  className: 'myClass',
  width: true,
  height: true
});
//=> adds image width and height and custom class name
```

### Synchronous calls
If you want to use synchronous calls, you can use `datauri/sync` module. This is useful for small files or when you need to block execution until the data URI is generated.
```js
import datauri from 'datauri/sync';
const meta = datauri('test/myfile.png');

console.log(meta.content); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.mimetype); //=> "image/png"
console.log(meta.base64); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
console.log(meta.buffer); //=> file buffer
```

### From a Buffer

If you already have a file Buffer, that's the way to go:

```js
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

const buffer = fs.readFileSync('./hello');

parser.format('.png', buffer); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

parser.getMeta('base64'); //=> "iVBORw0KGgoAAAANSUhEUgAA..."
parser.getMeta('mimetype'); //=> "image/png"
```

### From a string

```js
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();

parser.format('.txt', 'xkcd'); //=> "data:plain/text;base64,eGtjZA=="
parser.getMeta('base64'); //=> "eGtjZA=="
parser.getMeta('mimetype'); //=> "text/plain"
```

## Contribute

Data URI is developed in a monorepo with [pnpm](https://pnpm.io/), [biome](https://biomejs.dev/) and [vitest](https://vitest.dev/). After cloning the repository, you can install the dependencies and run the tests with the following commands:

```CLI
$ pnpm i
```

To run test specs

```CLI
$ pnpm test
```

## [ChangeLog](https://github.com/data-uri/datauri/releases)

## Requirements

Node.js 16+

### Previous Node versions and deprecated features:

Node.js 10 until 15
`npm install --save datauri@4`
docs: https://github.com/data-uri/datauri/blob/v4.1.0/docs/datauri.md

Node.js 8
`npm install --save datauri@3`
docs: https://github.com/data-uri/datauri/blob/v3.0.0/docs/datauri.md

Node.js 4+
`npm install --save datauri@2`
docs: https://github.com/data-uri/datauri/blob/v2.0.0/docs/datauri.md

## License

MIT License

(c) [Data-URI.js](https://github.com/data-uri)

(c) [Helder Santana](https://heldr.com)
