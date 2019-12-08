module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    development: {
      sourceMaps: true,
      retainLines: true
    }
  },
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
