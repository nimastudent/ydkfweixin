<template>
	<view>
		<view class="flex justify-between ">
			<button type="default" @click="goHealthAssess">健康测评</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goHealthAssess(){
				this.$u.route('/pages/state/healthAssess')
			}
		}
	}
</script>

<style lang="scss">

</style>
