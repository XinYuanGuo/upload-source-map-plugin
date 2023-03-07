# web-monitor-demo

包含以下内容：

1. upload-sourcemap-plugin: webpack 插件，打包完成后上传 sourcemap，并删除打包后的 sourcemap。
2. server：一个简单的服务端，用来接收和解析 sourcemap。

# 用法

- 分别进入 client 和 server 执行 `yarn`
- client 就是一个 react 的 spa，其中`App.tsx`中 throw 了一个报错
- server 目录执行`yarn start`启动服务
- client 目录中执行`yarn build`进行打包
- 访问`http://localhost:3000/check-source-map?project=test&row=2&col=143262&filename=main.12de751c.js`,可以查看 sourcemap 解析后的报错位置，注意参数是否与 client 打包后的文件对应
