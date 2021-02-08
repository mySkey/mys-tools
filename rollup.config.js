import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";

/*
  esm es6 模式
  iife(Immediately-invoked function expression ) 立即调用模式
  AMD
  CommonJS
  UMD
*/

export default {
  input: "src/index.ts", // 打包入口
  output: [
    {
      name: "mySkey",
      file: 'dist/index.js',
      format: "umd"
    },
    {
      name: "mySkey",
      file: 'dist/index.es.js',
      format: "es"
    },
    // {
    //   name: "mySkey",
    //   file: 'dist/index.iife.js',
    //   format: "iife"
    // },
    // {
    //   name: "mySkey",
    //   file: 'dist/index.umd.js',
    //   format: "umd"
    // },
    // {
    //   name: "mySkey",
    //   file: 'dist/index.amd.js',
    //   format: "amd"
    // },
    // {
    //   name: "mySkey",
    //   file: 'dist/index.cjs.js',
    //   format: "cjs"
    // },
  ],
  plugins: [
    // 打包插件
    babel(),
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript() // 解析TypeScript
  ]
};
