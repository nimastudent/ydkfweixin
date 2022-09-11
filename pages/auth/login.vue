<template>
	<view class="bg">
		<view class="title-contianer">
			爱克运康
		</view>
		<view class="withe-container">

			<view class="form-container">
				<!-- <view class="denglu color-1129">欢迎登录!</view> -->
				<view class="">
					
				</view>
				<button class="margin-top-xl" type="primary" @click="getUserInfo" withCredentials="true">单击微信登录</button>
				<view class="color-b2b flex justify-center align-center">
					无需注册
				</view>
				<!-- <button type="default" @click="submit" withCredentials="true">登录</button> -->
				<button type="default" @click="normalLogin">normalLogin</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		weChatLogin,
		login
	} from '../../api/auth.js'
	export default {
		data() {
			return {
				code: '',
				nickName: '',
				avatarUrl: ''
			}
		},
		onLoad() {},
		methods: {
			// 获取用户授权
			getUserInfo() {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '获取用户信息,登录',
					success: (res) => {
						console.log(res)
						this.nickName = res.userInfo.nickName
						this.avatarUrl = res.userInfo.avatarUrl
						this.submit();
					},
					fail: (err) => {
						console.log(err)
					}
				})

			},
			// 微信登录
			submit() {
				uni.login({
					provider: 'weixin',
					timeout: 3000,
					onlyAuthorize: true,
					success: (res) => {
						uni.setStorage({
							key: 'weixinCode',
							value: res.code,
						})
						this.code = res.code
						this.weChatLogin()
						console.log(res)
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 向后台发送请求
			weChatLogin() {

				if (this.code && this.nickName && this.avatarUrl) {
					weChatLogin({
						code: this.code,
						nickName: this.nickName,
						avatarUrl: this.avatarUrl
					}).then(res => {
						console.log(res)
					})
				}
			},
			normalLogin() {
				let obj = {
					telephone: "18659797525",
					password: "123456"
				}
				login(obj).then(res => {
					uni.setStorageSync('token', res['JSESSIONID']);
					uni.switchTab({
						url: '/pages/state/state'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		position: absolute;
		width: 100vw;
		height: 100vh;
		background-color: #0065FF;
	}

	.title-contianer {
		height: 25vh;
		line-height: 42upx;
		font-size: 58upx;
		letter-spacing: 6upx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.withe-container {
		position: absolute;
		left: 0px;
		top: 25vh;
		width: 100vw;
		height: 75vh;
		border-radius: 0px 24px 0px 0px;
		background: #FFFFFF;
	}

	.form-container {
		margin: 100upx 50upx 100upx;
	}

	.denglu {
		line-height: 42upx;
		font-size: 58upx;
	}

	.dianhua {
		margin-top: 30upx;
		font-size: 32upx;
	}
</style>
