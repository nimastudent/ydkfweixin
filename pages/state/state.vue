<template>
    <view >
        


       <circle-component :progress_txt="stepPercent">
       </circle-component>
      
    
       
       <view class="grid margin-top-xl">
           <view class="border text-contianer" @click="goHealthAssess">
               <view class="flex flex-direction align-center">
                   <u-icon name="heart-fill" color="white" size="38"></u-icon>
                   <text class="font-max margin-top-sm">健康测评</text>
               </view>
           </view>
           
           <view class="border text-contianer">
               <view class="flex flex-direction align-center">
                   <u-icon name="man-add" color="white" size="38"></u-icon>
                   <text class="font-max margin-top-sm">健康汇报</text>
               </view>
           </view>
       </view>
      

    </view>
</template>

<script>
    import circleComponent from '../../components/circleComponent.vue'
    export default {
        components:{
            circleComponent
        },
        data() {
            return {
                stepPercent:90
            };
        },
        mounted() {
            this.drawProgressbg();
            this.drawCircle(this.progress_txt); //参数为1-100
            this.drawLine();
        },
        methods: {
            goHealthAssess() {
                this.$u.route('/pages/state/healthAssess')
            },
           
        }
    }
</script>

<style lang="scss" scoped>
    .health-contianer{
        margin-top: 50upx;
        font-size: 60upx;
    }
    
    .text-contianer{
        width: 40vw;
        height: 20vh;
        margin: 30upx;
        border-radius: 30upx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #F0F0F0;
        background-color: #007aff;
    }
</style>
