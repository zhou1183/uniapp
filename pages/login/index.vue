<template>
	<view class="wrap">
		<view class="title"> 账户登录 </view>
		<view class="item">
			<input v-model="form.username" placeholder="请输入账号"></input>
		</view>
		<view class="item">
			<input v-model="form.password" type="password" placeholder="请输入密码"></input>
		</view>
		<button @click="onSubmit">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: "",
					password: "",
					type: "app",
				},
				userInfo: {
					UserAccount: "",
					UserPwd: "",
					IsAD: 0,
				},
				radioList: [{
						id: 0,
						title: "邮箱用户",
						value: "0",
					},
					{
						id: 1,
						title: "AD域用户",
						value: "1",
					},
				],
				current: 0,
			};
		},
		methods: {
			onSubmit() {
				if (!this.form.username || !this.form.password) {
					uni.showModal({
						title: "账户或密码不能为空!",
						position: "center",
						showCancel: false,
					});
					return;
				}
				this.$store.dispatch("user/login", this.form);
			},
			async LoginSubmit() { 
				let resUserInfo = await getLoginInfo({
					UserAccount: this.userInfo.UserAccount,
					UserPwd: md5(this.userInfo.UserPwd),
					menuCode: 300001,
					IsAD: this.userInfo.IsAD,
				});
				console.log(resUserInfo.data);
				if (resUserInfo.code === 1000) {
					if (resUserInfo.data.menus.length > 0) {
						setTimeout(() => {
							uni.reLaunch({
								url: "../index/index",
							});
							uni.showToast({
								title: "登录成功",
								duration: 2000,
							});
						}, 200);
						console.log(resUserInfo.data.token);
						uni.setStorageSync("token", resUserInfo.data.token);
						uni.setStorageSync("user_info", resUserInfo.data.user_info);
						uni.setStorageSync("menus", resUserInfo.data.menus);
					} else {
						return uni.showToast({
							title: "当前账号无菜单权限",
							icon: "none",
							duration: 2000,
						});
					}
				}
				if (resUserInfo.code === 2000) {
					return uni.showToast({
						title: resUserInfo.msg,
						duration: 2000,
					});
				}
			},
			// radio 按钮的逻辑实现
			radioChange: function(evt) {
				for (let i = 0; i < this.radioList.length; i++) {
					if (this.radioList[i].value === evt.detail.value) {
						this.current = i;
						this.userInfo.IsAD = i;
						break;
					}
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.login-box {
		display: flex;
		width: 100%;

		.active-color {
			color: #00654a;
		}

		.left {
			width: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			height: 100vh;

			.from-box {
				width: 100%;

				.logo-style {
					width: 155.85937rpx;
					height: 31.64062rpx;
					margin-left: 30%;
				}

				.title-style {
					color: #000000;
					display: inline-block;
					width: 100%;
					font-size: 21.09375rpx;
					text-align: center;
					font-weight: 900;
					line-height: 19.92187rpx;
				}

				.radio-style-box {
					margin-left: -26.50781rpx;
				}

				.login {
					font-size: 14rpx;
				}
			}
		}

		.right {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 335.74218rpx;
				height: 259.57031rpx;
			}
		}

		.uni-form-items {
			width: 100%;
			display: flex;
			justify-content: center;

			.uni-input {
				margin-top: 16rpx;
				width: 192.1875rpx;
				height: 24.60937rpx;
				font-size: 10.54687rpx;
				padding-left: 8.20312rpx;
				border: 0.58593rpx solid #00674b;
				border-radius: 2.34375rpx;
			}
		}

		button::after {
			border: none;
		}
	}
</style>
