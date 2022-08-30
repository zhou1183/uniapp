import App from './App'
import messages from './locale/index'
import '@/plugins/routeGuards'; //路由拦截 

let i18nConfig = {
	locale: uni.getLocale(),
	messages
}

// #ifndef VUE3
import Vue from 'vue'
import store from "./store/index"
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	createI18n
} from 'vue-i18n'
const i18n = createI18n(i18nConfig)
export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	return {
		app
	}
}
// #endif
