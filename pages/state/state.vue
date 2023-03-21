<template>
	<view>
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="color-black font-30 margin-sm ">健康数据</view>
		<view class="step-contianer">
			<view class="walk-text-contianer">
				<view class="walk-text-icon">
					<image src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/walking.png"
						mode=""></image>
					<text>走步</text><text>（步）</text>
				</view>
				<view class="font-max walk-text-icon">
					{{step}}
				</view>
				<view v-if="8000-step > 0">
					距离达成目标还差{{8000-step}}步
				</view>
				<view v-else>
					您已完成今日目标！
				</view>
			</view>
			<view class="walk-circle-contianer">
				<canvas class="canvas" canvas-id="canvas2"></canvas>
			</view>
		</view>
		<view class="grid">
			<view class="border text-contianer" @click="goHealthAssess">
				<view class="flex flex-direction align-center">
					<u-icon name="heart-fill" color="#007aff" size="38"></u-icon>
					<u-loading-icon :show="assIconShow"></u-loading-icon>
					<text class="font-max margin-top-sm">健康测评</text>
				</view>
			</view>

			<view class="border text-contianer">
				<view class="flex flex-direction align-center" @click="goHealthReport">
					<u-icon name="man-add" color="#007aff" size="38"></u-icon>
					<u-loading-icon :show="reportIconShow"></u-loading-icon>
					<text class="font-max margin-top-sm">健康汇报</text>
				</view>
			</view>
			
			<view class="border text-contianer">
				<view class="flex flex-direction align-center" @click="reportDisease">
					<u-icon name="file-text" color="#007aff" size="38"></u-icon>
					<!-- <u-loading-icon :show="reportIconShow"></u-loading-icon> -->
					<text class="font-max margin-top-sm">疾病汇报</text>
				</view>
			</view>
		</view>
		
		<DiseaseReport
		 :modalShow.sync="diseaseModalShow"
		 />
	</view>
</template>

<script>
	const WXBizDataCrypt = require("../../utils/WXBizDataCrypt.js")
	import {
		postUserCode,
		getCode,
		getUserInfo,
		getUserIsLogin
	} from '../../api/auth.js'
	import Gauge from "@/utils/circle.js";
	import Scoket from '../../utils/socket.js'
	import DiseaseReport from '@/components/DiseaseReport/diseaseReport.vue'
	export default {
		components: {DiseaseReport},
		data() {
			return {
				step: 0,
				uerInfo: {},
				pageLoading:false,
				assIconShow:false,
				reportIconShow:false,
				sessionKey:'', //用于获取用户步数
				diseaseModalShow:false  //疾病汇报对话框展示
			};
		},
		onLoad() {

			//获取token
			const token = uni.getStorageSync('token')
			// 如果有token
			if(token){
				// 判断token是否过期
				getUserIsLogin().then(res => {
					if(res){
						// 过期了设置 isLogin false
						if(res.isLate){
							uni.setStorageSync('isLogin',true)
						}else{
							// 没过期 设置 true
							uni.setStorageSync('isLogin',false)
						}
					}else{
						//res 为空
						uni.setStorageSync('isLogin',false)
					}
				})
				//获取用户微信步数
				this.getUserStep()
				// 获取用户信息
				this.getInfo()
				this.printStep()
			}else{
				//没有token 
				uni.setStorage({
					key:'isLogin',
					data:false
				})
				uni.showModal({
					title: '您当前未登录，登录后查看更多功能！',
					success(e) {
						if (e.confirm) {
							uni.reLaunch({
								url: '/pages/auth/login'
							})
						}
					}
				})
			}
		},
		methods: {
			goHealthAssess() {
				this.assIconShow = true
				this.$u.route('/pages/state/healthAssess')
				this.assIconShow = false
			},
			goHealthReport() {
				this.reportIconShow = true
				this.$u.route('/pages/state/healthReport')
				this.reportIconShow = false
			},
			async getInfo() {
				const res = await getUserInfo()
				if (res) {
					this.uerInfo = res
					uni.setStorage({
						key: 'userInfo',
						data: res
					})
					uni.$u.scoket = new Scoket(
						`wss://www.aikeyunkang.top:8081/websocket/server/patient/${this.uerInfo.id}`, 10000)
				}
			},
			//疾病汇报
			reportDisease(){
				this.diseaseModalShow = true
			},
			// step canvas
			printStep(){
				const step = uni.getStorageSync("userStep")
				this.step = step
				const value = Math.floor((step / 8000) * 100) < 100 ? Math.floor((step / 8000) * 100) : 100
				new Gauge({
					canvasId: "canvas2",
					value,
					lineWidth: 20,
					progressColor: ["#007aff", "#007aff", "#007aff"],
					valueColor: "#007aff",
				});
			},
			getUserStep(){
				//微信登录
				uni.login({
					provider: 'weixin',
					timeout: 3000,
					onlyAuthorize: true,
					success: (res) => {
						getCode(res.code).then(res => {
							this.sessionKey = res.session_key
							this.weChatGetUserStep()
						})
					},
					fail: (err) => {
						console.log(err)
					}
				})
				
			},
			weChatGetUserStep(){
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
	.text-contianer {
		width: 42vw;
		height: 20vh;
		margin: 30upx;
		border-radius: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #007aff;
		//  #F0F0F0
		background-color: #fff;
	}

	.step-contianer {
		width: 95vw;
		margin: 0 auto;
		height: 18vh;
		background-color: white;
		border-radius: 16upx;
		display: flex;
		justify-content: space-around;
	}

	.walk-text-contianer {
		width: 45%;
		height: 90%;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
	}

	.walk-text-icon {
		text-indent: 6upx;
	}

	.walk-text-icon image {
		width: 32upx;
		height: 32upx;
	}

	.canvas {
		width: 200upx;
		height: 200upx;
		margin: 40upx auto;
	}
</style>
