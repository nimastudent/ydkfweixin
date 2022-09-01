<template>
	<view>
		<view class="">
			<u-loading-page :loading="loadingPage"></u-loading-page>
				<view class="color-1129 text-bold margin-sm" v-for="(item,index) in typeList" :key="index">
					<view class="type-text">
						{{item}}
					</view>
					
					<view class="picitem" v-if="item === '有氧运动'">


						<view v-for="(item,index) in youyangList" :key="index" @click="handleSportClick(item)">
							
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
							<view class="font-34">
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
	
	.type-text{
		font-size: 56upx;
		letter-spacing: 6upx;
		margin-bottom: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		}
		
	.type-text::after{
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
	
	.picitem{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		border-radius: 20upx;
	}
	

	.sport-image {
		width: 90vw;
		height: 20vh;
		padding: 5px;
	}
	
	.abs-contianer{
		position: relative;
	}
	
	.sport-span{
		position: absolute;
	}

</style>
