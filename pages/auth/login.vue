<template>
	<view class="bg">
		
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="title-contianer">
			爱克运康
		</view>
		<view class="withe-container">

			<view class="form-container">
				<view class="wrap">
					<view class="u-avatar-wrap">
						<image class="u-avatar-demo"
							src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/aike.jpg"
							mode="aspectFill"></image>
					</view>
				</view>

				<button hover-stop-propagation open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" type="primary"
					@click="getUserInfo">唤起授权(获取手机号码)</button>


				<view class="color-b2b flex justify-center align-center">
					无需注册
				</view>
				
				<!-- <button type="default" @click="normalLogin">normalLogin</button> -->
				
				<!-- #ifdef H5 -->
				<button class="margin-top-xl" type="primary" @click="submit" withCredentials="true">test</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	const WXBizDataCrypt = require("../../utils/WXBizDataCrypt.js")
	import {
		weChatLogin,
		login,
		getPhoneByCode,
		getCode
	} from '../../api/auth.js'
	export default {
		data() {
			return {
				code: '',
				nickName: '',
				avatarUrl: '',
				sessionKey: '',
				phoneNum: '',
				isBind: false,
				openId: '',
				sessionKey: '',
				pageLoading:false
			}
		},
		onLoad() {
            
            
			uni.setStorageSync('isLogin',true)
			uni.login({
				provider: 'weixin',
				timeout: 3000,
				onlyAuthorize: true,
				success: (res) => {
					this.code = res.code
					getCode(this.code).then(res => {
						this.openId = res.openid
						this.sessionKey = res.session_key
						this.weChatGetUserStep()
					})
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {
			// 获取用户授权
			getUserInfo() {
				uni.getUserProfile({
					lang: 'zh_CN',
					desc: '获取用户信息,登录',
					success: (res) => {
						console.log(res)
						uni.setStorage({
							key: 'userAvatar',
							data: res.userInfo.avatarUrl
						})
						this.nickName = res.userInfo.nickName
						this.avatarUrl = res.userInfo.avatarUrl
					},
					fail: (err) => {
						uni.showToast({
							title: '请确认获取头像',
							icon: 'error',
							duration: 2000
						})
					}
				})
			},
			onGetPhoneNumber(e) {
				if (e.target.code) {
					getPhoneByCode(e.target.code).then(res => {
						if (res) {
							uni.setStorage({
								key:'userPhone',
								data:res.phoneNumber
							})
							
							this.phoneNum = res.phoneNumber
							this.isBind = res.isBind
							this.weChatLoginPost()
						}
					})
				} else {
					uni.showToast({
						title: '请确认获取手机号',
						icon: 'error',
						duration: 2000
					})
				}
			},
			//向后台发送请求
			weChatLoginPost() {
				this.pageLoading = true
				if (this.phoneNum && this.sessionKey) {
					const data = {
						phoneNumber: this.phoneNum,
						nickName: this.nickName,
						avatarUrl: this.avatarUrl,
						openid: this.openId,
						session_key: this.sessionKey
					}
					weChatLogin(data).then(res => {
						console.log(res)
						if (res.token) {
							uni.setStorageSync('token', res.token);
							uni.setStorageSync('uID', res.id);
							this.pageLoading = false
							if (this.isBind) {
								uni.switchTab({
									url: '/pages/state/state'
								})
							} else {
								uni.redirectTo({
									url: '/pages/auth/chioseDoc',
                                    params:{
                                        phoneNumber: this.phoneNum,
                                        nickName: this.nickName,
                                        avatarUrl: this.avatarUrl,
                                        openid: this.openId,
                                        session_key: this.sessionKey
                                    }
								})
							}
						}else{
							uni.redirectTo({
								url: '/pages/auth/chioseDoc'
							})
						}
					})
				}
			},
			normalLogin() {
				let obj = {
					//19859757332
					// 18659797525
					// 15059940062
					telephone: "15059940062",
					password: "123456"
				}
				
				uni.setStorage({
					key:'userPhone',
					data:obj.telephone,
					success() {
						uni.redirectTo({
							url: '/pages/auth/chioseDoc'
						})
					}
				})
				// login(obj).then(res => {
				// 	uni.setStorageSync('token', res['JSESSIONID']);
				// 	// if (res.code === 500) {
				// 	// 	uni.redirectTo({
				// 	// 		url: '/pages/auth/chioseDoc'
				// 	// 	})
				// 	// } else {
				// 	// uni.switchTab({
				// 	// 	url: '/pages/state/state'
				// 	// })
				// 	// uni.switchTab({
				// 	// 	url: '/pages/state/state'
				// 	// })
				// })
			},
			// 获取微信步数
			weChatGetUserStep() {
				const _this = this
				// 第一步 ： 判断微信用户是否开启权限
				wx.getSetting({
					success(res) {
						if (!res.authSetting['scope.werun']) {
							// 申请权限
							wx.authorize({
								scope: 'scope.werun',
								success() {
									// 申请成功 获取微信数据
									_this.getWeRunData()
								},
								fail() {
									uni.showToast({
										title:'请开启运动',
										icon:'error',
										duration:1500
									})
								}
							})
						} else {
							// 读取数据
							_this.getWeRunData()
						}
					}
				})
			},
			getWeRunData() {
				wx.getWeRunData({
					success: (res) => {
						console.log("step", res);
						const encryptedData = res.encryptedData
						const iv = res.iv
						const pc = new WXBizDataCrypt("wxc339ec7fae027d0f", this.sessionKey)
						const data = pc.decryptData(encryptedData, iv)
						const list =  data.stepInfoList
						const step = list[list.length-1].step
						uni.setStorageSync("userStep",step)
					}
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
	.u-avatar-wrap {
		margin-top: 80rpx;
		overflow: hidden;
		margin-bottom: 80rpx;
		text-align: center;
	}
	.u-avatar-demo {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100rpx;
		border: 1px solid #959595;
	}
</style>