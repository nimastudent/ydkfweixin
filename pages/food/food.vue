<template>
	<view>
		<view class="color-black font-30 margin-sm ">公告栏</view>
		<view class="swiper-contianer">
			<u-swiper :list="noticeList" keyName="firstPicture" showTitle  @click="swpierClick" height="150"></u-swiper>
		</view>
		<view class="color-black font-30 margin-sm ">饮食</view>
		<view class="grid">
			<view class="border text-contianer" @click="goFoodReco">
				<view class="flex flex-direction align-center">
					<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/food.png" alt="">
					<text class="font-max margin-top-sm">饮食推荐</text>
				</view>
			</view>
			
		</view>
		<view class="color-black font-30 margin-sm ">药物</view>
		<view class="grid">
			<view class="border text-contianer">
				<view class="flex flex-direction align-center" @click="goMedicReport">
					<img src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/medicine.png" alt="">
					<text class="font-max margin-top-sm">药物汇报</text>
				</view>
			</view>
		</view>
		
		<u-modal :show="modalShow"  :title="title" @confirm="modalShow = false" >
					<view class="slot-content">
						<rich-text :nodes="content"></rich-text>
					</view>
				</u-modal>
				
				<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</view>
</template>

<script>
	import {
		getFoodType,
		checkNotice,
		getFoodById,
		
	} from '../../api/food.js';
	import {
		getDrug,
		getDrugById
	} from '../../api/drug.js'
	export default {
		data() {
			return {
				noticeList:[],
				modalShow:false,
				title:'标题',
				content:''
			};
		},
		mounted() {
			this.fetchAllType()
			this.getNotice()
			// uni.$on('updateActionTypeList',function(){
			// 	this.getTypeList()
			// })
		},
		methods: {
			async fetchAllType() {
				const res = await getFoodType()
				console.log(res);
			},
			async getNotice() {
				const res = await checkNotice()
				let arr = []
				res.forEach((item,index) => {
					if(item.isChoose){
						arr.push(item)
					}
				})
				this.noticeList = arr
				console.log(this.noticeList);
			},
			swpierClick(index){
				console.log(this.noticeList[index]);
				const item = this.noticeList[index]
				this.title = item.title
				this.content = item.content
				this.modalShow  = true
			},
			goFoodReco(){
				getFoodType().then(res => {
					if(res.finish){
						this.$refs.uNotify.success('您已完成！')
						
						uni.navigateTo({
							url:"/pages/food/foodDetail?id="+res[0].id
						})
					}else{
						uni.navigateTo({
							url:"/pages/food/foodDetail?id="+res[0].id
						})
					}
					
				})
			},
			goMedicReport(){
				// getDrug().then(res => {
					
				// })
				uni.showModal({
					title:'暂无推荐',
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.swiper-contianer{
	padding: 5upx 30upx;
}

.text-contianer {
		width: 42vw;
		height: 20vh;
		margin: 30upx;
		border-radius: 30upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #007aff;
		//  #F0F0F0
		background-color: #fff;
		
		img{
			height: 96upx;
			width: 96upx;
		}
	}
</style>
