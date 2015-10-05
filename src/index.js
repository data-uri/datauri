import Api from './datauri/api';

const ENC_TYPE = configSize => configSize > 1 ? 'encode' : 'encodeSync';

class DataURI extends Api {

  constructor(...config) {
    super();

    let configSize = config.length;

    configSize && this[ENC_TYPE(configSize)].apply(this, config);
  }

  static promise(fileName) {
    let datauri = new DataURI();

    return new Promise((resolve, reject) => {
      datauri.on('encoded', resolve)
        .on('error', reject)
        .encode(fileName);
    });
  }

  static sync(fileName) {
    let datauri = new DataURI(fileName);

    return datauri.content;
  }

}

module.exports = DataURI;
