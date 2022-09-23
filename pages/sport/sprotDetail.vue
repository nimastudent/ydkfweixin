<template>
	<view class="main-contianer margin-lg">
		<u-loading-page :loading="pageLoading" loading-text="正在加载中..."></u-loading-page>
		<view class="font-max color-1129">
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
				<u--textarea v-model="pecent" placeholder="请先输入内容,再进行文件上传" count :confirm-type="'done'"></u--textarea>
			</view>
			<view class="margin-top-sm">
				<u-divider text="视频/图片上传" :textSize="24"></u-divider>
				<u-upload :disabled="pecent.length > 0 ? false : true" :fileList="fileList4" @beforeRead="beforeRead"
					@afterRead="afterRead" @delete="deletePic" name="4" :maxCount="9" multiple accept="image"
					:previewFullImage="true">
				</u-upload>
				<button type="primary" @click="handleSubmit">点我上传</button>
			</view>
		</view>
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</view>
</template>

<script>
	import {
		getChuFangByName,
		getChuFangById,
		reportSport,
	} from '../../api/sport.js'
	export default {
		data() {
			return {
				name: '',
				contentObj: {},
				pecent: '',
				modalInfo: {
					show: false,
					content: '请确认是否需要填写反馈',
					confiromText: '填写',
					cancelText: '不填写'
				},
				needReport: false, //用户是否需要反馈
				fileList4: [],
				pageLoading:true
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
				if (this.contentObj.tip) {
					// <p>小提示：${this.contentObj.tip}</p>
					// <font size=\"4\"><b>拉伸注意</b></font>
					this.contentObj.actionContent = `<font size=\"4\"><b>小提示：${this.contentObj.tip}</b></font>` + this
						.contentObj.actionContent
				}
				this.pageLoading = false
			},

			async finished() {
				const res = await reportSport({aid:this.contentObj.aid})
				this.$nextTick(() => {
					uni.$emit('updateActionTypeList')
					uni.switchTab({
						url: '/pages/sport/sport'
					})
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {

				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				console.log("lists", lists);
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
				if(type.includes('video')){
					subUrl = 'video'
				}else{
					subUrl = 'picture'
				}
				let myurl =
					`https://www.aikeyunkang.top:8081/action/report/${subUrl}`
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: myurl,
						filePath: url,
						name: 'file',
						success: (res) => {
							if(res){
								const data = JSON.parse(res.data)
								if (res.statusCode === 200) {
									uni.showToast({
										title: '上传成功',
										duration: 1500
									})
								}
								setTimeout(() => {
									resolve(data.body)
								}, 1000)
							}else{
								uni.showToast({
									title:'出错了，请联系工作人员！',
									icon:'error'
								})
							}
							
						}
					});

				})
			},
			
			handleSubmit(){
				console.log(this.fileList4);
				// 获取文件数组
				const fileList = this.fileList4
				for(let i = 0; i < fileList.length ;i++){
					if(fileList[i].status === 'uploading'){
						uni.showToast({
							title:'正在上传请稍候',
							icon:'error',
							duration:2000
						})
						return;
					}
				}
				let count = 0;
				let imgList = [] , video = '';
				// 数组操作
				fileList.forEach((item) => {
					let index = item.url.lastIndexOf('/')
					let name = item.url.slice(index+1,item.url.length)
					if(item.type.includes('image')){
						// 图片
						imgList.push(name)
					}else if(item.type.includes('video')){
						// 视频
						if(count == 0){
							// 只上传一个视频
							video = name;
							count++;
						}else{
							uni.showToast({
								title:'只能上传一个视频',
								icon:'error',
								duration:2000
							})
							return
						}
					}
				})
				// 传输数据
				const data = {
					aid:this.contentObj.aid,
					content:this.pecent,
					pictures:imgList,
					video
				}
				// 上传数据
				reportSport(data).then(res => {
					if(res == null){
						uni.$emit('updateActionTypeList')
						uni.switchTab({
							url: '/pages/sport/sport'
						})
					}
				})
				
			}

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

	.radio-style {
		display: flex;
		justify-content: space-around;
		margin: 20upx 0;
	}
</style>
