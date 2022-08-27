<template>
	<view>
		<view class="">
			<u-loading-page :loading="loadingPage"></u-loading-page>
			<view class="">
				<view class="color-1129 text-bold margin-sm type-text" v-for="(item,index) in typeList" :key="index">
					<view class="margin-bottom-sm ">
						{{item}}
					</view>
					<view class="grid" v-if="item === '有氧运动'">


						<view v-for="(item,index) in youyangList" :key="index" @click="handleSportClick(item)">
							<!-- {{item.name}} -->
							<view class="abs-contianer" v-if="item.picture">
								<image class="sport-image" :src="item.picture" mode=""></image>
								<view class="sport-span">{{item.name}}</view>
							</view>

							<!-- 没有图片的显示 -->

							<view v-else-if="item.picture === null" :class="['text-xl','text-center','sportText']"
								hover-class="sportTextClick">
								<text class="font-max">{{item.name}}</text>
							</view>

							<view v-else :class="['text-xl','text-center','sportText','finished']">
								<text class="font-max">已完成
								</text>
							</view>


						</view>
					</view>

					<view class="grid" v-if="item === '柔韧训练'">

						<view :class="['text-xl','text-center','sportText']" hover-class="sportTextClick"
							v-for="(item,index) in rourenList" :key="index" @click="handleSportClick(item)">
							<view class="type-text">
								{{item.name}}
							</view>
						</view>

						<view :class="['text-xl','text-center','sportText','finished']">
							<text class="font-max">已完成
							</text>
						</view>
					</view>

					<view class="grid" v-if="item === '抗阻训练'">

						<view :class="['text-xl','text-center','sportText']" hover-class="sportTextClick"
							v-for="(item,index) in kangzuList" :key="index" @click="handleSportClick(item)">
							{{item.name}}
						</view>
					</view>
					<u-divider></u-divider>

				</view>
			</view>

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
				typeList: [],
				youyangList: [],
				rourenList: [],
				kangzuList: [],
				loadingPage: true
			};
		},
		onLoad() {
			this.getTypeList()
		},
		methods: {
			// 获取运动类型
			async getTypeList() {
				const res = await getSportType()
				console.log(res)
				if (res) {
					this.typeList = res['type']
				}
				for (let item in this.typeList) {
					this.getName(this.typeList[item])
				}
				this.loadingPage = false
			},
			async getName(type) {
				const res = await gerNameByType({
					params: {
						type
					}
				})
				if (res) {
					console.log(res)
					if (type === '有氧运动') {
						this.youyangList = res.name
					} else if (type === '柔韧训练') {
						this.rourenList = res.name
					} else if (type === '抗阻训练') {
						this.kangzuList = res.name
					}
				}
			},
			// 处理单击运动
			handleSportClick(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/sport/sprotDetail?item=' + item.name,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sportText {
		width: 80vw;
		height: 30vh;
		line-height: 30vh;
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

	.abs-contianer {
		position: relative;
	}

	.sport-image {
		width: 80vw;
		height: 30vh;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 5px;
	}

	.sport-span {
		position: absolute;
		color: white;
		top: 35%;
		left: 35%;
	}

	.finished {
		background-color: #555555;
	}
</style>
