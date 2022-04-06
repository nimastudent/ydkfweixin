<template>
	<view>
		<view class="">

			<view class="">
				<view class="color-1129 text-bold margin-sm type-text" v-for="(item,index) in typeList" :key="index">
					<view class="margin-bottom-sm ">
						{{item}}
					</view>
					<view class="grid">

						<view :class="['text-xl','text-center','sportText']" hover-class="sportTextClick"
							v-for="(item,index) in youyangList" :key="index" @click="handleSportClick(item)">
							{{item}}
						</view>
					</view>
					<u-divider></u-divider>

				</view>
			</view>

			<!-- <button type="default" @click="getName">123</button> -->
		</view>
	</view>
</template>

<script>
	import {
		getSportType,
		gerNameByType
	} from '../../api/sport.js'
	export default {
		data() {
			return {
				typeList: ['有氧运动', '柔韧训练', '抗阻训练'],
				youyangList: ['跳绳', '健康跑', '跳绳', '健康跑']
			};
		},
		onLoad() {
			this.getName()
		},
		methods: {
			// 获取运动类型
			async getTypeList() {
				const res = await getSportType()
				console.log(res)
				if (res) {
					this.typeList = res['type']
					// console.log(res.body.type)
				}
			},
			async getName() {
				const res = await gerNameByType({
					params: {
						type: '有氧运动'
					}
				})
				if (res) {

				}
			},
			// 处理单击运动
			handleSportClick(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/sport/sprotDetail?item=' + item,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sportText {
		width: 45vw;
		height: 15vh;
		line-height: 15vh;
		margin: 4upx;
		color: #F0F0F0;
		background-color: #007aff;
		border-radius: 20upx;
	}

	.sportTextClick {
		color: #000000;
		background-color: #f0f0f0;
	}

	.type-text {
		font-size: 56upx;
	}
</style>
