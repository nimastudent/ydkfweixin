<template>
	<view class="main-contianer margin-lg">
		<view class="title-contianer font-max color-1129">
			{{contentObj.actionName}}

		</view>
		<view class="flex justify-between margin-sm">
			<view class="">
				所属医生：{{contentObj.doctorName}}
			</view>
			<view class="">
				日期：{{contentObj.date}}
			</view>
		</view>

		<view class="flex justify-center margin-top-sm">
			<mp-html :content="content"></mp-html>
		</view>
		
		<view class="">
			<button type="primary" @click="finished" >我已完成</button>
		</view>
		<view class="margin-top-xl">
			
			<text>用户反馈：</text>
			<u--textarea v-model="pecent" placeholder="请输入内容" count ></u--textarea>
		</view>


		<view class="">
			<l-file ref="lFile" @up-success="upSuccess"></l-file>
		</view>

		<view class="margin-top-sm">
			<button type="default" @click="upload">视频/图片上传</button>
		</view>
		
		<view class="margin-top-sm">
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		getChuFangByName,
		getChuFangById
	} from '../../api/sport.js'
	export default {
		data() {
			return {
				name: '',
				content: '<p data-we-video-p=\"true\"><video src=\"http://47.98.120.130:8080/api/upload/actionVideo/1648458430555.mp4\" controls=\"controls\" style=\"max-width:100%\"></video></p><p>视频测试</p><p></p>',
				contentObj: {
					actionName: '健康跑',
					tip: '跑的时候注意别扭到脚了',
					doctorName: '甲医生',
					date: '2022-03-17'
				},
				pecent: '',
			};
		},
		onLoad(e) {
			console.log(e)
			this.name = e.item
			this.getChuFang()
		},
		methods: {
			async getChuFang() {
				let params = {
					name: this.name
				}
				const res = await getChuFangByName({
					params
				})
				if(res){
					this.getContent(res[0].id)
				}
			},
			async getContent(id){
				const res = await getChuFangById({params:{id}})
				this.contentObj = res
			},
			upload() {
				this.$refs.lFile.upload({
					//替换为你的上传接口地址
					url: 'http://47.98.120.130:8080/action/report',
					// 服务端接收附件的key
					name: 'files',
					//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
					header: {
					},
					aid:1,
					content:'pc测试'
				})
			},
			upSuccess(res){
				console.log(res)
			},
			finished(){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
