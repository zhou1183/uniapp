import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let modules = {
	state: {},
	mutations: {},
	actions: {},
	modules: {}
};
const path = require('path')//Node.js path 处理文件路径
const files = require.context("./modules", false, /\.js$/);//webpack 的 api ，遍历文件夹的文件，从中获取指定文件，自动导入模块
files.keys().forEach((key) => { 
	const name = path.basename(key, '.js')
	modules.modules[name] = files(key).default || files(key);
}); 
const store = new Vuex.Store(modules);
export default store; 