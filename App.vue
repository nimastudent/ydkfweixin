<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './colorui/main.css';
	@import './colorui/icon.css';
    @import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/icon/iconfont.css';
</style>
