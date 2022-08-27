<template>
	<view>
		<!-- 上报    start -->
		<view class="grid margin-top-xl">
			<view class="border text-contianer" @click="xueTangReport">
				<view class="flex flex-direction align-center">
					<view class="image-contianer">
						<img src="../../static/xueTang.png" alt="">
					</view>
					<text class="font-max margin-top-sm">血糖上报</text>
				</view>
			</view>

			<view class="border text-contianer">
				<view class="flex flex-direction align-center" @click="xueYaReport">
					<view class="image-contianer">
						<img src="../../static/xueYa.png" alt="">
					</view>
					<text class="font-max margin-top-sm">血压上报</text>
				</view>
			</view>
		</view>
		<!-- 上报    end-->


		<!-- modal start -->
		<u-modal :show="modalShow" @confirm="confirm" ref="uModal" :asyncClose="true" :showCancelButton="true"
			@cancel="modalClose">
			<view class="report-contianer">
				<view class="report-title">
					血氧上报
				</view>
				<u--input placeholder="请输入内容" border="surround" v-model="value" @change="change"></u--input>
			</view>

		</u-modal>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow: false,
			};
		},
		methods: {
			confirm() {
				setTimeout(() => {
					this.modalShow = false
				}, 1000)
			},
			xueYaReport() {
				this.modalShow = true
			},
			xueTangReport() {
				this.modalShow = true
			},
			modalClose() {
				this.modalShow = false
			}
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
	
	.image-contianer{
		width: 30%;
		height: 40%;
		img{
			width: 10vw;
			height: 5vh;
		}
	}


.report-title{
	font-size: 45upx;
	text-align: center;
	padding: 15u
}
	
</style>
