import fs from 'fs';
import Path from 'path';
import templates from './templates';
import thinkit from 'thinkit/lib/index';
import ModuleManager from './module-manager';
import BundleChunk from './bundle-chunk';


export default class extends BundleChunk {
  _getOutputPath() {
    var output = this.options.output;
    var p = Path.join(output.path, output.filename.replace(/^\[name\]/, this.module.entryName));
    return p;
  }
}