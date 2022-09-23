<template>
	<view class="main-contianer margin-lg">
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="title-contianer font-max color-1129">
			{{contentObj.date}}
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
			<mp-html :content="contentObj.content"></mp-html>
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
				<u--textarea v-model="userContent" placeholder="请先输入内容,再进行文件上传" count :confirm-type="'done'">
				</u--textarea>
			</view>

			<view class="margin-top-sm">
				<u-divider text="视频/图片上传" :textSize="24"></u-divider>

				<u-upload :disabled="userContent.length > 0 ? false : true" :fileList="fileList4"
					@beforeRead="beforeRead" @afterRead="afterRead" @delete="deletePic" name="4" :maxCount="9" multiple
					accept="" :previewFullImage="true">
				</u-upload>
				<button type="primary" @click="handleSubmit">点我上传</button>
			</view>
		</view>



		<!-- <u-notify ref="uNotify" message="Hi uView"></u-notify> -->
	</view>
</template>

<script>
	import {
		getFoodById,
		reportFood
	} from '../../api/food.js';
	export default {
		data() {
			return {
				contentObj: {},
				needReport: false,
				userContent: '', //用户输入
				fileList4: [],
				pageLoading: true
			};
		},
		onLoad(e) {
			console.log(e);
			getFoodById(e.id).then(res => {
				console.log(res);
				this.contentObj = res
				this.pageLoading = false
			})
		},
		methods: {
			// 用户单击我已完成
			async finished() {
				console.log(this.contentObj);
				const res = await reportFood({
					fid: this.contentObj.id
				})
				this.$nextTick(() => {
					// uni.$emit('updateActionTypeList')
					uni.switchTab({
						url: '/pages/food/food'
					})
				})

			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {

				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				console.log(lists);
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url, lists[i].type)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url, type) {
				let subUrl = 'picture';
				if (type.includes('video')) {
					subUrl = 'video'
				} else {
					subUrl = 'picture'
				}
				let myurl =
					`https://www.aikeyunkang.top:8081/food/report/${subUrl}`
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: myurl,
						filePath: url,
						name: 'file',
						success: (res) => {
							let data = JSON.parse(res.data)
							console.log('data', data);
							if (res.statusCode === 200) {
								setTimeout(() => {
									uni.showToast({
										title: '上传成功',
										duration: 1000
									})

								}, 1000)
							}
							setTimeout(() => {
								resolve(data.body)
							}, 1000)
						}
					});
				})
			},
			// 处理上传
			handleSubmit() {
				// 获取文件数组
				const fileList = this.fileList4
				for (let i = 0; i < fileList.length; i++) {
					if (fileList[i].status === 'uploading') {
						uni.showToast({
							title: '正在上传请稍候',
							icon: 'error',
							duration: 2000
						})
						return;
					}
				}
				let count = 0;
				let imgList = [],
					video = '';
				// 数组操作
				fileList.forEach((item) => {
					let index = item.url.lastIndexOf('/')
					let name = item.url.slice(index + 1, item.url.length)
					if (item.type.includes('image')) {
						// 图片
						imgList.push(name)
					} else if (item.type.includes('video')) {
						// 视频
						if (count == 0) {
							// 只上传一个视频
							video = name;
							count++;
						} else {
							uni.showToast({
								title: '只能上传一个视频',
								icon: 'error',
								duration: 2000
							})
							return
						}
					}
				})
				// 传输数据
				const data = {
					fid: this.contentObj.id,
					content: this.userContent,
					pictures: imgList,
					video:video === "" ? undefined : video
				}
				// 上传数据
				reportFood(data).then(res => {
					if (res == null) {
						uni.switchTab({
							url: '/pages/food/food'
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss">

</style>
