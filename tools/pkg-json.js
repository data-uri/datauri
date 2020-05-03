const pkg = require('../package.json');
const fs = require('fs-extra');
const buildConfig = pkg['datauri-build'];
const names = Object.keys(buildConfig);

function createConfig(source, keys) {
  const obj = {};

  Object.keys(source)
    .filter(key => keys.includes(key))
    .forEach(key => (obj[key] = source[key]));

  return obj;
}


const createPkg = async (name, meta) => {
  const props = ['version', 'repository', 'engines', 'keywords', 'author', 'license', 'maintainers'];
  const config = createConfig(pkg, props);
  const newPkg = Object.assign({}, config, meta);
  const encoding = 'utf-8';

  await fs.outputFile(`lib/${name}/package.json`, JSON.stringify(newPkg), encoding);
  await fs.outputFile(`lib/${name}/.npmignore`, 'node_modules', encoding);

  const readme = await fs.readFile(`docs/${name}.md`, encoding);

  await fs.outputFile(`lib/${name}/readme.md`, readme, encoding);
}

function getMetadata(name) {
  const meta = {
    name: name,
    dependencies: createConfig(pkg.devDependencies, buildConfig[name].dependencies)
  }

  if (name.endsWith('cli')) {
    meta.dependencies[names[0]] = pkg.version;
    meta.bin = buildConfig[name].bin;
  }

  meta.description = buildConfig[name].description;

  return meta;
}

names.forEach(async (name) => await createPkg(name, getMetadata(name)))
