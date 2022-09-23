<template>
	<view>
		<!-- 上报    start -->
		<view class="grid ">
			<view class="border text-contianer" @click="xueTangReportClick">
				<view class="flex flex-direction align-center">
					<view class="image-contianer">
						<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/xueTang.png"
							alt="">
					</view>
					<text class="font-max margin-top-sm">血糖上报</text>
				</view>
			</view>

			<view class="border text-contianer">
				<view class="flex flex-direction align-center" @click="xueYaReportClick">
					<view class="image-contianer">
						<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/xueYa.png"
							alt="">
					</view>
					<text class="font-max margin-top-sm">血压上报</text>
				</view>
			</view>

			<view class="border text-contianer" @click="xueTangHistroyClick">
				<view class="flex flex-direction align-center">
					<view class="image-contianer">
						<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/histroy.png"
							alt="">
					</view>
					<text class="font-max margin-top-sm">血糖历史</text>
				</view>
			</view>


			<view class="border text-contianer" @click="xueYaHistroyClick">
				<view class="flex flex-direction align-center">
					<view class="image-contianer">
						<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/histroy.png"
							alt="">
					</view>
					<text class="font-max margin-top-sm">血压历史</text>
				</view>
			</view>
		</view>
		<!-- 上报    end-->


		<!-- modal start -->
		<u-modal :show="modalShow" @confirm="confirm" ref="uModal" :showCancelButton="true" @cancel="modalClose">
			<view class="report-contianer">
				<view class="report-title">
					{{reportTitle}}上报({{danwei}})
				</view>
				<u--input placeholder="请输入" border="surround" v-model="value"></u--input>
			</view>

		</u-modal>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>


		<u-popup :show="popupShow" @close="popupClose" closeable mode="center">
			<scroll-view class="pop-contianer" scroll-y>
				<view class="title main">
					{{reportTitle}}历史
				</view>
				<view class="title">
					<text>时间</text>
					<text>数值</text>
				</view>

				<view class="item-contianer">
					<view class="item" v-for="(item,index) in historyArr" :key="index">
						<text>{{item.date}}</text>
						<text v-if="item.sweet">{{item.sweet}}</text>
						<text v-else>{{item.blood}}</text>
					</view>
				</view>
			</scroll-view>
		</u-popup>

	</view>
</template>

<script>
	import {
		xueTangReport,
		xueYaReport,
		getXueTangHistroy,
		getXueYaHistroy
	} from '../../api/healthAssess.js'
	export default {
		data() {
			return {
				modalShow: false, //模态框是否展示
				value: '', //输入框值
				reportTitle: '', //汇报项目
				danwei: 'mmol/L', //单位
				popupShow: false, //弹出
				historyArr: [] // 用于展示历史数据
			};
		},
		methods: {
			confirm() {
				if (this.value.length < 1) {
					this.$refs.uNotify.error('请输入!')

				} else if (isNaN(this.value)) {

					this.$refs.uNotify.error('请输入数字！')
				} else {
					if (this.reportTitle == '血糖') {
						xueTangReport(
							parseFloat(this.value)
						).then(res => {
							if (res == null) {
								this.$refs.uNotify.success('上报成功！')
								this.modalClose()
							}
						})
					} else if (this.reportTitle == '血压') {
						xueYaReport(
							parseInt(this.value)
						).then(res => {
							if (res == null) {
								this.$refs.uNotify.success('上报成功！')
								this.modalClose()
							}
						})
					}
				}
			},
			xueTangReportClick() {
				this.reportTitle = '血糖'
				this.danwei = 'mmol/L'
				this.modalShow = true
				this.value = ''
			},
			xueYaReportClick() {
				this.reportTitle = '血压'
				this.danwei = 'mmhg'
				this.modalShow = true
				this.value = ''
			},
			modalClose() {
				this.modalShow = false
			},
			xueTangHistroyClick() {
				this.reportTitle = '血糖'
				getXueTangHistroy().then(res => {
					this.historyArr = res
					this.popupShow = true
				})
			},
			xueYaHistroyClick() {
				this.reportTitle = '血压'
				getXueYaHistroy().then(res => {
					this.historyArr = res
					this.popupShow = true
				})
			},
			popupClose() {
				this.popupShow = false
			},

		}
	}
</script>

<style lang="less" scoped>
	.health-contianer {
		margin-top: 50upx;
		font-size: 60upx;
	}

	.text-contianer {
		width: 40vw;
		height: 20vh;
		margin: 30upx;
		border-radius: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000000;
		background-color: #ffffff;
	}

	.image-contianer {
		width: 30%;
		height: 40%;

		img {
			width: 10vw;
			height: 5vh;
		}
	}


	.report-title {
		font-size: 45upx;
		text-align: center;
		padding: 25upx;
	}

	.pop-contianer {
		height: 70vh;
		width: 80vw;
		padding: 65upx;
	}

	.title {
		display: flex;
		justify-content: space-around;
		font-size: 40upx;
		letter-spacing: 4upx;
		font-weight: 600;
	}

	.main {
		letter-spacing: 6upx;
		margin: 20upx 8upx;
	}

	.item {
		display: flex;
		justify-content: space-around;
		box-sizing: border-box;
		width: 100%;
		padding: 20upx 2upx;
		color: #323233;
		font-size: 40upx;
		letter-spacing: 3upx;
		line-height: 24upx;
	}
</style>
