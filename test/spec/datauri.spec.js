import semver from 'semver';
import sinon from 'sinon';
import { should as Should } from 'chai';
import * as cssExp from '../constants/css';
import fs from 'fs';
import { Writable } from 'stream';

// const DataURI = require(datauri_path)
const should = Should();
const nodeVersion = semver.clean(process.version);
const fixture    = 'test/fixture.gif';
const wrongFile  = 'PAPARIPUPI';
const expected   = {
  fileName: fixture,
  base64: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  mimetype: 'image/gif',
  content: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
};
