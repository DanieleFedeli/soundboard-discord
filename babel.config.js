module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "~": "./src",
        }
      }
    ],
    "@babel/plugin-transform-modules-commonjs",
    "@babel/proposal-object-rest-spread",
  ],
  presets: ['@babel/preset-typescript', ['@babel/preset-env', {
    targets: {
      node: "current"
    }
  }]],
  sourceMaps: "inline",
  retainLines: true
};