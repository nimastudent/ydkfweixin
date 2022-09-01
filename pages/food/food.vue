<template>
	<view>
		
	</view>
</template>

<script>
	import {
		getFoodType
	} from '../../api/food.js';
	export default {
		data() {
			return {};
		},
		mounted(){
			this.fetchAllType()
		},
		methods: {
			async fetchAllType() {
				const res = await getFoodType()
				console.log(res);
			}
		}
	}
</script>

<style lang="scss">

</style>
