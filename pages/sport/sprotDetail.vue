<template>
    <view>

    </view>
</template>

<script>
    import {
        getChuFangByName
    } from '../../api/sport.js'
    export default {
        data() {
            return {
                name: ''
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
