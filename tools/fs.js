import fs from 'fs';

const exists = filename => new Promise(resolve => {
  fs.exists(filename, resolve);
});

const readFile = filename => new Promise((resolve, reject) => {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const writeFile = (filename, content) => new Promise((resolve, reject) => {
  fs.writeFile(filename, content, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

export default { exists, readFile, writeFile };
