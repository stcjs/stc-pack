import Plugin from 'stc-plugin';

export default class JSPackPlugin extends Plugin {
  /**
   * run
   */
  async run(){
    let content = await this.getContent('utf8');
    return {content};
  }

  /**
   * update
   */
  update(data){
    let {err, content} = data;
    if(err) {
      return this.fatal(err.message, err.line, err.col);
    }
    var cssContent = {css: content};
    this.addFile(this.file.path + '.js', `module.exports = ${JSON.stringify(cssContent)}`, false);
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