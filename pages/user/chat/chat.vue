<template>
	<!-- 聊天界面展示https://www.bilibili.com/video/BV1hT4y1P75N?p=22  搭建1和2 -->
	<view class="content">
		<!-- 聊天内容 -->
		<u-loading-page :loading="loading"></u-loading-page>
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'px'}">
				<view class="chat-ls" v-for="(item,index) in msg" :key="index" :id="'msg'+ index">
					<view class="chat-time" v-if="item.createTime != ''">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-left" v-if="!item.self">
						<image class="user-img" :src="item.avator"></image>
						<view class="message" v-if="item.type == 'text'">
							<!-- 文字 -->
							<view class="msg-text">{{item.content}}</view>
						</view>
						<view class="message" v-if="item.type == 'image'" @tap="previewImg(item.content)">
							<!-- 图像 -->
							<image :src="item.content" class="msg-img" mode="widthFix"></image>
						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								<!-- hotLine -->
								<image src="../../../static/voice.png" class="voice-img"></image>
								{{item.sendText.time}}″
							</view>
						</view>

					</view>
					<view class="msg-m msg-right" v-if="item.self">
						<image class="user-img" :src="item.avator"></image>
						<view class="message" v-if="item.type == 'text'">
							<!-- 文字 -->
							<view class="msg-text">{{item.content}}</view>
						</view>
						<view class="message" v-if="item.type == 'image'" @tap="previewImg(item.content)">
							<!-- 图像 -->
							<image :src="item.content" class="msg-img" mode="widthFix"></image>
						</view>
						<view class="message" v-if="item.TextType == 2" @tap="playVoice(item.sendText.voice)">
							<!-- 音频 -->
							<view class="msg-text voice" :style="{width:item.sendText.time*4+'rpx'}">
								<!-- hotLine -->
								<image src="../../../static/voice.png" class="voice-img"></image>
								{{item.sendText.time}}″
							</view>
						</view>
					</view>
					<!-- <view>{{isUpdate}}</view> -->
				</view>
			</view>
		</scroll-view>

		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import dateTime from '@/utils/dateTime.js';
	import submit from './submit.vue';
	import {
		getChatObj,
		getChatById
	} from '../../../api/chat.js'


	//音频播放
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		components: {
			submit,
		},
		data() {
			return {
				msg: [],
				// 反转数据接收
				unshiftmsg: [],
				imgMsg: [],
				scrollToView: '',
				oldTime: new Date(),
				inputh: '60',
				loading: true,
				toUid: '',
				userInfo: {},
				isUpdate: true,
				count:0
			}
		},
		onShow() {
			// 数组倒叙 主要是应对后端传过来的数据
			for (var i = 0; i < this.msg.length; i++) {
				//时间间隔处理
				if (i < this.msg.length - 1) { //这里表示头部时间还是显示一下
					let t = dateTime.spaceTime(this.oldTime, this.msg[i].time);
					if (t) {
						this.oldTime = t;
					}
					this.msg[i].time = t;
				}
				// 获取图片，为下面的预览做准备
				// if (this.msg[i].TextType == 1) {
				// 	this.imgMsg.unshift(this.msg[i].sendText)
				// }
				// this.unshiftmsg.unshift(this.msg[i]);
			}
			// 跳转到最后一条数据 与前面的:id进行对照
			this.$nextTick(function() {
				this.scrollToView = 'msg' + (this.msg.length - 1)
			})
		},
		onLoad() {
			this.fetchChatObj()
			this.fetchChat()
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					this.userInfo = res.data
				}
			})
		},
		mounted() {
			window.addEventListener('setItem', this.test)
		},
		methods: {
			test() {
				this.count++;
				const value = uni.getStorageSync('isUpdate')
				console.log(' 新的值是', this.count);
			},
			async fetchChatObj() {
				const res = await getChatObj()
				if (res) {
					// 设置navgationTitle
					uni.setNavigationBarTitle({
						title: res[0].name
					})

					this.toUid = res[0].toUid
				}
			},
			async fetchChat() {
				const toUid = uni.getStorageSync('toUid')
				const res = await getChatById(toUid)
				if (res) {
					this.msg = res;
					this.loading = false;
					this.goBottom();
				}
			},
			changeTime(date) {
				return dateTime.dateTime1(date);
			},
			// 进行图片的预览
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e) {
						index = i;
					}
				}
				console.log("index", e)
				
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//音频播放
			playVoice(e) {
				innerAudioContext.src = e;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
			},
			//接受输入内容
			inputs(e) {
				// 发送给服务器消息
				console.log(this.toUid);
				const msgOBJ = {
					uid: this.userInfo.id,
					toUid: this.toUid,
					time: dateTime.getNowTime(),
					type: e.type,
					content: e.message,
					role: 'patient'
				}
				uni.$u.scoket.send(JSON.stringify(msgOBJ))
				msgOBJ.self = true;
				this.msg.push(msgOBJ);
				this.goBottom();
				// this.unshiftmsg.push(data);
				// 跳转到最后一条数据 与前面的:id进行对照
			},
			//输入框高度
			heights(e) {
				console.log("高度:", e)
				this.inputh = e;
				this.goBottom();
			},
			// 滚动到底部
			goBottom() {
				this.scrollToView = '';
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.msg.length - 1)
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.content {
		height: 100%;
		background-color: rgba(244, 244, 244, 1);
	}

	.chat {
		height: 100%;

		.chat-main {
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 20rpx;
			// padding-bottom: 120rpx;  //获取动态高度
			display: flex;
			flex-direction: column;
		}

		.chat-ls {
			.chat-time {
				font-size: 24rpx;
				color: rgba(39, 40, 50, 0.3);
				line-height: 34rpx;
				padding: 10rpx 0rpx;
				text-align: center;
			}

			.msg-m {
				display: flex;
				padding: 20rpx 0;

				.user-img {
					flex: none;
					width: 80rpx;
					height: 80rpx;
					border-radius: 20rpx;
				}

				.message {
					flex: none;
					max-width: 480rpx;
					margin: 0 6rpx;
				}

				.msg-text {
					font-size: 32rpx;
					color: rgba(39, 40, 50, 1);
					line-height: 44rpx;
					padding: 18rpx 24rpx;
				}

				.msg-img {
					max-width: 400rpx;
					border-radius: 20rpx;
				}

				.msg-map {
					background: #fff;
					width: 464rpx;
					height: 284rpx;
					overflow: hidden;

					.map-name {
						font-size: 32rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
						padding: 18rpx 24rpx 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map-address {
						font-size: 24rpx;
						color: rgba(39, 40, 50, 0.4);
						padding: 0 24rpx;
						//下面四行是单行文字的样式
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}

					.map {
						padding-top: 8rpx;
						width: 464rpx;
						height: 190rpx;
					}
				}

				.voice {
					// width: 200rpx;
					min-width: 100rpx;
					max-width: 400rpx;
				}

				.voice-img {
					width: 28rpx;
					height: 36rpx;
				}
			}

			.msg-left {
				flex-direction: row;

				.msg-text {
					margin-left: 16rpx;
					background-color: #fff;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-left: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 0rpx 20rpx 20rpx 20rpx;
				}

				.voice {
					text-align: right;
				}

				.voice-img {
					float: left;
					transform: rotate(180deg);
					width: 36rpx;
					height: 42rpx;
					padding-bottom: 4rpx;
				}
			}

			.msg-right {
				flex-direction: row-reverse;

				.msg-text {
					margin-right: 16rpx;
					background-color: rgba(255, 228, 49, 0.8);
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.ms-img {
					margin-right: 16rpx;
				}

				.msh-map {
					margin-left: 16rpx;
					border-radius: 20rpx 0rpx 20rpx 20rpx;
				}

				.voice {
					text-align: left;

				}

				.voice-img {
					float: right;
					padding: 4rpx;
					width: 36rpx;
					height: 42rpx;
				}
			}
		}
	}
</style>
