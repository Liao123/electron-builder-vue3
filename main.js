const path = require('path')
const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,  // 开发模式调用端口的时候主 默认不支持require 这里是开关 打包要关掉
          contextIsolation: false, //开发模式调用端口的时候主 默认不支持require 这里是开关 打包要关掉 
          // webSecurity: false, // 允许加载本地文件 这个没用到好像
      //     // preload: path.join(__dirname, 'preload.js')
      }

    })

    win.loadFile(path.join(__dirname, './dist/index.html'))
    // win.loadURL(`http://localhost:8080`);
    // win.loadURL(`file://${__dirname}/dist/index.html`);


    win.webContents.openDevTools();
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

try {
  require('electron-reloader')(module)
}catch(e){}
