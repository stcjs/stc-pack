import Plugin from 'stc-plugin';
import Path from 'path';
import stcPack from './index';
var addStylePath = require.resolve('style-loader/addStyles');
export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let css = await this.getContent('utf8');
    return {css};
  }

  /**
   * update
   */
  async update(data){

    let {err, css} = data;
    if(err) {
      return this.fatal(err.message, err.line, err.col);
    }

    var content = `
    // style-loader: Adds some css to the DOM by adding a <style> tag

    // load the styles
    var content = ${JSON.stringify(css)};
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = require(\'${addStylePath.replace(/\\/g, '\\\\')}\')(content, {});
    if(content.locals) module.exports = content.locals;`

    let filepath = this.file.path + '.js';
    this.addFile(filepath, content, true);
    await this.invokePlugin(stcPack, filepath);
  }
  /**
   * default include
   */
  static include(){
    return /\.css$/i;
  }
  /**
   * use cluster
   */
  static cluster(){
    return false;
  }
  /**
   * use cache
   */
  static cache(){
    return false;
  }
}