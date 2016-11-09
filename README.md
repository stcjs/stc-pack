# stc-pack

实现类似 Webpack 的文件打包，并支持 stc 的 cluster 并行处理模式，目的在于编译大型项目时候有更优良的性能。

## 和webpack 对比

### 相同点
1. 把各种文件经过处理后变成 js 文件，最后通过一定的规则合并成一个 js 文件。
2. 理论上 webpack 的 loader 也能适配到 stc 的 plugin（transpile）中。这样通过适配器理论上能直接使用大量稳定的 webpack loader。

### 不同
1. webpack 从根文件开始递归的处理所有依赖并按照一定的顺序合并代码，由于是单线程执行，最后生成的 bundle 文件是稳定的。
2. stc-pack 依赖 stc 内核，在 transpile 任务中执行相当于 webpack loader 的逻辑（并发），然后在 workflow  中对 js 文件分析依赖和进行合并，处理依赖的过程支持 cluster 并发模式，合并文件在主进程，所以代码合并的过程不是稳定的（代码拼接的顺序，这只是猜想，具体需要和成银讨论一下），但是能更好的利用的多核的性能。

### 一些猜想
* stc 的并发模式旨在获取更快的编译速度，但只有在超大型程序中才能体现出优势，因为启动新进程和进程间的通讯的消耗不可忽略，所以 loader 的逻辑越复杂，单个文件越大，越能体现优势。
* stc 和 webpack 的趋势是 一致性 和 速度，日后可能会实现一键开关代码稳定合并，这样鱼和熊掌就能兼得。


## 当前完成
* 利用 webpack 的 Parser 来处理和获取文件的依赖（使用的 Acorn 和 Babylon 并不兼容所以这块需要和成银讨论，不然性能损耗比较大）
* 如何把代码片段无序的包装合并起来以后，还能让程序正常的执行？这里使用了依赖注入的思想（参考 Angular 的依赖注入），无序的代码片段用函数包装成服务并注册自己（注册的名字 stc-pack 生成）。这时候代码并没有执行，在代码的最后添加一个 bootstrap 来执行入口文件就能让程序正常的执行。
* 实现了把 css 打包的基本逻辑，验证了可行性。
* 实现添加 bootstrap 代码片段，添加在 bundle 文件的最后，如何知道 bundle 已经是最后的？通过对 entry 文件进行依赖递归分析，如果所有依赖完成，那么在代码最后添加 ‘.bootstrap()’片段
* DI 容器部分的公共代码实现，并添加到文件的最前面。
程序已经能编辑并运行一个例子程序了。
* Bundle 这块的逻辑还有不少漏洞，表现在如果模块 m1 和 m2 都依赖模块 m3， 模块 m3 依赖模块 m4，程序会为每一个模块生成一个 bundle（b1, b2, b3, b4)并向上合并，合并完了会删除自己（，当 如果 m4 最后处理发现 m3 已经合并 m1 和 m2 中，系统报找不到 bundle 3. 要解决这个问题，就不能删除合并了的bundle， 而是把这个 bundle 做成一个 delegated-bundle, 把所有往 delegated-bundle 合并的操作代理到它的父级 bundle。
* 优化 bundle 文件合并时的性能，对非入口文件不再生成文件。
* 当所有文件处理完后，分析文件的依赖是否都加载完整，并给出错误提示。原来这一步会在每一次 entry bundle 合并（或创建）的时候执行，会造成很多重复的计算，后来发现 stc 提供了 after hook 就把逻辑顺利成章的挪到这里了。
* （优先）处理引用 node_modules 模块的情况（如何添加一个虚拟的只在内存中的文件）。
* （优先）实现 webpack-css-loader 的适配。
* （优先）解决 variable 的依赖问题，variable 比如说在 browser 端使用 process global 或者 全局变量 Jquery $ _ 等等的时候（虽然不推荐）
* 建立单元测试。
* 把最后生成代码的文件路径替换成module id，这样能减少文件大小，对性能也有一定的提高。
* (开发中)stc 实现自己的 AST walker， stc-pack 放弃 webpack 的 Parser 获取更好的系统兼容性。


## 计划与目标
* 如果在 css 里面使用 @import 或者 url() , 这个处理逻辑是否按照 webpack 一样，还是转移到 transpile 流程里面。
* 支持代码分块。
* 让分块代码跑起来。
* 实现 source map。
* 处理下面的逻辑，也就是要分析 require 是否在 try 的 scope 里面，如果是，这个依赖是可选择的。
    try {
      var index = require('indexof');
    } catch (err) {
      var index = require('component-indexof');
    }


## 实现逻辑介绍
项目用 AMD 或者 CMD 来声明依赖，而每个依赖的文件又会依赖其它的文件，最后就是一个依赖树，而树的根节点就是入口文件，也就是项目的启动是第一个执行的文件
