# electron + electron-builder + vue3（vue-clis） + npm

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

```
./main.js   开放   win.loadURL(`http://localhost:8080`);
终端1: npm run serve
终端2：npm run app:start
```

### Compiles and minifies for production
```
./main.js   开放 win.loadFile(path.join(__dirname, './dist/index.html'))
终端1: npm run xxxx

    "macapp:build": "electron-builder",       苹果
    "winapp:build": "electron-builder --win"  windows】

   打包配置详情可以看 https://github.com/QDMarkMan/CodeBlog/blob/master/Electron/electron-builder%E6%89%93%E5%8C%85%E8%AF%A6%E8%A7%A3.md

    安装包更新 可以参考https://juejin.cn/post/6980105328801087518

打包后安装包在  /build/～
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
