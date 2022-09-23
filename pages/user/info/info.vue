<template>
	<view>
		<u-cell size="large">
			<text slot="title" class="font-style">姓名</text>
			<text slot="value" class="font-style">{{userInfo.name}}</text>
		</u-cell>
		<u-cell size="large">
			<text slot="title" class="font-style">医生姓名</text>
			<text slot="value" class="font-style">{{userInfo.doctorName}}</text>
		</u-cell>
		<u-cell size="large">
			<text slot="title" class="font-style">电话号码</text>
			<text slot="value" class="font-style">{{userInfo.telephone}}</text>
		</u-cell>
		<u-cell size="large">
			<text slot="title" class="font-style">身高(cm)</text>
			<text slot="value" class="font-style">{{userInfo.height}}</text>
		</u-cell>
		<u-cell size="large">
			<text slot="title" class="font-style">体重(kg)</text>
			<text slot="value" class="font-style">{{userInfo.weight}}</text>
		</u-cell>
		<u-cell size="large">
			<text slot="title" class="font-style">生日</text>
			<text slot="value" class="font-style">{{userInfo.birthday}}</text>
		</u-cell>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {}
			};
		},
		mounted() {
			this.userInfo =  uni.getStorageSync('userInfo')
			console.log(this.userInfo);
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.font-style{
		font-size: 40upx;
		letter-spacing: 4upx;
		font-weight: 500;
	}
</style>
