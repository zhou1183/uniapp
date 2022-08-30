import {
	post
} from "@/utils/request.js";

//POST 请求案例

const user = {
	// 登录 
	login(params) {
		return post("/auth/login", params)
	}
}

export default user

//GET 请求案例可以传递参数也可以不传递
// export const validateCode  = (query) => {
// 	let str = query
// 	return request({
// 		url: `您的API地址 ?${str}`,
// 		method: 'GET'
// 	})
// }
