// vue.config.js
module.exports = {
  publicPath: './',
  configureWebpack: {
    target: 'electron-renderer'
  },
  
  //关eslint
  devServer: {
    port: 8080,
    hotOnly: true, // 热更新
    open: true, // npm run serve后自动打开页面
    // https: true, // https请求需要配置
    proxy: {
      '/api': {
        target: 'http://web.zhaicool.net/', // 代理接口地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
    },
    overlay: {
        warnings: false,
        errors: false
    },
    
  },
  lintOnSave: false
}