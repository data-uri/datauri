import Api from './api';

const ENC_TYPE = configSize => configSize > 1 ? 'encode' : 'encodeSync';

class DataURI extends Api {

  constructor(...config) {
    super();

    const { length: configSize } = config;

    if (configSize) {
      this[ENC_TYPE(configSize)](...config);
    }
  }

  static promise(fileName) {
    const datauri = new DataURI();

    return new Promise((resolve, reject) => {
      datauri.on('encoded', resolve)
        .on('error', reject)
        .encode(fileName);
    });
  }

  static sync(fileName) {
    const { content } = new DataURI(fileName);

    return content;
  }

}

module.exports = DataURI;
