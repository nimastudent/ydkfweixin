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
			<mp-html :content="contentObj.actionContent"></mp-html>
		</view>

		<view class="">
			<button type="primary" @click="finished">我已完成(无需上传)</button>
		</view>
		<view class="margin-top-xl">

			<text>用户反馈：</text>
			<u--textarea v-model="pecent" placeholder="请输入内容" count :confirm-type="'done'"></u--textarea>
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

		<u-modal :show="modalInfo.show"
			:confirmText="modalInfo.confiromText" :cancelText="modalInfo.cancelText" :showCancelButton="true"
			:buttonReverse="true" @confirm="handleUpload" @cancel="handleModalCancle">
			<text class="font-34">{{modalInfo.content}}</text>
			</u-modal>
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
				// content: '<p data-we-video-p=\"true\"><video src=\"http://47.98.120.130:8080/api/upload/actionVideo/1648458430555.mp4\" controls=\"controls\" style=\"max-width:100%\"></video></p><p>视频测试</p><p></p>',
				contentObj: {
				
				},
				pecent: '',
				modalInfo: {
					show: false,
					content: '请确认是否需要填写反馈',
					confiromText: '填写',
					cancelText: '不填写'
				}
			};
		},
		onLoad(e) {
			this.name = e.item
			this.getChuFang()
		},
		methods: {
			// 获取处方
			async getChuFang() {
				let params = {
					name: this.name
				}
				const res = await getChuFangByName({
					params
				})
				if (res) {
					this.getContent(res[0].id)
				}
			},
			// 获取处方中的第一个
			async getContent(id) {
				const res = await getChuFangById({
					params: {
						id
					}
				})
				this.contentObj = res
				// 将小提示 拼接到content中
				if(this.contentObj.tip){
					// <p>小提示：${this.contentObj.tip}</p>
					// <font size=\"4\"><b>拉伸注意</b></font>
					this.contentObj.actionContent = `<font size=\"4\"><b>小提示：${this.contentObj.tip}</b></font>` + this.contentObj.actionContent
				}
			},
			upload() {
				this.modalInfo.show = true

				// this.$refs.lFile.upload({
				// 	//替换为你的上传接口地址
				// 	url: 'http://47.98.120.130:8080/action/report',
				// 	// 服务端接收附件的key
				// 	name: 'files',
				// 	//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
				// 	header: {
				// 	},
				// 	aid:1,
				// 	content:'pc测试'
				// })
			},
			upSuccess(res) {
				console.log(res)
			},
			finished() {
				uni.navigateBack()
			},
			handleModalCancle() {
				this.modalInfo.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
