## stc-pack

### 2016/10/19
实现了 AST 的 walker 的基本功能，目前能解析 CJS 模块，加了一些单元测试，接下来准备解析像 global 这样的 windows 依赖，这个在 webpack 源码里面叫 Variable 的概念，目的是如果 Module 里面有这样的定义，需要用额外的闭包提供合适的 this 上下文
(function(global){
  //  module 代码
})( (function(){return this;})())

AST 遍历的坑很多呀，简单的 global，要考虑下面这么多种情况
1. global.a = 'value'; // 正常情况
2. var global = {}; global.b = 222;  // 忽略
3. global.b = 'value', function global() {}; // 忽略
4. global.a = 'value', class global {}; // 忽略
5. global.a = 'value', var global = {}; global.b = 222;  // 不能忽略
6. global.a = 'value', function() { 模式3 和 模式4 如果出现在里面}// 不能忽略
7. function() {global.a}; // 不能忽略 ？

单元测试必不能少啊。
官方建议最好把visitor 合并已获得最好的性能，但这样必然造成代码的维护性变差。这块需要好好实现一下。


### 2016/10/18
依赖着 webpack 的 Parser 非常的不方便，开始调研实现自己的 AST walker! STC 依赖 Babylon 提供了更多的可能，看了一些文档后发现 source map 的处理将来也会变得很麻烦。

### 2016/10/17
css 可以打包并能成功添加到浏览器的里面了，截止目前，已经能打包并且运行程序。问题在于对全局对象的处理。比如 global，$ 等的处理

### 2016/10/16
webpack 用了一套极为复杂的 plugin 系统，允许功能模块以一种极为自由的方式组装拼接，结果就是只有作者一个人维护核心软件。

webpack 里面pitch 的思路其实很好，可以讲讲

### 2016/10/10 ~ 2016/10/14
实现添加打包 node_modules 依赖文件，考虑了很多思路最后终于实现出来了。
添加了 Resolve 的单元测试，javascript 调试困难的根本解决途径，能省掉大量，大量的调试时间。
发现一个新的问题，需要分析和解决 variable 的依赖问题，variable 比如说在 browser 端使用 process global 或者 全局变量想 Jquery 等等的时候，由于打包后代码是相对独立的，需要去注入这些个变量，具体时间等周末吧。

### 2016/10/9
* 当所有文件处理完后，分析文件的依赖是否都加载完整，并给出错误提示。原来这块逻辑会在每一次 entry bundle 合并（或创建）的时候执行来保证添加 bootstrap 代码，会造成很多重复的计算，后来发现 stc 提供了 after hook 就把逻辑顺利成章的挪到这里了。需要提出的是虽然 after hook 是静态函数，但还是在 master 进程上执行，BundleManager 和 ModuleManager 单例的内容同样能访问到。

* 循环引用的 bug 继续修复，之前的 deleted-bundle 逻辑被推翻，改用的思路是： 每次合并的目标 Bundle 是沿着依赖树向根部找到最顶级（可能有多个），或者沿着子级的第一级，这个有点像‘冒泡’合并方法，每个module 或者 bundle 都在尽力的向上（entry bundle) 合并，一般的 bundle 在合并过程中，只是记录了不重复的依赖的 module， 而 entry bundle 会直接往文件里面 append 合并过来的内容。

* 如果编译确实文件，给出错误提示。


### 2016/10/8

* 在代码最后添加 bootstrap 代码片段，添加在 bundle 文件的最后，如何知道 bundle 已经是最后的？通过对入口模块的依赖分析知道入口文件是否构建完毕，然后在代码的最后添加 bootstrap。
* DI 容器部分代码实现，并添加到文件的最前面。
* 程序已经能跑起来。
* 优化 bundle 文件合并时的性能，对非入口文件不再生成文件。
* Bundle 这块的逻辑还有不少漏洞，表现在如果模块 m1 和 m2 都依赖模块 m3， 模块 m3 依赖模块 m4，程序会为每一个模块生成一个 bundle（b1, b2, b3, b4)并向上合并，合并完了会删除自己（，当 如果 m4 最后处理发现 m3 已经合并 m1 和 m2 中，系统报找不到 bundle 3. 要解决这个问题，就不能删除合并了的bundle， 而是把这个 bundle 做成一个 delegated-bundle, 把所有往 delegated-bundle 合并的操作代理到它的父级 bundle。

### 2016/10/7

* 利用 webpack 的 Parser 来处理和获取文件的依赖（使用的 Acorn 和 Babylon 并不兼容所以这块需要和成银讨论，不然性能损耗比较大）
* 如何把代码片段无序的包装合并起来以后，还能让程序正常的执行？这里使用了依赖注入的思想（参考 Angular 的依赖注入），无序的代码片段用函数包装成服务并注册自己（注册的名字 stc-pack 生成）。这时候代码并没有执行，在代码的最后添加一个 bootstrap 来执行入口文件就能让程序正常的执行。
* 实现了把 css 打包的基本逻辑，验证了可行性。



