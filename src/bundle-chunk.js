import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
import BundleEntry from './bundle-entry';

export default class extends BundleEntry {
  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join('output', output.chunkFilename.replace(/^\[chunkId\]/, this.module.chunkId));
    return p;
  }

  concatHead() {
    this.content = templates.packChunk(this.options);
  }

  concatTail() {
    this.content += templates.bootChunk(this.module);
  }
}