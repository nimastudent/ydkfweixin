<template>
    <view class="bg">
        <view class="withe-container">
            <view class="form-container">
                <view class="denglu color-1129" >登录</view>
                <view class="dianhua color-b2b">
                    输入电话号码登录
                </view>
                <button type="default" @click="routeChange">路由跳转</button>

                <button type="default" @click="submit" withCredentials="true">登录</button>
                <button type="default" @click="getUserInfo" withCredentials="true">获取用户信息</button>
                <button type="default" open-type="getPhoneNumber">获取手机号</button>
                <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" withCredentials="true">唤起授权</button>
				<button type="default" @click="postData">postData</button>
				<button type="default" @click="normalLogin">normalLogin</button>
            </view>
        </view>
    </view>
</template>

<script>
	import {postUserCode,login}  from '../../api/auth.js'
    export default {
        data() {
            return {
			code:'',
			nickName:'',
			avatarUrl:''
            }
        },
        methods: {
            submit() {
				const _this = this
                uni.login({
                    provider: 'weixin',
                    timeout: 3000,
                    onlyAuthorize: true,
                    success: (res) => {
                        uni.setStorage({
                            key: 'weixinCode',
                            value: res.code,
                        })
						console.log(res)
						_this.code = res.code
                        
                         uni.getUserInfo({
                              provider: 'weixin',
                              success: function (infoRes) {
                                  console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.code);
                              }
                            });
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
            getUserInfo() {
				const _this = this
                uni.getUserProfile({
					lang: 'zh_CN',
                    desc: '获取用户信息',
                    success: (res) => {
                        console.log(res)
						_this.nickName = res.userInfo.nickName
						_this.avatarUrl = res.userInfo.avatarUrl
                    },
                    fail:(err)=>{
                        console.log(err)
                    }
                })
            },
            getphone(){
                uni.getphonenumber
            },
            onGetPhoneNumber(ves){
                console.log(ves)
            },
            routeChange(){
                uni.switchTab({
                    url:'/pages/state/state'
                })
            },
			postData(){
				
				let data = {
					code:this.code,
					nickName:this.nickName,
					avatarUrl:this.avatarUrl
				}
				console.log(data)
				postUserCode(data).then(res => {
					if(res.success){
						uni.setStorage({
							key:'token',
							value:res.body.token,
							success: () => {
								console.log("token存储成功")
							}
						})
					}
				})
			},
			normalLogin(){
				let obj = {telephone:"101",password:"123456"}
				login(obj).then(res => {
					console.log(res)
				})
			}
        }
    }
</script>

<style lang="scss">
    .bg {
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: #0065FF;
    }

    .withe-container {
        position: absolute;
        left: 0px;
        top: 25vh;
        width: 100vw;
        height: 75vh;
        border-radius: 0px 24px 0px 0px;
        background: #FFFFFF;
    }

    .form-container {
        margin: 100upx 50upx 100upx;
    }

    .denglu {
        line-height: 42upx;
        font-size: 58upx;
    }

    .dianhua {
        margin-top: 30upx;
        font-size: 32upx;
    }
</style>
