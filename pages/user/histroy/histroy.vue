<template>
	<view>
		<u-tabs :list="list1" @click="click" :scrollable="false" lineWidth="30" lineColor="#007aff" :activeStyle="{
		            color: '#303133',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)',
					fontSize:'21px'
		        }" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1)',
					fontSize:'20px'
		        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 40px;"></u-tabs>
		<!-- <u-divider text=""></u-divider> -->

		<swiper class="swiper" :disable-touch="true" :current="current" :duration="500">
			<swiper-item>
				<view class="" v-if="actionHistroyArr.length == 0">
					暂无内容
				</view>
				<scroll-view v-else scroll-y="true" class="scroll-Y">
					<u-list>
						<u-list-item v-for="(item, index) in actionHistroyArr" :key="index" hover-class="active">
							<u-cell size="large" @click="goHistroyDetail(item)">
								<view slot="title" class="u-slot-title">
									<text class="u-cell-text">{{item.actionName}}</text>
								</view>
								<text slot="value" class="u-slot-value">{{item.reportDate}}</text>
							</u-cell>
						</u-list-item>
					</u-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="" v-if="foodHistroyArr.length == 0">
					暂无内容
				</view>
				<scroll-view scroll-y="true" class="scroll-Y" v-else>
					<u-list>
						<u-list-item v-for="(item, index) in foodHistroyArr" :key="index" hover-class="active">
							<u-cell size="large" @click="goHistroyDetail(item)">
								<view slot="title" class="u-slot-title">
									<text class="u-cell-text">{{item.id}}</text>
								</view>
								<text slot="value" class="u-slot-value">{{item.reportDate}}</text>
							</u-cell>
						</u-list-item>
					</u-list>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<view class="" v-if="actionHistroyArr.length == 0">
					暂无内容
				</view>
				<scroll-view v-else scroll-y="true" class="scroll-Y">
					<u-list>
						<u-list-item v-for="(item, index) in drugHistroyArr" :key="index" hover-class="active">
							<u-cell size="large" @click="goHistroyDetail(item)">
								<view slot="title" class="u-slot-title">
									<text class="u-cell-text">{{item.id}}</text>
								</view>
								<text slot="value" class="u-slot-value">{{item.reportDate}}</text>
							</u-cell>
						</u-list-item>
					</u-list>
				</scroll-view>
			</swiper-item>
		</swiper>




	</view>
</template>

<script>
	import {
		getActionHistroyList,
		getActionHistroyById,
		getFoodHistroyList,
		getFoodHistroyById,
		getDrugHistroyList,
		getDrugHistroyById
	} from '../../../api/histroy.js'
	export default {
		data() {
			return {
				list1: [{
					name: '运动历史',
				}, {
					name: '饮食历史',
				}, {
					name: '药物历史'
				}, ],
				actionHistroyArr: [],
				foodHistroyArr: [],
				drugHistroyArr: [],
				current: 0
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			this.fetchActionHistroy()
			this.fetchFoodHistroy()
			this.fetchDrugHistroy()
			setTimeout(function() {
				uni.hideLoading();
			}, 1500);
		},
		methods: {
			click(e) {
				this.current = e.index
			},
			getHistroy() {},
			fetchActionHistroy() {
				getActionHistroyList(1,10).then(res => {
					this.actionHistroyArr = res.content.reverse()
				})
			},
			fetchFoodHistroy() {
				getFoodHistroyList(1,10).then(res => {
					console.log('food', res);
					this.foodHistroyArr =  res.content
				})
			},
			fetchDrugHistroy() {
				getDrugHistroyList(1,10).then(res => {
					console.log('drug', res);
					this.drugHistroyArr = res.reverse()
				})
			},
			goHistroyDetail(e) {
				let title = '';
				let id = 0;
				switch (this.current) {
					case 0:
						console.log(1);
						title = '运动历史'
						id = e.id
						break;
					case 1:
						console.log(2);
						title = '饮食历史'
						id = e.id
						break;
					case 2:
						console.log(3);	
						title = '药物历史'
						id = e.id
						break;
				}
				console.log(title,id);
				uni.redirectTo({
					url:`/pages/user/histroy/histroyDetail?id=${id}&title=${title}`,
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-slot-title {
		font-size: 40upx;
		letter-spacing: 4upx;
		font-weight: 500;
	}

	.u-slot-value {
		font-size: 40upx;
		letter-spacing: 4upx;
		font-weight: 500;
	}

	.swiper {
		height: calc(100vh - 40px);
	}

	.active {
		background-color: aqua;
		color: blue;
	}
</style>
