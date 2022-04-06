<template>
    <view class="bg">
        <view class="withe-container">
            <view class="form-container">
                <view class="denglu color-1129">登录</view>
                <view class="dianhua color-b2b">
                    输入电话号码登录
                </view>
                <button type="default" @click="routeChange">路由跳转</button>

                <button type="default" @click="submit" withCredentials="true">登录</button>
                <button type="default" @click="getUserInfo" withCredentials="true">获取用户信息</button>
                <button type="default" open-type="getPhoneNumber">获取手机号</button>
                <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" withCredentials="true">唤起授权</button>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            submit() {
                uni.login({
                    provider: 'weixin',
                    timeout: 3000,
                    onlyAuthorize: true,
                    success: (res) => {
                        uni.setStorage({
                            key: 'weixinCode',
                            value: res.code,
                        })
                        
                         uni.getUserInfo({
                              provider: 'weixin',
                              success: function (infoRes) {
                                  console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                              }
                            });
                    },
                    fail: (err) => {
                        console.log(err)
                    }
                })
            },
            getUserInfo() {
                uni.getUserProfile({
                    desc: '获取用户信息',
                    success: (userInfo) => {
                        console.log(userInfo)
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
