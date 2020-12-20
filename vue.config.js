module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //配置别名,修改后需要重新编译才能生效
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
        network: "@/network",
        store: "@/store",
        plugin: "@/plugins"
      }
    }
  },
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "http://localhost:8080", //后期可以改
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
