import mUser from "@/api/user"

const getDefaultState = () => {
	return { 
	}
}

const state = getDefaultState()

const getters = { 
}

const mutations = { 
}
const actions = {
	// 登录
	async login({
		commit,
		state
	}, payload) {
		let params = {
			...payload
		}
		// console.log('user',params);
		// #ifdef APP-PLUS
		// 获取clientId用于消息推送
		let info = plus.push.getClientInfo();
		// 待对接
		info['clientid'] && (params['clientId'] = info['clientid']);
		// #endif

		const [err, res] = await mUser.login(params)
		if (err) return
		console.log(res)
		uni.reLaunch({
			url: "/pages/home/index",
		});
		uni.showToast({
			title: "登录成功",
			duration: 2000,
		}); 
		uni.setStorageSync("token", res.data.access_token)
	},
	/**
	 * 注销，退出登录
	 */
	logout(context) {
    uni.removeStorageSync('token')
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
