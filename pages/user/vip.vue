<template>
	<view style="overflow-x: hidden;">
		<view class="bg">
			<image class="bg-img" src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/bg.png" mode=""></image>
		</view>

		<view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<image class="nav-back" src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/back.png" mode="" @click="back"></image>
			<text class="nav-title">会员中心</text>
			<view class="nav-space"></view>
		</view>

		<view class="info" :style="{marginTop: statusBarHeight + 44 + 'px'}">
			<image class="info-bg" src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/info-bg.png" mode=""></image>

			<view class="info-content">
				<view class="info-avatar">
					<image class="info-avatar-pic" src="../../static/tabarImg/state_chiosed.png" mode=""></image>
				</view>
				<view class="info-name">
					<text class="info-name">测试</text>
					<text class="info-level">升级至会员享健康管理</text>
				</view>
			</view>

		</view>

		<view class="main-title">
			<text>会员充值</text>
		</view>

		<scroll-view scroll-x>
			<view class="recharge">
				<view class="recharge-item" :class="current == index ? 'recharge-item-active': ''"
					v-for="(item, index) in rechargeOptions" :key="index" :style="{marginLeft: !index ? '30rpx': ''}"
					@click="rechargeChange(index)">
					<view class="recharge-tag" v-if="item.showTag">
						<text class="recharge-tag-text">限时特价</text>
					</view>
					<text class="recharge-item-duration">{{ item.duration }}</text>
					<view class="recharge-item-price">
						<text class="rmb">￥</text>
						<text class="recharge-item-price-text">{{ item.price }}</text>
					</view>
					<text class="recharge-item-des" v-for="(desItem, desIndex) in item.des"
						:key="desIndex">{{ desItem }}</text>
				</view>
			</view>
		</scroll-view>

		<view class="button update" hover-class="hover" @click="updateNow">
			<text class="button-text">立即升级</text>
		</view>

	</view>
</template>

<script>
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	console.log('statusBarHeight',statusBarHeight);
	export default {
		data() {
			return {
				statusBarHeight,
				current: 0,
				rechargeOptions: [{
						duration: '12个月',
						price: 88,
						des: [
							'到期自动续费',
							'可随时关闭'
						],
						showTag: true
					},
					{
						duration: '1个月',
						price: 15,
						des: [
							'联合月卡'
						],
						showTag: false
					},
					{
						duration: '连续包月',
						price: 10,
						des: [
							'到期自动续费',
							'可随时关闭'
						],
						showTag: false
					},
					{
						duration: '连续包年',
						price: 70,
						des: [
							'到期自动续费',
							'可随时关闭'
						],
						showTag: true
					}
				],

			}
		},
		methods: {
			rechargeChange(index) {
				this.current = index
			},
			updateNow() {
				uni.showToast({
					icon: "none",
					title: `选择了「${this.rechargeOptions[this.current].duration}」`
				})
			},
			privilegeClick(index) {
				uni.showToast({
					icon: "none",
					title: `点击了「${this.privilegeList[index].text}」`
				})
			},
			back() {
				
				uni.switchTab({
					url:'/pages/user/user'
				})
			}
		}
	}
</script>

<style lang="scss">
	.main-title {
		padding: 30rpx 30rpx;
		font-size: 34rpx;
		color: #1C1C1C;
	}

	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}

	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 400rpx;
		z-index: -2;

		&-img {
			width: 100%;
			height: 100%;
		}
	}

	.hover {
		opacity: 0.7;
	}

	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		background-image: url('https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/nav-bg.png');
		background-size: 100%;
		z-index: 99;

		&-back {
			width: 20rpx;
			height: 40rpx;
		}

		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}

		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}

	.info {
		position: relative;
		padding: 0 15rpx;
		width: 730rpx;
		height: 360rpx;

		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}

		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 150rpx;
			height: 150rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;

			&-pic {
				width: 150rpx;
				height: 150rpx;
			}
		}

		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}

		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}

		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}

		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}

	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;

		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-image: url('https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/tag.png');
			background-size: 100%;

			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		&-item {
			position: relative;
			padding: 40rpx 0;
			margin-left: 15rpx;
			width: 200rpx;
			height: 250rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;

			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}

			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}

			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;

				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}

			&-des {
				font-size: 22rpx;
				color: #A5A3A2;
			}
		}
	}

	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		border-radius: 50rpx;
		background-image: linear-gradient(#EFCF9E, #E4BF85);

		&-text {
			font-size: 30rpx;
			color: #1C1C1C;
		}
	}

	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}

	.privilege {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;

		&-item {
			margin: 0 23rpx;
			margin-bottom: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-pic {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}

			&-text {
				font-size: 24rpx;
				color: #383738;
			}
		}
	}

	.level {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 466rpx;
		background-image: url('https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/vip-bg.png');
		background-size: 100%;

		&-rate {
			position: absolute;
			top: 43rpx;
			left: 33rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-text1 {
				margin-right: 20rpx;
				color: #1C1C1C;
				font-size: 34rpx;
			}

			&-text2 {
				font-size: 34rpx;
				color: #C07C07;
			}
		}

		&-info {
			// position: absolute;
			// top: 188rpx;
			// left: 350rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-icon {
				margin-bottom: 20rpx;
				width: 48rpx;
				height: 38rpx;
			}

			&-text {
				margin-bottom: 20rpx;
				font-size: 26rpx;
				color: #292929;
			}

			&-integral {
				font-size: 40rpx;
				color: #C07C07;
			}
		}

		&-distance {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			&-text {
				font-size: 26rpx;
				color: #292929;
			}

			&-button {
				padding: 0 30rpx;
				height: 60rpx;
			}
		}
	}
</style>
