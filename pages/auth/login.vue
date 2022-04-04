<template>
	<view class="bg">
		<view class="withe-container">
			<view class="form-container">
				<view class="denglu color-1129">登录</view>
				<view class="dianhua color-b2b">
					输入电话号码登录
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.bg{
	position: absolute;
	width: 100vw;
	height: 100vh;
	background-color: #0065FF;
}

.withe-container{
	position: absolute;
	left: 0px;
	top: 25vh;
	width: 100vw;
	height: 75vh;
	border-radius: 0px 24px 0px 0px;
	background: #FFFFFF;
}

.form-container{
	margin: 100upx 50upx 100upx;
}

.denglu{
	line-height: 42upx;
	font-size: 58upx;
}

.dianhua{
	margin-top: 30upx;
	font-size: 32upx;
}
</style>
