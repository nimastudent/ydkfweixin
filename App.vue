<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.setStorageSync('isLogin',false)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		beforeUnmount() {
			uni.clearStorage()
			uni.clearStorageSync()
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './colorui/main.css';
	@import './colorui/icon.css';
    @import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/icon/iconfont.css';
</style>
