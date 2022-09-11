<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<!-- <view class="bt-img" @tap="records">
					<image v-show="isrecord" src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/keyboard.png"></image>
				<image v-show="!isrecord" src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/microphone.png"></image>
				</view> -->
				<!-- 文本框 -->
				<!-- <textarea auto-height="true" class="chat-send btn" :class="{displaynone:isrecord}" @input="inputs"
					@focus="focus" v-model="msg"></textarea> -->

				<u--textarea class="chat-send btn" :class="{displaynone:isrecord}" :value="msg" @input="inputs"
					:confirm-type="'done'" @focus="focus" autoHeight>
				</u--textarea>
				<view class="record btn" :class="{displaynone:!isrecord}" @touchstart="touchstart" @touchend="touchend"
					@touchmove="touchmove">
					按住说话
				</view>
				<view class="bt-img" @tap="more" v-show="!isTextSend">
					<image src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/more.png"></image>
				</view>
				<view class="" v-show="isTextSend">
					<button type="primary" size="mini" @click="send(msg,'text')">发送</button>
				</view>
			</view>
			<!-- 更多 -->
			<view class="more" :class="{displaynone:!ismore}">
				<view class="more-list" @tap="sendImg('album')">
					<image src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/photo.png"></image>
					<view class="more-list-title">图片</view>
				</view>
				<view class="more-list" @tap="sendImg('camera')">
					<image src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/camera.png"></image>
					<view class="more-list-title">拍照</view>
				</view>
				<view class="more-list">
					<image src="https://www.aikeyunkang.top:8081/api/upload/static/uni-app-static-icon/video.png"></image>
					<view class="more-list-title">视频</view>
				</view>

			</view>
		</view>
		<view class="voice-bg" :class="{displaynone:!voicebg}">
			<view class="voice-bg-len">
				<view class="voice-bg-time" :style="{width:vlength/0.6+'%'}">
					{{vlength}}″
				</view>
				<view class="voice-del">上滑取消录音</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 录音
	var recorderManager = uni.getRecorderManager();
	import Scoket from '../../../utils/socket.js'

	export default {
		data() {
			return {
				isrecord: false,
				ismore: false,
				voicebg: false,
				isTextSend: false, // 文本发送按钮显示
				pageY: 0,
				msg: "",
				timer: '', //计时器
				vlength: 0
			};
		},
		
		methods: {
			//获取高度方法
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height);
				}).exec();
			},
			//切换音频
			records() {
				//切换的时候关闭其他界面
				this.isrecord = !this.isrecord
				//切换高度
				setTimeout(() => {
					this.getElementHeight()
				},10)
			},
			//文字发送
			inputs(e) {
				// var chatm = e.detail.value;
				// var pos = chatm.indexOf('\n');
				// 检索字符串没有数据，返回-1
				// if (pos != -1 && chatm.length > 1) {
				// this.$emit('inputs', this.msg);
				// setTimeout(() => {
				// 	this.msg = '';
				// }, 0)
				// }

				// if (pos != -1 && chatm.length > 1) {
				// 	// 0为表情和文字
				// 	this.send(this.msg, 0)
				// }
				
				this.msg = e
				
				if (e.length > 0) {
					this.isTextSend = true
				} else {
					this.isTextSend = false
				}

			},


			// 输入框聚焦
			focus(e) {
				this.ismore = false
				//关闭其他项
				setTimeout(() => {
					this.getElementHeight()
				}, 10)
			},
			//更多功能
			more() {
				this.ismore = !this.ismore;
				//切换的时候关闭其他界面
				this.isrecord = false;
				setTimeout(() => {
					this.getElementHeight();
				}, 10)
			},
			//图片发送
			sendImg(e) {
				let count = 1;
				uni.chooseImage({
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [e], //从相册选择
					// success: function (res) { //用function的方式会找不到send方法
					success: (res) => {
						console.log(res);
						if (res.errMsg = "chooseImage:ok") {
							const file = res.tempFilePaths[0];
							
							let data = {
								message: file,
								type: 'image'
							}
							this.$emit('inputs', data);
						} else {
							console.log((res.errMsg));
						}
					}
				});
			},
			//音频处理
			//开始录音
			touchstart(e) {
				console.log("开始录音")
				console.log("点击产生数据", e)
				this.pageY = e.changedTouches[0].pageY;
				this.voicebg = true;
				let i = 1;
				recorderManager.start();
				this.timer = setInterval(() => {
					this.vlength = i;
					i++;
					console.log("计时器开始工作,第几秒", i)
					//结束计时
					if (i > 60) {
						clearInterval(this.timer);
						this.touchend();
					}
				}, 1000)
			},
			//删除录音
			touchmove(e) {
				// console.log("滑动到的y轴高度：",e.changedTouches[0].pageY);
				if (this.pageY - e.changedTouches[0].pageY > 100) {
					// 关闭录音界面
					this.voicebg = false;
				}
			},
			// 结束录音
			touchend() {
				console.log("结束录音")
				clearInterval(this.timer);
				recorderManager.onStop((res) => {
					let data = {
						voice: res.tempFilePath,
						time: this.vlength
					}
					if (this.voicebg) {
						this.send(data, 2);
					}
					// //时长归位
					this.vlength = 0;
					this.voicebg = false;
					console.log('recorder stop' + JSON.stringify(res));
					// self.voicePath = res.tempFilePath;
					console.log("i send msg");
				});
				recorderManager.stop();
			},
			//发送
			send(msg, type) {
				let data = {
					message: msg,
					type: type
				}
				this.$emit('inputs', data);
				setTimeout(() => {
					this.msg = '';
				}, 0)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid rgba(39, 40, 50, 0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		// padding-bottom: var(--status-bar-height);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		align-items: flex-end;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.chat-send {
			line-height: 44rpx;
		}

		.record {
			line-height: 44rpx;
			text-align: center;
			font-size: 20rpx;
			color: rgba(39, 40, 50, 0.6);
		}
	}

	.more {
		width: 100%;
		height: 436rpx;
		background: rgba(236, 237, 238, 1);
		box-shadow: 0px 11rpx 0px 0px rgba(0, 0, 0, 0.1);
		bottom: env(safe-area-inset-bottom);
		padding: 8rpx 20rpx;
		box-sizing: border-box;

		.more-list {
			width: 25%;
			text-align: center;
			float: left;
			padding-top: 32rpx;

			image {
				width: 90rpx;
				height: 90rpx;
				padding: 24rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 24rpx;
			}

			.more-list-title {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.5);
				line-height: 34rpx;
			}
		}
	}

	.voice-bg {
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 1001;

		.voice-bg-len {
			height: 84rpx;
			width: 600rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-color: rgba(255, 255, 255, 0.2);
			border-radius: 42rpx;
			text-align: center;
		}

		.voice-bg-time {
			display: inline-block;
			min-width: 120rpx;
			line-height: 84rpx;
			background-color: rgba(255, 228, 49, 1);
			border-radius: 42rpx;
		}

		.voice-del {
			position: absolute;
			bottom: -480rpx;
			width: 100%;
			text-align: center;
			color: #fff;
			font-size: 28rpx;
		}
	}
</style>
