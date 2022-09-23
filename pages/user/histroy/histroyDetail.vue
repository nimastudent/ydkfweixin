<template>
	<view>
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="sport" v-if="title === '运动历史'">
			<view class="font-max color-1129 margin-lg">
				{{contentObj.actionName}}
			</view>
			<view class="margin-sm font-30">
				所属医生：{{contentObj.doctorName}}
			</view>
			<view class="margin-sm font-30">
				医生建议：{{contentObj.advice == null ?"暂无内容" : contentObj.advice}}
			</view>
			<view class="margin-sm font-30">
				个人反馈：{{contentObj.content == null ?"暂无内容" : contentObj.content}}
			</view>
			<view class="margin-sm font-30">
				<text v-if="contentObj.pictures">图片：</text>
				<view class="flex justify-around align-center flex-wrap">
					<u--image v-for="item in contentObj.pictures" :key="item.id" :showLoading="true" :src="item.picture"
						width="80px" height="80px" @click="handlePicClick(contentObj.pictures)"></u--image>
				</view>
				<view class="margin-top-sm" v-if="contentObj.videoUrl">视频：</view>
				<video v-if="contentObj.videoUrl" :src="contentObj.videoUrl" controls></video>
			</view>
		</view>
		
		<view class="sport" v-else-if="title === '饮食历史'">
			<view class="font-max color-1129 margin-lg">
				{{title}}
			</view>
			<view class="margin-sm font-30">
				汇报日期：{{contentObj.reportDate}}
			</view>
			<view class="margin-sm font-30">
				医生建议：{{contentObj.advice == null ?"暂无内容" : contentObj.advice}}
			</view>
			<view class="margin-sm font-30">
				个人反馈：{{contentObj.content == null ?"暂无内容" : contentObj.content}}
			</view>
			<view class="margin-sm font-30">
				<text v-if="contentObj.pictures">图片：</text>
				<view class="flex justify-around align-center flex-wrap">
					<u--image v-for="item in contentObj.pictures" :key="item.id" :showLoading="true" :src="item.picture"
						width="80px" height="80px" @click="handlePicClick(contentObj.pictures)"></u--image>
				</view>
				<view class="margin-top-sm" v-if="contentObj.videoUrl">视频：</view>
				<video v-if="contentObj.videoUrl" :src="contentObj.videoUrl" controls></video>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getActionHistroyById,
		getFoodHistroyById,
		getDrugHistroyById
	} from '../../../api/histroy.js'
	import {
		pngBase64ToBlob,
		blobToURL
	} from '../../../utils/imageTypeChange.js'
	export default {
		data() {
			return {
				title:'',
				id: 0,
				contentObj: {},
				pageLoading:true
			}
		},
		onLoad(e) {
			console.log(e);
			this.title = e.title
			uni.setNavigationBarTitle({
				title: e.title
			})
			this.id = e.id
			this.findType(e.title)
		},
		methods: {
			findType(title) {
				if (title === '运动历史') {
					this.fetchActionHistroyById()
				} else if (title === '饮食历史') {
					this.fetchFoodHistroyById()
				} else {
					this.fetchDrugHistroyById()
				}
				setTimeout(() => {
					this.pageLoading = false
				},1000)
			},
			fetchActionHistroyById() {
				getActionHistroyById(this.id).then(res => {
					if (res.pictures !== null) {
						let picList = res.pictures
						picList.forEach(item => {
							item.picture = 'data:image/jpg;base64,' + item.picture
						})
					}
					this.contentObj = res
				})
			},
			fetchDrugHistroyById() {
				getDrugHistroyById(this.id).then(res => {
					this.contentObj = res
				})
			},
			fetchFoodHistroyById() {
				getFoodHistroyById(this.id).then(res => {
					if (res.pictures !== null) {
						let picList = res.pictures
						picList.forEach(item => {
							item.picture = 'data:image/jpg;base64,' + item.picture
						})
					}
					this.contentObj = res
				})
			},
			handlePicClick(data) {
				console.log(data);
				let resList = []
				data.forEach(item => {
					resList.push(blobToURL(pngBase64ToBlob(item.picture)))
				})

				uni.previewImage({
					urls: resList,
					success(e) {
						console.log(e);
					},
					fail(e) {
						console.log(e);
					}
				})
			}
		}
	}
</script>

<style>

</style>
