'use strict';
import pkg from '../package.json';
import fs from './fs';

const buildConfig = pkg['datauri-build'];
const names = Object.keys(buildConfig);

function createConfig(source, keys) {
  const obj = {};

  Object.keys(source)
    .filter(key => keys.includes(key))
    .forEach(key => (obj[key] = source[key]));

  return obj;
}


const createPkg = async(name, meta) => {
  const props = ['version', 'repository', 'engines', 'keywords', 'author', 'license'];
  const config = createConfig(pkg, props);
  const newPkg = Object.assign({}, config, meta);

  await fs.writeFile(`lib/${name}/package.json`, JSON.stringify(newPkg));
  await fs.writeFile(`lib/${name}/.npmignore`, 'node_modules');

  const index = await fs.readFile('index.js');
  const readme = await fs.readFile(`docs/${name}.md`);

  await fs.writeFile(`lib/${name}/index.js`, index);
  await fs.writeFile(`lib/${name}/README.md`, readme);
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

  return meta;
}

names.forEach(async(name) => await createPkg(name, getMetadata(name)))
