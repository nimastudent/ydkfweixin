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
			<button style="margin-top:20upx" type="primary" v-show="!needReport"
				@click="needReport = !needReport">我要汇报</button>
			<button style="margin-top:20upx" type="default" v-show="needReport"
				@click="needReport = !needReport">不用汇报</button>
		</view>
		<view class="report-contianer" v-show="needReport">
			<view class="margin-top-xl">

				<text>用户反馈：</text>
				<u--textarea v-model="pecent" placeholder="请输入内容" count :confirm-type="'done'"></u--textarea>
			</view>

			<!-- <view class="file-contianer" v-for="(item,index) in fileList" :key="index">
				<img src="../../static/file.png" alt="">
				<text>{{item}}</text>
			</view> -->



			<view class="">
				<l-file ref="lFile" @up-success="upSuccess"></l-file>
			</view>

			<view class="margin-top-sm">
				<button type="default" @click="upload">视频/图片上传</button>
			</view>
			<!-- 
			<view class="margin-top-sm">
				<button type="primary" @click="handleSubmit">提交</button>
			</view> -->
		</view>


		<u-modal :show="modalInfo.show" :confirmText="modalInfo.confiromText" :cancelText="modalInfo.cancelText"
			:showCancelButton="true" :buttonReverse="true" @confirm="handleModalCancle" @cancel="handleUpload">
			<text class="font-34">{{modalInfo.content}}</text>
		</u-modal>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		getChuFangByName,
		getChuFangById,
		reportSport,
		getHistroy,
		getHistroyById
	} from '../../api/sport.js'
	export default {
		data() {
			return {
				name: '',
				uId: 0,  //用户id
				contentObj: {},
				pecent: '',
				modalInfo: {
					show: false,
					content: '请确认是否需要填写反馈',
					confiromText: '填写',
					cancelText: '不填写'
				},
				needReport: false, //用户是否需要反馈
				fileList: ['pc测试'], //用于用户上传成功回显
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		onLoad(e) {
			this.name = e.item

			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.uId = res.data.id
				}
			})
			this.getChuFang()
			// getHistroy().then(res => {
			// 	console.log(res);
			// })
			getHistroyById(20).then(res => {
				console.log(res);
			})
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
				if (this.contentObj.tip) {
					// <p>小提示：${this.contentObj.tip}</p>
					// <font size=\"4\"><b>拉伸注意</b></font>
					this.contentObj.actionContent = `<font size=\"4\"><b>小提示：${this.contentObj.tip}</b></font>` + this
						.contentObj.actionContent
				}
			},
			upload() {
				if (this.pecent.length < 1) {
					this.modalInfo.show = true
				} else {
					this.handleUpload()
				}

			},
			// 处理文件上传
			handleUpload() {
				this.modalInfo.show = false
				this.$refs.lFile.upload({
					//替换为你的上传接口地址
					url: 'https://www.aikeyunkang.top:8081/action/report',
					// 服务端接收附件的key
					name: 'files',
					//根据你接口需求自定义 (优先不传content-type,安卓端无法收到参数再传)
					header: {},
					aid: this.uId,
					content: this.pecent
				})
			},
			upSuccess(res) {
				console.log(res);
				if (res.data.success) {
					this.$refs.uToast.show({
						title: '文件上传成功!',
						type: 'success',
					})
					this.fileList.push(res.fileName)
				}
			},
			async finished() {
				console.log(this.contentObj);
				const res = await reportSport({
					aid: this.contentObj.aid
				})
				console.log(res);
				// uni.navigateBack()
			},
			handleModalCancle() {
				this.modalInfo.show = false
			},

		}
	}
</script>

<style lang="scss" scoped>
	.file-contianer {
		height: 9vh;
		width: 100%;
		padding: 10upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.file-contianer img {
		width: 100upx;
		height: 100upx;
	}

	.file-contianer text {
		font-size: 30upx;
	}
</style>
