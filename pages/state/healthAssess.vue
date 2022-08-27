<template>
	<view>

		<u-loading-page :loading="loadingPage"></u-loading-page>
		<view>
			<u-collapse>

				<!-- 测试开始======================================== -->
				<!-- <u-collapse-item title="身体指标" name="Docs guide">
					<text slot="title" class="title-style">身体指标</text>
					<u-cell-group>
						<u-cell title="身高(cm)">180</u-cell>
						<u-cell title="体重(kg)">
							<view class="flex" slot="value">

								<text class="margin-left-sm">65</text>
							</view>
						</u-cell>

						<u-cell title="BMI">
							<view class="flex " slot="value">
								<u-tag text="正常" plain size="mini" type="success">
								</u-tag>
								<text class="margin-left-sm ">20.1</text>
							</view>
						</u-cell>

						<u-cell title="腰围(cm)">
							<view class="flex " slot="value">
								<text class="margin-left-sm">78</text>
							</view>
						</u-cell>

						<u-cell title="肌力汇总">
							<view class="flex " slot="value">
								<button type="default" size="mini" @click="handleSelectImg">查看图片</button>
							</view>
						</u-cell>
					</u-cell-group>

				</u-collapse-item> -->
				<!-- 测试结束======================================================= -->

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
