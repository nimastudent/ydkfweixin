<template>
	<view>
		<view class="">

			<view class="">
				<view class="color-1129 text-bold margin-sm type-text" v-for="(item,index) in typeList" :key="index">
					<view class="margin-bottom-sm ">
						{{item}}
					</view>
					<view class="grid" v-if="item === '有氧运动'">
						

						<view
							v-for="(item,index) in youyangList" :key="index" @click="handleSportClick(item)">
							<!-- {{item.name}} -->
								<image class="sport-image" v-if="item.picture" :src="item.picture" mode=""></image>
						</view>
					</view>
					
					<view class="grid" v-if="item === '柔韧训练'">
					
						<view :class="['text-xl','text-center','sportText']" hover-class="sportTextClick"
							v-for="(item,index) in rourenList" :key="index" @click="handleSportClick(item)">
							{{item.name}}
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
				youyangList: [],
				rourenList: [],
				kangzuList: []
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
			},
			async getName(type) {
				const res = await gerNameByType({
					params: {
						type
					}
				})
				if (res) {
					console.log(res)
					if(type === '有氧运动'){
						this.youyangList = res.name
					}else if(type === '柔韧训练'){
						this.rourenList = res.name
					}else if(type === '抗阻训练'){
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
		height: 20vh;
		line-height: 20vh;
		// margin: 0 auto;
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
	
	.sport-image{
		width: 80vw;
		height: 30vh;
		display: inline-block;
		    border: 1px solid #ddd;
		    border-radius: 4px;
		    padding: 5px;
	}
</style>
