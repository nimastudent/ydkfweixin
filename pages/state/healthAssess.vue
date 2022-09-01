<template>
	<view>

		<u-loading-page :loading="loadingPage"></u-loading-page>
		<view>
			<u-collapse>


				<u-collapse-item v-for="(item,index) in typeList" :key="index" :title="item['title']">


					<u-cell-group>
						<u-cell v-for="(pitem,pindex) in item['params']" :key='pitem.name'>

							<!-- 该为 “家族病史” -->
							<!-- 标题插槽 -->
							<view slot="title" class="p-title-style">
								<text>{{pitem.name}}</text>
							</view>

							<!-- 内容插槽 -->
							<view class="flex collapse-item" slot="value">
								<u-tag v-if="pitem['tags']" :text="pitem.tags" plain size="large"></u-tag>
								<button type="default" v-if="pitem['isFile']" size="large"
									@click="handleCheckFile(pitem)">查看文件</button>
								<text class="margin-left-sm" v-else="!pitem['isFile']">{{pitem.value}}</text>
							</view>
						</u-cell>
					</u-cell-group>
				</u-collapse-item>

			</u-collapse>

			<!-- <text v-for="(item,index) in typeList" :key="index">{{item}}{{index}}</text> -->

		</view>

	</view>
</template>

<script>
	import {
		getAllType,
		getUserHealth
	} from '../../api/healthAssess.js'
	export default {
		data() {
			return {
				typeList: [],
				itemStyle: {

				},
				head: {
					fontSize: '20px',
					fontWeight: 500,
					color: '#ff08b5'
				},
				loadingPage: true
			};
		},
		onLoad() {
			this.getUserHealthInfo()
		},
		methods: {
			// 获取所有type
			async getTypeList() {
				const res = await getAllType()
				this.typeList = res
				console.log(res)
			},
			async getUserHealthInfo() {
				const res = await getUserHealth()
				this.typeList = res
				this.loadingPage = false
				console.log(res)
			},


			handleSelectImg(url) {
				uni.downloadFile({
					url, //下载地址接口返回
					success: (data) => {
						console.log(data)
						if (data.statusCode === 200) {
							//文件保存到本地
							uni.saveFile({
								tempFilePath: data.tempFilePath, //临时路径
								success: function(res) {
									uni.showToast({
										icon: 'none',
										mask: true,
										title: '文件已保存：' + res.savedFilePath, //保存路径
										duration: 3000,
									});
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: res.savedFilePath,
											success: function(res) {
												console.log('打开文档成功');
											}
										});
									}, 3000)
								}
							});
						}
					},
					fail: (err) => {
						console.log(err);
						uni.showToast({
							icon: 'none',
							mask: true,
							title: '失败请重新下载',
						});
					},
				});
			},
			handleCheckFile(item) {
				console.log(item)
				this.handleSelectImg(item.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.atitle-style {
		margin: 10rpx;
		font-size: 40rpx;
		letter-spacing: 6rpx;
		font-weight: 500;
	}

	.collapse-item {
		font-size: 35rpx;
		letter-spacing: 4rpx;
		padding-bottom: 10px;
	}

	.p-title-style {
		font-size: 35rpx;
		letter-spacing: 4rpx;
	}
</style>
