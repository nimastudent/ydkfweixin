<template>
	<view class="center">
		<view class="logo" hover-class="'logo-hover' ">
			<image class="logo-img" :src="avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name" v-if="userInfo.name">Hi，{{userInfo.name}}</text>
				<text v-else class="uer-name" style="color: #007aff;" @click="handleGoLogin">点我登录</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goUserInfo">
				<u-icon class="list-icon" name="account" color="#007aff" size="22"></u-icon>
				<text class="list-text">个人信息</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>

			<!-- <view class="center-list-item border-bottom" @click="goUserVIPInfo">
				<span class="list-icon font-34 iconfont icon-vip"></span>
				<text class="list-text">会员信息</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="goChat">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">医师互动</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goHistroy">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">历史记录</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<!-- <view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view> -->
		</view>
		<view class="center-list">

			<button type="error" @click="handleLogout">点我退出</button>
		</view>

	</view>
</template>

<script>
	import {
		getUserInfo,
		userLogout
	} from '../../api/auth.js'
	export default {
		data() {
			return {
				avatarUrl: "https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/aike.jpg",
				userInfo: {}
			}
		},
		onLoad() {

			if (uni.getStorageSync('isLogin')) {
				this.getInfo()
			} else {
				this.userInfo = {}
			}
		},
		methods: {
			getInfo() {
				// const res = await getUserInfo()
				// if(res){
				// 	console.log(res);
				// 	this.uerInfo = res
				// 	uni.setStorage({
				// 		key:'userInfo',
				// 		data:res
				// 	})
				// }
				this.$nextTick(() => {
					uni.getStorage({
						key: 'userInfo',
						success: (e) => {
							this.userInfo = e.data
							console.log(this.userInfo);
						}
					})
					uni.getStorage({
						key: "userAvatar",
						success: (res) => {
							console.log(res);
							if (res.errMsg == "getStorage:ok") {
								this.avatarUrl = res.data
								console.log(this.avatarUrl);
							}
						}
					})
				})

			},
			goChat() {
				uni.navigateTo({
					url: '/pages/user/chat/chat'
				})
			},
			goUserInfo() {
				uni.navigateTo({
					url: '/pages/user/info/info'
				})
			},
			goUserVIPInfo() {
				uni.navigateTo({
					url: '/pages/user/vip'
				})
			},
			goHistroy() {
				uni.navigateTo({
					url: '/pages/user/histroy/histroy'
				})
			},
			handleGoLogin() {
				uni.reLaunch({
					url: '/pages/auth/login'
				})
			},
			handleLogout() {
				userLogout().then(res => {
					console.log(res);
					if (res === "logout success") {
						uni.clearStorage()
						uni.reLaunch({
							url: '/pages/auth/login'
						})
					}
				})

			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		/* background-color: #007aff; */
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #000;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #000;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #007aff;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
