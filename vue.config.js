module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //配置别名,修改后需要重新编译才能生效
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
};
