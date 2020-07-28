module.exports.simple = [
  '\n.fixture {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '}'
].join('\n');

module.exports.customName = [
  '\n.foobar {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '}'
].join('\n');

module.exports.width = [
  '\n.fixture {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '    width: 1px;',
  '}'
].join('\n');

module.exports.height = [
  '\n.fixture {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '    height: 1px;',
  '}'
].join('\n');

module.exports.both = [
  '\n.fixture {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '    width: 1px;',
  '    height: 1px;',
  '}'
].join('\n');

module.exports.bgsize = [
  '\n.fixture {',
  '    background-image: url(\'data:image/gif;name=fixture.gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7\');',
  '    background-size: 1px 1px;',
  '}'
].join('\n');
