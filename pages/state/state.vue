<template>
    <view >
        <view class="color-black font-30 margin-sm ">健康数据</view> 
      
	<view class="step-contianer">
		<view class="walk-text-contianer">
			<view class="walk-text-icon">
				<image src="../../static/staeIcon/walking.png" mode=""></image>
				<text>走步</text><text>（步）</text>
			</view>
			<view class="font-max walk-text-icon">
				3299
			</view>
			<view class="">
				距离达成目标还差4398步
			</view>
		</view>
		<view class="walk-circle-contianer">
			 <!-- <canvas class="canvas" canvas-id="canvas2"></canvas> -->
		</view>
	</view>
       
       <view class="grid">
           <view class="border text-contianer" @click="goHealthAssess">
               <view class="flex flex-direction align-center">
                   <u-icon name="heart-fill" color="#007aff" size="38"></u-icon>
                   <text class="font-max margin-top-sm">健康测评</text>
               </view>
           </view>
           
           <view class="border text-contianer">
               <view class="flex flex-direction align-center" @click="goHealthReport">
                   <u-icon name="man-add" color="#007aff" size="38"></u-icon>
                   <text class="font-max margin-top-sm">健康汇报</text>
               </view>
           </view>
       </view>
      

    </view>
</template>

<script>
	import {postUserCode,login}  from '../../api/auth.js'
	// import Gauge from "@/utils/circle.js";
    export default {
        components:{
        },
        data() {
            return {
                stepPercent:90
            };
        },
        mounted() {
			// new Gauge({
			//       canvasId: "canvas2",
			//       value: 80,
			//       lineWidth: 20,
			//       progressColor: ["#007aff", "#007aff", "#007aff"],
			//       valueColor: "#007aff",
			//     });
				
        },
        methods: {
            goHealthAssess() {
                this.$u.route('/pages/state/healthAssess')
            },
			goHealthReport(){
				this.$u.route('/pages/state/healthReport')
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
        width: 42vw;
        height: 20vh;
        margin: 30upx;
        border-radius: 30upx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #007aff;
		//  #F0F0F0
        background-color: #fff;
    }
	
	.step-contianer{
		width: 95vw;
		margin: 0 auto;
		height: 18vh;
		background-color: white;
		border-radius: 16upx;
		display: flex;
		justify-content: space-around;
	}
	
	.walk-text-contianer{
		width: 45%;
		height: 90%;
		margin-left: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
	}
	
	.walk-text-icon{
		text-indent: 6upx;
	}
	
	.walk-text-icon image{
		width: 32upx;
		height: 32upx;
	}
	
	.canvas {
	  width: 200upx;
	  height: 200upx;
	  margin: 40upx auto;
	}
</style>
