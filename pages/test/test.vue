<template>
	<view>
		<u-collapse :head-style="headStyle" event-type="close"  @change="change">
				<u-collapse-item :index="index" :title="item.head" v-for="(item, index) in itemList" :key="index">
					<view class="collapse-item">
						{{item.body}}
					</view>
				</u-collapse-item>
			</u-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [{
									head: "赏识在于角度的转换",
									body: "只要我们正确择取一个合适的参照物乃至稍降一格去看待他人，值得赏识的东西便会扑面而来",
									open: true,
									disabled: true
								},{
									head: "生活中不是缺少美，而是缺少发现美的眼睛",
									body: "学会欣赏，实际是一种积极生活的态度，是生活的调味品，会在欣赏中发现生活的美",
									open: false,
								},{
									head: "周围一些不起眼的人、事、物，或许都隐藏着不同凡响的智慧",
									body: "但是据说雕刻大卫像所用的这块大理石，曾被多位雕刻家批评得一无是处，有些人认为这块大理石采凿得不好，有些人嫌它的纹路不够美",
									open: false,
								}],
								headStyle:{
									color:'#0000ff'
								}
							
			};
		}
	}
</script>

<style lang="scss" scoped>

</style>
