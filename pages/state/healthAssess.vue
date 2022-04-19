<template>
	<view>
		<!-- <view class="healthType flex justify-between margin-sm">
			<view class="font-34">
				身体成分
			</view>
			<view class="">
				<u-icon name="arrow-right" ></u-icon>
			</view>
		</view>
		
		<view class="margin-sm">
			<u-divider
			        text=""
			        textColor="#2979ff"
			        lineColor="#2979ff"
			></u-divider>
		</view> -->

		<view>

			<u-collapse>
				<u-collapse-item title="身体指标" name="Docs guide">
					<u-cell-group>
						<u-cell title="身高(cm)">180</u-cell>
						<u-cell title="体重(kg)">
							<view class="flex " slot="value">
								
								<text class="margin-left-sm">65</text>
							</view>
						</u-cell>
						
						<u-cell title="BMI">
							<view class="flex " slot="value">
								<u-tag text="正常" plain size="mini" type="success">
								</u-tag>
								<text class="margin-left-sm">20.1</text>
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

				</u-collapse-item>
				<u-collapse-item v-for="(item,index) in typeList" :key="index"  :title="item['title']" >
					<u-cell-group>
						<u-cell v-for="(pitem,pindex) in item['params']" :key='pitem.name' :title="pitem.name">
							<view class="flex " slot="value">
								<u-tag v-if="pitem['tags']" :text="pitem.tags" plain size="mini" ></u-tag>
								<button type="default" v-if="pitem['isFile']" size="mini" @click="handleCheckFile(pitem)">查看文件</button>
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
	import {getAllType,getUserHealth} from '../../api/healthAssess.js'
	export default {
		data() {
			return {
				typeList:[]
			};
		},
		onLoad() {
			this.getUserHealthInfo()
		},
		methods:{
			// 获取所有type
			async getTypeList() {
				const res = await getAllType()
				this.typeList = res
				console.log(res)
			},
			async getUserHealthInfo() {
				const res = await getUserHealth()
				this.typeList = res
				console.log(res)
			},
			
			
			handleSelectImg(url){
				uni.downloadFile({
						url,//下载地址接口返回
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
			handleCheckFile(item){
				console.log(item)
				this.handleSelectImg(item.value)
			}
		}
	}
</script>

<style lang="scss">

</style>
