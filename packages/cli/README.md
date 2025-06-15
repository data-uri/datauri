# datauri-cli

[CLI](#cli) to generate [Data URI scheme](http://en.wikipedia.org/wiki/Data_URI_scheme) using [datauri module](http://npm.im/datauri).

> The data URI scheme is a uniform resource identifier (URI) scheme that provides a way to include data in-line in web pages as if they were external resources.

from: [Wikipedia](http://en.wikipedia.org/wiki/Data_URI_scheme)

## CLI [![Build Status](https://github.com/data-uri/datauri/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/data-uri/datauri/actions/workflows/main.yml?query=branch%3Amain)

`npm install -g datauri-cli` (it may require Root privileges)

or

`npx datauri-cli <file_path> <flags>`

### Getting started

To output data-uri content:

```CLI
$ datauri brand.png
```

or copy to clipboard:

```CLI
$ datauri brand.png --copy
```

### CSS Background

To output css with data-uri background:

```CLI
$ datauri brand.png --css
```

or copy to clipboard:

```CLI
$ datauri brand.png --css --copy
```

or create/update file:

```CLI
$ datauri brand.png --css=asset/background.css
```

If you want to define a className for the CSS class, you can use the `--className` option:

```CLI
$ datauri brand.png --css --className=MyNewClass
```

### Table of flags
| Flag                | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `--css`             | Output CSS with data-uri background, or specify css file to update          |
| `--className`       | Define a className for the CSS class                                        |
| `--copy`            | Copy the output to clipboard                                                |
| `--width`           | Set the width of the image in CSS (default: image width)                    |
| `--height`          | Set the height of the image in CSS (default: image height                   |
| `--backgroundSize`  | Set the background-size property in CSS (default: image dimensions)         |
| `--help`            | Show commands help information                                              |
| `--version`         | Show the current version of the CLI                                         |
| `--debug`           | Show debug information                                                      |


## [ChangeLog](https://github.com/data-uri/datauri/releases)

## Requirements

Node.js 16+

## License

MIT License
(c) [Data-URI.js](http://github.com/data-uri)
