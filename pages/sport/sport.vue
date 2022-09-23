<template>
	<view>
		<view class="">
			<u-loading-page :loading="loadingPage"></u-loading-page>
			<view class="color-1129 text-bold margin-sm" v-for="(sport,index) in typeList" :key="sport.actionType">
				<view class="type-text">
					{{sport.actionType}}
				</view>
				<view class="picitem">
					<!-- <view  > -->
					<view class="abs-contianer" v-for="(item,index) in sport.children" :key="item.actionName"
						@click="handleSportClick(item)">
						<view class="sport-span">{{item.actionName}}</view>
						<image class="sport-image" :src="item.picture?item.picture : emptyImgURL" mode="">
						</image>
					</view>
					<!-- </view> -->
				</view>



			</view>
			<u-notify ref="uNotify" message="Hi uView"></u-notify>
		</view>
	</view>
</template>

<script>
	import {
		getAllSportData
	} from '../../api/sport.js'
	export default {
		data() {
			return {
				typeList: [],
				youyangList: [],
				rourenList: [],
				kangzuList: [],
				loadingPage: true,
				emptyImgURL: 'https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/taiji.jpg'
			};
		},
		onLoad(e) {
			console.log(e);
			this.getTypeList()
			const _this = this
			uni.$on('updateActionTypeList', function() {
				_this.$refs.uNotify.success('提交成功！')
				_this.getTypeList()
			})
		},
		methods: {
			// 获取运动类型
			async getTypeList() {
				this.loadingPage = true
				const res = await getAllSportData()
				if (res) {
					this.typeList = res
					this.loadingPage = false
					console.log(res);
				}
			},
			// 处理单击运动
			handleSportClick(item) {
				console.log(item)
				if (!item.isFinish) {
					uni.navigateTo({
						url: '/pages/sport/sprotDetail?item=' + item.actionName,
					})
				} else {
					this.$refs.uNotify.success('您已完成！')
					uni.navigateTo({
						url: '/pages/sport/sprotDetail?item=' + item.actionName,
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.type-text {
		font-size: 56upx;
		letter-spacing: 6upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.type-text::after {
		width: 40vw;
		content: " ";
		position: absolute;
		bottom: -25%;
		height: 8upx;
		border-top: 8upx solid #5A8BFF;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.picitem {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		border-radius: 20upx;
	}


	.sport-image {
		width: 90vw;
		height: 20vh;
		border-radius: 16upx;
	}

	.abs-contianer {
		position: relative;
	}

	.sport-span {
		color: aliceblue;
		font-size: 46upx;
		letter-spacing: 8upx;
		position: absolute;
		z-index: 99;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
