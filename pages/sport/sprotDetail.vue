<template>
    <view>
		<u-parse :content="content"></u-parse>
    </view>
</template>

<script>
    import {
        getChuFangByName
    } from '../../api/sport.js'
    export default {
        data() {
            return {
                name: '',
				content:'<p><br/><img src=\"http://47.98.120.130:8080/api/upload/actionPicture/1648458551920.jpg\" style=\"max-width:100%;\" width=\"30%\" contenteditable=\"false\"/></p><p>测试图片<br/></p>'
            };
        },
        onLoad(e) {
            this.name = e.item
            this.getContent()
        },
        methods: {
            async getContent() {
				let params = {name:this.name}
				const res = await getChuFangByName({params})
				console.log(res)
            }
        }
    }
</script>

<style lang="scss">

</style>
