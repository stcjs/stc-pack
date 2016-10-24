import Plugin from 'stc-plugin';
import Path from 'path';
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
  update(data){

  let {err, css} = data;
  if(err) {
    return this.fatal(err.message, err.line, err.col);
  }

  var content = `
    // style-loader: Adds some css to the DOM by adding a <style> tag

    // load the styles
    var content = \`${css}\`;
    if(typeof content === 'string') content = [[module.id, content, '']];
    // add the styles to the DOM
    var update = require(\'${addStylePath.replace(/\\/g, '\\\\')}\')(content, {});
    if(content.locals) module.exports = content.locals;
`

    this.addFile(this.file.path + '.js', content, false);
    this.setContent(content);
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
    return true;
  }
  /**
   * use cache
   */
  static cache(){
    return true;
  }
}