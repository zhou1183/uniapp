//初始化
import uni_request from './uni_request.js'
import store from '@/store'

const request = uni_request({ // 有效配置项只有三个
	baseURL: 'http://124.70.140.133:8080', //baseURL
	timeout: 300000, // 超时时间，单位毫秒。默认 60 秒
	header: {
		'x-custom-header': 'x-custom-header'
	}, // 设置请求头，建议放在请求拦截器中
	statusCode: [200,
		401] // 服务器相应状态码为 200/401 时，网络请求不会 reject。也就是不会被 catch 到。如响应 401 时可以在响应拦截后 await 刷新 token + await 重新请求 + return response。即可实现无痛刷新。 
})
//请求拦截器
request.interceptors.request.use(async (config, ...args) => {
	await new Promise(resolve => setTimeout(() => resolve(), 1000))
	console.log('请求拦截器, 网络请求会等 1 秒后上面的异步任务结束后执行') // args[0] method args[1] url args[3] data 
	let token = uni.getStorageSync("token")
	if (token) {
		config.header["Authorization"] = `Bearer ${token}`; // 修改请求头
	}
	//config.body.test = 'test' // 修改请求体
	// config.cancel = true // 取消请求
	return config
})
//响应拦截器
request.interceptors.response.use(async (response, ...args) => { // 响应拦截器（可以设置多个, 同时可以也可以使用异步方法）
	const {
		data: res
	} = response // args[0] method args[1] url args[3] data
	await new Promise(resolve => setTimeout(() => resolve(), 1000))
	if (res.code === 200) {
		console.log('响应拦截器， 会阻塞 1 s')
	}
	if (res.code === 401) {
		store.dispatch('user/logout');
		uni.showToast("请重新登录")
		uni.reLaunch({
			url: "/pages/login/index",
		})
	}
	return response
})
//全局错误监听
request.onerror = async (...args) => { // 请求失败统一处理方法（可以也可以使用异步方法）
	console.log('网络请求失败了', `url为${args[1]}`)
}
export function get(url, params) {
	// get请求映射params参数
	if (params) {
		url += '?' + tansParams(params);
		url = url.slice(0, -1);
	}
	return new Promise((resolve, reject) => {
		request
			.get(url)
			.then(res => {
				resolve([undefined, res])
			})
			.catch(err => {
				resolve([err, undefined])
			})
	})
}
export function post(url, data) {
	return new Promise((resolve, reject) => {
		request
			.post(url, data)
			.then(res => {
				resolve([undefined, res])
			})
			.catch(err => {
				resolve([err, undefined])
			})
	})
}

export function upLoad(url, data) {
	return new Promise((resolve, reject) => {
		request({
				url: url,
				method: "post",
				files: data

			})
			.then(res => {
				resolve([undefined, res])
			})
			.catch(err => {
				console.log(err)
				resolve([err, undefined])
			})
	})
}
export function put(url, params, data) {
	return new Promise((resolve, reject) => {
		request({
				url: url,
				method: "put",
				params,
				data,
			})
			.then(res => {
				resolve([undefined, res])
			})
			.catch(err => {
				resolve([err, undefined])
			})
	})
}
export function httpDelete(url, data) {
	return new Promise((resolve, reject) => {
		request({
				url: url,
				method: "delete",
				data,
			})
			.then(res => {
				resolve([undefined, res])
			})
			.catch(err => {
				resolve([err, undefined])
			})
	})
}
